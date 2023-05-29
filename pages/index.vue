<template>
  <div>
    <v-container>
      <v-card
        :style="colorSwitch === 'cool' ? coolColor : cuteColor"
        class="color-pallet"
      >
        <v-card-text>
          <div v-html="richText" />
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="#08ffc8"
            @click="colorSwitch='cool'"
          >
            クール系
          </v-btn>
          <v-btn
            color="#ffb6b9"
            @click="colorSwitch='cute'"
          >
            かわいい系
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
type ColorType = {
  "--color-h1": string
  "--color-h2": string
  "--color-h3": string
  "--color-back": string
}
const coolColor: ColorType = {
  "--color-h1": '#08ffc8',
  "--color-h2": '#fff7f7',
  "--color-h3": '#dadada',
  "--color-back": '#204969'
}
const cuteColor: ColorType = {
  "--color-h1": '#ffb6b9',
  "--color-h2": '#fae3d9',
  "--color-h3": '#bbded6',
  "--color-back": '#8ac6d1'
}

const colorSwitch = ref<'cool' | 'cute'>('cool')
const richText = `<h1>h1タグだよ</h1><p>こんにちは、h1タグです。</p><h2>h2タグだよ</h2><p>こんにちは、h2タグです。</p><h3>h3タグだよ</h3><p>こんにちは、h3タグです。</p>`
</script>

<style lang="sass">
.color-pallet
  h1
    background: var(--color-h1)
  h2
    background: var(--color-h2)
  h3
    background: var(--color-h3)
  p
    color: var(--color-back)
</style>
