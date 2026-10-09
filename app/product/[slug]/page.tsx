import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { DeviceIcon, Icon } from "@/components/Icons";
import { Name } from "@/components/Name";
import { CATEGORY_LABEL, formatNT, getProduct, PRODUCTS } from "@/lib/products";
import { announcedLine, compute, daysBetween, overdueDays, pct, pctLabel, pendingTW, todayISO, VERDICT_META } from "@/lib/verdict";

export const revalidate = 3600;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) return {};
  const c = compute(p);
  return {
    title: `${p.name} 現在買划算嗎？${VERDICT_META[c.verdict].label}`,
    description: p.summary,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: { title: `${p.name} 現在該買嗎？${VERDICT_META[c.verdict].label}`, description: p.summary, url: `/product/${p.slug}` },
  };
}


export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const today = todayISO();
  const c = compute(p, today);
  const meta = VERDICT_META[c.verdict];
  const pending = pendingTW(p, today);
  const intervals = p.history.slice(0, -1).map((h, i) => ({ from: p.history[i + 1].gen, to: h.gen, days: daysBetween(p.history[i + 1].date, h.date) }));
  const maxDays = Math.max(...intervals.map((x) => x.days), c.days ?? 0, 1);

  return (
    <>
      <section className="hero">
        <div className="container">
          <nav className="crumbs"><Link href="/">首頁</Link><span>/</span><Link href={`/?cat=${p.category}#all`}>{CATEGORY_LABEL[p.category]}</Link><span>/</span><span className="cur"><Name text={p.name} /></span></nav>
          <div className="verdict-grid">
            <div className="verdict-main">
              <div className="verdict-row"><Badge v={c.verdict} size="lg" /><span className="mono muted">判定更新 {today} · {c.overridden ? "編輯覆寫" : "自動判定"}</span></div>
              <h1><Name text={p.name} /></h1>
              {pending && (
                <div className="announced lg">
                  <Icon.info size={18} />
                  <span><strong>新款已發表：</strong>{announcedLine(pending)}。以下為台灣目前販售的 {p.name} 資料。{pending.url ? <> 來源：<a href={pending.url} target="_blank" rel="noreferrer">{pending.source}</a></> : <> 來源：{pending.source}</>}</span>
                </div>
              )}
              <p className="lead">{today} 判定：<strong style={{ color: meta.color }}>{meta.label}</strong>。{p.summary}</p>
              <ol className="reasons">{p.reasons.map((r, i) => <li key={i}><span className="num" style={{ background: meta.color }}>{i + 1}</span><span>{r}</span></li>)}</ol>
              {c.overridden && <div className="override"><strong>覆寫理由：</strong>{p.override!.reason}（自動判定為「{VERDICT_META[c.auto].label}」）</div>}
            </div>
            <aside className="verdict-side">
              <div className="hero-art"><DeviceIcon kind={p.icon} size={112} /></div>
              <div className="side-stats">
                <div><div className="muted sm">台灣開賣</div><div className="mono stat">{p.releasedTW}</div></div>
                <div><div className="muted sm">已過天數</div><div className="mono stat">{c.days ?? "—"}</div></div>
                <div><div className="muted sm">下一代預期</div><div className="mono stat">{p.next.expected?.slice(0, 7) ?? "未定"}</div></div>
              </div>
              <div className="meter">
                <div className="meter-label"><span>週期進度</span><span className="mono">{c.progress === null ? "首代，無歷代平均" : `${pctLabel(c.progress)}% / ${p.avgDays} 天`}</span></div>
                <div className="track"><div className="fill" style={{ width: `${pct(c.progress)}%`, background: meta.color }} /></div>
                {overdueDays(c.days, p.avgDays) !== null && <div className="meter-note" style={{ color: meta.color }}>已超過平均週期 {overdueDays(c.days, p.avgDays)} 天</div>}
                <div className="meter-scale"><span>可以買 ‹30%</span><span>觀望</span><span>小心 ›75%</span></div>
              </div>
              {p.priceTW && (
                <div className="side-prices">
                  <div className="price-head"><span className="muted">Apple 台灣官網價</span><span className="muted sm">查價 {p.priceTW.checked}</span></div>
                  <div className="price-main"><span className="mono">{formatNT(p.priceTW.from)}</span> 起<span className="muted sm">（{p.priceTW.config}）</span></div>
                  {p.priceTW.variants?.map((v) => <div key={v.label}><span className="muted">{v.label}</span><span className="mono">{formatNT(v.price)}</span></div>)}
                </div>
              )}
              {p.priceTW && <a href={p.priceTW.url} target="_blank" rel="noreferrer" className="btn btn-primary btn-block"><Icon.tag />到 Apple 台灣官網購買</a>}
            </aside>
          </div>
        </div>
      </section>

      <div className="container stack">
        <section id="cycle">
          <h2 className="h-icon"><Icon.refresh size={24} /><span>產品週期</span></h2>
          <div className="muted">歷代更新間隔（天），以台灣開賣日計算</div>
          <div className="panel bars">
            {intervals.map((x) => (
              <div className="bar-row" key={x.to}><div className="muted"><Name text={x.from} /> → <Name text={x.to} /></div><div className="track track-lg"><div className="fill" style={{ width: `${Math.round((x.days / maxDays) * 100)}%`, background: "#8E8E89" }} /></div><div className="mono r">{x.days}</div></div>
            ))}
            <div className="bar-row bold"><div><Name text={p.name} /> → 現在</div><div className="track track-lg"><div className="fill" style={{ width: `${Math.round(((c.days ?? 0) / maxDays) * 100)}%`, background: meta.color }} /></div><div className="mono r" style={{ color: meta.color }}>{c.days ?? "—"}</div></div>
            {p.avgDays && <div className="panel-foot">歷代平均 {p.avgDays} 天（以美國首發日計算，避免台灣延後上市造成失真）</div>}
          </div>
        </section>

        <section id="next">
          <h2 className="h-icon"><Icon.radar size={24} /><span>下一代：<Name text={p.next.name} /></span></h2>
          <div className="muted">{p.next.expected ? `預期 ${p.next.expected.slice(0, 7)}` : "時間未定"} · 訊號依可信度分級，點開看原文</div>
          <div className="panel table">
            <div className="tr th"><div>等級</div><div>訊號</div><div>來源</div><div>日期</div></div>
            {p.signals.length === 0 && <div className="tr"><div><span className="grade-box dim">—</span></div><div className="muted">目前沒有關於下一代的可靠消息。</div><div className="muted">—</div><div className="mono muted">—</div></div>}
            {p.signals.map((s, i) => (
              <div className="tr" key={i}><div><span className={`grade-box g-${s.grade}`}>{s.grade}</span></div><div>{s.text}</div><div className="muted">{s.source}</div><div className="mono muted">{s.date}</div></div>
            ))}
          </div>
        </section>


        <section className="two">
          <div>
            <h2 className="h-icon"><Icon.sliders size={24} /><span>該買哪個規格</span></h2>
            <div className="panel advice">{p.specAdvice.map((a) => <div key={a.label}><span className="b">{a.label}</span><span>{a.text}</span></div>)}</div>
          </div>
          <div>
            <h2 className="h-icon"><Icon.history size={24} /><span>歷代上市時間</span></h2>
            <div className="panel table t2log">
              {p.history.map((h) => <div className="tr" key={h.gen + h.date}><div className="mono muted">{h.date}</div><div><Name text={h.gen} /></div></div>)}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
