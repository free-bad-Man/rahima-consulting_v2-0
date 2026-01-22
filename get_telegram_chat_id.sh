#!/bin/bash

# Скрипт для получения Chat ID Telegram группы
# Использование: ./get_telegram_chat_id.sh <BOT_TOKEN>

if [ -z "$1" ]; then
    echo "Использование: $0 <BOT_TOKEN>"
    echo ""
    echo "Пример:"
    echo "  $0 123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
    echo ""
    echo "Как получить токен бота:"
    echo "  1. Найдите @BotFather в Telegram"
    echo "  2. Отправьте команду /mybots"
    echo "  3. Выберите вашего бота"
    echo "  4. Выберите 'API Token'"
    exit 1
fi

BOT_TOKEN="$1"
API_URL="https://api.telegram.org/bot${BOT_TOKEN}/getUpdates"

echo "Запрос обновлений от Telegram API..."
echo "URL: $API_URL"
echo ""

response=$(curl -s "$API_URL")

if [ $? -ne 0 ]; then
    echo "Ошибка: Не удалось подключиться к Telegram API"
    exit 1
fi

# Проверяем наличие ошибки в ответе
if echo "$response" | grep -q '"ok":false'; then
    echo "Ошибка от Telegram API:"
    echo "$response" | grep -o '"description":"[^"]*"' | sed 's/"description":"//;s/"$//'
    exit 1
fi

# Извлекаем Chat ID из ответа
chat_ids=$(echo "$response" | grep -o '"chat":{"id":-[0-9]*' | grep -o -- '-[0-9]*' | sort -u)

if [ -z "$chat_ids" ]; then
    echo "Chat ID не найден."
    echo ""
    echo "Убедитесь, что:"
    echo "  1. Бот добавлен в группу"
    echo "  2. В группе было отправлено хотя бы одно сообщение после добавления бота"
    echo "  3. Токен бота правильный"
    echo ""
    echo "Полный ответ API:"
    echo "$response" | jq '.' 2>/dev/null || echo "$response"
    exit 1
fi

echo "Найденные Chat ID:"
echo "$chat_ids"
echo ""
echo "Для группы используйте отрицательное число (начинается с -100)"
echo ""
echo "Чтобы получить обновления, отправьте сообщение в группу и запустите скрипт снова"

