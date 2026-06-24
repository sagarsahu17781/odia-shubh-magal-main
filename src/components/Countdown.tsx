import { useEffect, useState } from "react";

interface Props {
  target: Date;
}

function calc(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

export function Countdown({ target }: Props) {
  const [t, setT] = useState(() => ({ d: 0, h: 0, m: 0, s: 0 }));
  useEffect(() => {
    setT(calc(target));
    const id = setInterval(() => setT(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  const items: [string, number][] = [
    ["Days", t.d],
    ["Hours", t.h],
    ["Minutes", t.m],
    ["Seconds", t.s],
  ];
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      {items.map(([label, v]) => (
        <div
          key={label}
          className="ornate-frame rounded-lg bg-card/80 px-2 py-3 sm:px-4 sm:py-5 text-center backdrop-blur"
        >
          <div className="font-display text-2xl sm:text-4xl font-semibold text-primary tabular-nums">
            {String(v).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent-foreground/70">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
