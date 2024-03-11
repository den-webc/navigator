<template>
	<TopMenu :breadcrumbs="breadcrumbs"/>
	<div class="block">
		<div class="block__header block__header--nopadding">
			<Navigator :items="navigator"/>
		</div>
		<div class="block__body">
      <div class="load-container" :class="{'load' : isLoad}">
        <div class="content" v-if="!isLoad && !isError">
          <EditForm :organization="organization" :house="null" :cities="cities" :modules="modules"/>
        </div>
        <ErrorContent  v-else/>
      </div>
		</div>
	</div>
</template>

<script setup>
  import TopMenu from '@/components/TopMenu.vue'
  import Navigator from '@/components/Navigator.vue'
  import EditForm from '@/components/house/EditForm.vue'
  import ErrorContent from '@/components/ErrorContent.vue'
</script>

<script>
  export default {
    name: 'PageHouseCreate',
    data: () => ({
      isLoad: true,
      isError: false,

      breadcrumbs: [],
      navigator: [],

      organization: null,
    }),

    computed: {
    	organization_id () {
    		return this.$route.params.organization_id;
    	},
      cities () {
        return this.$store.state.cities;
      },
      modules () {
        return this.$store.state.modules;
      },
    },

    created () {
      Promise.all([
        this.loadOrganization(), 
        this.$store.dispatch('getCities'),
        this.$store.dispatch('getModules'),
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
        // Формируем крошки
        this.breadcrumbs = [
          {name: this.$route.meta.name, link: this.$route.matched[0].path, ico: this.$route.meta.ico},
          {name: this.organization.name, link: {name: 'PageOrganization', params: {organization_id: this.organization_id}}},
          {name: 'Добавить дом', link: ''},
        ];
        // Формируем навигатор
        this.navigator = [
          {name: 'Адрес дома', isActive: true},
          {name: 'Тех. параметры', isActive: false},
          {name: 'Структура', isActive: false},
          {name: 'Документы', isActive: false},
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