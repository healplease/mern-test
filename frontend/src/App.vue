<template>
  <v-layout>
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
          v-if="user"
          v-model="loginMenu"
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
              <v-avatar>
                <v-img :src="user.avatar ? user.avatar : `https://www.gravatar.com/avatar/${user.username}?d=mp&s=40`" />
              </v-avatar>
            </v-btn>
          </template>

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
        </v-menu>

        <v-menu
          v-else
          v-model="loginMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
        >
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              v-bind:="props"
            >
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          
          <v-card min-width="300">
            <v-card-text>
              <p class="text-h6">Login</p>
              <v-divider class="my-3" />
              <v-form
                v-model="loginFormValid"
                :rules="loginFormRules"
                @submit.prevent="login"
              >
                <v-text-field
                  v-model="loginForm.email"
                  label="E-mail"
                  required
                  :rules="loginFormRules.email"
                />
                <v-text-field
                  v-model="loginForm.password"
                  label="Password"
                  type="password"
                  required
                  :rules="loginFormRules.password"
                />
                <v-btn
                  type="submit"
                  :disabled="!loginFormValid"
                >
                  Login
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
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
export default { 
  name: 'App',
  data: () => ({
    rail: true,
    loginMenu: false,
    loginFormValid: false,
    loginForm: {
      email: '',
      password: ''
    },
    loginFormRules: {
      email: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: [
        v => !!v || 'Password is required',
      ]
    },
    loginError: null,
    navigationItems: navigationItems,
    user: null
  }),
  watch: {
    $route() {
      this.rail = true;
    }
  },
  created() {
    authService.me().then(({ user }) => {
      this.user = user;
    });
  },
  methods: {
    login() {
      authService.login(
        this.loginForm.email,
        this.loginForm.password
      ).then(({ user }) => {
        this.user = user;
        this.loginForm.email = '';
        this.loginForm.password = '';
      }).catch(() => {
        this.loginError = 'Invalid credentials';
      });
    },
    logout() {
      authService.logout().then(() => {
        this.user = null;
      });
    }
  }
}
</script>
