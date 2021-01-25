<template>
  <q-card v-if="project">
    <div class="text-h6">Edit Project</div>
    <q-btn
          v-close-popup
          flat
          round
          dense
          icon="close" />

          <q-card-section>
            <div class="row q-mb-sm">
              <q-input
                    v-model="project.name"
                    outlined
                    bg-color="white"
                    :rules="[val => !!val || 'Field is required']"
                    lable="Name">
              </q-input>
            </div>
      <q-btn
       @click="submitProject"
       align="right"
       color="primary"
       glossy
       type="submit"
       label="Save"/>
          </q-card-section>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['project'],
  data() {
    return {

    }
  },
  methods: {
    ...mapActions('projects', ['updateProject']),
    submitProject() {
      console.log(this.project);
      this.updateProject({
        id: this.project.id,
        updates: this.project

      })
      this.$emit('close')
    }
  },
  mountred() {
    console.log(this.project);
  }

}
</script>
