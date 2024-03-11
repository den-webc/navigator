<template>
  <TopMenu :breadcrumbs="breadcrumbs"/>
  <div class="load-container" :class="{'load' : isLoad}">
    <div class="content" v-if="!isLoad && !isError">
      <OrganizationInfo 
        v-for="(org) in organizations" 
        :key="org.id" 
        style="margin-bottom: 10px;"
        :organization="org"
        :advanced="true"
        :tab="1"
      />
    </div>
    <ErrorContent  v-else/>
  </div>
</template>

<script setup>
  import TopMenu from '@/components/TopMenu.vue'
  import OrganizationInfo from '@/components/organization/Info.vue'
  import ErrorContent from '@/components/ErrorContent.vue'
</script>

<script>
  export default {
    name: 'PageOrganizations',
    data: () => ({
      isLoad: true,
      isError: false,

      breadcrumbs: [],
      organizations: [],
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
          { name: this.$route.meta.name, link: this.$route.path, ico: this.$route.meta.ico },
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

</style>