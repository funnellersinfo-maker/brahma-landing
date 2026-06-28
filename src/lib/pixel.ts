/**
 * Meta Pixel helper — dispara eventos de forma segura
 * Si fbq no está cargado (adblockers), no falla.
 */
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type TrackEvent =
  | "PageView"
  | "ViewContent"
  | "InitiateCheckout"
  | "Lead"
  | "AddToCart"
  | "Purchase";

export function trackMeta(
  event: TrackEvent,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.fbq === "function") {
      if (params) {
        window.fbq("track", event, params);
      } else {
        window.fbq("track", event);
      }
    }
  } catch {
    // silencioso — no romper la UX por tracking
  }
}
