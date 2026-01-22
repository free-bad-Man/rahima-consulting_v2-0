"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Mic, MicOff, Trash } from "lucide-react";
import { locale } from "@/lib/i18n";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

interface AIChatAssistantProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideButton?: boolean;
  startWithVoice?: boolean;
  personaName?: string;
}

export default function AIChatAssistant({ isOpen: externalIsOpen, onOpenChange, hideButton = false, startWithVoice = false, personaName }: AIChatAssistantProps = {}) {
  const personaDisplayName = personaName ?? "Вики";
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open);
    } else {
      setInternalIsOpen(open);
    }
  };
  // Начинаем без приветственного сообщения от ассистента —
  // приветствие уже выводится в шапке, поэтому бот не должен писать первым.
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const accumulatedTextRef = useRef<string>("");
  const messagesRef = useRef<Message[]>(messages);
  const isLoadingRef = useRef(false);
  const isListeningRef = useRef(false);
  const stopListeningRef = useRef<(() => void) | null>(null);
  const startListeningRef = useRef<(() => void) | null>(null);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [historyItems, setHistoryItems] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [selectedHistoryDate, setSelectedHistoryDate] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  // Обновляем refs при изменении состояний
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
  
  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  // Загрузка истории разговоров (опционально по дате в формате YYYY-MM-DD)
  const fetchHistory = async (date?: string) => {
    try {
      setHistoryLoading(true);
      const q = date ? `?date=${encodeURIComponent(date)}` : "";
      const res = await fetch(`/api/ai/conversations${q}`);
      const data = await res.json();
      setHistoryItems(data.conversations || []);
    } catch (e) {
      console.error("Failed to fetch conversations:", e);
      setHistoryItems([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  // Очистить текущий чат до начального состояния
  const handleClearChat = () => {
    setConversationId(undefined);
    // Очищаем историю сообщений (без автоматического приветствия от ассистента)
    setMessages([]);
    setInputValue("");
  };


  // Голосовое распознавание
  const { isListening, isSupported, error: speechError, startListening, stopListening } = useSpeechRecognition({
    onResult: (text) => {
      // Накопление текста и отображение в поле ввода
      accumulatedTextRef.current = accumulatedTextRef.current 
        ? accumulatedTextRef.current + " " + text 
        : text;
      
      setInputValue(accumulatedTextRef.current);
      
      // Обновляем ref для isListening
      isListeningRef.current = true;
    },
    onError: (error) => {
      console.error("Speech recognition error:", error);
    },
    language: "ru-RU",
    continuous: true,
    interimResults: false,
  });


  // Останавливаем распознавание при закрытии чата
  useEffect(() => {
    if (!isOpen && isListening) {
      accumulatedTextRef.current = "";
      stopListening();
    }
  }, [isOpen, isListening, stopListening]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Обновляем refs для isListening, startListening и stopListening
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    startListeningRef.current = startListening;
  }, [startListening]);

  useEffect(() => {
    stopListeningRef.current = stopListening;
  }, [stopListening]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Останавливаем распознавание, если оно активно
    if (isListening) {
      stopListening();
    }

    // Сбрасываем накопленный текст
    accumulatedTextRef.current = "";

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageToSend,
          conversationHistory: messages,
        }),
      });

      const rawResponseText = await response.text();

      if (!response.ok) {
        const errorText = rawResponseText || response.statusText || "Unknown error";
        throw new Error(`AI chat request failed (${response.status}): ${errorText}`);
      }

      let parsedData: Record<string, unknown> = {};
      if (rawResponseText.trim()) {
        try {
          parsedData = JSON.parse(rawResponseText);
        } catch (parseError) {
          console.warn("AI chat: failed to parse JSON response, falling back to raw text", parseError);
          parsedData = { response: rawResponseText };
        }
      }

      if (parsedData?.conversationId && typeof parsedData.conversationId === "string") {
        setConversationId(parsedData.conversationId);
      }

      const serverError =
        typeof parsedData?.error === "string" && parsedData.error.trim()
          ? parsedData.error.trim()
          : null;

      if (serverError && !parsedData?.response) {
        console.error("AI chat server error:", serverError);
      }

      const assistantContent =
        (
          (parsedData?.response as string) ||
          (parsedData?.message as string) ||
          (parsedData?.text as string) ||
          (serverError ? `Ошибка сервера: ${serverError}` : "") ||
          rawResponseText
        )?.trim() || "Извините, произошла ошибка. Попробуйте еще раз.";

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // При наличии списка цитат/источников — показываем их отдельным сообщением
      if (Array.isArray(parsedData.citations) && (parsedData.citations as any[]).length > 0) {
        const sourcesText = (parsedData.citations as any[])
          .map((c: any) => {
            const title = c.title || c.slug || "unknown";
            const score = typeof c.score === "number" ? ` • ${Number(c.score).toFixed(2)}` : "";
            return `- ${title}${score}`;
          })
          .join("\n");
        const sourcesMessage: Message = {
          id: (Date.now() + 2).toString(),
          role: "system",
          content: `SOURCES:\n${sourcesText}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, sourcesMessage]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Извините, не удалось получить ответ. Попробуйте позже.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleListening = () => {
    // Защита от множественных быстрых кликов
    if (isListening) {
      // Останавливаем микрофон
      accumulatedTextRef.current = "";
      stopListening();
    } else {
      // Сбрасываем накопленный текст при новом запуске
      accumulatedTextRef.current = "";
      setInputValue("");
      
      // Небольшая задержка для предотвращения конфликтов
      setTimeout(() => {
        if (!isListening) {
          startListening();
        }
      }, 50);
    }
  };

  return (
    <>
      {/* Кнопка для открытия чата - показываем только если не скрыта и управляется внутренне */}
      {!hideButton && externalIsOpen === undefined && (
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setIsOpen(true)}
              className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
              aria-label="Открыть чат-помощник"
            >
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      )}

      {/* Окно чата */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`fixed z-[101] bg-[#0A0A0A]/95 border border-white/10 shadow-2xl flex flex-col overflow-hidden ${
                isMobile
                  ? "inset-0 rounded-none"
                  : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] max-w-[calc(100vw-4rem)] h-[700px] max-h-[calc(100vh-4rem)] rounded-2xl"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Заголовок */}
              <div className="flex items-center justify-between p-3 md:p-4 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
              <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                    <img src="/img/call-center-operator.png" alt="Вики" width="48" height="48" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold text-white">{locale.headerTitle}</h3>
                    <p className="text-[10px] md:text-xs text-white/60">
                      {isLoading ? locale.connecting : locale.idlePrompt}
                      {conversationId && !isLoading ? ` • разговор ${conversationId}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => {
                      setShowHistoryPanel(true);
                      await fetchHistory(selectedHistoryDate || undefined);
                    }}
                    title={locale.historyButtonTitle}
                    className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-md bg-white/5 hover:bg-white/10 text-white transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                  </button>

                  <button
                    onClick={() => setShowClearConfirm(true)}
                    title={locale.clearButtonTitle}
                    className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-md bg-white/5 hover:bg-white/10 text-white transition-colors"
                  >
                    <Trash className="w-4 h-4 md:w-5 md:h-5" />
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Закрыть чат"
                  >
                    <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                </div>
              </div>

              {/* Область сообщений */}
              <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 md:gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center flex-shrink-0 ring-2 ring-purple-500/30">
                        <img src="/img/call-center-operator.png" alt="Вики" width="64" height="64" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] md:max-w-[80%] rounded-xl md:rounded-2xl px-3 py-2 md:px-4 md:py-2 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : "bg-white/10 text-white/90 border border-white/20"
                      }`}
                    >
                      <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
                        <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/70" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2 md:gap-3 justify-start">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center flex-shrink-0 ring-2 ring-purple-500/30">
                      <img src="/img/call-center-operator.png" alt="ИИ ассистент" width="64" height="64" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white/10 text-white/90 border border-white/20 rounded-xl md:rounded-2xl px-3 py-2 md:px-4 md:py-2">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Поле ввода */}
              <div className="p-3 md:p-4 border-t border-white/10 bg-[#0A0A0A]/50">
                {speechError && (
                  <div className="mb-2 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-xs">
                    {speechError}
                  </div>
                )}
                <div className="flex gap-2">
                  {isSupported && (
                    <button
                      onClick={toggleListening}
                      disabled={isLoading}
                      className={`flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                        isListening
                          ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                          : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                      aria-label={isListening ? "Остановить запись" : "Начать голосовой ввод"}
                      title={isListening ? "Остановить запись" : "Голосовой ввод"}
                    >
                      {isListening ? (
                        <MicOff className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      ) : (
                        <Mic className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      )}
                    </button>
                  )}
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isListening ? "Говорите..." : locale.inputPlaceholder}
                    disabled={isLoading || isListening}
                    className="flex-1 px-3 md:px-4 py-2 bg-white/5 border border-white/30 rounded-lg text-white text-xs md:text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-colors disabled:opacity-50"
                  />
                  <button
                    onClick={handleSend}
                    disabled={isLoading || !inputValue.trim() || isListening}
                    className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Отправить сообщение"
                  >
                    <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                </div>
                {isListening && (
                  <div className="mt-2 flex items-center gap-2 text-purple-400 text-xs">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span>{locale.recording}</span>
                  </div>
                )}
              </div>
              
              {/* Боковая панель истории диалогов (фиксированная справа) */}
              <AnimatePresence>
                {showHistoryPanel && (
                  <motion.aside
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed right-0 top-0 h-full w-full max-w-sm md:max-w-md bg-black/60 backdrop-blur-md z-50"
                  >
                    <div className="flex flex-col h-full p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm md:text-base font-medium">История диалогов</h3>
                        <div className="flex items-center gap-2">
                          <input
                            type="date"
                            value={selectedHistoryDate || ""}
                            onChange={(e) => setSelectedHistoryDate(e.target.value || null)}
                            className="bg-white/5 text-white text-sm p-1 rounded"
                          />
                          <button
                            onClick={() => fetchHistory(selectedHistoryDate || undefined)}
                            className="px-3 py-1 rounded bg-white/6 hover:bg-white/10 text-sm"
                          >
                            Найти
                          </button>
                          <button
                            onClick={() => setShowHistoryPanel(false)}
                            className="p-1 rounded bg-white/5 hover:bg-white/10"
                          >
                            Закрыть
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 overflow-auto space-y-2">
                        {historyLoading && <div className="text-sm text-white/70">Загрузка...</div>}
                        {!historyLoading && historyItems.length === 0 && (
                          <div className="text-sm text-white/60">{locale.noConversations}</div>
                        )}
                        {historyItems.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => {
                              const msgs = (c.messages || []).map((m: any) => ({
                                id: m.id || String(Math.random()),
                                role: m.role,
                                content: m.content,
                                timestamp: new Date(m.createdAt || m.timestamp || Date.now()),
                              }));
                              setMessages(msgs);
                              setConversationId(c.id);
                              setShowHistoryPanel(false);
                            }}
                            className="w-full text-left p-3 rounded bg-white/5 hover:bg-white/10"
                          >
                            <div className="text-sm font-medium">{c.title || "Разговор"}</div>
                            <div className="text-xs text-white/60">{new Date(c.updatedAt).toLocaleString()}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.aside>
                )}
              </AnimatePresence>

              {/* Модал подтверждения очистки */}
              <AnimatePresence>
                {showClearConfirm && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm"
                      onClick={() => setShowClearConfirm(false)}
                    />
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="fixed z-[121] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0A0A0A]/95 border border-white/10 rounded-lg p-4 w-[90%] max-w-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h4 className="text-sm font-semibold text-white mb-2">{locale.clearConfirmTitle}</h4>
                      <p className="text-xs text-white/70">{locale.clearConfirmMessage}</p>
                      <div className="mt-4 flex justify-end gap-2">
                        <button
                          onClick={() => setShowClearConfirm(false)}
                          className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-sm"
                        >
                          {locale.clearConfirmCancel}
                        </button>
                        <button
                          onClick={() => {
                            handleClearChat();
                            setShowClearConfirm(false);
                          }}
                          className="px-3 py-1 rounded bg-gradient-to-r from-red-600 to-red-500 text-white"
                        >
                          {locale.clearConfirmConfirm}
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

