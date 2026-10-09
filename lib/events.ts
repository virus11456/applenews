// 即將到來的 Apple 發表會。日期一律用美國當地日期；過了日期會自動從首頁消失。
export type AppleEvent = {
  date: string; // YYYY-MM-DD
  title: string;
  confirmed: boolean; // true = Apple 官方宣布；false = 媒體報導
  note: string;
  source: string;
  url: string;
  products: { slug: string; label: string }[];
};

export const EVENTS: AppleEvent[] = [
  {
    date: "2026-10-13",
    title: "「Welcome home」家庭產品發表",
    confirmed: true,
    note: "線上發表，預期推出全新家庭中樞",
    source: "Apple（Greg Joswiak）",
    url: "https://www.macrumors.com/2026/10/08/apple-product-launch-october-13/",
    products: [
      { slug: "apple-tv", label: "Apple TV 4K" },
      { slug: "homepod-mini", label: "HomePod mini" },
    ],
  },
  {
    date: "2026-10-27",
    title: "Mac 與 iPad mini 發表",
    confirmed: false,
    note: "OLED 觸控 MacBook Pro、M6 MacBook Pro 與 iMac、OLED iPad mini",
    source: "Bloomberg",
    url: "https://www.macrumors.com/2026/10/08/apple-october-27-macbook-pro/",
    products: [
      { slug: "macbook-pro", label: "MacBook Pro" },
      { slug: "imac", label: "iMac" },
      { slug: "ipad-mini", label: "iPad mini" },
    ],
  },
];

export function upcomingEvents(today: string): AppleEvent[] {
  return EVENTS.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}
