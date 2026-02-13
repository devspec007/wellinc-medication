// Facebook Pixel tracking utilities

// Declare fbq function for TypeScript
declare global {
  interface Window {
    fbq: any;
  }
}

/**
 * Track a Facebook Pixel event
 * @param eventName - The name of the event (e.g., 'ViewContent', 'Lead', 'Purchase')
 * @param params - Optional parameters for the event
 */
export function trackFBEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      if (params) {
        window.fbq('track', eventName, params);
      } else {
        window.fbq('track', eventName);
      }
    } catch (error) {
      console.error('[Facebook Pixel] Error tracking event:', eventName, error);
    }
  }
}

/**
 * Track ViewContent event
 * Typically fired when user views a product or important page
 */
export function trackViewContent(params?: {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  value?: number;
  currency?: string;
}) {
  trackFBEvent('ViewContent', params);
}

/**
 * Track Lead event
 * Fired when user submits contact information
 */
export function trackLead(params?: {
  content_name?: string;
  value?: number;
  currency?: string;
}) {
  trackFBEvent('Lead', params);
}

/**
 * Track AddToCart event
 * Fired when user adds item to cart or initiates checkout
 */
export function trackAddToCart(params?: {
  content_name?: string;
  content_ids?: string[];
  value?: number;
  currency?: string;
}) {
  trackFBEvent('AddToCart', params);
}

/**
 * Track Purchase event
 * Fired when user completes a purchase
 */
export function trackPurchase(params: {
  value: number;
  currency: string;
  content_ids?: string[];
  content_name?: string;
}) {
  trackFBEvent('Purchase', params);
}

/**
 * Check if Facebook Pixel is initialized
 */
export function isFBPixelInitialized(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq !== 'undefined';
}

