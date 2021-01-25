<template>
  <q-item
  	@click="completedTask({ id: task.id, completed: !task.completed })"
  	:class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
  	clickable
  	v-ripple>
    <q-item-section side top>
      <q-checkbox
        v-model="task.completed"
        class="no-pointer-events" />
    </q-item-section>

    <q-item-section>
      <q-item-label
      	:class="{ 'text-strikethrough' : task.completed }">
      	{{ task.description }}
      </q-item-label>
    </q-item-section>

    <q-item-section
      v-if="task.dueDate"
      side>
    	<div class="row">
    		<div class="column justify-center">
		    	<q-icon
		    		name="event"
		    		size="18px"
		    		class="q-mr-xs" />
    		</div>
	    	<div class="column">
          <q-item-label
          	class="row justify-end"
          	caption>
          	{{ task.dueDate }}
          </q-item-label>
          <q-item-label
          	class="row justify-end"
          	caption>
          	<small>{{ task.dueTime }}</small>
          </q-item-label>
	    	</div>
    	</div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEditTask = true"
          flat
          round
          dense
          color="primary"
          style="margin-right: 10px !important;"
          icon="edit" />
        <q-btn
          @click.stop="promptToDelete(task.id)"
          flat
          round
          dense
          color="red"
          icon="delete" />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <edit-task
        @close="showEditTask = false"
        :task="task"
        :id="task.id" />
    </q-dialog>

  </q-item>
</template>

<script>
  import { mapActions } from 'vuex'

	export default {
		props: ['task', 'id'],
    data() {
      return {
        showEditTask: false
      }
    },
    methods: {
      ...mapActions('tasks', ['updateTask', 'deleteTask', 'completedTask']),
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
          this.deleteTask(id)
        })
      }
    },
    components: {
      'edit-task': require('components/Tasks/Modals/EditTask.vue').default
    }
	}
</script>
