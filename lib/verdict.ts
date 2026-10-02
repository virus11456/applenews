import type { Product, Verdict } from "./products";

export const VERDICT_META: Record<Verdict, { label: string; color: string; status: string }> = {
  buy: { label: "可以買", color: "#1A6B43", status: "剛更新，離下一代最遠" },
  wait: { label: "觀望", color: "#5C5C5C", status: "週期中段，有需要就買" },
  care: { label: "小心", color: "#8A5A05", status: "接近週期尾聲，下一代有跡象" },
  no: { label: "先別買", color: "#A8291C", status: "新款即將推出，等待通常更划算" },
  soon: { label: "即將開賣", color: "#1F4FA6", status: "已發表、尚未在台灣上市" },
  disc: { label: "已停產", color: "#141413", status: "不再販售，保留歷史資料" },
};

const DAY = 86_400_000;

export function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(b) - Date.parse(a)) / DAY);
}

export function monthsBetween(a: string, b: string): number {
  const [ay, am] = a.split("-").map(Number);
  const [by, bm] = b.split("-").map(Number);
  return (by - ay) * 12 + (bm - am);
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export interface Computed {
  verdict: Verdict;
  auto: Verdict;
  overridden: boolean;
  days: number | null; // 開賣至今
  progress: number | null; // 0–1+
  daysToNext: number | null;
}

/**
 * 判定規則（企劃書 4.2）
 * 1. 已停產 → disc
 * 2. 台灣未上市 → soon
 * 3. 下一代 A 級訊號且 60 天內 → no
 * 4. 週期進度 ≥ 75% 且下一代 B 級以上 → care
 * 4b. 下一代 B 級以上且 90 天內 → care
 * 5. 週期進度 < 30% → buy
 * 6. 其餘 → wait
 * 編輯可覆寫（override），覆寫必附理由。
 */
export function compute(p: Product, today = todayISO()): Computed {
  const days = daysBetween(p.releasedTW, today);
  const progress = p.avgDays ? days / p.avgDays : null;
  const daysToNext = p.next.expected ? daysBetween(today, p.next.expected) : null;
  const strong = p.next.grade === "A" || p.next.grade === "B";

  let auto: Verdict;
  if (p.discontinued) auto = "disc";
  else if (days < 0) auto = "soon";
  else if (p.next.grade === "A" && daysToNext !== null && daysToNext <= 60) auto = "no";
  else if (progress !== null && progress >= 0.75 && strong) auto = "care";
  else if (strong && daysToNext !== null && daysToNext <= 90) auto = "care";
  else if (progress !== null && progress < 0.3) auto = "buy";
  else if (progress === null && days < 180) auto = "buy"; // 首代：半年內視為剛更新
  else auto = "wait";

  const verdict = p.override?.verdict ?? auto;
  return {
    verdict,
    auto,
    overridden: !!p.override && p.override.verdict !== auto,
    days: days < 0 ? null : days,
    progress,
    daysToNext,
  };
}

export function pct(progress: number | null): number {
  if (progress === null) return 0;
  return Math.min(100, Math.round(progress * 100));
}
