import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import store from "./store";
import {fabric} from 'fabric';
import axios from "axios";
import router from './router'

import "./utils/permission"

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(fabric)
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router,
}).$mount('#app')
