<template>
	<q-card v-if="user">
<div class="text-h6">Edit User</div>
 <q-btn
	  	v-close-popup
	  	flat
	  	round
	  	dense
	  	icon="close" />

	    <q-card-section>
<div class="row q-mb-sm">
    <q-input
        v-model="user.name"
        outlined
        bg-color="white"
        :rules="[val => !!val || 'Field is required']"
        label="Name">
</q-input>
</div>

<div class="row q-mb-sm">
<q-input
        v-model="user.email"
        outlined
        bg-color="white"
        :rules="[val => !!val || 'Field is required']"
        label="Email">
</q-input>
</div>
 <q-select
        v-model="user.type"
        outlined
        :options="userTypes"
        label="Users Type"
        style="width: 150px"
      />

   <q-btn align="right"
     @click="submitUser"
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
    props: ['user'],
    data() {
    return {
      userTypes: [ 'Admin', 'Employee' ]
}
},
  		methods: {
			...mapActions('users', ['updateUser']),
			submitUser() {
				this.updateUser({
					id: this.user.id,
					updates: this.user
				})
				this.$emit('close')
			}
    },
    mounted() {
      console.log(this.user);
    }
	}
</script>
