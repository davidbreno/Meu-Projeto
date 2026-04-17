"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Item = { question: string; answer: string };

export function FAQAccordion({ items }: { items: Item[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <article key={item.question} className="rounded-2xl border border-[#eee7e0] bg-white px-5 py-4 shadow-sm">
            <button className="flex w-full items-center justify-between text-left" onClick={() => setOpenIndex(open ? null : index)}>
              <span className="font-medium text-[#2f2a36]">{item.question}</span>
              <ChevronDown size={18} className={`transition ${open ? "rotate-180" : ""}`} />
            </button>
            {open && <p className="pt-3 text-sm text-[#6f6778]">{item.answer}</p>}
          </article>
        );
      })}
    </div>
  );
}
