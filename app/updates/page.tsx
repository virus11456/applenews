import Link from "next/link";
import { Icon } from "@/components/Icons";
import { CATEGORY_LABEL, PRODUCTS } from "@/lib/products";

export const revalidate = 3600;

export const metadata = {
  title: "最近消息：Apple 新品傳聞與官方動態",
  description: "彙整 iPhone、iPad、Mac、Apple Watch、AirPods 等下一代的最新可靠消息，依日期排列並標示可信度與來源。",
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
  const list = [...merged.values()].sort((a, b) => b.date.localeCompare(a.date) || a.grade.localeCompare(b.grade));
  const byDate = new Map<string, typeof list>();
  for (const it of list) byDate.set(it.date, [...(byDate.get(it.date) ?? []), it]);

  return (
    <section className="section">
      <div className="container updates">
        <div className="section-head">
          <h1 className="h-icon"><Icon.radar size={26} /><span>最近消息</span></h1>
          <div className="muted">A 官方或實證 · B 高信譽報導 · C 單一來源傳聞</div>
        </div>
        {[...byDate.entries()].map(([date, its]) => {
          const [y, m, d] = date.split("-").map(Number);
          return (
            <div className="upd-day" key={date}>
              <div className="mono upd-date">{y}/{m}/{d}（{WEEKDAY[new Date(`${date}T00:00:00Z`).getUTCDay()]}）</div>
              <div className="panel upd-list">
                {its.map((it, i) => (
                  <div className="upd" key={i}>
                    <span className={`grade-box g-${it.grade}`}>{it.grade}</span>
                    <div className="upd-body">
                      <div>{it.text}</div>
                      <div className="upd-meta">
                        <span className="muted">{it.source}</span>
                        {it.ps.map((p) => <Link key={p.slug} href={`/product/${p.slug}`} className="event-chip">{CATEGORY_LABEL[p.category]} · {p.name.replace(/（.*?）/g, "")}</Link>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
