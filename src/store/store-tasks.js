import Vue from "vue";
import { uid } from "quasar";
import axios from "axios";

const state = {
  tasks: []
};

const mutations = {
  getTaskList(state, payload) {
    state.tasks = payload.map(item => {
      return {
        id: item.id,
        description: item.description,
        completed: item.completed
      };
    });
  },
  updateTask(state, payload) {
    state.tasks = state.tasks.map(task => {
      if (task.id === payload.id) {
        return { ...task, description: payload.updates.description };
      }
      return task;
    });
  },
  deleteTask(state, id) {
    state.tasks = state.tasks.filter(task => task.id !== id);
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task);
  },
  completedTask(state, payload) {
    state.tasks = state.tasks.map(task => {
      if (task.id === payload.id) {
        return { ...task, completed: payload.completed };
      }
      return task;
    });
  }
};

const actions = {
  completedTask({ commit }, payload) {
    commit("completedTask", payload);
    // axios.post(`http://localhost:49834/todo/complete/${payload.id}`, {
    //   completed: payload.completed
    // })
    // .catch((error) => console.log('completed task list Error:', error));
  },
  getTaskList({ commit }, payload) {
    axios
      .get(`http://localhost:49834/todo/list`)
      .then(response => {
        commit("getTaskList", response.data);
      })
      .catch(error => console.log("get task list Error:", error));
  },
  searchTasks({ commit }, payload) {
    axios
      .get(`http://localhost:49834/todo/list?description=${payload}`)
      .then(response => {
        commit("getTaskList", response.data);
      })
      .catch(error => console.log("get task list Error:", error));
  },
  updateTask({ commit }, payload) {
    axios
      .post(`http://localhost:49834/todo/update/${payload.id}`, {
        description: payload.updates.description
      })
      .then(response => {
        commit("updateTask", payload);
      })
      .catch(error => console.log("update task list Error:", error));
  },
  deleteTask({ commit }, id) {
    axios
      .delete(`http://localhost:49834/todo/delete/${id}`)
      .then(() => {
        commit("deleteTask", id);
      })
      .catch(error => console.log("delete task list Error:", error));
  },
  addTask({ commit }, task) {
    let taskId = uid();
    let payload = {
      id: taskId,
      task: task
    };

    axios
      .post(`http://localhost:49834/todo/create/${taskId}`, {
        description: task.description
      })
      .then(response => {
        commit("addTask", payload);
      })
      .catch(error => console.log("create task list Error:", error));
  }
};

const getters = {
  tasksTodo: state => {
    let tasks = {};
    Object.keys(state.tasks).forEach(function(key) {
      let task = state.tasks[key];
      if (!task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  },
  tasksCompleted: state => {
    let tasks = {};
    Object.keys(state.tasks).forEach(function(key) {
      let task = state.tasks[key];
      if (task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
