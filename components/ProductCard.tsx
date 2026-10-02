import Link from "next/link";
import { CATEGORY_LABEL, type Product } from "@/lib/products";
import { compute, monthsBetween, pct, VERDICT_META } from "@/lib/verdict";
import { Badge } from "./Badge";
import { DeviceIcon, Icon } from "./Icons";

const CAT_ICON = { iphone: Icon.phone, ipad: Icon.tablet, mac: Icon.laptop, wear: Icon.watch, home: Icon.home };

export function ProductCard({ p, today }: { p: Product; today: string }) {
  const c = compute(p, today);
  const meta = VERDICT_META[c.verdict];
  const CatIcon = CAT_ICON[p.category];
  const status = c.overridden ? `編輯覆寫 · ${p.override!.reason.slice(0, 18)}…` : p.next.note && c.verdict !== "wait" ? p.next.note : meta.status;

  return (
    <article className="card">
      <div className="card-art"><DeviceIcon kind={p.icon} /></div>
      <div className="card-head">
        <span className="chip"><CatIcon size={14} />{CATEGORY_LABEL[p.category]}</span>
        <h3>{p.name}</h3>
        <div className="card-status">
          <Badge v={c.verdict} />
          {p.twAvailable ? <span className="muted">{status}</span> : <span className="warn"><Icon.info size={14} />台灣尚未販售</span>}
        </div>
      </div>
      <div className="tiles">
        <div className="tile">
          <div className="tile-label"><Icon.clock size={14} />更新多久了</div>
          <div className="tile-value">{c.days ?? "—"}<span> 天</span></div>
        </div>
        <div className="tile">
          <div className="tile-label"><Icon.refresh size={14} />平均更新間隔</div>
          <div className="tile-value">{p.avgDays ?? "首代"}{p.avgDays && <span> 天</span>}</div>
        </div>
      </div>
      <div className="meter">
        <div className="meter-label"><span>週期進度</span><span className="mono">{pct(c.progress)}%</span></div>
        <div className="track"><div className="fill" style={{ width: `${pct(c.progress)}%`, background: meta.color }} /></div>
      </div>
      <dl className="facts">
        <dt>本代上市</dt><dd className="mono">{p.releasedTW}</dd>
        {p.prev && (<>
          <dt><Icon.back size={14} />上一代</dt>
          <dd>{p.prev.name} · <span className="mono">{p.prev.date.slice(0, 7)}</span> · 相隔 {monthsBetween(p.prev.date, p.releasedTW)} 個月</dd>
        </>)}
        <dt>下一代預期</dt><dd>{p.next.expected ? `${p.next.expected.slice(0, 7)} · ${p.next.name}` : p.next.note}</dd>
      </dl>
      <Link href={`/product/${p.slug}`} className="card-link">查看判定與台灣價格<Icon.arrow size={16} /></Link>
    </article>
  );
}
