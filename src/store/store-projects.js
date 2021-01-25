import Vue from "vue";
import { uid } from "quasar";
import axios from "axios";

const state = {
  projects: []
};

const mutations = {
  getProjectList(state, payload) {
    state.projects = payload.map(item => {
      return {
          id: item.id,
          name: item.name
      };
    })
  },
  deleteProject(state, id) {
    state.projects = state.projects.filter(project => project.id !== id);
  },
  updateProject(state, payload) {
    state.projects = state.projects.map(project => {
      if (project.id === payload.id) {
        return {
          ...project,
          name: payload.updates.name,
          id: payload.updates.id
        };
      }
      return project;
    })
  },
  addProject(state, payload) {
    Vue.set(state.project, payload.id, payload.name)
  }
};


const actions = {
  searchProjects({ commit }, payload) {
    var url = `http://localhost:49834/projects/list?skip=0&take=1000`;
    if (payload.name){
      url += `&name=${payload.name}`;
    }
    axios
    .get(url)
    .then(response => {
      commit("getProjectList", response.data);
    })
    .catch(error => console.log("get project list Error:", error));
  },
  deleteProject({ commit }, id) {
    axios
    .delete(`http://localhost:49834/projects/delete/${id}`)
    .then(() => {
      commit("deleteProject", id);
    })
    .catch(error => console.log("delete project list Error:", error));
  },
  updateProject({ commit }, payload) {
    console.log(payload);
    axios
    .post(`http://localhost:49834/projects/update/${payload.id}`, {

      id: payload.updates.id,
      name: payload.updates.name
    })
    .then(response => {
      commit("updateProject", payload);
    })
    .catch(error => console.log("update project list Error:", error));
  },
  addProject({ commit }, project) {
    let projectId = uid();
    let payload = {
      id: projectId,
      project: project
    };
    axios
     .post(`http://localhost:49834/projects/create/${projectId}`, {
       name: project.name
     })
     .then(response => {
       commit("addProject", payload);
     })
     .catch(error => console.log("create project list Error:", error))
  }


}

const getters = {
  projects: state => {
    return state.projects;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
