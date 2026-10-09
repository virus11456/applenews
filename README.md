# 買點 — Apple 全系列購買時機資訊站

替台灣消費者回答「現在買這台 Apple 產品，划不划算？」。每個系列只看最新一代，依
「台灣開賣至今天數 ÷ 歷代平均更新天數」加上下一代訊號自動判定，可由編輯覆寫並公開理由。

## 開發

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## 結構

- 分類與產品線一律照 Apple 台灣官網（apple.com/tw）的頂部導覽與各分類頁的產品導覽列，順序也一致：
  - Mac：MacBook Neo、MacBook Air、MacBook Pro、iMac、Mac mini、Mac Studio、Studio Display、Studio Display XDR
  - iPad：iPad Pro、iPad Air、iPad、iPad mini
  - iPhone：iPhone Duo、iPhone 18 Pro／Pro Max、iPhone Air、iPhone 17、iPhone 17e
  - Watch：Series 12、Ultra 4、SE 3（Nike、Hermès 為款式，不另列）
  - Vision：Apple Vision Pro
  - AirPods：AirPods 5、AirPods Pro 3、AirPods Max 2
  - TV 和家庭：Apple TV 4K、HomePod、HomePod mini
  - 配件：AirTag
  官網增減產品時，`PRODUCTS` 的項目與順序要跟著改。
  - `priceTW`：Apple 台灣官網一般售價（非教育價），包含 `from` 起價、`config` 起價規格、`variants` 主要版本、`url` 官網購買頁、`checked` 查價日。價格取自官網購買頁內嵌的商品資料（curl 抓 HTML，搜尋 `"prices"` 或 `NT$`），不用媒體或通路價。官網調價時要同步更新。
  - **每個系列只列最新一代**：Apple 仍在販售的舊款（例如 iPhone 16）不列；新一代在台灣開賣後，就取代原本那一條。
- `lib/products.ts` — 產品資料（上市日、歷代平均、上一代、下一代訊號、覆寫）。改這裡就會改判定。
  - `releasedTW`／`history` 填台灣開賣日，也就是台灣第一天能正式購買的日期，預購不算。因 NCC 延後上市的 Mac／iPad，以台灣官網開放訂購日為準。不可填美國日期。
  - `avgDays` 一律用美國首發日計算。台灣常延後上市，用台灣日期會讓週期失真。
  - `next.expected` 必須是 `YYYY-MM-DD` 或 `null`；只有推估月份時，填該月中旬並在 `note` 註明「推估」。
  - 訊號 `signals` 必須附真實可查的來源與報導日期。
  - `summary` 會顯示在「小心／先別買／即將開賣」卡片的徽章旁，要寫成一般讀者看得懂的一句話，不要寫內部用語。
  - **新款已發表、台灣尚未開賣**時，一定要填 `announced`，包含 `name`、全球發表日 `date`、`twRelease`（未公布填 `null`）、`source`、`url`。填了之後判定自動變成「即將開賣」，卡片和產品頁上方會顯示「新款已發表：○○ 已於 MM/DD 發表 · 台灣尚未發售」，讓訪客知道已經有新款。台灣開賣後，把新款移進 `releasedTW`／`prev`／`history`，並刪掉 `announced`。
- `lib/verdict.ts` — 判定規則（企劃書 4.2）與天數計算；頁面每小時重算（ISR）。`pendingTW()` 判斷有沒有已發表、台灣尚未開賣的新款。
- `app/page.tsx` — 首頁：全系列最新一代卡片，可依分類切換。
- `components/Name.tsx` — 產品名稱排版：括號內（如「（M5 Pro／Max）」）不在字中間斷行；只在括號前或「／」後換行。顯示產品名稱的地方一律用 `<Name text={…} />`。
- `components/CategoryNav.tsx` — 分類切換（client component）：頂部選單與首頁分類列都連到 `/?cat=<分類>`，首頁只顯示該分類的卡片（`.grid[data-filter]` 以 CSS 隱藏其他分類）。分類鍵沿用 `CATEGORY_LABEL`：iphone／ipad／mac／wear／home；不帶 `cat` 即為全部。
- `app/sitemap.ts`、`app/robots.ts` — 網站地圖與 robots（網址一律 `https://applenews.me`）。
- `app/opengraph-image.tsx`、`app/product/[slug]/opengraph-image.tsx`、`lib/og.tsx` — 分享預覽圖（1200×630）：產品頁含剪影、判定徽章與一句結論；中文字型從 Google Fonts 只抓用到的字。
- `app/updates/page.tsx` — 「最近消息」頁：彙整所有產品線的 signals，依日期新到舊排列，同一則消息影響多條產品線時合併顯示；首頁發表倒數與頁尾有連結。
- `lib/events.ts` — 即將到來的 Apple 發表會（日期、官方確認或媒體報導、來源、相關產品線）；過了日期自動從首頁消失。每日檢查時一併維護。
- `components/EventStrip.tsx` — 首頁「即將到來的發表」倒數區塊，連到相關產品頁。
- `app/product/[slug]/page.tsx` — 產品頁：判定、週期、Apple 台灣官網價（連到官網購買頁）、下一代訊號、規格建議、歷代上市時間。
- `components/Icons.tsx` — 內嵌 SVG 圖示、`CATEGORY_ICON`（分類圖示）與自繪產品剪影（首頁卡片與產品頁的產品圖）。
- 產品圖：一律用 `components/Icons.tsx` 的 `DeviceIcon` 自繪線條剪影（`lib/products.ts` 每筆的 `icon`），全站統一風格。不用照片，也不用 Apple 官方產品照或 logo。新增產品線時，若沒有合適的剪影，就在 `DeviceIcon` 新增一個 kind。

台灣價格只放 Apple 台灣官網售價（`priceTW`）；通路價、降價曲線、電信方案不做。規格建議等尚未接資料的欄位以 `[ ]` 佔位。

## 部署

- Vercel 專案：`applenews-site`（team `virus11456s-projects`），已連上 GitHub `virus11456/applenews`（production branch `main`），push `main` 即自動部署，不需手動觸發。
- 正式網址：`https://applenews.me`；`www.applenews.me` 308 轉址到 apex；`applenews-five.vercel.app`、`applenews-site.vercel.app` 也指向同一專案。
- GitHub repo：`https://github.com/virus11456/applenews`（`main` 分支）。
- 舊專案 `applenews`（未接 Git、需手動部署）已於 2026-10-08 刪除，網域全部移到 `applenews-site`。

## 更新紀錄

- 2026-10-03：初版上線。首頁 12 條產品線（每系列最新一代）判定卡、產品頁、判定規則、SVG 圖示；首次部署到 Vercel。

- 2026-10-03：每張卡與產品頁首屏加入 Unsplash 照片（12 張），頁尾與產品頁標註出處。

- 2026-10-03：照片改走 `images.unsplash.com` CDN（原 `/download` 網址被機器人驗證擋，訪客看不到圖）；Studio Display 原圖其實是舊款 iMac，換成 Amanz 的 Studio Display 照（`l7JJMyHBKBU`）；12 張攝影師全部補齊並校正（AirTag 為 Onur Binay）。repo 推上 GitHub，並經 Vercel API 從 GitHub `main` 部署到 Production（`dpl_7Y2vQ51K8ECKobhbv3va4t8z8P5d`）。

- 2026-10-02：Vision Pro 改為台灣已販售。依 Apple 台灣新聞稿校正日期：M5 版 2025-11-28、第一代 2024-12-17（原本誤填美國日期）。歷代平均改用全球節奏 628 天，判定由「台灣尚未販售」變為「觀望」。

- 2026-10-02：全面查證 12 項產品（依據 Apple 台灣新聞稿與台灣、國際科技媒體）。
  - 多筆 `releasedTW`／`history` 原本誤用美國日期或預購日，已改為台灣開賣日。
  - `avgDays` 統一改用美國首發日重算。
  - 名稱補上晶片或代別，例如 iPad Air（M4）、MacBook Air（M5）、MacBook Pro（M5 Pro／Max）、Mac mini（M6／M5 Pro）。MacBook Pro 歷代補上 M5 基本款。
  - 下一代訊號修正：iPad Air M5、MacBook Air M6、MacBook Pro M6 基本款、Vision Pro 開發縮減、HomePod 不在 10/13 發表、Apple TV 訊號日期改為 9/30。
  - 刪除無來源的降價推論，以及已結束的 BTS 優惠說法。

- 2026-10-02：新增「新款已發表、台灣尚未發售」標示（`announced` 欄位）。卡片與產品頁顯示新款名稱、發表日與台灣狀態，判定自動改為「即將開賣」。週期圖註明平均天數以美國首發日計算。截至今天，12 條產品線都沒有已發表但台灣未開賣的新款。

- 2026-10-03：移除全部 Unsplash 照片，因為各張風格不一致。首頁卡片與產品頁改用統一的自繪剪影，頁尾改為註明「產品圖為本站自繪示意圖」。另新增 AirPods Pro、Watch Ultra、HomePod mini、Mac Studio、XDR 顯示器的剪影，供之後新增產品線使用。

- 2026-10-03：新增分類切換。頂部選單（iPhone／iPad／Mac／穿戴／居家與配件）與首頁產品列表上方的分類列都可以點選，點了之後只顯示該分類，選中的項目會反白。網址為 `/?cat=mac` 這類形式，可直接分享。手機版分類列可橫向捲動，選中的項目會自動捲到畫面內。

- 2026-10-03：新增 5 條產品線，共 17 條。資料皆經查證並附來源。
  - AirPods Pro 3（台灣 2025-10-31）
  - Apple Watch Ultra 4（2026-09-18）
  - Mac Studio（M5 Max／M5 Ultra，2026-09-22）
  - Studio Display XDR（2026-03-20，上一代為 Pro Display XDR）
  - HomePod mini（第一代 2020-11-16，傳 10/13 出第 2 代）

- 2026-10-03：確定產品圖全面改用自繪剪影（先前誤解為改回照片，`73feb5d` 已再還原）。17 條產品線都使用 `DeviceIcon`，新增的 5 條各有專屬剪影：mac-studio、watch-ultra、airpods-pro、display-xdr、homepod-mini。

- 2026-10-03：手機（iPhone 375／390）、iPad（直 820／橫 1180）、電腦（1440）排版全面檢查並修正，所有頁面都沒有橫向溢出。
  - 產品名稱不再在括號中間斷行（新增 `Name` 元件）。
  - 產品頁日期不再拆成兩行。
  - 卡片狀態說明在窄卡片時改到徽章下方。
  - 分類列改為自動換行，不再需要橫向滑動。
  - 多行標題的圖示對齊第一行。
  - 「產品週期」的標籤在 900px 以下改到長條上方。
  - 標題使用 `halt` 收窄全形標點。
- 2026-10-03：新建 Vercel 專案 `applenews-site` 並連上 GitHub，push `main` 即自動部署。

- 2026-10-03：卡片文字改成白話，避免誤會。
  - 徽章旁的說明：「可以買／觀望」顯示判定理由，例如「剛更新，離下一代最遠」；「小心／先別買／即將開賣」顯示該產品的一句話結論 `summary`。
  - 不再顯示「尚無訊號」「編輯覆寫」這類字。
  - 「下一代預期」沒有可靠消息時整行不顯示。

- 2026-10-03：週期進度數字改為照實顯示，可以超過 100%，例如 Apple TV 為 149%；進度條最多畫滿。超過平均時加註「已超過平均週期 N 天」。首代產品（如 HomePod mini）不再顯示 0%，改為「首代」，並註明無法計算週期。程式見 `lib/verdict.ts` 的 `pct`（進度條寬度）、`pctLabel`（顯示數字）、`overdueDays`。

- 2026-10-03：iPhone 拆成 5 條產品線，共 21 條。
  - iPhone 17（數字版，台灣 2025-09-19）：判定「小心」。iPhone 18 據 Bloomberg 報導延到 2027 年上半年。
  - iPhone 18 Pro、iPhone 18 Pro Max（台灣 2026-09-18）。
  - iPhone Air（第一代，2025-09-19）：Air 2 傳 2027 年上半年推出。
  - iPhone Duo：首款折疊 iPhone，9/9 發表，台灣首波，10/16 晚上 8 點預購、10/23 開賣，用 `announced` 標示。
  - 新增剪影：phone-max、phone-air、phone-fold。
  - 尚未開賣的產品，卡片改顯示「未開賣」「預計開賣」，不顯示週期進度。第一代產品的徽章說明改用 `summary`。

- 2026-10-03：分類與產品線改為完全照 Apple 台灣官網，共 8 類 29 條。
  - 8 類：Mac、iPad、iPhone、Watch、Vision、AirPods、TV 和家庭、配件。
  - 新增 9 條，皆附台灣與美國歷代日期查證：MacBook Neo、iMac（M4）、iPad Pro（M5）、iPad（A16）、iPad mini（A17 Pro）、iPhone 17e、iPhone 16、Apple Watch SE 3、AirPods Max 2。
  - iPhone 18 Pro 與 Pro Max 依官網合併為一條。
  - 卡片新增「歷代上市」時間軸：每一代的上市年月與間隔月數，原本的「上一代」併入其中。
  - 頂部選單改為 1240px 以上才顯示，較窄時用分類列切換。

- 2026-10-03：移除標題括號的負邊距。iPhone Safari 會用 `halt` 把全形括號縮窄，再加上負邊距會讓括號蓋住前一個字，例如顯示成「iPad Ai(M4)」。

- 2026-10-03：每個系列只列最新一代，移除仍在販售的舊款 iPhone 16，現在共 28 條。逐條檢查其餘產品線，皆為各自系列的最新一代。

- 2026-10-03：台灣價格改為只列 Apple 台灣官網售價。
  - 28 條產品線全部填入起價與主要版本價格，2026-10-03 直接取自官網購買頁。
  - 卡片顯示「官網價 NT$… 起」；產品頁顯示起價、主要版本，以及「到 Apple 台灣官網購買」按鈕。
  - 拿掉通路價格表、降價曲線、電信方案這三個佔位區塊。
  - 備註：Vision Pro 官網現價為 NT$129,900 起（256GB），高於發表時的 NT$119,900。

- 2026-10-04：每日檢查。官網 28 條產品線的清單與價格都沒有變動。MacBook Pro 新增 Bloomberg 10/1 訊號：OLED 觸控螢幕高階款（M5 Pro／Max，14、16 吋）最快 10 月、可能 11 月推出；結論改為「不管買哪一款都建議先等等」。

- 2026-10-09：新增「最近消息」頁（/updates），彙整所有產品線的下一代消息與來源，並加入 sitemap。
- 2026-10-09：Google 搜尋與分享：新增 sitemap.xml、robots.txt、每頁 canonical 網址；新增分享預覽圖（貼到 LINE／FB 會顯示產品剪影、判定與結論）。
- 2026-10-09：首頁新增「即將到來的發表」倒數：10/13「Welcome home」（官方確認：Apple TV 4K、HomePod mini）、10/27 Mac 與 iPad mini（Bloomberg 報導：MacBook Pro、iMac、iPad mini）。
- 2026-10-09：移除尚未實作功能的宣稱：首頁與產品頁的訂閱／LINE 區塊、頁首「訂閱提醒」、產品頁「NCC 認證監看中」、假的「判定紀錄」（改成歷代上市時間表）、頁尾無作用連結；判定說明改為實際的每日檢查方式；無訊號時改顯示「目前沒有關於下一代的可靠消息」；頁尾價格說明改為以 Apple 台灣官網為準。
- 2026-10-09：每日檢查。官網產品線與 28 條價格都沒有變動。Apple 官方預告 10/13「Welcome home」家庭產品發表：Apple TV 4K、HomePod mini 新增 A 級訊號（HomePod mini 下一代升為 A 級）。Bloomberg 10/8 報導 OLED 觸控 MacBook Pro、M6 MacBook Pro、OLED iPad mini、M6 iMac 約 10/27 發表：三條預期日改為 2026-10-27 並改寫 summary／reasons。
- 2026-10-08：每日檢查，官網產品線、價格與新聞皆無變動。刪除舊 Vercel 專案 `applenews`，`applenews.me`、`www.applenews.me`（308 轉址）、`applenews-five.vercel.app` 移到 `applenews-site`，之後 push `main` 即自動上線。
- 2026-10-07：每日檢查。官網產品線與 28 條價格都沒有變動。HomePod mini 新增訊號（海外官網出貨拉長到 8 週、部分顏色缺貨）；Apple TV 4K 新增四顆 HomePod 環繞音效程式碼；MacBook Pro 新增 macOS 27.2 Dock 長按觸控動畫。
- 2026-10-06：每日檢查。官網產品線與 28 條價格都沒有變動。Apple TV 4K 新增 A 級訊號（tvOS 27.2 beta 3 出現 Apple Intelligence 設定）；MacBook Pro 新增 C 級訊號（macOS 27.2 beta 3 觸控手勢程式碼，也可能只是 Sidecar）。
- 2026-10-05：每日檢查。官網產品線與 28 條價格都沒有變動（Mac 頁導覽把兩款顯示器合併成「顯示器」入口，兩款仍在販售）。Apple TV 4K、HomePod mini 新增 Bloomberg 10/4 訊號：Apple 計畫 10/13 舉辦發表活動。

## 維護約定

每次改動（功能、資料、部署方式）都同步更新本 README 的「結構」「部署」「更新紀錄」。
