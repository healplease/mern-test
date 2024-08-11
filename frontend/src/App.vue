<template>
  <v-layout>
    
    <v-app-bar
      scroll-behavior="hide"
      scroll-threshold="100"
      color="primary"
    >
      <v-app-bar-title>Todoer</v-app-bar-title>

      <template v-slot:append>
        <v-btn icon="mdi-heart"></v-btn>
      </template>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
    >
      <template v-slot:prepend>
        <v-list-item
          :prepend-icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
          @click="rail = !rail"
        >
        </v-list-item>
      </template>

      <template v-slot:default>
        <v-list
          :lines="false"
          density="compact"
          color="primary"
          nav
          :items="navigationItems"
        >
        </v-list>
      </template>

    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <router-view />
    </v-main>

  </v-layout>
</template>

<script>
import { navigationItems } from '@/components/navigation/constants';
export default { 
  name: 'App',
  data: () => ({
    drawer: true,
    rail: true,
    navigationItems: navigationItems
  }),
  watch: {
    $route() {
      this.rail = true;
    }
  }
}
</script>