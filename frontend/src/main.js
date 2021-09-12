import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false

import Notebooks from './views/Notebooks'
import Books from './views/Books'
import Chat from './views/Chat'
import Settings from './views/Settings'
import FAQ from './views/FAQ'

const routes = [
  { path: '/notebooks', component: Notebooks },
  { path: '/books', component: Books },
  { path: '/chat', component: Chat },
  { path: '/settings', component: Settings },
  { path: '/faq', component: FAQ },
]


const router = new VueRouter({
  routes
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
