import Link from "next/link";
import { notFound } from "next/navigation";
import { Subscribe } from "@/components/Chrome";
import { Badge } from "@/components/Badge";
import { Icon } from "@/components/Icons";
import { CATEGORY_LABEL, getProduct, photoPage, photoUrl, PRODUCTS } from "@/lib/products";
import { announcedLine, compute, daysBetween, pct, pendingTW, todayISO, VERDICT_META } from "@/lib/verdict";

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
  };
}

const CHANNELS = ["Apple 官網", "momo", "PChome 24h", "蝦皮商城", "燦坤 / 全國電子"];
const CARRIERS = ["空機 ＋ 自選資費", "中華電信", "遠傳", "台灣大哥大"];

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
          <nav className="crumbs"><Link href="/">首頁</Link><span>/</span><Link href="/#all">{CATEGORY_LABEL[p.category]}</Link><span>/</span><span className="cur">{p.name}</span></nav>
          <div className="verdict-grid">
            <div className="verdict-main">
              <div className="verdict-row"><Badge v={c.verdict} size="lg" /><span className="mono muted">判定更新 {today} · {c.overridden ? "編輯覆寫" : "自動判定"}</span></div>
              <h1>{p.name}</h1>
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
              {photoUrl(p) && (
                <figure className="hero-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoUrl(p, 1200)!} alt={p.name} />
                  <figcaption>照片：<a href={photoPage(p)!} target="_blank" rel="noreferrer">{p.photo?.by ?? "Unsplash"}</a> / Unsplash</figcaption>
                </figure>
              )}
              <div className="side-stats">
                <div><div className="muted sm">台灣開賣</div><div className="mono stat">{p.releasedTW}</div></div>
                <div><div className="muted sm">已過天數</div><div className="mono stat">{c.days ?? "—"}</div></div>
                <div><div className="muted sm">下一代預期</div><div className="mono stat">{p.next.expected?.slice(0, 7) ?? "未定"}</div></div>
              </div>
              <div className="meter">
                <div className="meter-label"><span>週期進度</span><span className="mono">{pct(c.progress)}% / {p.avgDays ?? "首代"} 天</span></div>
                <div className="track"><div className="fill" style={{ width: `${pct(c.progress)}%`, background: meta.color }} /></div>
                <div className="meter-scale"><span>可以買 ‹30%</span><span>觀望</span><span>小心 ›75%</span></div>
              </div>
              <div className="side-prices">
                <div><span className="muted">官網價（起）</span><span className="mono">[NT$ 官網價]</span></div>
                <div><span className="muted">通路最低</span><span className="mono" style={{ color: "#1A6B43" }}>[NT$ 最低價] · [通路]</span></div>
              </div>
              <a href="#price" className="btn btn-primary btn-block"><Icon.tag />看台灣通路最低價</a>
              <a href="#carrier" className="btn btn-outline btn-block"><Icon.phone />比較三大電信方案</a>
            </aside>
          </div>
        </div>
      </section>

      <div className="container stack">
        <section id="cycle">
          <h2 className="h-icon"><Icon.refresh size={24} />產品週期</h2>
          <div className="muted">歷代更新間隔（天），以台灣開賣日計算</div>
          <div className="panel bars">
            {intervals.map((x) => (
              <div className="bar-row" key={x.to}><div className="muted">{x.from} → {x.to}</div><div className="track track-lg"><div className="fill" style={{ width: `${Math.round((x.days / maxDays) * 100)}%`, background: "#8E8E89" }} /></div><div className="mono r">{x.days}</div></div>
            ))}
            <div className="bar-row bold"><div>{p.name} → 現在</div><div className="track track-lg"><div className="fill" style={{ width: `${Math.round(((c.days ?? 0) / maxDays) * 100)}%`, background: meta.color }} /></div><div className="mono r" style={{ color: meta.color }}>{c.days ?? "—"}</div></div>
            {p.avgDays && <div className="panel-foot">歷代平均 {p.avgDays} 天（以美國首發日計算，避免台灣延後上市造成失真）</div>}
          </div>
        </section>

        <section id="next">
          <h2 className="h-icon"><Icon.radar size={24} />下一代：{p.next.name}</h2>
          <div className="muted">{p.next.expected ? `預期 ${p.next.expected.slice(0, 7)}` : "時間未定"} · 訊號依可信度分級，點開看原文</div>
          <div className="panel table">
            <div className="tr th"><div>等級</div><div>訊號</div><div>來源</div><div>日期</div></div>
            {p.signals.length === 0 && <div className="tr"><div><span className="grade-box dim">—</span></div><div className="muted">[尚無 B／C 級傳聞 — 編輯審核後自動加入此處]</div><div className="muted">—</div><div className="mono muted">—</div></div>}
            {p.signals.map((s, i) => (
              <div className="tr" key={i}><div><span className={`grade-box g-${s.grade}`}>{s.grade}</span></div><div>{s.text}</div><div className="muted">{s.source}</div><div className="mono muted">{s.date}</div></div>
            ))}
            <div className="tr ncc"><div><span className="grade-box dashed"><Icon.shield size={18} /></span></div><div><strong>NCC 認證監看中</strong> — 每日爬取 Apple Inc. 新型號；出現即列為 A 級並推播。</div><div className="muted">NCC 型式認證</div><div className="mono muted">每日</div></div>
          </div>
        </section>

        <section id="price">
          <h2 className="h-icon"><Icon.tag size={24} />台灣價格</h2>
          <div className="muted">官網價、各通路最低價與歷代降價曲線 · 每日更新，附時間戳</div>
          <div className="two">
            <div className="panel table t3">
              <div className="tr th"><div>通路</div><div>價格</div><div>回饋／分期</div></div>
              {CHANNELS.map((ch) => <div className="tr" key={ch}><div className="b">{ch}</div><div className="mono">[NT$ —]</div><div className="muted">[回饋]</div></div>)}
              <div className="panel-foot row"><span>更新 {today}</span><a href="#price">查看歷史價格 →</a></div>
            </div>
            <div className="panel">
              <div className="b">歷代降價曲線</div>
              <div className="muted sm">上市後各時點通路平均降幅（依歷代資料計算）</div>
              <div className="bars">
                {[["1 個月", 8], ["3 個月", 22], ["6 個月", 40], ["12 個月", 64]].map(([l, w]) => (
                  <div className="bar-row s" key={l as string}><div className="muted">{l}</div><div className="track"><div className="fill" style={{ width: `${w}%`, background: "#1F4FA6" }} /></div><div className="mono r">[X%]</div></div>
                ))}
              </div>
              <div className="panel-foot">示意長條，正式版由 prices 資料表自動計算。</div>
            </div>
          </div>
        </section>

        {p.category === "iphone" && (
          <section id="carrier">
            <h2 className="h-icon"><Icon.sim size={24} />電信方案 vs 空機</h2>
            <div className="muted">實付總額 ＝ 專案價 ＋ 月租 × 合約期數，與「空機 ＋ 自選資費」並列</div>
            <div className="panel table t5">
              <div className="tr th"><div>方案</div><div>專案價</div><div>月租</div><div>期數</div><div>實付總額</div></div>
              {CARRIERS.map((cr) => <div className="tr" key={cr}><div className="b">{cr}</div><div className="mono">[價格]</div><div className="mono">[月租]</div><div className="mono">30</div><div className="mono b">[總額]</div></div>)}
            </div>
          </section>
        )}

        <section className="two">
          <div>
            <h2 className="h-icon"><Icon.sliders size={24} />該買哪個規格</h2>
            <div className="panel advice">{p.specAdvice.map((a) => <div key={a.label}><span className="b">{a.label}</span><span>{a.text}</span></div>)}</div>
          </div>
          <div>
            <h2 className="h-icon"><Icon.history size={24} />判定紀錄</h2>
            <div className="panel table t3log">
              <div className="tr"><div className="mono muted">{today}</div><div><Badge v={c.verdict} /></div><div className="muted">{c.overridden ? "編輯覆寫，理由見上方。" : "每日自動判定。"}</div></div>
              <div className="tr"><div className="mono muted">{p.releasedTW}</div><div><Badge v="buy" /></div><div className="muted">台灣開賣，自動判定。</div></div>
            </div>
          </div>
        </section>
      </div>

      <Subscribe title={`${p.name} 判定改變或降價時通知我`} sub="只追蹤這一條產品線，不會收到其他通知。" />
    </>
  );
}
