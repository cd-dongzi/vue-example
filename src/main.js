// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from './utils/fetch'
import './mock/mock'
import globalComponents from './components/output'

Vue.use(globalComponents);
Vue.config.productionTip = false;
Vue.prototype.http = http;
/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

