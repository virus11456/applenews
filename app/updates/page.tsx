import Link from "next/link";
import { Icon } from "@/components/Icons";
import UpdatesFilterSync from "@/components/UpdatesFilterSync";
import { CATEGORY_LABEL, formatNT, PRODUCTS } from "@/lib/products";
import { deltaDir, deltaText, priceChanges } from "@/lib/price";

export const revalidate = 3600;

export const metadata = {
  title: "最近消息：Apple 新品傳聞、官方動態與台灣價格變化",
  description: "彙整 iPhone、iPad、Mac、Apple Watch、AirPods 等下一代的最新可靠消息與 Apple 台灣官網價格變化，依日期排列並標示可信度與來源。",
  alternates: { canonical: "/updates" },
};

const WEEKDAY = ["日", "一", "二", "三", "四", "五", "六"];

export default function UpdatesPage() {
  const items = PRODUCTS.flatMap((p) => p.signals.map((s) => ({ ...s, p })));
  // 同一則消息常同時影響多條產品線：合併成一則，列出所有相關產品
  const merged = new Map<string, { grade: string; text: string; source: string; date: string; ps: typeof PRODUCTS }>();
  for (const it of items) {
    const key = it.date + it.text;
    const m = merged.get(key);
    if (m) m.ps.push(it.p);
    else merged.set(key, { grade: it.grade, text: it.text, source: it.source, date: it.date, ps: [it.p] });
  }
  const signals = [...merged.values()];
  // 價格變化：只放有確切日期的漲跌（新一代或官網調價），範圍跟消息一樣從最早一則消息起算
  const since = signals.reduce((m, x) => (x.date < m ? x.date : m), "9999");
  const prices = PRODUCTS.flatMap((p) =>
    priceChanges(p)
      .filter((c) => c.delta !== null && !c.dateNote && c.date >= since)
      .map((c) => ({ date: c.date, c, p })),
  );
  type Row = { date: string; signal?: (typeof signals)[number]; price?: (typeof prices)[number] };
  const rows: Row[] = [...prices.map((x): Row => ({ date: x.date, price: x })), ...signals.map((x): Row => ({ date: x.date, signal: x }))].sort(
    (a, b) => b.date.localeCompare(a.date) || (a.price ? -1 : 1) - (b.price ? -1 : 1) || (a.signal?.grade ?? "").localeCompare(b.signal?.grade ?? ""),
  );
  const byDate = new Map<string, Row[]>();
  for (const r of rows) byDate.set(r.date, [...(byDate.get(r.date) ?? []), r]);

  return (
    <section className="section">
      <div className="container updates">
        <div className="section-head">
          <h1 className="h-icon"><Icon.radar size={26} /><span>最近消息</span></h1>
          <div className="muted">A 官方或實證 · B 高信譽報導 · C 單一來源傳聞 · 價 台灣官網價格變化</div>
        </div>
        {/* 篩選用 radio + CSS，頁面仍是靜態產生；UpdatesFilterSync 讓 #price／#news 網址直接開到對應篩選 */}
        <input type="radio" name="upd-f" id="f-all" className="upd-radio" defaultChecked />
        <input type="radio" name="upd-f" id="f-price" className="upd-radio" />
        <input type="radio" name="upd-f" id="f-news" className="upd-radio" />
        <UpdatesFilterSync />
        <div className="upd-filter" role="group" aria-label="篩選">
          <label htmlFor="f-all">全部 <span className="mono">{rows.length}</span></label>
          <label htmlFor="f-price">價格變化 <span className="mono">{prices.length}</span></label>
          <label htmlFor="f-news">消息 <span className="mono">{signals.length}</span></label>
        </div>
        {[...byDate.entries()].map(([date, its]) => {
          const [y, m, d] = date.split("-").map(Number);
          const kinds = `${its.some((r) => r.price) ? " has-price" : ""}${its.some((r) => r.signal) ? " has-news" : ""}`;
          return (
            <div className={`upd-day${kinds}`} key={date}>
              <div className="mono upd-date">{y}/{m}/{d}（{WEEKDAY[new Date(`${date}T00:00:00Z`).getUTCDay()]}）</div>
              <div className="panel upd-list">
                {its.map((r, i) => {
                  if (r.price) {
                    const { c, p } = r.price;
                    const was = c.vs?.price ?? c.price - (c.delta ?? 0);
                    return (
                      <div className="upd upd-price" key={i}>
                        <span className="grade-box g-price">價</span>
                        <div className="upd-body">
                          <div>
                            {p.name.replace(/（.*?）/g, "")} {c.kind === "adjust" ? "台灣官網調價" : "新一代台灣上市價"}：{formatNT(was)} → {formatNT(c.price)}{" "}
                            <span className={`pchg pchg-${deltaDir(c)} mono b`}>{deltaText(c)}</span>
                          </div>
                          <div className="upd-meta">
                            <span className="muted">{c.kind === "adjust" ? `原價 ${c.label}` : `${c.label}，比較：${c.vsLabel}`}</span>
                            {c.source ? <a className="muted" href={c.source} target="_blank" rel="noreferrer">Apple 台灣新聞稿</a> : <span className="muted">Apple 台灣官網</span>}
                            <Link href={`/product/${p.slug}`} className="event-chip">{CATEGORY_LABEL[p.category]} · {p.name.replace(/（.*?）/g, "")}</Link>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  const it = r.signal!;
                  return (
                    <div className="upd upd-news" key={i}>
                      <span className={`grade-box g-${it.grade}`}>{it.grade}</span>
                      <div className="upd-body">
                        <div>{it.text}</div>
                        <div className="upd-meta">
                          <span className="muted">{it.source}</span>
                          {it.ps.map((p) => <Link key={p.slug} href={`/product/${p.slug}`} className="event-chip">{CATEGORY_LABEL[p.category]} · {p.name.replace(/（.*?）/g, "")}</Link>)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
