<template>
  <v-app>
    <v-main>
      <v-app-bar density="compact" :elevation="2">
        <v-app-bar-nav-icon to="/" size="small" icon="mdi-home" />
        <v-app-bar-title>Blueback | ハンズオン</v-app-bar-title>
      </v-app-bar>
      <slot />
    </v-main>
  </v-app>
</template>
