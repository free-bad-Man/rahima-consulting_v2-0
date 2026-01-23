/**
 * Библиотека для интеграции с amoCRM API
 * Создание сделок из заявок калькулятора
 */

// Получаем значения из переменных окружения
// Используем значения по умолчанию для сборки, проверка будет в runtime
const AMOCRM_CLIENT_ID = process.env.AMOCRM_CLIENT_ID || "";
const AMOCRM_CLIENT_SECRET = process.env.AMOCRM_CLIENT_SECRET || "";
const AMOCRM_REDIRECT_URI = process.env.AMOCRM_REDIRECT_URI || "https://rahima-consulting.ru/api/amocrm/callback";
const AMOCRM_SUBDOMAIN = process.env.AMOCRM_SUBDOMAIN || "rahimaconsulting";

// Функция для проверки конфигурации (вызывается только в runtime)
function validateAmocrmConfig() {
  if (!AMOCRM_CLIENT_ID || !AMOCRM_CLIENT_SECRET) {
    throw new Error(
      "AMOCRM_CLIENT_ID and AMOCRM_CLIENT_SECRET must be set in environment variables. " +
      "Please check your .env.local file or docker-compose.yml."
    );
  }
}

interface AmoCRMTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number; // timestamp когда токен истечет
}

interface AmoCRMContact {
  id?: number;
  name: string;
  email?: string;
  phone?: string;
}

interface AmoCRMDeal {
  name: string;
  price?: number;
  contact_id?: number;
  custom_fields_values?: Array<{
    field_id: number;
    values: Array<{ value: string | number }>;
  }>;
}

/**
 * Обменять код авторизации на токены
 */
export async function exchangeAuthCodeForTokens(authCode: string): Promise<AmoCRMTokens> {
  validateAmocrmConfig(); // Проверка только в runtime
  const tokenUrl = `https://${AMOCRM_SUBDOMAIN}.amocrm.ru/oauth2/access_token`;
  
  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: AMOCRM_CLIENT_ID,
      client_secret: AMOCRM_CLIENT_SECRET,
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: AMOCRM_REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to exchange auth code: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const expiresAt = Date.now() + (data.expires_in * 1000);

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
    expires_at: expiresAt,
  };
}

/**
 * Обновить access token используя refresh token
 */
export async function refreshAccessToken(refreshToken: string): Promise<AmoCRMTokens> {
  validateAmocrmConfig(); // Проверка только в runtime
  const tokenUrl = `https://${AMOCRM_SUBDOMAIN}.amocrm.ru/oauth2/access_token`;
  
  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: AMOCRM_CLIENT_ID,
      client_secret: AMOCRM_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      redirect_uri: AMOCRM_REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to refresh token: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const expiresAt = Date.now() + (data.expires_in * 1000);

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
    expires_at: expiresAt,
  };
}

/**
 * Получить или обновить токен (проверяет срок действия)
 */
async function getValidAccessToken(
  storedTokens: AmoCRMTokens | null
): Promise<string> {
  // Если токенов нет, нужно сначала получить их через exchangeAuthCodeForTokens
  if (!storedTokens) {
    throw new Error("No tokens available. Please authorize first.");
  }

  // Проверяем, не истек ли токен (обновляем за 5 минут до истечения)
  const fiveMinutes = 5 * 60 * 1000;
  if (Date.now() >= storedTokens.expires_at - fiveMinutes) {
    console.log("[amocrm] Token expired, refreshing...");
    const newTokens = await refreshAccessToken(storedTokens.refresh_token);
    // Здесь нужно сохранить новые токены (в БД или переменных окружения)
    // Для простоты используем переменные окружения
    return newTokens.access_token;
  }

  return storedTokens.access_token;
}

/**
 * Найти или создать контакт в amoCRM
 */
export async function findOrCreateContact(
  accessToken: string,
  contact: AmoCRMContact
): Promise<number> {
  console.log("[amocrm] findOrCreateContact called for:", { name: contact.name, email: contact.email, phone: contact.phone });
  const apiUrl = `https://${AMOCRM_SUBDOMAIN}.amocrm.ru/api/v4/contacts`;

  // Сначала ищем контакт по email или телефону
  if (contact.email || contact.phone) {
    const query = contact.email || contact.phone || "";
    const searchUrl = `${apiUrl}?query=${encodeURIComponent(query)}`;
    
    console.log("[amocrm] Searching contact with URL:", searchUrl);
    
    const searchResponse = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("[amocrm] Search response status:", searchResponse.status, searchResponse.statusText);

    if (searchResponse.ok) {
      const responseText = await searchResponse.text();
      console.log("[amocrm] Search response text:", responseText.substring(0, 200));
      
      if (!responseText || responseText.trim() === '') {
        console.log("[amocrm] Empty response, contact not found, will create new");
      } else {
        try {
          const searchData = JSON.parse(responseText);
          console.log("[amocrm] Parsed search data:", JSON.stringify(searchData).substring(0, 200));
          if (searchData._embedded?.contacts?.length > 0) {
            console.log("[amocrm] ✅ Contact found, ID:", searchData._embedded.contacts[0].id);
            return searchData._embedded.contacts[0].id;
          }
        } catch (parseError) {
          console.error("[amocrm] Error parsing search response:", parseError);
          console.error("[amocrm] Response text:", responseText);
        }
      }
    } else {
      const errorText = await searchResponse.text();
      console.error("[amocrm] Search failed:", searchResponse.status, errorText);
    }
  }

  // Если контакт не найден, создаем новый
  const contactData: any = {
    name: contact.name,
  };

  // Добавляем email и телефон через custom_fields_values
  const customFields: any[] = [];
  if (contact.email) {
    customFields.push({
      field_code: "EMAIL",
      values: [{ value: contact.email, enum_code: "WORK" }],
    });
  }
  if (contact.phone) {
    customFields.push({
      field_code: "PHONE",
      values: [{ value: contact.phone, enum_code: "WORK" }],
    });
  }

  if (customFields.length > 0) {
    contactData.custom_fields_values = customFields;
  }

  console.log("[amocrm] Creating new contact with data:", JSON.stringify(contactData).substring(0, 200));
  
  const createResponse = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([contactData]),
  });

  console.log("[amocrm] Create contact response status:", createResponse.status, createResponse.statusText);

  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    console.error("[amocrm] Failed to create contact:", createResponse.status, errorText);
    throw new Error(`Failed to create contact: ${createResponse.status} ${errorText}`);
  }

  const responseText = await createResponse.text();
  console.log("[amocrm] Create contact response text:", responseText.substring(0, 200));
  
  if (!responseText || responseText.trim() === '') {
    throw new Error("Empty response from amoCRM API when creating contact");
  }
  
  try {
    const createData = JSON.parse(responseText);
    console.log("[amocrm] ✅ Contact created, ID:", createData._embedded?.contacts?.[0]?.id);
    return createData._embedded.contacts[0].id;
  } catch (parseError) {
    console.error("[amocrm] Error parsing create contact response:", parseError);
    console.error("[amocrm] Response text:", responseText);
    throw new Error(`Failed to parse response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
  }
}

/**
 * Создать сделку в amoCRM
 */
export async function createDeal(
  accessToken: string,
  deal: AmoCRMDeal
): Promise<number> {
  console.log("[amocrm] createDeal called with:", { name: deal.name, price: deal.price, contact_id: deal.contact_id });
  const apiUrl = `https://${AMOCRM_SUBDOMAIN}.amocrm.ru/api/v4/leads`;

  const dealData: any = {
    name: deal.name,
    ...(deal.price ? { price: deal.price } : {}),
    ...(deal.contact_id ? { _embedded: { contacts: [{ id: deal.contact_id }] } } : {}),
  };

  if (deal.custom_fields_values && deal.custom_fields_values.length > 0) {
    dealData.custom_fields_values = deal.custom_fields_values;
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([dealData]),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create deal: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data._embedded.leads[0].id;
}

/**
 * Добавить заметку к сделке
 */
export async function addNoteToDeal(
  accessToken: string,
  dealId: number,
  noteText: string
): Promise<void> {
  const apiUrl = `https://${AMOCRM_SUBDOMAIN}.amocrm.ru/api/v4/leads/${dealId}/notes`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{
      entity_id: dealId,
      note_type: "common",
      params: {
        text: noteText,
      },
    }]),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.warn(`[amocrm] Failed to add note to deal ${dealId}: ${response.status} ${errorText}`);
    // Не бросаем ошибку, так как это не критично
  }
}

/**
 * Создать сделку из заявки калькулятора
 */
export async function createDealFromOrder(data: {
  userName: string;
  userEmail: string;
  userPhone?: string;
  serviceName: string;
  description?: string;
  monthlyAmount?: number;
  oneTimeAmount?: number;
  orderId: string;
  calculatorData?: any;
  authCode?: string; // Код авторизации (если первый раз)
  storedTokens?: AmoCRMTokens | null; // Сохраненные токены
}): Promise<{ dealId: number; contactId: number }> {
  console.log("[amocrm] createDealFromOrder called with:", {
    userName: data.userName,
    userEmail: data.userEmail,
    userPhone: data.userPhone,
    serviceName: data.serviceName,
    orderId: data.orderId,
    hasAuthCode: !!data.authCode,
    hasStoredTokens: !!data.storedTokens,
  });
  
  try {
    // Получаем или обновляем токен
    let accessToken: string;
    
    console.log("[amocrm] Getting access token...");
    if (data.authCode) {
      // Первая авторизация - обмениваем код на токены
      const tokens = await exchangeAuthCodeForTokens(data.authCode);
      accessToken = tokens.access_token;
      // TODO: Сохранить tokens в БД или переменных окружения
    } else if (data.storedTokens) {
      accessToken = await getValidAccessToken(data.storedTokens);
    } else {
      // Используем токен из переменных окружения (временное решение)
      const envToken = process.env.AMOCRM_ACCESS_TOKEN;
      console.log("[amocrm] Using token from environment, token length:", envToken?.length || 0);
      if (!envToken) {
        console.error("[amocrm] ❌ No access token available!");
        throw new Error("No access token available. Please provide authCode or storedTokens.");
      }
      accessToken = envToken;
      console.log("[amocrm] ✅ Access token obtained from environment");
    }

    // Находим или создаем контакт
    console.log("[amocrm] Finding or creating contact...");
    const contactId = await findOrCreateContact(accessToken, {
      name: data.userName,
      email: data.userEmail,
      phone: data.userPhone,
    });
    console.log("[amocrm] ✅ Contact ID:", contactId);

    // Формируем название сделки
    const dealName = `Заявка: ${data.serviceName}`;
    
    // Рассчитываем общую сумму
    const totalAmount = (data.monthlyAmount || 0) + (data.oneTimeAmount || 0);

    // Формируем описание для сделки
    let dealDescription = data.description || "";
    if (data.calculatorData) {
      dealDescription += `\n\nДанные из калькулятора:\n`;
      if (data.calculatorData.businessParams) {
        dealDescription += `Тип бизнеса: ${data.calculatorData.businessParams.businessType}\n`;
        dealDescription += `Система налогообложения: ${data.calculatorData.businessParams.taxSystem}\n`;
        dealDescription += `Сотрудников: ${data.calculatorData.businessParams.employeesCount}\n`;
        dealDescription += `Операций/мес: ${data.calculatorData.businessParams.operationsCount}\n`;
      }
      if (data.monthlyAmount) {
        dealDescription += `\nЕжемесячно: ${data.monthlyAmount.toLocaleString()} ₽`;
      }
      if (data.oneTimeAmount) {
        dealDescription += `\nРазово: ${data.oneTimeAmount.toLocaleString()} ₽`;
      }
    }

    // Создаем сделку
    const dealData: AmoCRMDeal = {
      name: dealName,
      price: totalAmount > 0 ? totalAmount : undefined,
      contact_id: contactId,
    };

    console.log("[amocrm] Creating deal with data:", {
      name: dealName,
      price: totalAmount,
      contact_id: contactId,
    });

    // Добавляем описание в заметку к сделке (через отдельный API вызов после создания)
    // Или можно добавить в custom_fields, если есть такое поле в вашем amoCRM
    
    const dealId = await createDeal(accessToken, dealData);
    console.log("[amocrm] ✅ Deal created with ID:", dealId);

    // Добавляем заметку с описанием заявки
    if (dealDescription) {
      try {
        await addNoteToDeal(accessToken, dealId, dealDescription);
      } catch (noteError) {
        console.warn("[amocrm] Failed to add note to deal:", noteError);
        // Не критично, продолжаем
      }
    }

    return { dealId, contactId };
  } catch (error) {
    console.error("[amocrm] Error creating deal from order:", error);
    throw error;
  }
}

/**
 * Создать сделку из формы обратной связи (Заказать звонок)
 */
export async function createDealFromContactForm(data: {
  userName: string;
  userPhone: string;
  serviceName?: string;
  userEmail?: string;
  comment?: string;
}): Promise<{ dealId: number; contactId: number }> {
  console.log("[amocrm] createDealFromContactForm called with:", {
    userName: data.userName,
    userPhone: data.userPhone,
    serviceName: data.serviceName,
  });
  
  try {
    // Получаем токен из переменных окружения
    const accessToken = process.env.AMOCRM_ACCESS_TOKEN;
    console.log("[amocrm] Using token from environment, token length:", accessToken?.length || 0);
    if (!accessToken) {
      console.error("[amocrm] ❌ No access token available!");
      throw new Error("No access token available. Please configure AMOCRM_ACCESS_TOKEN.");
    }
    console.log("[amocrm] ✅ Access token obtained from environment");

    // Находим или создаем контакт
    console.log("[amocrm] Finding or creating contact...");
    const contactId = await findOrCreateContact(accessToken, {
      name: data.userName,
      phone: data.userPhone,
      email: data.userEmail,
    });
    console.log("[amocrm] ✅ Contact ID:", contactId);

    // Формируем название сделки в зависимости от типа заявки
    const serviceName = data.serviceName || "Заказ звонка";
    const dealName = `${serviceName}: ${data.userName}`;

    // Создаем сделку
    const dealData: AmoCRMDeal = {
      name: dealName,
      contact_id: contactId,
    };

    console.log("[amocrm] Creating deal with data:", {
      name: dealName,
      contact_id: contactId,
    });
    
    const dealId = await createDeal(accessToken, dealData);
    console.log("[amocrm] ✅ Deal created with ID:", dealId);

    // Добавляем заметку с информацией о заявке
    let noteText = `${serviceName}\nИмя: ${data.userName}\nТелефон: ${data.userPhone}`;
    if (data.userEmail) {
      noteText += `\nEmail: ${data.userEmail}`;
    }
    if (data.comment) {
      noteText += `\n\nКомментарий:\n${data.comment}`;
    }
    
    try {
      await addNoteToDeal(accessToken, dealId, noteText);
    } catch (noteError) {
      console.warn("[amocrm] Failed to add note to deal:", noteError);
      // Не критично, продолжаем
    }

    return { dealId, contactId };
  } catch (error) {
    console.error("[amocrm] Error creating deal from contact form:", error);
    throw error;
  }
}

