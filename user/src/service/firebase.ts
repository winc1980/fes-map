import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Firebaseの初期化（既に初期化済みでない場合のみ）
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Analyticsのインスタンスをエクスポート
// ブラウザで実行されている場合、かつAnalyticsがサポートされている場合のみ初期化
export const analytics = typeof window !== 'undefined' && (await isSupported())
  ? getAnalytics(app)
  : null;

// 特定のイベントを記録するためのヘルパー関数もエクスポートしておくと便利
export const logAnalyticsEvent = (eventName: string, params?:  Record<string, unknown>) => {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
};