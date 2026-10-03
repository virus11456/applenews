export type Category = "iphone" | "ipad" | "mac" | "wear" | "home";
export type Verdict = "buy" | "wait" | "care" | "no" | "soon" | "disc";
export type Grade = "A" | "B" | "C";

export interface Signal {
  grade: Grade;
  text: string;
  source: string;
  date: string; // YYYY-MM-DD
}

// 已發表、台灣尚未開賣的新款。台灣開賣後：移進 releasedTW／prev／history，並刪掉 announced。
export interface Announced {
  name: string; // 新款名稱
  date: string; // 全球發表日 YYYY-MM-DD
  twRelease: string | null; // 台灣開賣日；未公布 = null
  source: string; // 來源（如 Apple Newsroom）
  url?: string; // 來源連結
}

export interface Product {
  slug: string;
  name: string;
  category: Category;
  icon: string; // components/Icons.tsx DeviceIcon 的 kind（自繪剪影，全站統一風格，不用照片）
  releasedTW: string; // 台灣開賣日 YYYY-MM-DD：台灣第一天可正式購買（預購不算；NCC 延後的 Mac／iPad 以官網開放訂購日為準）；未來日期 = 即將開賣
  avgDays: number | null; // 歷代平均更新天數，一律以美國首發日計算（避免台灣延後上市造成失真）；首代為 null
  prev: { name: string; date: string } | null; // 上一代
  next: { name: string; expected: string | null; grade: Grade | null; note: string }; // 下一代
  announced?: Announced; // 新款已發表但台灣尚未開賣時填寫
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
    releasedTW: "2026-09-18",
    avgDays: 366,
    prev: { name: "iPhone 17 Pro", date: "2025-09-19" },
    next: { name: "iPhone 20 Pro（暫名）", expected: "2027-09-17", grade: "A", note: "依歷年規律推估 2027 年 9 月；傳聞跳過 19 直接命名 20，未經證實" },
    twAvailable: true,
    summary: "剛於 9 月換代，距離下一代預期發表還有約 11 個月，是整個週期裡最划算的時間點。",
    reasons: [
      "台灣 9/18 開賣，至今約兩週，遠低於「可以買」門檻的 30% 週期進度。",
      "Pro 系列自 13 Pro 起連續 6 代於 9 月發表，平均間隔約 366 天。",
    ],
    signals: [
      { grade: "A", text: "歷代規律：Pro 系列自 13 Pro 起連續 6 代於 9 月發表（12 Pro 因疫情延至 10 月），下一代最可能為 2027 年 9 月。", source: "本站歷代紀錄", date: "2026-10-02" },
      { grade: "B", text: "多方報導 2027 年機種可能跳號命名為 iPhone 20 Pro。", source: "MacRumors", date: "2026-09-21" },
    ],
    specAdvice: [
      { label: "容量", text: "[編輯建議：依台灣售價級距與常見用途填入]" },
      { label: "Pro / Max", text: "[編輯建議：螢幕尺寸與電池差異]" },
      { label: "公司貨", text: "公司貨享台灣保固與 NCC 認證；水貨價差請與保固風險一併評估。" },
    ],
    history: [
      { gen: "iPhone 18 Pro", date: "2026-09-18" },
      { gen: "iPhone 17 Pro", date: "2025-09-19" },
      { gen: "iPhone 16 Pro", date: "2024-09-20" },
      { gen: "iPhone 15 Pro", date: "2023-09-22" },
      { gen: "iPhone 14 Pro", date: "2022-09-16" },
    ],
  },
  {
    slug: "ipad-air",
    name: "iPad Air（M4）",
    category: "ipad",
    icon: "tablet",
    releasedTW: "2026-03-24",
    avgDays: 332,
    prev: { name: "iPad Air（M3）", date: "2025-04-11" },
    next: { name: "iPad Air（M5）", expected: "2027-03-15", grade: "B", note: "Bloomberg 報導 2027 年春季推出、可能改 OLED；日期為推估，台灣通常晚 2–4 週" },
    twAvailable: true,
    summary: "週期過半，M5 版傳聞 2027 年春季推出；不急可等，有需要就買。",
    reasons: ["台灣 3/24 開賣，週期進度約六成。", "Bloomberg 報導下一代搭載 M5、2027 年春季推出（B 級訊號）。"],
    signals: [
      { grade: "B", text: "Bloomberg 報導下一代 iPad Air 搭載 M5，預計 2027 年春季推出，可能改用 OLED。", source: "Bloomberg／AppleInsider", date: "2026-07-16" },
    ],
    specAdvice: [
      { label: "尺寸", text: "[編輯建議：11 吋與 13 吋取捨]" },
      { label: "配件", text: "[編輯建議：Apple Pencil 與鍵盤相容]" },
    ],
    history: [
      { gen: "iPad Air（M4）", date: "2026-03-24" },
      { gen: "iPad Air（M3）", date: "2025-04-11" },
      { gen: "iPad Air（M2）", date: "2024-06-13" },
    ],
  },
  {
    slug: "macbook-air",
    name: "MacBook Air（M5）",
    category: "mac",
    icon: "laptop",
    releasedTW: "2026-04-13",
    avgDays: 366,
    prev: { name: "MacBook Air（M4）", date: "2025-04-14" },
    next: { name: "MacBook Air（M6）", expected: "2027-03-15", grade: "B", note: "多家媒體報導 2027 年初推出、外觀不變；日期為推估，台灣近年晚約 1 個月" },
    twAvailable: true,
    summary: "週期中段，M6 版傳聞 2027 年初推出，有需要就買。",
    reasons: ["台灣 4/13 開賣，週期進度約五成。", "Back to School 2026 已於 9/24 結束，目前只剩常態教育價。"],
    signals: [
      { grade: "B", text: "M6 MacBook Air 預計 2027 年初推出，外觀不變；OLED 版傳聞 2028 年。", source: "9to5Mac／MacRumors", date: "2026-09-30" },
    ],
    specAdvice: [
      { label: "記憶體", text: "[編輯建議：16GB 起跳是否足夠]" },
      { label: "教育價", text: "[編輯建議：教育商店價差]" },
    ],
    history: [
      { gen: "MacBook Air（M5）", date: "2026-04-13" },
      { gen: "MacBook Air（M4）", date: "2025-04-14" },
      { gen: "MacBook Air（M3）", date: "2024-04-11" },
    ],
  },
  {
    slug: "macbook-pro",
    name: "MacBook Pro（M5 Pro／Max）",
    category: "mac",
    icon: "laptop-pro",
    releasedTW: "2026-04-13",
    avgDays: 285,
    prev: { name: "MacBook Pro（M5）", date: "2025-11-20" },
    next: { name: "MacBook Pro（M6，14 吋基本款）", expected: "2026-10-31", grade: "B", note: "Bloomberg 報導 10 月～11 月初推出（美國）；只更新基本款，M5 Pro／Max 不在此波；台灣可能晚 1 個月以上" },
    twAvailable: true,
    summary: "M6 基本款傳聞 10 月推出；要買 14 吋基本款建議等一下，M5 Pro／Max 不受影響。",
    reasons: ["Bloomberg 報導 M6 基本款預計 10 月推出（B 級訊號）。", "台灣過去幾代都因 NCC 電檢比美國晚 1 個月以上開賣。"],
    signals: [
      { grade: "B", text: "Bloomberg（Gurman）報導 M6 版 14 吋 MacBook Pro 基本款預計 10 月推出，M6 不會有 Pro／Max 版。", source: "Bloomberg／MacRumors", date: "2026-08-25" },
      { grade: "B", text: "M6 MacBook Pro 預計秋季、可能 10 月或 11 月初推出。", source: "9to5Mac", date: "2026-09-30" },
    ],
    specAdvice: [
      { label: "晶片", text: "[編輯建議：Pro / Max 選擇]" },
      { label: "尺寸", text: "[編輯建議：14 吋與 16 吋]" },
    ],
    history: [
      { gen: "MacBook Pro（M5 Pro／Max）", date: "2026-04-13" },
      { gen: "MacBook Pro（M5）", date: "2025-11-20" },
      { gen: "MacBook Pro（M4）", date: "2024-12-05" },
      { gen: "MacBook Pro（M3）", date: "2023-12-05" },
    ],
  },
  {
    slug: "mac-mini",
    name: "Mac mini（M6／M5 Pro）",
    category: "mac",
    icon: "mac-mini",
    releasedTW: "2026-09-22",
    avgDays: 668,
    prev: { name: "Mac mini（M4）", date: "2024-12-05" },
    next: { name: "Mac mini", expected: null, grade: null, note: "尚無訊號" },
    twAvailable: true,
    summary: "剛更新，離下一代最遠。",
    reasons: ["台灣 9/22 開賣，至今不到兩週。", "Mac mini 平均約 22 個月更新一次。"],
    signals: [],
    specAdvice: [{ label: "記憶體", text: "[編輯建議：後續無法升級，一次買足]" }],
    history: [
      { gen: "Mac mini（M6／M5 Pro）", date: "2026-09-22" },
      { gen: "Mac mini（M4）", date: "2024-12-05" },
      { gen: "Mac mini（M2）", date: "2023-03-14" },
    ],
  },
  {
    slug: "apple-watch",
    name: "Apple Watch Series 12",
    category: "wear",
    icon: "watch",
    releasedTW: "2026-09-18",
    avgDays: 364,
    prev: { name: "Apple Watch Series 11", date: "2025-09-19" },
    next: { name: "Apple Watch Series 13", expected: "2027-09-17", grade: "A", note: "依歷年規律每年 9 月更新，尚無具體報導" },
    twAvailable: true,
    summary: "剛更新，離下一代最遠。",
    reasons: ["Series 系列近年固定每年 9 月更新。", "台灣 9/18 開賣，至今約兩週。"],
    signals: [{ grade: "A", text: "歷代規律：近年固定 9 月發表、9 月中下旬開賣，多與 iPhone 同場。", source: "本站歷代紀錄", date: "2026-10-02" }],
    specAdvice: [{ label: "行動網路版", text: "[編輯建議：電信 One Number 方案]" }],
    history: [
      { gen: "Series 12", date: "2026-09-18" },
      { gen: "Series 11", date: "2025-09-19" },
      { gen: "Series 10", date: "2024-09-20" },
    ],
  },
  {
    slug: "airpods",
    name: "AirPods 5",
    category: "wear",
    icon: "airpods",
    releasedTW: "2026-09-18",
    avgDays: 894,
    prev: { name: "AirPods 4", date: "2024-11-12" },
    next: { name: "AirPods 6", expected: null, grade: null, note: "尚無訊號" },
    twAvailable: true,
    summary: "剛更新，離下一代最遠。",
    reasons: ["台灣 9/18 開賣，至今約兩週。", "標準版 AirPods 平均兩年多才更新。"],
    signals: [],
    specAdvice: [{ label: "版本", text: "[編輯建議：是否選主動降噪版]" }],
    history: [
      { gen: "AirPods 5", date: "2026-09-18" },
      { gen: "AirPods 4", date: "2024-11-12" },
      { gen: "AirPods（第 3 代）", date: "2021-12-20" },
    ],
  },
  {
    slug: "vision-pro",
    name: "Vision Pro（M5）",
    category: "wear",
    icon: "vision",
    releasedTW: "2025-11-28",
    avgDays: 628,
    prev: { name: "Vision Pro（第一代）", date: "2024-12-17" },
    next: { name: "新一代 Vision Pro", expected: null, grade: "C", note: "據報開發處於維生狀態，最快 2028 年底才可能推出" },
    twAvailable: true,
    summary: "台灣已開賣，週期中段；下一代前景不明，有需要就買。",
    reasons: ["M5 版 2025-11-28 在台灣開賣。", "週期進度約五成；據報下一代開發已大幅縮減，短期內不會有新款。"],
    signals: [
      { grade: "C", text: "Bloomberg 報導 Apple 評估四種改版 Vision Pro 概念，最快 2028 年底推出，但開發處於維生狀態、不保證推出。", source: "Bloomberg／MacRumors", date: "2026-09-28" },
      { grade: "B", text: "平價版 Vision Air 已於 2025 年喊停，Vision 團隊 2026 年 8 月裁員。", source: "MacRumors", date: "2026-08-21" },
    ],
    specAdvice: [{ label: "購買前", text: "[編輯建議：直營店預約試戴、視力矯正鏡片]" }],
    history: [
      { gen: "Vision Pro（M5）", date: "2025-11-28" },
      { gen: "Vision Pro（第一代）", date: "2024-12-17" },
    ],
  },
  {
    slug: "studio-display",
    name: "Studio Display（2026）",
    category: "home",
    icon: "display",
    releasedTW: "2026-03-20",
    avgDays: 1454,
    prev: { name: "Studio Display（2022）", date: "2022-04-18" },
    next: { name: "Studio Display", expected: null, grade: null, note: "尚無訊號" },
    twAvailable: true,
    summary: "剛更新不久，顯示器更新週期長，可以買。",
    reasons: ["週期進度不到兩成。", "上一代相隔約四年才更新。"],
    signals: [],
    specAdvice: [{ label: "玻璃", text: "[編輯建議：標準與奈米紋理玻璃]" }],
    history: [
      { gen: "Studio Display（2026）", date: "2026-03-20" },
      { gen: "Studio Display（2022）", date: "2022-04-18" },
    ],
  },
  {
    slug: "airtag",
    name: "AirTag（第 2 代）",
    category: "home",
    icon: "airtag",
    releasedTW: "2026-01-26",
    avgDays: 1734,
    prev: { name: "AirTag（第一代）", date: "2021-05-24" },
    next: { name: "AirTag（第 3 代）", expected: null, grade: null, note: "尚無訊號" },
    twAvailable: true,
    summary: "第二代剛推出，可以買。",
    reasons: ["上一代相隔近五年才更新。"],
    signals: [],
    specAdvice: [{ label: "組合", text: "[編輯建議：四入組價差]" }],
    history: [
      { gen: "AirTag（第 2 代）", date: "2026-01-26" },
      { gen: "AirTag（第一代）", date: "2021-05-24" },
    ],
  },
  {
    slug: "homepod",
    name: "HomePod（第 2 代）",
    category: "home",
    icon: "homepod",
    releasedTW: "2023-03-21",
    avgDays: 1820,
    prev: { name: "HomePod（第一代）", date: "2019-08-23" },
    next: { name: "HomePod（第 3 代）", expected: null, grade: "B", note: "新款仍在計畫中，Bloomberg 稱不在 10/13 發表名單" },
    twAvailable: true,
    override: { verdict: "care", reason: "週期進度約七成，且多方報導新款仍在開發中，雖無明確時間仍列為小心。" },
    summary: "接近週期尾聲，新款仍在計畫中，急用再買。",
    reasons: ["上市已超過三年半。", "Bloomberg 報導新款仍在開發，但不在 10/13 發表、時間未定。"],
    signals: [
      { grade: "B", text: "Bloomberg 報導 Apple 仍在開發新款 HomePod（新晶片支援 Siri AI），時間未定。", source: "Bloomberg／9to5Mac", date: "2026-08-15" },
      { grade: "B", text: "Bloomberg：全尺寸 HomePod 不在 10/13 發表名單，Apple 仍打算日後更新。", source: "Bloomberg／9to5Mac", date: "2026-09-30" },
    ],
    specAdvice: [{ label: "台灣功能", text: "[編輯建議：Siri 中文與服務可用性]" }],
    history: [
      { gen: "HomePod（第 2 代）", date: "2023-03-21" },
      { gen: "HomePod（第一代）", date: "2019-08-23" },
    ],
  },
  {
    slug: "apple-tv",
    name: "Apple TV 4K（第 3 代）",
    category: "home",
    icon: "appletv",
    releasedTW: "2022-12-07",
    avgDays: 934,
    prev: { name: "Apple TV 4K（第 2 代）", date: "2021-06-10" },
    next: { name: "Apple TV 4K（第 4 代）", expected: "2026-10-13", grade: "A", note: "新款已在 Apple 程式碼外洩；10/13 為 Bloomberg 報導的預期發表日，未經官方確認" },
    twAvailable: true,
    summary: "新款已外洩、傳聞 10/13 發表，先別買。",
    reasons: ["「Apple TV 4K（第 4 代）」已出現在 Apple 程式碼（A 級訊號）。", "Bloomberg 報導 10/13 與 HomePod mini、家庭中樞同場發表。"],
    signals: [
      { grade: "A", text: "「Apple TV 4K（第 4 代）」圖檔出現在 Apple 程式碼，型號 AppleTV18,1 已於 9/8 被發現。", source: "MacRumors（程式碼分析）", date: "2026-09-25" },
      { grade: "B", text: "Bloomberg 報導新款 Apple TV 將於 10/13 與 HomePod mini、家庭中樞同場發表。", source: "Bloomberg／9to5Mac", date: "2026-09-30" },
    ],
    specAdvice: [{ label: "容量", text: "[編輯建議：64GB 與 128GB 差異]" }],
    history: [
      { gen: "Apple TV 4K（第 3 代）", date: "2022-12-07" },
      { gen: "Apple TV 4K（第 2 代）", date: "2021-06-10" },
      { gen: "Apple TV 4K（第 1 代）", date: "2017-09-22" }, // 美國日期，台灣開賣日查無
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
