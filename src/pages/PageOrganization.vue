<template>
  <TopMenu :breadcrumbs="breadcrumbs"/>
  <div class="load-container" :class="{'load' : isLoad}">
    <div class="content" v-if="!isLoad && !isError">
      <Info :organization="organization" :advanced="false" />
      <div class="block">
        <div class="block__header">
          Дома
        </div>
        <div class="block__body">
          <InfoHouses :organization_id="organization_id"/>
        </div>
      </div>
      <div class="block">
        <div class="block__header">
          Сотрудники
        </div>
        <div class="block__body">
          <InfoEmployees :organization_id="organization_id"/>
        </div>
      </div>
    </div>
    <ErrorContent v-else/>
  </div>
</template>

<script setup>
  import TopMenu from '@/components/TopMenu.vue'
  import Info from '@/components/organization/Info.vue'
  import InfoEmployees from '@/components/organization/InfoEmployees.vue'
  import InfoHouses from '@/components/organization/InfoHouses.vue'
  import ErrorContent from '@/components/ErrorContent.vue'
</script>

<script>
  export default {
    name: 'PageOrganization',
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
    },

    created () {
      Promise.all([this.loadOrganization()])
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
          { name: this.organization.name, link: '' },
        ];
      },
      async loadOrganization () {
        const r = await this.axios.get(this.$store.state.api_endpoint + '/companies/' + this.organization_id);
        if(r.status == 200) {
          this.organization = r.data;
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