<template>
  <div>
    <span>vegetable: {{ path }}</span>
    <v-btn @click="throwError">
      擬似エラー
    </v-btn>
  </div>
</template>

<script setup lang="ts">
type PathType = 'cabbage' | 'pumpkin' | 'carrot'
const vegetables: PathType[] = [
  'cabbage',
  'pumpkin',
  'carrot'
]
const path = useRoute().params._vegetable as PathType

if (!vegetables.includes(path)) {
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
