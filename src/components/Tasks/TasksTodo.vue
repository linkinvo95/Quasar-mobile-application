<template>
	<div>
		<list-header
			bgColor="bg-orange-4"
			>Todo</list-header>

		<q-list
			separator
			bordered>

			<task
				v-for="(task, key) in tasksTodo"
		  	:key="key"
		  	:task="task"></task>

		</q-list>
	</div>
</template>

<script>
	export default {
    props: ['tasksTodo'],
		components: {
			'task' : require('components/Tasks/Task.vue').default,
			'list-header' : require('components/Shared/ListHeader.vue').default,
		}
	}
</script>
