import './assets/style/base.css'
import 'remixicon/fonts/remixicon.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './index.js'

const app = createApp(App)

app.use(router)

app.mount('#app')
