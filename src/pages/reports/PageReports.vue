<template>
  <TopMenu :breadcrumbs="breadcrumbs"/>
  <div class="load-container" :class="{'load' : isLoad}">
  	<div class="content" v-if="!isLoad && !isError">

      <template v-if="companies.length > 1">
        <div class="collapse collapse--transparent" v-for="company in companies" :key="company.id">
          <div class="collapse__header js-collapse">
            <div class="component-badge"> {{ company.houses.length }} </div>
            {{ company.name }}
          </div>
          <div class="collapse__content">
            <div class="collapse__body">
              <HousePreview :house="house" :company="company" v-for="house in company.houses" :key="house.id" :hint="hint"/>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <HousePreview :house="house" :company="companies[0]" v-for="house in companies[0].houses" :key="house.id" :hint="hint"/>
      </template>
    </div>
  	<ErrorContent  v-else/>
	</div>
</template>

<script setup>
  import TopMenu from '@/components/TopMenu.vue'
  import ErrorContent from '@/components/ErrorContent.vue'
  import HousePreview from '@/components/reports/HousePreview.vue'
</script>

<script>

  export default {
    name: 'PageReports',

    data: () => ({
      isLoad: true,
      isError: false,
      breadcrumbs: [],
      companies: null,
      hint: null,
    }),

    computed: {
    
    },

    created () {

      this.hint = this.$moment().subtract(7, 'days').format('DD.MM') + ' — ' + this.$moment().format('DD.MM');

      this.breadcrumbs = [
        {name: this.$route.meta.name, link: this.$route.matched[0].path, ico: this.$route.meta.ico}
      ];

      Promise.all([this.loadData()])
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
        
    	},
    	async loadData () {
      	this.companies = await this.$store.dispatch('getReportsCompany');
    	},
    },
  }
</script>


<style scoped>
  .block {
    margin-bottom: 10px;
  }
  .collapse:not(:last-child) {
    margin-bottom: 5px;
  }
  
  .collapse__header {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.60px;
    word-wrap: break-word
  }

  .collapse__body {
    padding: 5px 0px 0px 20px;
  }

  .component-badge {
    background: #E9F1F4;
    height: 30px;
    width: 30px;
    border-radius: 30px;
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.05em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    color: var(--cozh-blue);
  }

</style>