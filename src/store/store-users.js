import Vue from "vue";
import { uid } from "quasar";
import axios from "axios";

const state = {
  users: []
};

const mutations = {
  getUserList(state, payload) {
    state.users = payload.map(item => {
      return {
        id: item.id,
        name: item.name,
        email: item.email,
        type: item.type
      };
    })
  },
  updateUser(state, payload) {
    state.users = state.users.map(user => {
      if (user.id === payload.id) {
        return {
          ...user,
          name: payload.updates.name,
          email: payload.updates.email,
          type: payload.updates.type
         };
      }
      return user;
    });
  },
  deleteUser(state, id) {
    state.users = state.users.filter(user => user.id !== id);
  },
  addUser(state, payload) {
  Vue.set(
    state.user,
    payload.id,
    payload.name,
    payload.email,
    payload.userType);
  }
};

const actions = {
  searchUsers({ commit }, payload) {
    var url = `http://localhost:49834/users/list?skip=0&take=1000`;
    if (payload.name){
      url += `&name=${payload.name}`;
    }
    if (payload.email){
      url += `&email=${payload.email}`;
    }
    if (payload.userType){
      url += `&userType=${payload.userType}`;
    }
    axios
      .get(url)
      .then(response => {
        commit("getUserList", response.data);

      })
      .catch(error => console.log("get user list Error:", error));
  },
  updateUser({ commit }, payload) {
    axios
      .post(`http://localhost:49834/users/update/${payload.id}`, {
        name: payload.updates.name,
        email: payload.updates.email,
        type: payload.updates.type
      })
      .then(response => {
        commit("updateUser", payload);
      })
      .catch(error => console.log("update user list Error:", error));
  },
  deleteUser({ commit }, id) {
    axios
    .delete(`http://localhost:49834/users/delete/${id}`)
    .then(() => {
      commit("deleteUser", id);
    })
    .catch(error => console.log("delete user list Error:", error));
  },
  addUser({ commit }, user) {
    let userId = uid();
    let payload = {
      id: userId,
      user: user
    };
    axios
    .post(`http://localhost:49834/users/create/${userId}`, {
      name: user.name,
      email: user.email,
      type: user.type
    })
    .then(response => {
      commit("addUser", payload);
    })
    .catch(error => console.log("create user list Error:", error))
  }
  }

const getters = {
  users: state => {
    return state.users;
  }
  };

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
