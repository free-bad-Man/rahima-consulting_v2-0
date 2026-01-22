"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseSpeechRecognitionOptions {
  onResult?: (text: string) => void;
  onError?: (error: string) => void;
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  onstart: () => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

interface WindowWithSpeechRecognition extends Window {
  SpeechRecognition?: new () => SpeechRecognition;
  webkitSpeechRecognition?: new () => SpeechRecognition;
}

export function useSpeechRecognition({
  onResult,
  onError,
  language = "ru-RU",
  continuous = false,
  interimResults = false,
}: UseSpeechRecognitionOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isListeningRef = useRef(false);
  const shouldContinueRef = useRef(false);
  const isStartingRef = useRef(false);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Сохраняем колбэки в refs, чтобы не пересоздавать recognition при их изменении
  const onResultRef = useRef(onResult);
  const onErrorRef = useRef(onError);
  
  useEffect(() => {
    onResultRef.current = onResult;
    onErrorRef.current = onError;
  }, [onResult, onError]);

  useEffect(() => {
    const windowWithSpeech = window as WindowWithSpeechRecognition;
    const SpeechRecognition =
      windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      setError("Распознавание речи не поддерживается в вашем браузере. Используйте Chrome, Edge или Safari.");
      return;
    }

    setIsSupported(true);
    
    // Создаем новый объект recognition только если его еще нет
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
    }
    
    const recognition = recognitionRef.current;

    // Обновляем настройки
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.lang = language;

    recognition.onstart = () => {
      isListeningRef.current = true;
      isStartingRef.current = false;
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        }
      }

      // Отправляем только финальные результаты
      if (finalTranscript && onResultRef.current) {
        onResultRef.current(finalTranscript.trim());
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      // Игнорируем ошибку "aborted" - это нормально при остановке
      if (event.error === "aborted") {
        isListeningRef.current = false;
        isStartingRef.current = false;
        setIsListening(false);
        return;
      }

      let errorMessage = "Произошла ошибка распознавания речи";
      let shouldStop = true;
      
      switch (event.error) {
        case "no-speech":
          // При no-speech в continuous режиме не останавливаем
          if (continuous) {
            shouldStop = false;
            return;
          }
          shouldStop = true;
          break;
        case "audio-capture":
          errorMessage = "Микрофон не найден или недоступен.";
          break;
        case "not-allowed":
          errorMessage = "Доступ к микрофону запрещен. Разрешите доступ в настройках браузера.";
          break;
        case "network":
          errorMessage = "Ошибка сети при распознавании речи.";
          break;
        default:
          errorMessage = `Ошибка: ${event.error}`;
      }

      if (shouldStop) {
        isListeningRef.current = false;
        isStartingRef.current = false;
        shouldContinueRef.current = false;
        setIsListening(false);
        
        if (errorMessage !== "Произошла ошибка распознавания речи") {
          setError(errorMessage);
          if (onErrorRef.current) {
            onErrorRef.current(errorMessage);
          }
        }
      }
    };

    recognition.onend = () => {
      isListeningRef.current = false;
      isStartingRef.current = false;
      setIsListening(false);
      
      // Очищаем предыдущий таймер перезапуска
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
      
      // Автоматический перезапуск только если continuous включен и мы хотим продолжать
      if (continuous && shouldContinueRef.current && recognitionRef.current) {
        restartTimeoutRef.current = setTimeout(() => {
          // Проверяем, что мы все еще хотим продолжать и recognition существует
          if (shouldContinueRef.current && recognitionRef.current && !isListeningRef.current && !isStartingRef.current) {
            try {
              isStartingRef.current = true;
              recognitionRef.current.start();
            } catch (e: any) {
              isStartingRef.current = false;
              // Игнорируем ошибки перезапуска
              const errorMsg = e?.message || String(e) || "";
              if (!errorMsg.includes("already started") && 
                  !errorMsg.includes("aborted") &&
                  !errorMsg.includes("not started")) {
                console.log("Recognition auto-restart skipped:", errorMsg);
              }
            }
          }
        }, 300);
      }
    };

    return () => {
      // Очищаем таймер при размонтировании
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
      
      if (recognitionRef.current) {
        try {
          shouldContinueRef.current = false;
          recognitionRef.current.abort();
        } catch (e) {
          // Игнорируем ошибки при очистке
        }
      }
    };
  }, [language, continuous, interimResults]);

  const startListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current) {
      setError("Распознавание речи не поддерживается");
      return;
    }

    // Если уже слушаем или запускаем, не запускаем повторно
    if (isListeningRef.current || isStartingRef.current) {
      return;
    }

    // Устанавливаем флаг, что хотим продолжать слушать
    shouldContinueRef.current = true;
    isStartingRef.current = true;

    try {
      // Если recognition уже запущен, сначала останавливаем
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Игнорируем ошибки
        }
      }
      
      // Небольшая задержка для полной остановки перед запуском
      setTimeout(() => {
        if (recognitionRef.current && shouldContinueRef.current && !isListeningRef.current) {
          try {
            recognitionRef.current.start();
          } catch (err: any) {
            isStartingRef.current = false;
            isListeningRef.current = false;
            shouldContinueRef.current = false;
            
            // Игнорируем ошибки "already started", "aborted", "not started"
            const errorMsg = err?.message || String(err) || "";
            if (!errorMsg.includes("already started") && 
                !errorMsg.includes("aborted") &&
                !errorMsg.includes("not started")) {
              console.error("Error starting recognition:", err);
              setError("Не удалось запустить распознавание речи");
              if (onErrorRef.current) {
                onErrorRef.current("Не удалось запустить распознавание речи");
              }
            }
          }
        } else {
          isStartingRef.current = false;
        }
      }, 100);
    } catch (err) {
      console.error("Error starting recognition:", err);
      isStartingRef.current = false;
      isListeningRef.current = false;
      shouldContinueRef.current = false;
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    shouldContinueRef.current = false;
    isStartingRef.current = false;
    
    // Очищаем таймер перезапуска
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // Игнорируем ошибки
        }
      }
    }
    
    isListeningRef.current = false;
    setIsListening(false);
  }, []);

  return {
    isListening,
    isSupported,
    error,
    startListening,
    stopListening,
  };
}
