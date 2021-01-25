<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">AddProject</div>
<q-btn
      v-close-popup
      flat
      round
      dense
      icon=:close />
    </q-card-section>

    <form @submit.prevent="submitForm">
      <q-card-section>
        <div class="row q-mb-sm">
          <q-input
                v-model="projectToSubmit.name"
                outlined
                :rules="[val => !!val || 'Field is required']"
                ref="name"
                label="Project name" />
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
import { mapActions } from 'vuex'


export default {

  data() {
    return {
      projectToSubmit: {
        name: ''
      }
    }
  },
  methods: {
    ...mapActions('projects', ['addProject']),
    submitForm() {
      this.$refs.name.validate()
      if (!this.$refs.name.hasError) {
        this.submitProject()
      }
      this.addProject({...this.projectToSubmit})
      this.$emit('close')
    },
    submitProject() {
      console.log('submitProject')
    }
  }
}
</script>
