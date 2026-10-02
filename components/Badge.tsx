import type { Verdict } from "@/lib/products";
import { VERDICT_META } from "@/lib/verdict";
import { VerdictIcon } from "./Icons";

export function Badge({ v, size = "sm" }: { v: Verdict; size?: "sm" | "lg" }) {
  const m = VERDICT_META[v];
  return (
    <span className={`badge badge-${size}`} style={{ background: m.color }}>
      <VerdictIcon v={v} size={size === "lg" ? 18 : 16} />
      {m.label}
    </span>
  );
}
