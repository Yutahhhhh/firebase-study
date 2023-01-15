import { Context } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

export interface NuxtContext extends Context {
  $axios: NuxtAxiosInstance
}
