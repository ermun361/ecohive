/**
 * Client-Side Analytics Tracker for EcoHive Kenya
 * Conforms to privacy-first standards without invasive cookies.
 * Dispatches pageviews and user engagement events to /api/analytics/track
 * and coordinates with Google tag / Cloudflare Web Analytics.
 */

export const trackPageView = (pageName: string) => {
  try {
    // 1. Post to live backend analytics store
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'pageview',
        path: `/${pageName}`,
        referrer: document.referrer || 'direct',
      }),
    }).catch(() => {
      // Graceful fallback if offline
    });

    // 2. Dispatch to window.gtag if present
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: `/${pageName}`,
      });
    }

    console.log(`[EcoHive Analytics] Tracked view: /${pageName}`);
  } catch {
    // Analytics should never break user experience
  }
};

export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  try {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: eventName,
        path: window.location.pathname,
        ...params,
      }),
    }).catch(() => {});

    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, params);
    }
  } catch {
    // Fail-safe
  }
};
