<template>
  <div id="q-app">
    <div>

<q-select
        filled
        v-model="search.user"
        @input="filterWorksheet()"
        :options="users"
        option-value="id"
        option-label="name"
        label="Users"
        emit-value
        map-options
        clearable
        square
        style="min-width: 250px; max-width: 300px" />

<q-select
        filled
        v-model="search.project"
        @input="filterWorksheet()"
        :options="projects"
        option-value="id"
        option-label="name"
        label="Projects"
        emit-value
        map-options
        clearable
        square
        style="min-width: 250px; max-width: 300px" />
<q-btn
      @click="clear"
      color="secondary"
      glossy
      label="Reset" />
    </div>
      <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Project</th>
            <th>Description</th>
            <th>Time</th>
            <th>Date</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(worksheet, index) in worksheets" :key="index">
          <td><q-btn
                @click.stop="promptToEdit(worksheet)"
                flat
                round
                dense
                color="primary"
                style="margin-right: 10px !important;"
                icon="edit" /></td>
          <td>{{ worksheet.user.name }}</td>
          <td>{{ worksheet.project && worksheet.project.name }}</td>
          <td>{{ worksheet.description }}</td>
          <td>{{ worksheet.time }}</td>
          <td>{{ worksheet.date }}</td>
          <td><q-btn
                  @click.stop="WorksheetToDelete(worksheet.id)"
                  flat
                  round
                  dense
                  color="red"
                  icon="delete"/></td>
          </tr>
        </tbody>
      </table>
       <q-dialog v-model="showEditWorksheet" v-if="showEditWorksheet">
        <edit-worksheet @close="showEditWorksheet = false" :worksheet="worksheetToEdit"/>
      </q-dialog>
      </div>

<!-- ADD -->
      <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        @click="showAddWorksheet = true"
        round
        color="primary"
        size="21px"
        icon="add"/>
</div>
  <q-dialog v-model="showAddWorksheet">
    <add-worksheet @close="showAddWorksheet = false"/>
  </q-dialog>

<!-- /ADD -->

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import axios from "axios";

var getDefaultSearchParameters = function () {
  return {
    user: null,
    project: null
  };
};

export default {

data() {
  return {
    search: getDefaultSearchParameters(),
    showAddWorksheet: false,
    showEditWorksheet: false,
    worksheetToEdit: null
  }
},
computed: {
  ...mapGetters("worksheets", ["worksheets"]),
  ...mapGetters("users", ["users"]),
  ...mapGetters("projects", ["projects"])
},
methods: {
  ...mapActions("worksheets", ["searchWorksheets", "deleteWorksheet"]),
  ...mapActions("users", ["searchUsers"]),
  ...mapActions("projects", ["searchProjects"]),

  filterWorksheet() {
    this.searchWorksheets(this.search);
    this.searchUsers(this.search);
    this.searchProjects(this.search);
  },
  WorksheetToDelete(id) {
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
              this.deleteWorksheet (id)
            })
  },
  promptToEdit(worksheet) {
    this.worksheetToEdit = {
      id: worksheet.id,
      user: worksheet.user,
      project: worksheet.project,
      description: worksheet.description,
      time: worksheet.time,
      date: worksheet.date
    };
    this.showEditWorksheet = true;
  },
  clear() {
    this.search = getDefaultSearchParameters();
    this.filterWorksheet()
  }
},
mounted() {
  this.filterWorksheet();
  this.$root.$on("showAddWorksheet", ["search"], () => {
      (this.showAddWorksheet = true), (this.search = true);
    });
},
components: {
  "add-worksheet": require("components/Worksheets/AddWorksheet.vue").default,
  "edit-worksheet": require("components/Worksheets/EditWorksheet.vue").default
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
.q-pa-md{
  display: flex;
  justify-content: space-between;
}
</style>
