import { ogImage, OG_SIZE } from "@/lib/og";
import { todayISO } from "@/lib/verdict";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "買點：Apple 全系列購買時機";
export const revalidate = 86400;

export default function Image() {
  return ogImage({
    eyebrow: `${todayISO()} 更新`,
    title: "現在該買 iPhone、iPad、Mac 嗎？",
    sub: "依產品週期與下一代消息，每天替 Apple 全系列判定：可以買、觀望、小心、先別買。",
  });
}
