"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "pc-parts-guide-cookie-consent";

type ConsentValue = "accepted" | "rejected";

export function getStoredCookieConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(STORAGE_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

/** Call before injecting ad/analytics scripts when you add them. */
export function hasAdvertisingConsent(): boolean {
  return getStoredCookieConsent() === "accepted";
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getStoredCookieConsent()) {
      setVisible(true);
    }
  }, []);

  function save(value: ConsentValue) {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
    window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: value }));
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-surface-800 bg-surface-900/95 p-4 shadow-lg backdrop-blur-sm"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="section-container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-3xl">
          <p id="cookie-consent-title" className="text-sm font-medium text-white">
            Cookies &amp; advertising
          </p>
          <p id="cookie-consent-desc" className="mt-1 text-xs leading-relaxed text-surface-200/65">
            We use essential cookies for basic site function. With your permission, we and our
            partners may use cookies for analytics and personalized ads. You can change your mind
            anytime — see our{" "}
            <Link href="/privacy" className="text-brand-400 hover:text-brand-300">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/ad-choices" className="text-brand-400 hover:text-brand-300">
              Ad Choices
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => save("rejected")}
            className="rounded-lg border border-surface-700 px-4 py-2 text-sm text-surface-200 hover:border-surface-600 hover:text-white"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => save("accepted")}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
