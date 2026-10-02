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
- `components/Icons.tsx` — 內嵌 SVG 圖示與自繪產品剪影（不用官方圖片）。

價格、降幅、電信資費等尚未接資料的欄位以 `[ ]` 佔位。
