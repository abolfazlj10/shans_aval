import './assets/style/base.css'
import 'remixicon/fonts/remixicon.css'
import mixin from './components/mixin.vue'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

const app = createApp(App)

app.use(router)
app.mixin(mixin)

app.mount('#app')
