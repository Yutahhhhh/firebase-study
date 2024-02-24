<template>
  <div>
    <span>vegetable: {{ target.name }}</span>
    <v-btn @click="throwError">
      擬似エラー
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { VegetableUtil } from '~/utils/firestore';
const { $firebase } = useNuxtApp()
const vegetableUtil = new VegetableUtil($firebase)
const path = useRoute().params._vegetable as string
const target = await vegetableUtil.getByName(path)

if (!target) {
  throw createError({
    statusCode: 404,
    message: 'Not Found',
    fatal: true
  })
  // もしくはshowErrorを使う
  // showError(
  //   createError({
  //     statusCode: 404,
  //     message: 'Not Found'
  //   })
  // )
}

const throwError = () => {
  // 擬似的にサーバーエラーとする
  throw createError({
    statusCode: 500,
    message: 'Internal Server Error',
    fatal: true
  })
}
</script>
