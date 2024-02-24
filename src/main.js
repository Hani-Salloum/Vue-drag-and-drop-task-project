import { createApp } from 'vue'
import router from './router/index'
import store from './store/index'
import './style.css'
import App from './App.vue'
import AppButton from './components/AppButton.vue'



createApp(App)
    .component('AppButton', AppButton)
    .use(router)
    .use(store)
    .mount('#app')
