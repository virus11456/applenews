import Link from "next/link";
import { CATEGORY_LABEL, type Product } from "@/lib/products";
import { announcedLine, compute, monthsBetween, overdueDays, pct, pctLabel, pendingTW, VERDICT_META } from "@/lib/verdict";
import { Badge } from "./Badge";
import { DeviceIcon, Icon } from "./Icons";
import { Name } from "./Name";

const CAT_ICON = { iphone: Icon.phone, ipad: Icon.tablet, mac: Icon.laptop, wear: Icon.watch, home: Icon.home };

export function ProductCard({ p, today }: { p: Product; today: string }) {
  const c = compute(p, today);
  const meta = VERDICT_META[c.verdict];
  const CatIcon = CAT_ICON[p.category];
  const pending = pendingTW(p, today);
  // 徽章旁寫給讀者看的一句理由：「可以買／觀望」用簡短的判定說明；
  // 「小心／先別買／即將開賣」用該產品的一句話結論（summary）說明原因。
  // 不寫「尚無訊號」「編輯覆寫」這類容易誤會的字。
  const hasSignal = p.next.grade === "A" || p.next.grade === "B";
  // 第一代（沒有歷代平均）也用 summary：「週期中段」這類說法對第一代不成立
  const status = c.verdict === "care" || c.verdict === "no" || c.verdict === "soon" || c.progress === null ? p.summary : meta.status;

  return (
    <article className="card" data-cat={p.category}>
      <div className="card-art"><DeviceIcon kind={p.icon} size={76} /></div>
      <div className="card-head">
        <span className="chip"><CatIcon size={14} />{CATEGORY_LABEL[p.category]}</span>
        <h3><Name text={p.name} /></h3>
        <div className="card-status">
          <Badge v={c.verdict} />
          {p.twAvailable ? <span className="muted">{status}</span> : <span className="warn"><Icon.info size={14} />台灣尚未販售</span>}
        </div>
        {pending && <div className="announced"><Icon.info size={14} /><span><strong>新款已發表：</strong>{announcedLine(pending)}</span></div>}
      </div>
      <div className="tiles">
        <div className="tile">
          <div className="tile-label"><Icon.clock size={14} />更新多久了</div>
          <div className="tile-value">{c.days === null ? "未開賣" : <>{c.days}<span> 天</span></>}</div>
        </div>
        <div className="tile">
          <div className="tile-label"><Icon.refresh size={14} />平均更新間隔</div>
          <div className="tile-value">{p.avgDays ?? "首代"}{p.avgDays && <span> 天</span>}</div>
        </div>
      </div>
      {c.days !== null && <div className="meter">
        <div className="meter-label"><span>週期進度</span><span className="mono">{c.progress === null ? "首代" : `${pctLabel(c.progress)}%`}</span></div>
        <div className="track"><div className="fill" style={{ width: `${pct(c.progress)}%`, background: meta.color }} /></div>
        {c.progress === null && <div className="meter-note muted">只有一代，無法計算週期</div>}
        {overdueDays(c.days, p.avgDays) !== null && <div className="meter-note" style={{ color: meta.color }}>已超過平均週期 {overdueDays(c.days, p.avgDays)} 天</div>}
      </div>}
      <dl className="facts">
        <dt>{c.days === null ? "預計開賣" : "本代上市"}</dt><dd className="mono">{p.releasedTW}</dd>
        {p.prev && (<>
          <dt><Icon.back size={14} />上一代</dt>
          <dd><Name text={p.prev.name} /> · <span className="mono">{p.prev.date.slice(0, 7)}</span> · 相隔 {monthsBetween(p.prev.date, p.releasedTW)} 個月</dd>
        </>)}
        {p.next.expected ? (<><dt>下一代預期</dt><dd><span className="mono">{p.next.expected.slice(0, 7)}</span> · <Name text={p.next.name} /></dd></>)
          : hasSignal ? (<><dt>下一代預期</dt><dd>{p.next.note}</dd></>) : null}
      </dl>
      <Link href={`/product/${p.slug}`} className="card-link">查看判定與台灣價格<Icon.arrow size={16} /></Link>
    </article>
  );
}
