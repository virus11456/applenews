"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CATEGORY_LABEL, type Category } from "@/lib/products";
import { Icon } from "./Icons";

export const CATS = Object.keys(CATEGORY_LABEL) as Category[];
const CAT_ICON: Record<Category, (p: { size?: number }) => React.ReactNode> = { iphone: Icon.phone, ipad: Icon.tablet, mac: Icon.laptop, wear: Icon.watch, home: Icon.home };

function parseCat(v: string | null): Category | null {
  return v && (CATS as string[]).includes(v) ? (v as Category) : null;
}

function useCat(): Category | null {
  const pathname = usePathname();
  const cat = parseCat(useSearchParams().get("cat"));
  return pathname === "/" ? cat : null;
}

const href = (c: Category | null) => (c ? `/?cat=${c}#all` : "/#all");

/** 頂部選單的分類連結（桌機版） */
function HeaderLinks({ active }: { active: Category | null }) {
  return (
    <>
      {CATS.map((c) => {
        const I = CAT_ICON[c];
        return <Link key={c} href={href(c)} scroll={false} className={active === c ? "active" : undefined} aria-current={active === c ? "page" : undefined}><I />{CATEGORY_LABEL[c]}</Link>;
      })}
    </>
  );
}

function HeaderLinksLive() {
  return <HeaderLinks active={useCat()} />;
}

export function HeaderCategoryLinks() {
  return <Suspense fallback={<HeaderLinks active={null} />}><HeaderLinksLive /></Suspense>;
}

/** 首頁產品格：上方分類切換，只顯示所選分類的卡片 */
function FilterGrid({ active, children }: { active: Category | null; children: React.ReactNode }) {
  return (
    <>
      <div className="cat-tabs" role="tablist" aria-label="產品分類">
        {[null, ...CATS].map((c) => {
          const I = c ? CAT_ICON[c] : null;
          const on = active === c;
          return <Link key={c ?? "all"} href={href(c)} scroll={false} replace role="tab" aria-selected={on} className={on ? "cat-tab on" : "cat-tab"}>{I && <I size={16} />}{c ? CATEGORY_LABEL[c] : "全部"}</Link>;
        })}
      </div>
      <div className="grid" data-filter={active ?? "all"}>{children}</div>
    </>
  );
}

function FilterGridLive({ children }: { children: React.ReactNode }) {
  return <FilterGrid active={useCat()}>{children}</FilterGrid>;
}

export function CategoryGrid({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<FilterGrid active={null}>{children}</FilterGrid>}><FilterGridLive>{children}</FilterGridLive></Suspense>;
}
