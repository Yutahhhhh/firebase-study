export default defineNuxtConfig({
  ssr: false,
  build: {
    transpile: ["vuetify"]
  },
  runtimeConfig: {
    public: {
      FB_API_KEY: '',
      FB_PROJECT_ID: '',
      FB_MESSAGING_SENDER_ID: '',
      FB_APP_ID: '',
      CALENDAR_ID: '',
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
