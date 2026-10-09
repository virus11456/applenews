import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

// 只抓這張圖用到的字，減少字型大小；抓不到就退回預設字型，不讓整頁壞掉。
async function loadFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@900&text=${encodeURIComponent(text)}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export async function ogImage(opts: { eyebrow: string; title: string; sub: string; badge?: { label: string; color: string }; icon?: React.ReactNode }) {
  const text = opts.eyebrow + opts.title + opts.sub + (opts.badge?.label ?? "") + "買點applenews.me";
  const font = await loadFont(text);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#F6F6F3", padding: "64px 72px", fontFamily: "NotoTC", color: "#141413" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 900, letterSpacing: 4 }}>買點</div>
          <div style={{ display: "flex", fontSize: 26, color: "#5C5C5C" }}>{opts.eyebrow}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
          {opts.icon && <div style={{ display: "flex", width: 220, height: 220, borderRadius: 32, background: "#FFFFFF", border: "2px solid #E2E2DE", alignItems: "center", justifyContent: "center", color: "#141413" }}>{opts.icon}</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
            <div style={{ display: "flex", fontSize: opts.title.length > 16 ? 56 : 68, fontWeight: 900, lineHeight: 1.2 }}>{opts.title}</div>
            {opts.badge && <div style={{ display: "flex" }}><div style={{ display: "flex", fontSize: 40, fontWeight: 900, color: "#FFFFFF", background: opts.badge.color, padding: "10px 28px", borderRadius: 14 }}>{opts.badge.label}</div></div>}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 40 }}>
          <div style={{ display: "flex", fontSize: 28, color: "#3D3D3B", lineHeight: 1.5, maxWidth: 900 }}>{opts.sub}</div>
          <div style={{ display: "flex", fontSize: 24, color: "#5C5C5C" }}>applenews.me</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: font ? [{ name: "NotoTC", data: font, weight: 900, style: "normal" }] : [] },
  );
}
