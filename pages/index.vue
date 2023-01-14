<template>
  <div>
    <count name="歩行者" :counter="walker" @increments="walker++"></count>
    <count name="自転車" :counter="cycle" @increments="cycle++"></count>
    <count name="自動車" :counter="car" @increments="car++"></count>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Count from '~/components/Count.vue';

@Component({
  components: { Count }
})
export default class Index extends Vue {
  walker: number = 0;
  cycle: number = 0;
  car: number = 0;
}
</script>
