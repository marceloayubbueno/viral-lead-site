"use client";
import { useEffect, useState } from "react";
import CookieConsentBanner from "./CookieConsentBanner";

const PIXEL_ID = "1100456281933308";
const CONSENT_KEY = "cookie_consent";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export default function PixelAndConsentProvider() {
  const [pixelConsent, setPixelConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent !== null) setPixelConsent(consent === "true");
  }, []);

  useEffect(() => {
    if (pixelConsent) {
      // Injeta o script do Meta Pixel
      if (typeof window.fbq !== 'function') {
        (function (f: any, b: Document, e: string, v: string) {
          if (typeof f.fbq === 'function') return;
          const n: any = f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
          };
          if (!f._fbq) f._fbq = n;
          n.push = n;
          n.loaded = !0;
          n.version = "2.0";
          n.queue = [];
          const t = b.createElement(e) as HTMLScriptElement;
          t.async = true;
          t.src = v;
          const s = b.getElementsByTagName(e)[0];
          s.parentNode?.insertBefore(t, s);
        })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
        if (typeof window.fbq === 'function') {
          (window.fbq as (...args: any[]) => void)("init", PIXEL_ID);
          (window.fbq as (...args: any[]) => void)("track", "PageView");
        }
      }
    }
  }, [pixelConsent]);

  return (
    <>
      <CookieConsentBanner onConsentChange={setPixelConsent} />
      {pixelConsent && (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      )}
    </>
  );
} 