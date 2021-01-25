<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">EditWorksheet</div>
      <q-space />
      <q-btn
          v-close-popup
          flat
          round
          dense
          icon="close" />
    </q-card-section>

    <form>
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
    @click="submitWorksheet"
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
  props: ["worksheet"],
  data() {
    return {
      worksheetToSubmit: {
        id: null,
        user: null,
        project: null,
        description: null,
        time: null,
        date: null
      }
    }
  },
  computed: {
    ...mapGetters("users", ["users"]),
    ...mapGetters("projects", ["projects"])
  },
  methods: {
    ...mapActions('worksheets', ['updateWorksheet']),
    ...mapActions("users", ["searchUsers"]),
    ...mapActions("projects", ["searchProjects"]),
    submitWorksheet(){
      this.updateWorksheet(
        this.worksheetToSubmit
      )
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
  },
  mounted() {
    this.worksheetToSubmit.id = this.worksheet.id;
    this.worksheetToSubmit.user = this.worksheet.user.id;
    this.worksheetToSubmit.project = this.worksheet.project?this.worksheet.project.id: null;
    this.worksheetToSubmit.description = this.worksheet.description;
    this.worksheetToSubmit.time = this.worksheet.time;
    this.worksheetToSubmit.date = this.worksheet.date;
  }
}
</script>
