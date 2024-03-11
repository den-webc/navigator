<template>
  <edit-template :breadcrumbs="breadcrumbs" :nav="nav">
    <div class="load-container" :class="{'load' : isLoad}">
      <template v-if="!isLoad && !isError">
        <EditForm :organization="organization" :house="house" :cities="cities" :modules="modules"/>
      </template>
      <ErrorContent  v-else/>
    </div>
  </edit-template>
</template>

<script setup>
  import EditForm from '@/components/house/EditForm.vue';
  import ErrorContent from '@/components/ErrorContent.vue';
  import EditTemplate from '@/components/house/EditTemplate.vue';
</script>

<script>
  export default {
    name: 'PageHouseEdit',
    data: () => ({
      isLoad: true,
      isError: false,
      breadcrumbs: [],
      nav: [],
      organization: null,
      house: null,
    }),
    computed: {
    	organization_id () {
    		return this.$route.params.organization_id;
    	},
      house_id () {
        return this.$route.params.house_id;
      },
      cities () {
        return this.$store.state.cities;
      },
      modules () {
        return this.$store.state.modules;
      },
    },
    created () {
      this.nav =  [
        {name: 'Адрес дома', isActive: true},
        {name: 'Тех. параметры', isActive: false, link: {name: 'PageHouseEditParam', params: {organization_id: this.organization_id, house_id: this.house_id}}},
        {name: 'Структура', isActive: false, link: {name: 'PageHouseEditStructure', params: {organization_id: this.organization_id, house_id: this.house_id}}},
        {name: 'Документы', isActive: false, link: {name: 'PageHouseEditDocuments', params: {organization_id: this.organization_id, house_id: this.house_id}}},
      ];
      Promise.all([
        this.loadOrganization(), 
        this.loadHouse(), 
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
        this.breadcrumbs = [
          {name: this.$route.meta.name, link: this.$route.matched[0].path, ico: this.$route.meta.ico },
          {name: this.organization.name, link: {name: 'PageOrganization', params: {organization_id: this.organization_id}}},
          {name: this.house.address, link: {name: 'PageHouseMain', params: {organization_id: this.organization_id, house_id: this.house_id}}},
          {name: 'Адрес дома', link: '' },
        ];
      },
    	async loadOrganization () {
      	const r = await this.axios.get(this.$store.state.api_endpoint + '/companies/' + this.organization_id);
        this.organization = r.data;
    	},
      async loadHouse () {
        const r = await this.axios.get(this.$store.state.api_endpoint + '/houses/' + this.house_id + '?detailed=true');
        this.house = r.data;
      },
    },
  }
</script>

<style scoped>

</style>