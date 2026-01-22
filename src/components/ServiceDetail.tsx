 "use client";
import React from "react";

interface ServiceContent {
  subtitle: string;
  services: Array<{ icon?: string; title: string; description: string }>;
  advantages: string[];
  process: Array<{ step: string; title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export default function ServiceDetail({ data }: { data: ServiceContent }) {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-2xl font-bold">{data.subtitle}</h1>
      <section className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Услуги в рамках</h3>
        <ul className="space-y-2">
          {data.services.map((s, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <div className="flex-none w-8 h-8 rounded-md bg-white/5 flex items-center justify-center text-white/70">
                {/* icon placeholder */}
                <span className="text-sm">•</span>
              </div>
              <div>
                <div className="font-medium">{s.title}</div>
                <div className="text-sm text-white/60">{s.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Преимущества</h3>
        <ul className="list-disc list-inside text-white/80">
          {data.advantages.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Процесс</h3>
        <ol className="list-decimal list-inside space-y-2 text-white/80">
          {data.process.map((p, i) => (
            <li key={i}>
              <div className="font-medium">{p.title}</div>
              <div className="text-sm text-white/60">{p.description}</div>
            </li>
          ))}
        </ol>
      </section>

      {data.faqs?.length > 0 && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Вопросы и ответы</h3>
          <div className="space-y-3">
            {data.faqs.map((f, i) => (
              <div key={i}>
                <div className="font-medium">{f.question}</div>
                <div className="text-sm text-white/60">{f.answer}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}


