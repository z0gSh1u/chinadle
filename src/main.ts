import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

declare global {
  interface Window {
    $: any
    jQuery: any
  }
}
import 'jquery-ui/themes/base/theme.css'
import 'jquery-ui/themes/base/autocomplete.css'
import mitt from 'mitt'

const app = createApp(App)
app.config.globalProperties.emitter = mitt()
app.mount('#app')
