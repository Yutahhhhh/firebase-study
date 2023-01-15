<template>
  <v-btn depressed @click="run">
    <span>ギャグを発する</span>
  </v-btn>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'nuxt-property-decorator'

@Component
export default class JokeTrigger extends Vue {
  @Emit()
  run(): Promise<string> {
    return this.joke().then((res: any) => res.data.joke as string).catch((_) => 'error!!')
  }

  async joke(): Promise<string> {
    return await this.$axios.get('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json'
      }
    })
  }

}
</script>
