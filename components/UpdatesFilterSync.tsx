"use client";
import { useEffect } from "react";

// 最近消息頁篩選的專用網址：/updates#price 只看價格變化、/updates#news 只看消息。
// 篩選本身靠 radio + CSS；這裡只負責「網址 → 勾選」與「勾選 → 網址」，不會捲動頁面。
const KINDS = ["all", "price", "news"] as const;

export default function UpdatesFilterSync() {
  useEffect(() => {
    const apply = () => {
      const h = location.hash.slice(1);
      const k = (KINDS as readonly string[]).includes(h) ? h : "all";
      const el = document.getElementById(`f-${k}`) as HTMLInputElement | null;
      if (el) el.checked = true;
    };
    const onChange = (e: Event) => {
      const id = (e.target as HTMLInputElement).id.replace(/^f-/, "");
      const url = id === "all" ? location.pathname + location.search : `#${id}`;
      history.replaceState(null, "", url);
    };
    apply();
    const radios = KINDS.map((k) => document.getElementById(`f-${k}`)).filter(Boolean) as HTMLElement[];
    radios.forEach((r) => r.addEventListener("change", onChange));
    window.addEventListener("hashchange", apply);
    return () => {
      radios.forEach((r) => r.removeEventListener("change", onChange));
      window.removeEventListener("hashchange", apply);
    };
  }, []);
  return null;
}
