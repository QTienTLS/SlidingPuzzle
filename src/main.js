import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Icon from './components/Icon.vue'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App)
app.component('icon', Icon);
app.use(ToastPlugin,{
  position: 'top-right',
  duration: 2000,
})
app.mount('#app')
// createApp(App).mount('#app')
