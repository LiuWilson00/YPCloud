import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { i18n } from './i18n';
import axios from 'axios'

import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import Vue2TouchEvents from 'vue2-touch-events'
 
Vue.use(Vue2TouchEvents)


const opts = {
  icons: {
    iconfont: 'md', // default - only for display purposes
  },

};

Vue.config.productionTip = false
Vue.use(Vuetify);



Vue.config.productionTip = false;

Vue.prototype.makeId = function (length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const DEFAULT_TITLE = 'YpCloud';
router.afterEach((to, from) => {
  document.title = to.meta.title || DEFAULT_TITLE;
});

new Vue({
  vuetify: new Vuetify(opts),
  css: {
    loaderOptions: {
      sass: {
        data: `@import "./styles/main.scss"` // change the route with you main.scss location in yout proyect
      }
    }
    ,
    chainWebpack: config => {
      ["vue-modules", "vue", "normal-modules", "normal"].forEach((match) => {
        config.module.rule('scss').oneOf(match).use('sass-loader')
          .tap(opt => Object.assign(opt, { data: `@import '~@/sass/main.scss';` }))
      })
    }
  }, watch: {
    $route(to) {
      document.title = `${to.meta.title}`;
      const link = document.querySelector("[rel='icon']")
      link.setAttribute('href', to.meta.icon)
    }
  },
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
