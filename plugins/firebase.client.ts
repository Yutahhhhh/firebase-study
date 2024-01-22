import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const publicConfig = config.public;
  const projectId = publicConfig.FB_PROJECT_ID;
  const firebaseConfig = {
    apiKey: publicConfig.FB_API_KEY,
    authDomain: publicConfig.FB_AUTH_DOMAIN || `${projectId}.firebaseapp.com`,
    projectId,
    storageBucket: `${projectId}.appspot.com`,
    messagingSenderId: publicConfig.FB_MESSAGING_SENDER_ID,
    appId: publicConfig.FB_APP_ID
  }

  const firebaseApp: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const useFirestore = getFirestore(firebaseApp)
  const useStorage = getStorage(firebaseApp)
  const useAuth = getAuth(firebaseApp)

  if (publicConfig.USE_EMULATOR) {
    connectAuthEmulator(useAuth, "http://localhost:9099")
    connectFirestoreEmulator(useFirestore, "localhost", 8080)
    connectStorageEmulator(useStorage, "localhost", 9199)
  }

  return {
    provide: {
      firebase: firebaseApp,
      db: useFirestore,
      storage: useStorage,
      auth: useAuth
    }
  }
});
