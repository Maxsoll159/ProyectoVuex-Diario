import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './Styles/styles.scss'

createApp(App).use(router).use(store).mount('#app')
