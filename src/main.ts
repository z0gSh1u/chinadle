import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

const app = createApp(App)

declare global {
  interface Window {
    $: any
    jQuery: any
  }
}
import 'jquery-ui/themes/base/theme.css'
import 'jquery-ui/themes/base/autocomplete.css'

import mitt, { Emitter, EventType } from 'mitt'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    emitter: Emitter<Record<EventType, unknown>>
  }
}
app.config.globalProperties.emitter = mitt()

import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
// import 'vue-toast-notification/dist/theme-default.css'
app.use(VueToast)

app.mount('#app')
