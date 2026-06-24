import { useEffect, useMemo, useState } from "react";

export function Petals({ count = 14 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 14,
        size: 8 + Math.random() * 14,
        hue: Math.random() > 0.5 ? "marigold" : "rose",
        key: i,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {mounted && petals.map((p) => (
        <span
          key={p.key}
          className="petal"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background:
              p.hue === "marigold"
                ? "radial-gradient(circle at 30% 30%, oklch(0.82 0.17 75), oklch(0.6 0.2 50))"
                : "radial-gradient(circle at 30% 30%, oklch(0.78 0.14 20), oklch(0.45 0.18 22))",
          }}
        />
      ))}
    </div>
  );
}
