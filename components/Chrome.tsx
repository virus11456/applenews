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
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <div className="footer-note">本站為獨立資訊站，與 Apple Inc. 無關。Apple、iPhone、iPad、Mac 等為 Apple Inc. 之商標。傳聞內容皆為改寫摘要並附原文連結；價格以 Apple 台灣官網為準。產品圖為本站自繪示意圖，非官方圖片。</div>
        <div className="footer-links"><Link href="/updates">最近消息</Link><Link href="/#how">判定方式</Link></div>
      </div>
    </footer>
  );
}
