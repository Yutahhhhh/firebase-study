<template>
  <div>
    <v-container>
      <v-card max-width="600" class="ma-auto">
        <v-card-title>渾身の親父ギャグ</v-card-title>
        <v-card-text>{{ jokeTxt }}</v-card-text>
        <v-card-actions>
          <v-spacer/>
          <joke-trigger @run="joke"></joke-trigger>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import JokeTrigger from '~/components/JokeTrigger.vue';

@Component({
  components: { JokeTrigger }
})
export default class Index extends Vue {
  jokeTxt: string = ''

  joke(str: string): void {
    this.jokeTxt = str
  }
}
</script>
