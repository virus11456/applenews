import type { Verdict } from "@/lib/products";

type P = { size?: number; className?: string };

function I({ size = 18, children, sw = 2 }: P & { children: React.ReactNode; sw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export const Icon = {
  logo: ({ size = 24 }: P) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#1F4FA6" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.5" fill="#1F4FA6" />
      <path d="M12 1v4M12 19v4M1 12h4M19 12h4" stroke="#1F4FA6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  phone: (p: P) => <I {...p}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></I>,
  tablet: (p: P) => <I {...p}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M11 18h2" /></I>,
  vision: (p: P) => <I {...p}><rect x="2" y="8" width="20" height="9" rx="4.5" /><path d="M10 16.5c.8 1 3.2 1 4 0" /></I>,
  airpods: (p: P) => <I {...p}><path d="M6 4a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3V20" /><path d="M18 4a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3V20" /></I>,
  tv: (p: P) => <I {...p}><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 21h8M12 17v4" /></I>,
  accessory: (p: P) => <I {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></I>,
  laptop: (p: P) => <I {...p}><rect x="4" y="5" width="16" height="11" rx="1.5" /><path d="M2 19h20" /></I>,
  watch: (p: P) => <I {...p}><rect x="7" y="7" width="10" height="10" rx="2.5" /><path d="M9 7V3h6v4M9 17v4h6v-4" /></I>,
  home: (p: P) => <I {...p}><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /></I>,
  help: (p: P) => <I {...p}><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.5" /><path d="M12 17h.01" /></I>,
  bell: (p: P) => <I {...p}><path d="M6 9a6 6 0 0 1 12 0v5l2 3H4l2-3V9z" /><path d="M10 20a2 2 0 0 0 4 0" /></I>,
  mail: (p: P) => <I {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></I>,
  chat: (p: P) => <I {...p}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.2A8 8 0 1 1 21 12z" /></I>,
  arrow: (p: P) => <I {...p} sw={2.2}><path d="M5 12h14M13 6l6 6-6 6" /></I>,
  clock: (p: P) => <I {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></I>,
  refresh: (p: P) => <I {...p}><path d="M20 12a8 8 0 1 1-2.3-5.7" /><path d="M20 4v5h-5" /></I>,
  back: (p: P) => <I {...p}><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></I>,
  radar: (p: P) => <I {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="M12 3v9l6 6" /></I>,
  tag: (p: P) => <I {...p}><path d="M3 12V4h8l9 9-8 8-9-9z" /><circle cx="7.5" cy="8.5" r="1.5" /></I>,
  sim: (p: P) => <I {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></I>,
  sliders: (p: P) => <I {...p}><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></I>,
  columns: (p: P) => <I {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M12 4v16" /></I>,
  history: (p: P) => <I {...p}><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /><path d="M12 8v4l3 2" /></I>,
  news: (p: P) => <I {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 8h6M7 12h10M7 16h10" /></I>,
  shield: (p: P) => <I {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z" /><path d="m9 12 2 2 4-4" /></I>,
  scale: (p: P) => <I {...p}><path d="M12 3v18" /><path d="M5 7h14" /><path d="m5 7-3 7a3 3 0 0 0 6 0L5 7zM19 7l-3 7a3 3 0 0 0 6 0l-3-7z" /></I>,
  info: (p: P) => <I {...p} sw={2.2}><circle cx="12" cy="12" r="9" /><path d="M12 8v5" /><path d="M12 16h.01" /></I>,
};

export function VerdictIcon({ v, size = 16 }: { v: Verdict; size?: number }) {
  const p = { size, sw: 2.2 };
  switch (v) {
    case "buy": return <I {...p}><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.5 2.5 4.5-5" /></I>;
    case "wait": return <I {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></I>;
    case "care": return <I {...p}><path d="M12 3 2.5 20h19L12 3z" /><path d="M12 10v4" /><path d="M12 17h.01" /></I>;
    case "no": return <I {...p}><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6M15 9l-6 6" /></I>;
    case "soon": return <I {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></I>;
    case "disc": return <I {...p}><rect x="3" y="4" width="18" height="5" rx="1" /><path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" /><path d="M10 13h4" /></I>;
  }
}

/** 產品剪影（自繪，非官方圖片） */
export function DeviceIcon({ kind, size = 56 }: { kind: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 64 64", fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (kind) {
    case "phone": return <svg {...common}><rect x="22" y="6" width="20" height="52" rx="4" /><path d="M29 52h6" /><rect x="27" y="11" width="10" height="3" rx="1.5" /></svg>;
    case "phone-max": return <svg {...common}><rect x="19" y="4" width="26" height="56" rx="5" /><path d="M28 54h8" /><rect x="25" y="9" width="12" height="3" rx="1.5" /></svg>;
    case "phone-air": return <svg {...common}><rect x="22" y="6" width="20" height="52" rx="4" /><path d="M29 52h6" /><path d="M24 12h16" /></svg>;
    case "phone-fold": return <svg {...common}><rect x="10" y="10" width="44" height="44" rx="4" /><path d="M32 10v44" strokeDasharray="3 3" /><path d="M18 48h6M40 48h6" /></svg>;
    case "imac": return <svg {...common}><rect x="6" y="8" width="52" height="34" rx="3" /><path d="M6 36h52" /><path d="M26 42l-2 12h16l-2-12" /></svg>;
    case "tablet-mini": return <svg {...common}><rect x="18" y="12" width="28" height="40" rx="4" /><path d="M29 47h6" /></svg>;
    case "headphones": return <svg {...common}><path d="M12 38v-6a20 20 0 0 1 40 0v6" /><rect x="8" y="36" width="10" height="16" rx="4" /><rect x="46" y="36" width="10" height="16" rx="4" /></svg>;
    case "tablet": return <svg {...common}><rect x="14" y="8" width="36" height="48" rx="4" /><path d="M29 50h6" /></svg>;
    case "laptop": return <svg {...common}><rect x="12" y="16" width="40" height="24" rx="2" /><path d="M6 44h52" /></svg>;
    case "laptop-pro": return <svg {...common}><rect x="10" y="12" width="44" height="28" rx="2" /><path d="M4 46h56" /><path d="M24 46v2h16v-2" /></svg>;
    case "mac-mini": return <svg {...common}><rect x="10" y="24" width="44" height="16" rx="3" /><path d="M16 36h4M22 36h4" /></svg>;
    case "watch": return <svg {...common}><rect x="20" y="18" width="24" height="28" rx="6" /><path d="M26 18v-8h12v8M26 46v8h12v-8" /><path d="M44 28h3v8h-3" /></svg>;
    case "airpods": return <svg {...common}><path d="M20 14a6 6 0 0 1 12 0v8a6 6 0 0 1-6 6h-6V14z" /><path d="M26 28v20" /><path d="M44 14a6 6 0 0 0-12 0v8a6 6 0 0 0 6 6h6V14z" /><path d="M38 28v20" /></svg>;
    case "vision": return <svg {...common}><rect x="8" y="22" width="48" height="20" rx="10" /><path d="M8 32H4M56 32h4" /><path d="M26 42c2 3 10 3 12 0" /></svg>;
    case "display": return <svg {...common}><rect x="6" y="12" width="52" height="32" rx="2" /><path d="M32 44v8M22 52h20" /></svg>;
    case "airtag": return <svg {...common}><circle cx="32" cy="32" r="18" /><circle cx="32" cy="32" r="7" /></svg>;
    case "homepod": return <svg {...common}><rect x="18" y="12" width="28" height="40" rx="12" /><path d="M26 24h12M26 32h12M26 40h12" /></svg>;
    case "appletv": return <svg {...common}><rect x="10" y="24" width="44" height="16" rx="3" /><circle cx="46" cy="32" r="2" /><rect x="28" y="46" width="8" height="12" rx="3" /></svg>;
    case "airpods-pro": return <svg {...common}><rect x="14" y="30" width="36" height="24" rx="8" /><path d="M14 40h36" /><path d="M22 12a5 5 0 0 1 10 0v6a5 5 0 0 1-5 5h-5V12z" /><path d="M27 23v5" /><path d="M42 12a5 5 0 0 0-10 0v6a5 5 0 0 0 5 5h5V12z" /><path d="M37 23v5" /></svg>;
    case "watch-ultra": return <svg {...common}><rect x="19" y="17" width="26" height="30" rx="4" /><path d="M25 17v-8h14v8M25 47v8h14v-8" /><path d="M45 26h4v12h-4" /><path d="M19 28h-2v8h2" /></svg>;
    case "homepod-mini": return <svg {...common}><circle cx="32" cy="34" r="18" /><ellipse cx="32" cy="20" rx="9" ry="3" /><path d="M24 50h16" /></svg>;
    case "mac-studio": return <svg {...common}><rect x="12" y="20" width="40" height="26" rx="4" /><path d="M18 40h4M24 40h4" /><path d="M16 50h32" /></svg>;
    case "display-xdr": return <svg {...common}><rect x="4" y="10" width="56" height="34" rx="2" /><path d="M10 16h44v22H10z" /><path d="M28 44v8h8v-8M20 54h24" /></svg>;
    default: return <svg {...common}><rect x="12" y="12" width="40" height="40" rx="4" /></svg>;
  }
}

/** 各分類的導覽圖示（分類照 Apple 台灣官網） */
export const CATEGORY_ICON: Record<string, (p: P) => React.ReactNode> = {
  mac: Icon.laptop, ipad: Icon.tablet, iphone: Icon.phone, watch: Icon.watch,
  vision: Icon.vision, airpods: Icon.airpods, tvhome: Icon.tv, accessories: Icon.accessory,
};
