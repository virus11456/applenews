import { Subscribe } from "@/components/Chrome";
import { Icon } from "@/components/Icons";
import { Badge } from "@/components/Badge";
import { CategoryGrid } from "@/components/CategoryNav";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, type Verdict } from "@/lib/products";
import { todayISO } from "@/lib/verdict";

export const revalidate = 3600; // 每小時重算天數與判定

const VERDICTS: Verdict[] = ["buy", "wait", "care", "no", "soon", "disc"];

export default function Home() {
  const today = todayISO();
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="mono eyebrow">{today} 更新 · 台灣</div>
          <h1>購買指南：現在該買 iPhone、iPad、Mac、AirPods 嗎？</h1>
          <p>每一條產品線只看最新一代。依「台灣開賣至今天數 ÷ 歷代平均更新天數」加上下一代訊號自動判定，再由編輯覆寫例外並公開理由。</p>
          <div className="legend">{VERDICTS.map((v) => <Badge key={v} v={v} />)}</div>
        </div>
      </section>

      <section id="all" className="section">
        <div className="container">
          <div className="section-head">
            <h2>全系列最新一代</h2>
            <div className="muted">每個系列只列最新一代 · 天數以台灣開賣日起算，每日自動重算</div>
          </div>
          <CategoryGrid>
            {PRODUCTS.map((p) => <ProductCard key={p.slug} p={p} today={today} />)}
          </CategoryGrid>
        </div>
      </section>

      <section id="how" className="section section-white">
        <div className="container how">
          <div>
            <h2 className="h-icon"><Icon.scale size={24} />我們怎麼判定</h2>
            <p>週期進度 ＝ 台灣開賣至今天數 ÷ 歷代平均更新天數。進度低於 30% 為「可以買」；超過 75% 且下一代有 B 級以上訊號為「小心」；A 級訊號且預期 60 天內推出為「先別買」。NCC 認證資料庫每日爬取，出現新型號即列為 A 級訊號。</p>
            <a href="#how" className="card-link">完整判定規則與訊號分級<Icon.arrow size={16} /></a>
          </div>
          <div className="grades">
            <div className="grade"><div className="mono grade-l">A</div><div className="grade-t">官方或實證</div><div className="muted">新聞稿、邀請函、程式碼、NCC／BSMI、通路到貨</div></div>
            <div className="grade"><div className="mono grade-l">B</div><div className="grade-t">高信譽報導</div><div className="muted">Bloomberg、供應鏈分析師、多方交叉報導</div></div>
            <div className="grade"><div className="mono grade-l">C</div><div className="grade-t">單一來源傳聞</div><div className="muted">單一爆料、未經證實的供應鏈消息</div></div>
          </div>
        </div>
      </section>

      <Subscribe title="判定一變，先通知你" sub="選擇你在意的產品線，判定變動或台灣通路降價時透過 Email 或 LINE 推播。" />
    </>
  );
}
