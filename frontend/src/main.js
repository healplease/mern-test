import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { router } from '@/router'

// Components
import App from './App.vue'

const vuetify = createVuetify({})

const app = createApp(App)

app.use(vuetify)
app.use(router)

app.mount('#app')
