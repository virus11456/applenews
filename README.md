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

- `lib/products.ts` — 產品資料（上市日、歷代平均、上一代、下一代訊號、覆寫）。改這裡就會改判定。
  - `releasedTW`／`history` 填台灣開賣日，也就是台灣第一天能正式購買的日期，預購不算。因 NCC 延後上市的 Mac／iPad，以台灣官網開放訂購日為準。不可填美國日期。
  - `avgDays` 一律用美國首發日計算。台灣常延後上市，用台灣日期會讓週期失真。
  - `next.expected` 必須是 `YYYY-MM-DD` 或 `null`；只有推估月份時，填該月中旬並在 `note` 註明「推估」。
  - 訊號 `signals` 必須附真實可查的來源與報導日期。
  - **新款已發表、台灣尚未開賣**時，一定要填 `announced`，包含 `name`、全球發表日 `date`、`twRelease`（未公布填 `null`）、`source`、`url`。填了之後判定自動變成「即將開賣」，卡片和產品頁上方會顯示「新款已發表：○○ 已於 MM/DD 發表 · 台灣尚未發售」，讓訪客知道已經有新款。台灣開賣後，把新款移進 `releasedTW`／`prev`／`history`，並刪掉 `announced`。
- `lib/verdict.ts` — 判定規則（企劃書 4.2）與天數計算；頁面每小時重算（ISR）。`pendingTW()` 判斷有沒有已發表、台灣尚未開賣的新款。
- `app/page.tsx` — 首頁：全系列最新一代卡片。
- `app/product/[slug]/page.tsx` — 產品頁：判定、週期、下一代訊號、台灣價格、電信、規格建議、判定紀錄。
- `components/Icons.tsx` — 內嵌 SVG 圖示與自繪產品剪影（照片缺席時的備援）。
- 產品照片：`lib/products.ts` 每筆的 `photo`（Unsplash 免費圖庫，可商用，不用 Apple 官方產品照或 logo）：
  - `unsplashId`：照片頁 id，`photoPage()` 組出 `unsplash.com/photos/<id>` 作為出處連結。
  - `src`：CDN 路徑 `photo-<數字>-<hash>`，`photoUrl()` 組出 `images.unsplash.com/<src>?w=…&q=80&auto=format&fit=crop`。
    不可改回 `unsplash.com/photos/<id>/download`，那個網址會被 Unsplash 的機器人驗證擋下，`<img>` 載不到。
  - `by`：攝影師，顯示在產品頁 figcaption。
  - 換照片時三個欄位要一起改；`src` 可從照片頁的圖片網址或 `unsplash.com/napi/photos/<id>` 的 `urls.raw` 取得。

價格、降幅、電信資費等尚未接資料的欄位以 `[ ]` 佔位。

## 部署

- Vercel 專案：`applenews`（team `virus11456s-projects`），Production 網址 `https://applenews-five.vercel.app`（別名 `applenews-virus11456s-projects.vercel.app`）
- GitHub repo：`https://github.com/virus11456/applenews`（`main` 分支，已 push）。
- 目前部署方式：push `main` 到 GitHub 後，以 Vercel API（MCP `create_deployment`，`gitSource` = `virus11456/applenews@main`，`target: production`）手動觸發，從 GitHub 拉原始碼建置。
- Vercel 專案尚未連上 Git，所以 push 不會自動部署。要改成自動部署，需在 Vercel 後台 Settings → Git 連 `virus11456/applenews`，或在本機執行 `vercel link` + `vercel git connect`；MCP 沒辦法替既有專案接 Git。

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

## 維護約定

每次改動（功能、資料、部署方式）都同步更新本 README 的「結構」「部署」「更新紀錄」。
