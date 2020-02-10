import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import axios from 'axios';
import config from './config';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    userDatas: 'app'
  },
  getters: {

  },
  mutations: {
    SET_USER_DATAS(state, data) {
      state.userDatas = data;
    }
  },
  actions: {
    INIT_USER_DATAS() {
      // Read Json
      
      axios
      .get(`${config.webConfig.apiUrl}UserData`)
      .then(res => {
        this.commit("SET_USER_DATAS", res.data)
      })
    }
  }
  // modules : {
  //   authenticate
  // }
});
