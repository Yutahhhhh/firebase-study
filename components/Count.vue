<template>
  <v-btn @click="increments">
    <span>{{ name }}: {{ counter }}回</span>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'nuxt-property-decorator'

@Component
export default class Count extends Vue {
  @Prop({ type: String }) name!: string;
  @Prop({ type: Number, default: 0 }) counter!: number;

  @Emit()
  increments(): number {
    return this.counter;
  }
}
</script>
