import { formatNT, type PricePoint, type Product } from "./products";
import { daysBetween } from "./verdict";

export type PriceChange = PricePoint & {
  delta: number | null; // 金額差，null = 不比較（開始記錄或基準改變）
  pct: number | null; // 百分比，保留一位小數
  vsLabel: string | null; // 比較對象說明
};

const KIND_LABEL: Record<PricePoint["kind"], string> = {
  start: "開始記錄",
  adjust: "官網調價",
  newgen: "新一代",
  basis: "比較基準改變",
};

export const priceKindLabel = (k: PricePoint["kind"]) => KIND_LABEL[k];

/** 依時間由舊到新，算出每一筆相對前一筆（或指定 vs）的漲跌。 */
export function priceChanges(p: Product): PriceChange[] {
  const h = p.priceHistory ?? [];
  return h.map((pt, i) => {
    if (pt.kind === "start" || pt.kind === "basis" || (i === 0 && !pt.vs)) return { ...pt, delta: null, pct: null, vsLabel: null };
    const base = pt.vs ?? { price: h[i - 1].price, label: pt.kind === "newgen" ? `上一代 ${h[i - 1].label}` : `原價 ${h[i - 1].label}` };
    const delta = pt.price - base.price;
    return { ...pt, delta, pct: Math.round((delta / base.price) * 1000) / 10, vsLabel: base.label };
  });
}

/** 最近一次有漲跌的變化（today 往前 days 天內），供卡片顯示。 */
export function recentChange(p: Product, today: string, days = 60): PriceChange | null {
  // 日期不明的調價（dateNote）不算「最近」，避免卡片誤標成某天調價
  const c = priceChanges(p).filter((x) => x.delta !== null && !x.dateNote);
  const last = c[c.length - 1];
  return last && daysBetween(last.date, today) <= days ? last : null;
}

/** 「+NT$1,000（+4.4%）」；沒變動時回傳「價格不變」。 */
export function deltaText(c: PriceChange): string {
  if (c.delta === null || c.pct === null) return "";
  if (c.delta === 0) return "價格不變（0%）";
  const sign = c.delta > 0 ? "+" : "−";
  return `${sign}${formatNT(Math.abs(c.delta))}（${sign}${Math.abs(c.pct).toFixed(1)}%）`;
}

export const deltaDir = (c: PriceChange) => (c.delta === null ? "none" : c.delta > 0 ? "up" : c.delta < 0 ? "down" : "flat");
