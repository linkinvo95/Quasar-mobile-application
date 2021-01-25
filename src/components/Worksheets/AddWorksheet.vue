<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">AddWorksheet</div>
      <q-space />
      <q-btn
          v-close-popup
          flat
          round
          dense
          icon="close" />
    </q-card-section>

    <form @submit.prevent="submitForm">
      <q-card-section>
        <div class="row q-mb-sm">
          <q-select
        filled
        v-model="worksheetToSubmit.user"
        :options="users"
        option-value="id"
        option-label="name"
        label="Users"
        emit-value
        map-options
        square
        style="min-width: 250px; max-width: 200px" />
        </div>
        <div class="row q-mb-sm">
          <q-select
        filled
        v-model="worksheetToSubmit.project"
        :options="projects"
        option-value="id"
        option-label="name"
        label="Projects"
        emit-value
        map-options
        clearable
        square
        style="min-width: 250px; max-width: 200px" />
        </div>
        <div class="row q-mb-sm">
          <q-input
                v-model="worksheetToSubmit.description"
                outlined
                :rules="[val => !!val || 'Field is required']"
                ref="name"
                label="Description" />
        </div>

<div
		class="row q-mb-sm">
    <modal-time
              v-if="worksheetToSubmit.date"
              :dueTime.sync="worksheetToSubmit.time" />
</div>
<div class="row q-mb-sm">
  <modal-date
            :dueDate.sync="worksheetToSubmit.date"
            @clear="clearDueDate" />
</div>

      </q-card-section>

      <q-card-actions align="right">
  <q-btn
    label="Save"
    color="primary"
    type="submit" />
</q-card-actions>
    </form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex"
import { mapGetters } from "vuex"
import axios from "axios"

export default {
  data() {
    return {
      worksheetToSubmit: {
        user: '',
        project: '',
        description: '',
        time: '',
        date: ''
      }
    }
  },
  computed: {
    ...mapGetters("users", ["users"]),
    ...mapGetters("projects", ["projects"])
  },
  methods: {
    ...mapActions('worksheets', ['addWorksheet']),
    ...mapActions("users", ["searchUsers"]),
    ...mapActions("projects", ["searchProjects"]),
    submitForm() {
     this.addWorksheet({...this.worksheetToSubmit})
     this.$emit('close')
    },
    clearDueDate() {
      this.worksheetToSubmit.date = ''
      this.worksheetToSubmit.time = ''
    }
  },
  components: {
      'modal-time': require('components/Worksheets/Modal/DueTime.vue').default,
      'modal-date': require('components/Worksheets/Modal/DueDate.vue').default
  }
}
</script>
