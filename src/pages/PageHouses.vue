<template>
	<TopMenu :breadcrumbs="breadcrumbs"/>
  <div class="load-container" :class="{'load' : isLoad}">
    <div class="content" v-if="!isLoad && !isError">
      <div class="block" v-if="organizations.length === 1">
        <div class="block__header">
          Дома
        </div>
        <div class="block__body">
          <InfoHouses :organization_id="organizations[0].id"/>
        </div>
      </div>
    </div>
    <ErrorContent v-else/>
  </div>
</template>

<script setup>
  import TopMenu from '@/components/TopMenu.vue'
  import InfoHouses from '@/components/organization/InfoHouses.vue'
</script>

<script>
  export default {
    name: 'PageHouses',
    data: () => ({
      isLoad: true,
      isError: false,

      organizations: [],
      breadcrumbs: [],
    }),
    created () {
      Promise.all([this.loadOrganizations()])
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
          { name: this.$route.meta.name, link: this.$route.matched[0].path, ico: this.$route.meta.ico },
        ];
      },
      async loadOrganizations () {
        const r = await this.axios.get(this.$store.state.api_endpoint + '/companies/');
        if(r.status == 200) {
          this.organizations = r.data.data;
        }
      },
    },
  }
</script>

<style scoped>
  .block {
    margin-bottom: 10px;
  }
</style>