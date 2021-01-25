<template>
  <q-page class="q-pa-md">
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="search"
        @keyup.enter="filterTask"
        class="col"
        filled
        square
        bg-color="white"
        dense
      >
        <template v-slot:append>
          <q-btn
          @click="filterTask"
          round
          dense
          flat
          icon="search"

          />
        </template>
      </q-input>
      <q-btn  @click="clear" color="secondary" glossy label="Reset"/>
    </div>

    <no-tasks v-if="tasksTodo.length"></no-tasks>

    <tasks-todo v-else :tasksTodo="tasksTodo"/>

    <tasks-completed v-if="Object.keys(tasksCompleted).length" :tasksCompleted="tasksCompleted"/>

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn @click="showAddTask = true" round color="primary" size="24px" icon="add"/>
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false"/>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      showAddTask: false
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"])
  },

  methods: {
    ...mapActions("tasks", ["getTaskList", "searchTasks"]),
    reset() {
      this.tax = null;
    },
    filterTask() {
      this.searchTasks(this.search)
    },
    clear() {
      this.search="",
      this.searchTasks(this.search)
    }
  },
  mounted() {
    this.$root.$on("showAddTask", ["search"], () => {
      (this.showAddTask = true), (this.search = true);
    });
    this.getTaskList();
  },

  components: {
    "add-task": require("components/Tasks/Modals/AddTask.vue").default,
    "tasks-todo": require("components/Tasks/TasksTodo.vue").default,
    "tasks-completed": require("components/Tasks/TasksCompleted.vue").default,
    "no-tasks": require("components/Tasks/NoTasks.vue").default
  }
};
</script>
