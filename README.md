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
- `lib/verdict.ts` — 判定規則（企劃書 4.2）與天數計算；頁面每小時重算（ISR）。
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

## 維護約定

每次改動（功能、資料、部署方式）都同步更新本 README 的「結構」「部署」「更新紀錄」。
