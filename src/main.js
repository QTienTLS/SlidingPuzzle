import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Icon from './components/Icon.vue'

const app = createApp(App)
app.component('icon', Icon);
app.mount('#app')
// createApp(App).mount('#app')
