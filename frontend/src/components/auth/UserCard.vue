<template>
  <v-card width="300">
    <v-img 
      :src="user.avatar ? user.avatar : `https://www.gravatar.com/avatar/${user.username}?d=mp&size=300`"
      height="200"
      cover
    />
    <v-card-text>
      <div class="d-flex flex-column align-center">
        <p class="text-h6">Hello, {{ user.username }}</p>
      </div>
      <v-divider class="my-3" />
      <v-btn @click="logout">Logout</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { authService } from '@/services/authService';
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    },
  },
  methods: {
    logout() {
      authService.logout().then(() => {
        this.$emit('logout');
      });
    }
  }
}
</script>