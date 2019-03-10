import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueImg from 'v-img';
import Icon from 'vue-awesome';


Vue.config.productionTip = false;
Vue.use(Vuelidate)
Vue.use(BootstrapVue);
Vue.use(VueImg);
Vue.component('v-icon', Icon);
Vue.prototype.$eventBus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
