import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue'

import colors from 'vuetify/util/colors'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { router } from '@/router'

// Components
import App from './App.vue'

const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.teal.lighten2,
          secondary: colors.grey.lighten1,
        },
      },
    },
  },
})

const app = createApp(App)

app.use(vuetify)
app.use(router)

app.mount('#app')
