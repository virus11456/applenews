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
    note: "線上發表，預期推出全新家庭中樞 HomeView；Bloomberg 報導新 Apple TV、HomePod mini 10/30 美國開賣",
    source: "Apple（Greg Joswiak）",
    url: "https://www.macrumors.com/2026/10/08/apple-product-launch-october-13/",
    products: [
      { slug: "apple-tv", label: "Apple TV 4K" },
      { slug: "homepod-mini", label: "HomePod mini" },
    ],
  },
  {
    date: "2026-10-28",
    title: "「Pro and Tell」Mac 與 iPad mini 發表",
    confirmed: true,
    note: "Apple 預告下週發表，媒體 10/28 受邀到洛杉磯體驗、無直播；預期有 OLED 觸控 MacBook Pro、M6 MacBook Pro 與 iMac、OLED iPad mini，新 Mac 可能 11/6 美國開賣",
    source: "Apple（Greg Joswiak）",
    url: "https://www.macrumors.com/2026/10/19/apple-pro-and-tell/",
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
