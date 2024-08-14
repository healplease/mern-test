<template>
  <h1 class="text-h3 pb-3">Welcome</h1>
  <p class="text-subtitle-1 pb-5">This is the home page of the To-Do List application.</p>
  <v-card>
    <v-card-item>
      <v-card-title>Your Todos</v-card-title>
      <v-card-subtitle>Here you can manage your todos.</v-card-subtitle>
      <v-card-text>
        <p>Click on the "My Todos" link in the navigation bar to see your todos.</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" to="/todolists">My Todo Lists</v-btn>
      </v-card-actions>
    </v-card-item>
  </v-card>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
