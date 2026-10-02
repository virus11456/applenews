export type Category = "iphone" | "ipad" | "mac" | "wear" | "home";
export type Verdict = "buy" | "wait" | "care" | "no" | "soon" | "disc";
export type Grade = "A" | "B" | "C";

export interface Signal {
  grade: Grade;
  text: string;
  source: string;
  date: string; // YYYY-MM-DD
}

export interface Product {
  slug: string;
  name: string;
  category: Category;
  icon: string; // key in components/Icons.tsx DEVICE_ICONS
  releasedTW: string; // 台灣開賣日 YYYY-MM-DD；未來日期 = 即將開賣
  avgDays: number | null; // 歷代平均更新天數；首代為 null
  prev: { name: string; date: string } | null; // 上一代
  next: { name: string; expected: string | null; grade: Grade | null; note: string }; // 下一代
  twAvailable: boolean;
  discontinued?: string; // 停產日
  override?: { verdict: Verdict; reason: string };
  summary: string; // 一句話結論
  reasons: string[];
  signals: Signal[];
  specAdvice: { label: string; text: string }[];
  history: { gen: string; date: string }[]; // 歷代台灣開賣日，新到舊
}

export const CATEGORY_LABEL: Record<Category, string> = {
  iphone: "iPhone",
  ipad: "iPad",
  mac: "Mac",
  wear: "穿戴",
  home: "居家與配件",
};

export const PRODUCTS: Product[] = [
  {
    slug: "iphone-18-pro",
    name: "iPhone 18 Pro",
    category: "iphone",
    icon: "phone",
    releasedTW: "2026-09-14",
    avgDays: 360,
    prev: { name: "iPhone 17 Pro", date: "2025-09-19" },
    next: { name: "iPhone 19 Pro", expected: "2027-09-15", grade: "A", note: "Pro 系列連續 10 代於 9 月發表" },
    twAvailable: true,
    summary: "剛於 9 月換代，距離下一代預期發表還有約 11 個月，是整個週期裡最划算的時間點。",
    reasons: [
      "台灣開賣至今天數遠低於「可以買」門檻的 30% 週期進度。",
      "Pro 系列歷代固定每年 9 月更新，平均間隔 360 天。",
      "通路首波到貨後價格尚未鬆動；若不急，開賣後 3 個月左右通常出現第一波降價。",
    ],
    signals: [
      { grade: "A", text: "歷代規律：Pro 系列連續 10 代於 9 月發表，下一代最可能為 2027 年 9 月。", source: "本站歷代紀錄", date: "2026-10-02" },
    ],
    specAdvice: [
      { label: "容量", text: "[編輯建議：依台灣售價級距與常見用途填入]" },
      { label: "Pro / Max", text: "[編輯建議：螢幕尺寸與電池差異]" },
      { label: "公司貨", text: "公司貨享台灣保固與 NCC 認證；水貨價差請與保固風險一併評估。" },
    ],
    history: [
      { gen: "iPhone 18 Pro", date: "2026-09-14" },
      { gen: "iPhone 17 Pro", date: "2025-09-19" },
      { gen: "iPhone 16 Pro", date: "2024-09-20" },
      { gen: "iPhone 15 Pro", date: "2023-09-22" },
      { gen: "iPhone 14 Pro", date: "2022-09-16" },
    ],
  },
  {
    slug: "ipad-air",
    name: "iPad Air",
    category: "ipad",
    icon: "tablet",
    releasedTW: "2026-03-06",
    avgDays: 578,
    prev: { name: "iPad Air（M3）", date: "2025-03-12" },
    next: { name: "iPad Air", expected: null, grade: null, note: "尚無明確訊號" },
    twAvailable: true,
    summary: "週期中段，目前沒有下一代訊號，有需要就買。",
    reasons: ["週期進度約三分之一。", "尚無任何等級的下一代訊號。"],
    signals: [],
    specAdvice: [
      { label: "尺寸", text: "[編輯建議：11 吋與 13 吋取捨]" },
      { label: "配件", text: "[編輯建議：Apple Pencil 與鍵盤相容]" },
    ],
    history: [
      { gen: "iPad Air（2026）", date: "2026-03-06" },
      { gen: "iPad Air（M3）", date: "2025-03-12" },
      { gen: "iPad Air（M2）", date: "2024-05-15" },
    ],
  },
  {
    slug: "macbook-air",
    name: "MacBook Air",
    category: "mac",
    icon: "laptop",
    releasedTW: "2026-03-06",
    avgDays: 363,
    prev: { name: "MacBook Air（M4）", date: "2025-03-12" },
    next: { name: "MacBook Air", expected: null, grade: null, note: "尚無明確訊號" },
    twAvailable: true,
    summary: "週期中段，教育優惠期間可優先考慮。",
    reasons: ["週期進度約六成，但尚無下一代訊號。", "Back to School 期間教育價另有贈品。"],
    signals: [],
    specAdvice: [
      { label: "記憶體", text: "[編輯建議：16GB 起跳是否足夠]" },
      { label: "教育價", text: "[編輯建議：教育商店價差]" },
    ],
    history: [
      { gen: "MacBook Air（2026）", date: "2026-03-06" },
      { gen: "MacBook Air（M4）", date: "2025-03-12" },
      { gen: "MacBook Air（M3）", date: "2024-03-08" },
    ],
  },
  {
    slug: "macbook-pro",
    name: "MacBook Pro",
    category: "mac",
    icon: "laptop-pro",
    releasedTW: "2026-03-06",
    avgDays: 384,
    prev: { name: "MacBook Pro（M4）", date: "2024-11-08" },
    next: { name: "MacBook Pro（M6）", expected: "2026-10-31", grade: "B", note: "M6 款傳聞 10 月" },
    twAvailable: true,
    summary: "M6 款傳聞 10 月推出，非急用建議等一下。",
    reasons: ["多方報導指向 10 月更新（B 級訊號）。", "若新款推出，現款通路價通常在 1 個月內鬆動。"],
    signals: [
      { grade: "B", text: "供應鏈與多家媒體交叉報導 M6 MacBook Pro 將於 10 月推出。", source: "Bloomberg／供應鏈", date: "2026-09-20" },
    ],
    specAdvice: [
      { label: "晶片", text: "[編輯建議：Pro / Max 選擇]" },
      { label: "尺寸", text: "[編輯建議：14 吋與 16 吋]" },
    ],
    history: [
      { gen: "MacBook Pro（2026）", date: "2026-03-06" },
      { gen: "MacBook Pro（M4）", date: "2024-11-08" },
      { gen: "MacBook Pro（M3）", date: "2023-11-07" },
    ],
  },
  {
    slug: "mac-mini",
    name: "Mac mini",
    category: "mac",
    icon: "mac-mini",
    releasedTW: "2026-08-27",
    avgDays: 722,
    prev: { name: "Mac mini（M4）", date: "2024-11-08" },
    next: { name: "Mac mini", expected: null, grade: null, note: "尚無訊號" },
    twAvailable: true,
    summary: "剛更新，離下一代最遠。",
    reasons: ["台灣開賣僅一個多月。", "Mac mini 平均兩年才更新一次。"],
    signals: [],
    specAdvice: [{ label: "記憶體", text: "[編輯建議：後續無法升級，一次買足]" }],
    history: [
      { gen: "Mac mini（2026）", date: "2026-08-27" },
      { gen: "Mac mini（M4）", date: "2024-11-08" },
      { gen: "Mac mini（M2）", date: "2023-01-24" },
    ],
  },
  {
    slug: "apple-watch",
    name: "Apple Watch Series 12",
    category: "wear",
    icon: "watch",
    releasedTW: "2026-09-11",
    avgDays: 364,
    prev: { name: "Apple Watch Series 11", date: "2025-09-19" },
    next: { name: "Apple Watch Series 13", expected: "2027-09-15", grade: "A", note: "每年 9 月更新" },
    twAvailable: true,
    summary: "剛更新，離下一代最遠。",
    reasons: ["Series 系列固定每年 9 月更新。", "剛開賣不到一個月。"],
    signals: [{ grade: "A", text: "歷代規律：每年 9 月與 iPhone 同場發表。", source: "本站歷代紀錄", date: "2026-10-02" }],
    specAdvice: [{ label: "行動網路版", text: "[編輯建議：電信 One Number 方案]" }],
    history: [
      { gen: "Series 12", date: "2026-09-11" },
      { gen: "Series 11", date: "2025-09-19" },
      { gen: "Series 10", date: "2024-09-20" },
    ],
  },
  {
    slug: "airpods",
    name: "AirPods 5",
    category: "wear",
    icon: "airpods",
    releasedTW: "2026-09-11",
    avgDays: 889,
    prev: { name: "AirPods 4", date: "2024-09-20" },
    next: { name: "AirPods 6", expected: null, grade: null, note: "尚無訊號" },
    twAvailable: true,
    summary: "剛更新，離下一代最遠。",
    reasons: ["標準版 AirPods 平均兩年多才更新。"],
    signals: [],
    specAdvice: [{ label: "版本", text: "[編輯建議：是否選主動降噪版]" }],
    history: [
      { gen: "AirPods 5", date: "2026-09-11" },
      { gen: "AirPods 4", date: "2024-09-20" },
      { gen: "AirPods 3", date: "2021-10-26" },
    ],
  },
  {
    slug: "vision-pro",
    name: "Vision Pro",
    category: "wear",
    icon: "vision",
    releasedTW: "2025-10-17",
    avgDays: 635,
    prev: { name: "Vision Pro（第一代）", date: "2024-02-02" },
    next: { name: "Vision Pro", expected: null, grade: null, note: "尚無明確訊號" },
    twAvailable: false,
    summary: "台灣尚未販售，週期中段，海外購買需留意保固與語言支援。",
    reasons: ["台灣無官方通路。", "週期進度約五成，尚無下一代訊號。"],
    signals: [],
    specAdvice: [{ label: "購買管道", text: "[編輯建議：日本／美國購買與保固注意]" }],
    history: [
      { gen: "Vision Pro（2025）", date: "2025-10-17" },
      { gen: "Vision Pro（第一代）", date: "2024-02-02" },
    ],
  },
  {
    slug: "studio-display",
    name: "Studio Display",
    category: "home",
    icon: "display",
    releasedTW: "2026-03-06",
    avgDays: 1152,
    prev: { name: "Studio Display（2022）", date: "2022-03-18" },
    next: { name: "Studio Display", expected: null, grade: null, note: "尚無訊號" },
    twAvailable: true,
    summary: "剛更新不久，顯示器更新週期長，可以買。",
    reasons: ["週期進度不到兩成。", "上一代相隔四年才更新。"],
    signals: [],
    specAdvice: [{ label: "玻璃", text: "[編輯建議：標準與奈米紋理玻璃]" }],
    history: [
      { gen: "Studio Display（2026）", date: "2026-03-06" },
      { gen: "Studio Display（2022）", date: "2022-03-18" },
    ],
  },
  {
    slug: "airtag",
    name: "AirTag 2",
    category: "home",
    icon: "airtag",
    releasedTW: "2026-01-28",
    avgDays: 1739,
    prev: { name: "AirTag（第一代）", date: "2021-04-30" },
    next: { name: "AirTag 3", expected: null, grade: null, note: "尚無訊號" },
    twAvailable: true,
    summary: "第二代剛推出，可以買。",
    reasons: ["上一代相隔近五年才更新。"],
    signals: [],
    specAdvice: [{ label: "組合", text: "[編輯建議：四入組價差]" }],
    history: [
      { gen: "AirTag 2", date: "2026-01-28" },
      { gen: "AirTag", date: "2021-04-30" },
    ],
  },
  {
    slug: "homepod",
    name: "HomePod",
    category: "home",
    icon: "homepod",
    releasedTW: "2023-01-20",
    avgDays: 1818,
    prev: { name: "HomePod（第一代）", date: "2018-02-09" },
    next: { name: "HomePod（第三代）", expected: null, grade: "B", note: "新款仍在計畫中" },
    twAvailable: true,
    override: { verdict: "care", reason: "週期進度接近 75%，且多方報導新款仍在開發中，雖無明確時間仍列為小心。" },
    summary: "接近週期尾聲，新款仍在計畫中，急用再買。",
    reasons: ["上市已超過三年半。", "多方報導新款仍在開發，但時間未定。"],
    signals: [{ grade: "B", text: "多方報導 Apple 仍在開發新款 HomePod，時間未定。", source: "Bloomberg", date: "2026-08-15" }],
    specAdvice: [{ label: "台灣功能", text: "[編輯建議：Siri 中文與服務可用性]" }],
    history: [
      { gen: "HomePod（第二代）", date: "2023-01-20" },
      { gen: "HomePod（第一代）", date: "2018-02-09" },
    ],
  },
  {
    slug: "apple-tv",
    name: "Apple TV",
    category: "home",
    icon: "appletv",
    releasedTW: "2022-10-20",
    avgDays: 738,
    prev: { name: "Apple TV 4K（2021）", date: "2021-05-21" },
    next: { name: "Apple TV（新款）", expected: "2026-10-13", grade: "A", note: "新款已在系統程式碼外洩" },
    twAvailable: true,
    summary: "新款已外洩、傳聞 10/13 發表，先別買。",
    reasons: ["新款型號已出現在系統程式碼（A 級訊號）。", "多方報導指向 10/13 與居家新品同場發表。"],
    signals: [
      { grade: "A", text: "新款 Apple TV 型號出現在系統程式碼。", source: "程式碼分析", date: "2026-09-25" },
      { grade: "B", text: "多方報導指向 10/13 發表。", source: "Bloomberg／9to5Mac", date: "2026-09-28" },
    ],
    specAdvice: [{ label: "容量", text: "[編輯建議：64GB 與 128GB 差異]" }],
    history: [
      { gen: "Apple TV 4K（2022）", date: "2022-10-20" },
      { gen: "Apple TV 4K（2021）", date: "2021-05-21" },
      { gen: "Apple TV 4K（2017）", date: "2017-09-22" },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
