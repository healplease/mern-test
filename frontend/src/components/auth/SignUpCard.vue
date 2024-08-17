<template>
  <v-card width="300">
    <v-card-text>
      <p class="text-h6">Sign Up</p>
      <v-divider class="my-3" />
      <v-form
        v-model="signUpFormValid"
        :rules="signUpFormRules"
      >
        <v-text-field
          v-model="signUpForm.email"
          label="E-mail"
          required
          :rules="signUpFormRules.email"
        />
        <v-text-field
          v-model="signUpForm.username"
          label="Username"
          required
          :rules="signUpFormRules.username"
        />
        <v-text-field
          v-model="signUpForm.password"
          label="Password"
          type="password"
          required
          :rules="signUpFormRules.password"
        />
        <v-text-field
          v-model="signUpForm.repeatPassword"
          label="Repeat Password"
          type="password"
          required
          :rules="signUpFormRules.repeatPassword"
        />
        <v-btn
          :disabled="!signUpFormValid"
          @click="signUp"
        >
          Sign Up
        </v-btn>
        <v-divider class="my-3" />
        <span class="text-lead pe-3">Already have an account?</span>
        <v-btn
          type="button"
          variant="text"
          size="small"
          @click="$emit('change-card', 'login')"
        >
          Login
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { authService } from '@/services/authService';
export default {
  name: 'SignUpCard',
  data() {
    return {
      signUpForm: {
        email: '',
        username: '',
        password: '',
        repeatPassword: ''
      },
      signUpFormValid: false,
      signUpFormRules: {
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ],
        username: [
          v => !!v || 'Username is required',
          v => (v && v.length >= 3) || 'Username must be at least 3 characters'
        ],
        password: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 8) || 'Password must be at least 8 characters'
        ],
        repeatPassword: [
          v => !!v || 'Repeat Password is required',
          v => v === this.signUpForm.password || 'Repeat Password must match Password'
        ]
      }
    }
  },
  methods: {
    signUp() {
      authService.register(
        this.signUpForm.username,
        this.signUpForm.email,
        this.signUpForm.password
      ).then(({ user }) => {
        this.$emit('sign-up', user);
        this.signUpForm.email = '';
        this.signUpForm.username = '';
        this.signUpForm.password = '';
        this.signUpForm.repeatPassword = '';
      }).catch(() => {
        // todo: handle error
        this.signUpFormValid = false;
      });
    }
  }
}
</script>