<template>
<div id="q-app">
  <div class="q-pa-md">

<q-input
        v-model="search.name"
        @keyup.enter="filterUser"
        filled
        clearable
        square
        bg-color="white"
        dense
        label="Name">
</q-input>
<q-input
        v-model="search.email"
        @keyup.enter="filterUser"
        filled
        square
        bg-color="white"
        dense
        label="Email">
</q-input>

<q-select
        v-model="search.userType"
        outlined
        :options="userTypes"
        clearable
        @input="filterUser()"
        label="Users Type"
        style="width: 150px"
      />

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
            <th>Email</th>
            <th>UserTypes</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>
              <q-btn
                @click.stop="promptToEdit(user)"
                flat
                round
                dense
                color="primary"
                style="margin-right: 10px !important;"
                icon="edit" />

                </td>
            <td>{{ user.name }}</td>
            <td>{{ user.email}}</td>
            <td>{{ user.type }}</td>
            <td>
              <q-btn
                  @click.stop="promptToDelete(user.id)"
                  flat
                  round
                  dense
                  color="red"
                  icon="delete"/>
            </td>
          </tr>

        </tbody>
      </table>
       <q-dialog v-model="showEditUser">
              <edit-user
                @close="showEditUser = false"
                :user="userToEdit" />
            </q-dialog>
      </div>
      <!-- /TABLE -->


<!-- ADD -->
      <div class="absolute-bottom text-center q-mb-lg">

      <q-btn
        @click="showAddUser = true"
        round
        color="primary"
        size="21px"
        icon="add"/>
</div>
  <q-dialog v-model="showAddUser">
    <add-user @close="showAddUser = false"/>
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
    name: null,
        email: null,
        userType: null,
      };
};

export default {

  data() {
    return {
      search: getDefaultSearchParameters(),
      userTypes: [ 'Admin', 'Employee' ],
      showAddUser: false,
      showEditUser: false,
      userToEdit: null
}
},
computed: {
    ...mapGetters("users", ["users"])
  },
  methods: {
    ...mapActions("users", ["searchUsers", "deleteUser"]),
    promptToEdit(user) {
        this.userToEdit = {
          id: user.id,
          name: user.name,
          email: user.email,
          type: user.type
        };
       this.showEditUser = true;
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
              this.deleteUser(id)
            })
      },
    filterUser() {
      this.searchUsers(this.search)
    },
    clear() {
      this.search = getDefaultSearchParameters();
      this.filterUser()
    }
  },
  mounted() {
    this.filterUser();
    this.$root.$on("showAddUser", ["search"], () => {
      (this.showAddUser = true), (this.search = true);
    });
  },
  components: {
    "add-user": require("components/Users/Modals/AddUser.vue").default,
    'edit-user': require('components/Users/Modals/EditUser.vue').default
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

