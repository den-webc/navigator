<template>
    <panel-modal ref="popup" @close="close">
        <TaskInner :task_id="task_id" :house_id="house_id" />
    </panel-modal>
</template>

<script>

    import PanelModal from './PanelModal.vue'
    import TaskInner from '../tasks/TaskInner.vue'

    export default {

        name: 'PanelTask',

        components: { PanelModal, TaskInner },

        data: () => ({
            task_id: null,
            house_id: null,
            organization_id: null,
        }),

        methods: {
            close () {

                console.log(this.$route.path);

                this.$refs.popup.close();
                if(this.$route.name == 'PageTrackerHouse') {
                    history.pushState({}, null, this.$route.path);
                }
                if(this.$route.name == 'PageTrackerHouseTask') {
                    this.$router.push({name: 'PageTrackerHouse', params: {organization_id: this.organization_id, house_id: this.house_id}});
                }
            },
            show(opts = {}) {
                this.task_id = opts.task_id;
                this.house_id = opts.house_id;
                this.organization_id = opts.organization_id;

                this.$refs.popup.open();

                if(this.$route.name == 'PageTrackerHouse') {
                    history.pushState({}, null, this.$route.path + '/task/' + this.task_id);
                    // this.$router.push({name: 'PageTrackerHouseTask', params: {organization_id: this.organization_id, house_id: this.house_id, task_id: this.task_id}});
                }
            },
        },
    }
</script>

<style scoped>

</style>