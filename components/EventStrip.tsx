import Link from "next/link";
import { upcomingEvents } from "@/lib/events";
import { daysBetween } from "@/lib/verdict";
import { Icon } from "./Icons";

const WEEKDAY = ["日", "一", "二", "三", "四", "五", "六"];

function dateLabel(d: string) {
  const [, m, day] = d.split("-").map(Number);
  return `${m}/${day}（${WEEKDAY[new Date(`${d}T00:00:00Z`).getUTCDay()]}）`;
}

export function EventStrip({ today }: { today: string }) {
  const events = upcomingEvents(today);
  if (events.length === 0) return null;
  return (
    <section className="events" aria-label="即將到來的發表會">
      <div className="container">
        <div className="events-head"><Icon.radar size={20} /><span>即將到來的發表</span><span className="muted">日期為美國時間，台灣開賣通常更晚</span></div>
        <div className="events-list">
          {events.map((e) => {
            const left = daysBetween(today, e.date);
            return (
              <div className="event" key={e.date}>
                <div className="event-when">
                  <div className="mono event-date">{dateLabel(e.date)}</div>
                  <div className="event-left">{left === 0 ? "今天" : `還有 ${left} 天`}</div>
                </div>
                <div className="event-body">
                  <div className="event-title">
                    <span>{e.title}</span>
                    <span className={`event-tag ${e.confirmed ? "on" : ""}`}>{e.confirmed ? "官方確認" : "媒體報導"}</span>
                  </div>
                  <div className="muted event-note">{e.note} · 來源：<a className="nowrap" href={e.url} target="_blank" rel="noopener noreferrer">{e.source}</a></div>
                  <div className="event-products">
                    {e.products.map((p) => <Link key={p.slug} href={`/product/${p.slug}`} className="event-chip">{p.label}</Link>)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Link href="/updates" className="events-more">看所有最近消息<Icon.arrow size={16} /></Link>
      </div>
    </section>
  );
}
