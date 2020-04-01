import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import axios from 'axios';
import config from './config';
import parse from "url-parse"

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    userDatas: [],
    maxIdOfUserData: 0,
    formDatas: [],
    maxIdOfFormDatas: 0,
    mmsMsg: "",
    peerId: ""

  },
  getters: {
    getUserNameById: state => {
      const user = state.userDatas.find(data => { return data.id == id })
      return user.userName;

    }
  },
  mutations: {
    SET_USER_DATAS(state, data) {
      var tempId = 0;
      state.userDatas = data;
      data.forEach(element => {
        if (element.id > tempId) tempId = element.id
      });
      state.maxIdOfUserData = tempId
    },
    SET_FORM_DATAS(state, data) {

      var tempId = 0;
      state.formDatas = data;
      data.forEach(element => {
        if (element.id > tempId) tempId = element.id
      });
      state.maxIdOfFormDatas = tempId

    },
    SET_PEER(state, data) {
      state.peerId = data
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
    },
    INIT_FORM_DATAS() {
      // Read Json

      axios
        .get(`${config.webConfig.apiUrl}FormData`)
        .then(res => {
          this.commit("SET_FORM_DATAS", res.data)
        })
    },
    INIT_PEER() {
      let localUrl = window.location.href;
      let parseUrl = parse(localUrl, true);
      let query = parseUrl.query;
      if (query.id != undefined) {
        localStorage.setItem("peerUser", query.id)
        this.commit("SET_PEER", query.id)
      } else if (localStorage.getItem("peerUser") != null) {
        this.commit("SET_PEER", localStorage.getItem("peerUser"))
      } else {
        this.commit("SET_PEER", Math.random().toString(36).substr(2))
      }

    }
  }
  // modules : {
  //   authenticate
  // }
});
