<template>
	<TopMenu :breadcrumbs="breadcrumbs"/>
	<div class="block">
		<div class="block__header">
			Добавить сотрудника
		</div>
		<div class="block__body">
      <div class="load-container" :class="{'load' : isLoad}">
        <div class="content" v-if="!isLoad && !isError">
          <EditForm :organization="organization" :employee="null" :functions="functions" :roles="roles"/>
        </div>
        <ErrorContent  v-else/>
      </div>
		</div>
	</div>
</template>

<script setup>
  import TopMenu from '@/components/TopMenu.vue'
  import ErrorContent from '@/components/ErrorContent.vue'
  import EditForm from '@/components/employee/EditForm.vue'
</script>

<script>
  export default {
    name: 'PageOrganizationCreateEmployee',
    data: () => ({
      isLoad: true,
      isError: false,
      breadcrumbs: [],
      organization: null,
    }),

    computed: {
    	organization_id () {
    		return this.$route.params.organization_id;
    	},
      functions () {
        return this.$store.state.functions;
      },
      roles () {
        return this.$store.state.roles;
      },
    },

    created () {
      Promise.all([
        this.loadOrganization(), 
        this.$store.dispatch('getRoles'),
        this.$store.dispatch('getFunctions'),
        ])
      .then(() => {
        this.beforeRender();
        this.isLoad = false;
      })
      .catch((e)=> {
        console.log(e);
        this.isError = true;
        this.isLoad = false;
      })
    },

    methods: {
      beforeRender () {
        this.breadcrumbs = [
          {name: this.$route.meta.name, link: this.$route.matched[0].path, ico: this.$route.meta.ico},
          {name: this.organization.name, link: {name: 'PageOrganization', params: {organization_id: this.organization_id}}},
          {name: 'Добавить сотрудника', link: ''},
        ];
      },
    	async loadOrganization () {
      	const r = await this.axios.get(this.$store.state.api_endpoint + '/companies/' + this.organization_id);
        this.organization = r.data;
    	},
    },
  }
</script>

<style scoped>

</style>