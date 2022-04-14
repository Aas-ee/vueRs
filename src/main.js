import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/globle.css'
import axios from "axios";
import '../vue.config'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


// use markdown
Vue.use(mavonEditor)

Vue.config.productionTip = false

Vue.prototype.$axios=axios

Vue.use(ElementUI,{ size: "mini" });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
