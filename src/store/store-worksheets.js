import Vue from "vue";
import { uid } from "quasar";
import axios from "axios";

const state = {
  worksheets: []
};

const mutations = {
  getWorksheet(state, payload) {
    state.worksheets = payload.map(item => {
      return {
        id: item.id,
        user: item.user,
        project: item.project,
        description: item.description,
        time: item.time,
        date: item.date

      };
    })
  },
  addWorksheet(state, payload) {
    Vue.set(
     state.worksheet,
     payload.id,
     payload.user,
     payload.project,
     payload.description,
     payload.time,
     payload.date
     )
  },
  deleteWorksheet(state, id) {
    state.worksheets = state.worksheets.filter(worksheet => worksheet.id !== id);
  },
  updateWorksheet(state, item) {
    state.worksheets = state.worksheets.map(worksheet => {
      if (item.id === worksheet.id) {
        return {
          ...item,
          user: item.user,
          project: item.project,
          description: item.description,
          time: item.time,
          date: item.date
        };
      }
      return worksheet;
    });
  }
};

const actions = {
  searchWorksheets({ commit }, payload) {
    var url = `http://localhost:49834/worksheets/list?skip=0&take=1000`;
    if (payload.user) {
      url += `&userId=${payload.user}`;
    }
    if (payload.project) {
      url += `&projectId=${payload.project}`;
    }
    axios
      .get(url)
      .then(response => {
        commit("getWorksheet", response.data);
      })
      .catch(error => console.log("get worksheet list Error:", error));
  },
  addWorksheet({ commit }, worksheet) {
    let worksheetId = uid();
    axios
      .post(`http://localhost:49834/worksheets/create/${worksheetId}`, worksheet)
      .then(response => {
      })
      .catch(error => console.log("create worksheet list Error:", error))
  },
  deleteWorksheet({ commit }, id) {
    axios
    .delete(`http://localhost:49834/worksheets/delete/${id}`)
    .then(() => {
      commit("deleteWorksheet", id);
    })
    .catch(error => console.log("delete worksheet list Error:", error));
  },
  updateWorksheet({ commit }, payload) {
    axios
    .post(`http://localhost:49834/worksheets/update/${payload.id}`, {
          user: payload.user,
          project: payload.project,
          description: payload.description,
          time: payload.time,
          date: payload.date
    })
    .then(response => {
      commit("updateWorksheet", response.data);
    })
    .catch(error => console.log("update worksheet list Error:", error));
  }
}

const getters = {
  worksheets: state => {
    return state.worksheets;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
