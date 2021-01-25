<template>
  <div id="q-app">
<div class="row q-pa-sm bg-primary">
  <q-input
        v-model="search.name"
        @keyup.enter="filterProject"
        class="col"
        filled
        square
        bg-color="white"
        dense
        lablel="Search"
      >
        <template v-slot:append>
          <q-btn
          @click="filterProject"
          round
          dense
          flat
          icon="search"/>
         </template>
   </q-input>
  <q-btn
     @click="clear"
     color="secondary"
     glossy
     label="Reset"/>
</div>

     <!-- TABLE -->
<div rounded-borders>
<table >
        <thead>
          <tr>
            <th>edit</th>
            <th>Name</th>
            <th>ID</th>
            <th>elete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(project, index) in projects" :key="index">
            <td>
              <q-btn
                @click.stop="promptToEdit(project)"
                flat
                round
                dense
                color="primary"
                style="margin-right: 10px !important;"
                icon="edit" />
            </td>
            <td>{{ project.name }}</td>
            <td>{{ project.id }}</td>
            <td>
              <q-btn
                  @click.stop="promptToDelete(project.id)"
                  flat
                  round
                  dense
                  color="red"
                  icon="delete"/>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- EDIT -->
      <q-dialog v-model="showEditProject">
        <edit-project
                    @close="showEditProject = false "
                    :project="projectToEdit"/>
      </q-dialog>
      <!-- /EDIT -->

      </div>
  <!-- /TABLE -->

  <!-- ADD -->
<div class="absolute-bottom text-center q-mb-lg">
    <q-btn
        @click="showAddProject = true"
        round
        color="primary"
        size="21px"
        icon="add" />
</div>
<q-dialog v-model="showAddProject">
  <add-project @close="showAddProject = false" />
</q-dialog>
  <!--/ ADD -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import axios from "axios";

var getDefaultSearchParameters = function () {
  return {
    name: null
  };
};


export default {

data() {
  return {
    search: getDefaultSearchParameters(),
    showEditProject: false,
    projectToEdit: null,
    showAddProject: false

  }
},
computed: {
  ...mapGetters("projects", ["projects"])
},
methods: {
  ...mapActions("projects", ["searchProjects", "deleteProject"]),
  promptToEdit(project) {
    this.projectToEdit = {
      id: project.id,
      name: project.name
    };
    this.showEditProject = true
  },
  promptToDelete(id) {
    this.$q.dialog({
      title: 'Confirm',
      message: 'Really delete?',
      ok: {
        push: true
      },
      cancel: {
        color: 'negative'
      },
      persistent: true
    }).onOk(() => {
      this.deleteProject(id)
    })
  },
filterProject() {
  this.searchProjects(this.search)
},
clear() {
    this.search = getDefaultSearchParameters();
    this.filterProject()
  }
},
mounted() {
  this.filterProject();
  this.$root.$on("showAddProject", ["search"], () => {
    (this.showAddProject = true), (this.search = true);
  });

},
components: {
     "edit-project": require("components/Projects/EditProject.vue").default,
     "add-project": require("components/Projects/AddProject.vue").default
  }
}

</script>

<style scoped>
 table {
width: 100%; /* Ширина таблицы */
border: 4px double black; /* Рамка вокруг таблицы */
border-collapse: collapse; /* Отображать только одинарные линии */
}
th {
text-align: left; /* Выравнивание по левому краю */
background: #ccc; /* Цвет фона ячеек */
padding: 5px; /* Поля вокруг содержимого ячеек */
border: 1px solid black; /* Граница вокруг ячеек */
}
td {
padding: 5px; /* Поля вокруг содержимого ячеек */
border: 1px solid black; /* Граница вокруг ячеек */
}
</style>
