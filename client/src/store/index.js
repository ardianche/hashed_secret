import { createStore } from 'vuex'
import Vue from 'vue';
import axios from 'axios';

export default createStore({
  state: {
    secrets:[],
  },
  mutations: {
    SET_SECRET_LIST(state,payload){
      state.secrets = payload;
    }
  },
  actions: {
    fetchSecret(param = ''){
      axios.get('/')
        .then((res) => {
          console.log('RES: ',res);
          this.commit('SET_SECRET_LIST',res.data);
        });
    },
    createSecret(payload){

    }
  },
  modules: {
  }
})
