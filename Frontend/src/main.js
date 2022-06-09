import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import store from './store'
import './styles/index.scss';
import 'element-ui/lib/theme-chalk/index.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './globalComponents';
import PopupNotification from "./components/popup-notification/index";
import Permission from "./components/permission/index";
import Toast from "./components/toast/index";

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(PopupNotification);
Vue.use(Permission);
Vue.use(Toast);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
