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
    title: "「Pro and Tell」新 Mac 發表",
    confirmed: true,
    note: "媒體 10/28 在洛杉磯體驗、無直播；預期發表 OLED 觸控 MacBook Pro（iPad mini、M6 MacBook Pro 與 M6 iMac 已於 10/26–27 先發表，11/6 開賣）",
    source: "Apple（Greg Joswiak）",
    url: "https://www.macrumors.com/2026/10/19/apple-pro-and-tell/",
    products: [
      { slug: "macbook-pro", label: "MacBook Pro" },
    ],
  },
];

export function upcomingEvents(today: string): AppleEvent[] {
  return EVENTS.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}
