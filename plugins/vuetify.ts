import { createVuetify, IconOptions } from "vuetify";
import * as directives from "vuetify/directives";
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
  const icons: IconOptions = {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }

  const vuetify = createVuetify({
    icons: icons,
    components,
    directives
  });

  nuxtApp.vueApp.use(vuetify);
});
