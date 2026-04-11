"use client";

import { useEffect, useState } from "react";

type Props = { value: number; label: string; prefix?: string; suffix?: string };

export function Counter({ value, label, prefix = "", suffix = "" }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let n = 0;
    const step = Math.max(1, Math.floor(value / 40));
    const timer = setInterval(() => {
      n = Math.min(value, n + step);
      setCount(n);
      if (n >= value) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="catalog-card text-center">
      <p className="text-4xl font-semibold text-agedGold md:text-5xl">{prefix}{count.toLocaleString("pt-BR")}{suffix}</p>
      <p className="mt-2 text-sm uppercase tracking-[0.18em] text-vintageBeige/80">{label}</p>
    </div>
  );
}
