"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

interface ModalUrlProps {
  path?: string;
}

export default function ModalUrl({ path }: ModalUrlProps) {
  const [copied, setCopied] = useState(false);

  const currentUrl = useMemo(() => {
    try {
      if (!path || path.length === 0) {
        return typeof window !== "undefined" ? window.location.href : "";
      }
      // If path already contains protocol, use as-is
      if (/^https?:\/\//.test(path)) return path;
      // If path starts with slash, prefix origin
      if (path.startsWith("/")) {
        return typeof window !== "undefined" ? `${window.location.origin}${path}` : path;
      }
      return path;
    } catch {
      return "";
    }
  }, [path]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  if (!currentUrl) return null;

  return (
    <div className="mx-auto mb-3 inline-flex items-center gap-2 text-white/70 text-sm md:text-base font-mono bg-white/5 px-3 py-1 rounded-md border border-white/10 max-w-[90vw]">
      <span className="truncate max-w-[70vw]">{currentUrl}</span>
      <button
        onClick={handleCopy}
        className="flex-shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors"
        aria-label={copied ? "Скопировано" : "Копировать URL"}
        title={copied ? "Скопировано" : "Копировать URL"}
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}


