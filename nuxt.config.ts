export default defineNuxtConfig({
  ssr: false,
  build: {
    transpile: ["vuetify"]
  },
  runtimeConfig: {
    public: {
      apiKey: process.env.FB_API_KEY,
      authDomain: process.env.FB_PROJECT_ID + '.firebaseapp.com',
      projectId: process.env.FB_PROJECT_ID,
      storageBucket: process.env.FB_PROJECT_ID + '.appspot.com',
      messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
      appId: process.env.FB_APP_ID,
    }
  },
  app: {
    head: {
      titleTemplate: '%s - firebase-study',
      title: 'firebase-study',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
