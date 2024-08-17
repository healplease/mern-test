<template>
  <v-card width="300">
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
        <v-divider class="my-3" />
        <span class="text-lead pe-3">Don't have an account?</span>
        <v-btn
          type="button"
          variant="text"
          size="small"
          @click="$emit('change-card', 'sign-up')"
        >
          Sign up
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { authService } from '@/services/authService';
export default {
  name: 'LoginCard',
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      loginFormValid: false,
      loginFormRules: {
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ],
        password: [
          v => !!v || 'Password is required',
          v => v.length >= 8 || 'Password must be at least 8 characters'
        ]
      }
    }
  },
  methods: {
    login() {
      authService.login(
        this.loginForm.email,
        this.loginForm.password
      ).then(({ user }) => {
        this.loginForm.email = '';
        this.loginForm.password = '';
        this.loginFormValid = false;
        this.$emit('login', user);
      }).catch(() => {
        // TODO: Handle login error
        this.loginFormValid = false;
      });
    }
  }
}
</script>