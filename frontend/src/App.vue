<template>
  <v-layout>
    <!-- alerts -->
    <v-snackbar
      v-model="alert.show"
      :color="alert.color"
      top
    >
      <span class="text-lead pe-3">{{ alert.message }}</span>
      <v-btn
        text
        variant="outlined"
        @click="alert.show = false"
      >
        Close
      </v-btn>
    </v-snackbar>


    <v-navigation-drawer
      :rail="rail"
      permanent
      :elevation="3"
    >
      <template v-slot:prepend>
        <v-list-item
          :prepend-icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
          @click="rail = !rail"
        >
          <v-list-item-title>Sitemap</v-list-item-title>
        </v-list-item>
      </template>

      <template v-slot:default>
        <v-list
          nav
          :lines="false"
          density="compact"
          color="primary"
          :items="navigationItems"
        >
        </v-list>
      </template>

    </v-navigation-drawer>
    
    <v-app-bar
      class="px-5"
      :elevation="3"
    >
      <v-app-bar-title>Todoer</v-app-bar-title>

      <template v-slot:append>
        <v-menu
          v-model="authMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
        >
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              v-bind="props"
            >
              <v-avatar v-if="user">
                <v-img :src="user.avatar ? user.avatar : `https://www.gravatar.com/avatar/${user.username}?d=mp&s=40`" />
              </v-avatar>
              <v-icon v-else>mdi-account</v-icon>
            </v-btn>
          </template>

          <UserCard
            v-if="user"
            :user="user"
            @logout="user = null"
          />

          <LoginCard
            v-if="!user && !signUpShow"
            @login="(user) => this.user = user"
            @change-card="card => signUpShow = card === 'sign-up'"
          />

          <SignUpCard
            v-if="!user && signUpShow"
            @sign-up="(user) => this.user = user"
            @change-card="card => signUpShow = card === 'sign-up'"
          />

        </v-menu>
      </template>
    </v-app-bar>


    <v-main
      class="bg-grey-lighten-4"
      min-height="100vh"
    >
      <v-container>
        <router-view />
      </v-container>
    </v-main>

  </v-layout>
</template>

<script>
import { navigationItems } from '@/components/navigation/constants';
import { authService } from './services/authService';
import UserCard from './components/auth/UserCard.vue';
import LoginCard from './components/auth/LoginCard.vue';
import SignUpCard from './components/auth/SignUpCard.vue';
export default { 
  name: 'App',
  data: () => ({
    alert: {
      show: false,
      message: '',
      color: ''
    },
    rail: true,
    navigationItems: navigationItems,
    user: null,
    signUpShow: false,
    authMenu: false
  }),
  components: {
    UserCard,
    LoginCard,
    SignUpCard
  },
  watch: {
    $route() {
      this.rail = true;
    }
  },
  created() {
    authService.me().then(({ user }) => {
      this.user = user;
    }).catch(() => {
      this.user = null;
      if (localStorage.getItem('authToken')) {
        this.alert = {
          show: true,
          message: 'Your session has expired. Please login again.',
          color: 'error'
        };
        localStorage.removeItem('authToken');
      }

    });
  },
  methods: {}
}
</script>
