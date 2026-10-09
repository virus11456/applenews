import { DeviceIcon } from "@/components/Icons";
import { ogImage, OG_SIZE } from "@/lib/og";
import { getProduct, PRODUCTS } from "@/lib/products";
import { compute, todayISO, VERDICT_META } from "@/lib/verdict";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "買點產品判定";
export const revalidate = 86400;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug)!;
  const today = todayISO();
  const m = VERDICT_META[compute(p, today).verdict];
  return ogImage({
    eyebrow: `${today} 判定`,
    title: `${p.name} 現在該買嗎？`,
    sub: p.summary,
    badge: { label: m.label, color: m.color },
    icon: <DeviceIcon kind={p.icon} size={170} />,
  });
}
