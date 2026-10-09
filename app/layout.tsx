import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "@/components/Chrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://applenews.me"),
  alternates: { canonical: "/" },
  openGraph: { siteName: "買點", locale: "zh_TW", type: "website" },
  twitter: { card: "summary_large_image" },
  title: { default: "買點｜Apple 全系列購買時機", template: "%s｜買點" },
  description: "現在買這台 Apple 產品划不划算？依產品週期、下一代訊號與台灣上市狀態，每天替 iPhone、iPad、Mac、Apple Watch、AirPods 判定「可以買／觀望／小心／先別買」。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
