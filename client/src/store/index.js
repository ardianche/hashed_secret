import { createStore } from 'vuex'

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
    fetchSecret({commit},param = ''){
      axios.get(`/${param}`)
        .then((res) => {
          console.log('RES: ',res);
          this.commit('SET_SECRET_LIST',res.data);
        });
    },
    createSecret({commit},payload){
      return new Promise((resolve,reject) => {
        axios.post('/',payload)
          .then((res) => {
            commit('SET_SECRET_LIST',res.data);
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  modules: {
  }
})
