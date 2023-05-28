import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app'
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public;
  const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
    measurementId: config.measurementId
  };
  const firebaseApp: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

  return {
    provide: {
      firebase: firebaseApp,
    }
  }
});
