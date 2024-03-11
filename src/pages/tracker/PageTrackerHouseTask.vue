<template>
  <PanelTask ref="taskPanel" />
</template>

<script setup>
  import PanelTask from '@/components/panels/PanelTask.vue';
</script>

<script>
  export default {
    name: 'PageTrackerHouseTask',
    data: () => ({
      
    }),
    computed: {
    	task_id () {
        return this.$route.params.task_id;
      },
    	house_id () {
        return this.$route.params.house_id;
      },
    	organization_id () {
      	return this.$route.params.organization_id;
    	},
    },
    mounted () {
    	this.$refs.taskPanel.show({
        task_id: this.task_id,
      	house_id: this.house_id,
      	organization_id: this.organization_id,
      });
    },
    methods: {
    },
  }
</script>

<style scoped>

</style>