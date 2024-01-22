<template>
  <div>
    <v-container>
      <v-card
        class="mx-auto"
        max-width="300"
      >
        <v-list density="compact">
          <v-list-subheader>Studies</v-list-subheader>

          <v-list-item
            v-for="(p, i) in pages"
            :key="i"
            :to="p.to"
            color="primary"
          >
            <template #prepend>
              <v-icon :icon="p.icon" />
            </template>

            <v-list-item-title>
              {{ p.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
type PageType = {
  text: string
  icon: string
  to: string
}
const pages: PageType[] = [
  { to: 'post', icon: 'mdi-pencil', text: 'リッチテキスト' },
  { to: 'ethers', icon: 'mdi-ethereum', text: 'Ethers' },
  { to: 'calendar', icon: 'mdi-calendar', text: 'FullCalendar' }
]
</script>