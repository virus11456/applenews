import Link from "next/link";
import { HeaderCategoryLinks } from "./CategoryNav";
import { Icon } from "./Icons";

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-row">
        <Link href="/" className="logo"><Icon.logo />買點</Link>
        <nav className="nav">
          <HeaderCategoryLinks />
          <Link href="/#how" className="nav-muted"><Icon.help />判定方式</Link>
        </nav>
        <Link href="/#alerts" className="btn btn-primary"><Icon.bell />訂閱提醒</Link>
      </div>
    </header>
  );
}

export function Subscribe({ title, sub }: { title: string; sub: string }) {
  return (
    <section id="alerts" className="subscribe">
      <div className="container subscribe-row">
        <div>
          <div className="subscribe-title"><Icon.bell size={26} />{title}</div>
          <div className="subscribe-sub">{sub}</div>
        </div>
        <form className="subscribe-form" action="#" method="post">
          <label htmlFor="email" className="sr-only">Email</label>
          <input id="email" name="email" type="email" placeholder="你的 Email" />
          <button type="submit" className="btn btn-light"><Icon.mail />訂閱</button>
          <a href="#alerts" className="btn btn-outline-light"><Icon.chat />加入 LINE</a>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <div className="footer-note">本站為獨立資訊站，與 Apple Inc. 無關。Apple、iPhone、iPad、Mac 等為 Apple Inc. 之商標。傳聞內容皆為改寫摘要並附原文連結；價格以各通路當日頁面為準。產品圖為本站自繪示意圖，非官方圖片。</div>
        <div className="footer-links"><Link href="/#how">判定方式</Link><Link href="/#how">資料來源</Link><Link href="/#how">聯絡我們</Link></div>
      </div>
    </footer>
  );
}
