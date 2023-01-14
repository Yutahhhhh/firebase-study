import { FirebaseOptions, getApps, getApp, initializeApp, FirebaseApp } from 'firebase/app';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_PROJECT_ID + '.firebaseapp.com',
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_PROJECT_ID + '.appspot.com',
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
}

export const firebaseApp: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
