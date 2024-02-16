import { AnalyticsBrowser } from '@segment/analytics-next';

const analytics = AnalyticsBrowser.load({ writeKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY });

export default async function sendSegmentEvent(eventName, properties) {
  try {
    if (analytics && typeof analytics.track === 'function') {
      await analytics.ready(() => {
        analytics.track(eventName, properties);
      });
    } else {
      console.error('Analytics is not initialized or track is not a function');
    }
  } catch (error) {
    console.error('Failed to send segment event:', error);
  }
}
