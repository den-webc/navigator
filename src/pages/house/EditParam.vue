<template>
  <MessageDialogue ref="messageDialogue" />
  <ConfirmDialogue ref="confirmDialogue" />
  <edit-template :breadcrumbs="breadcrumbs" :nav="nav">
    <div class="load-container" :class="{'load' : isLoad}">
      <template v-if="!isLoad && !isError">
          <div class="collapse" v-for="(item) in house.module" :key="item.num">
            <div class="collapse__header js-collapse">
                {{ map[item.num].module }}
            </div>
            <div class="collapse__content">
              <div class="collapse__body">
                <div class="items">
                  <div class="item" v-for="param in map[item.num].techParams" :key="param.id">
                    <div class="switcher">
                      <input :id="param.id" type="checkbox" v-model="picked[item.num]" :value="param.id">
                      <label :for="param.id"> {{ param.name }} </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="btn-group">
            <router-link :to="{name: 'PageHouseEdit', params: {organization_id: organization_id, house_id: house_id} }" class="btn btn--lg btn--outline">
              <img class="btn--ico btn--ico--left" src="@/assets/img/prew-arrow-blue.svg">
              <div class="btn--text"> вернуться </div>
              <div class="btn--loader"></div>
            </router-link>
            <a class="btn btn--lg btn--default" @click="saveParam($event)" href="javascript:;">
              <div class="btn--text"> Продолжить </div>
              <img class="btn--ico btn--ico--right" src="@/assets/img/next-arrow-white.svg">
              <div class="btn--loader"></div>
            </a>
          </div>

      </template>
      <ErrorContent  v-else/>
    </div>
  </edit-template>
</template>


<script setup>
  import ErrorContent from '@/components/ErrorContent.vue';
  import EditTemplate from '@/components/house/EditTemplate.vue';
  import MessageDialogue from '@/components/modals/MessageDialogue.vue';
  import ConfirmDialogue from '@/components/modals/ConfirmDialogue.vue';
</script>

<script>
  export default {
    
    name: 'PageHouseEditParam',

    data: () => ({
      isLoad: true,
      isError: false,

      breadcrumbs: [],
      nav: [],

      organization: null,
      house: null,

      map: null,
      picked: {},
    }),
    
    computed: {
    	organization_id () {
    		return this.$route.params.organization_id;
    	},
      house_id () {
        return this.$route.params.house_id;
      },
    },

    created () {
      // Формируем навигатор
      this.nav = [
        {name: 'Адрес дома', isActive: false, link: {name: 'PageHouseEdit', params: {organization_id: this.organization_id, house_id: this.house_id}}},
        {name: 'Тех. параметры', isActive: true},
        {name: 'Структура', isActive: false, link: {name: 'PageHouseEditStructure', params: {organization_id: this.organization_id, house_id: this.house_id}}},
        {name: 'Документы', isActive: false, link: {name: 'PageHouseEditDocuments', params: {organization_id: this.organization_id, house_id: this.house_id}}},
      ];
      Promise.all([
        this.loadOrganization(), 
        this.loadHouse(), 
        this.loadTechMap()
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
        // Расставляем чекбоксы
        this.house.module.forEach((module) => {
          this.picked[module.num] = [];
          this.map[module.num].techParams.forEach((param) => {
            if(param.exists) {
              this.picked[module.num].push(param.id);
            }
          });
        });
        // Формируем крошки
        this.breadcrumbs = [
          {name: this.$route.meta.name, link: this.$route.matched[0].path, ico: this.$route.meta.ico },
          {name: this.organization.name, link: {name: 'PageOrganization', params: {organization_id: this.organization_id}}},
          {name: this.house.address, link: {name: 'PageHouseMain', params: {organization_id: this.organization_id, house_id: this.house_id}}},
          {name: 'Тех. параметры', link: '' },
        ];
      },
      async saveParam (e) {
        let btn = e.currentTarget;
        btn.classList.add('btn--load');
        try {
          await this.axios.put(this.$store.state.api_endpoint + '/houses/' + this.house.id + '/techMap', { modules: this.picked });
          await this.axios.post(this.$store.state.api_endpoint + '/houses/' + this.house_id + '/metaTemplate');
          this.$router.push({name: 'PageHouseEditStructure', params: {organization_id: this.organization_id, house_id: this.house_id }});
        } catch (e) {
          this.$refs.messageDialogue.show({message: e.message, okButton: 'Подтвердить'});
        }
        btn.classList.remove('btn--load');
      },
    	async loadOrganization () {
      	const r = await this.axios.get(this.$store.state.api_endpoint + '/companies/' + this.organization_id);
        this.organization = r.data;
    	},
      async loadHouse () {
        const r = await this.axios.get(this.$store.state.api_endpoint + '/houses/' + this.house_id + '?detailed=true');
        this.house = r.data;
      },
      async loadTechMap () {
        const r = await this.axios.get(this.$store.state.api_endpoint + '/houses/' + this.house_id + '/techMap');
        this.map = r.data.modules;
      },
    },
  }
</script>

<style scoped>

  .load-container {
    padding: 25px;
  }

  .btn-group {
    justify-content: space-between;
    margin-top: 30px;
  }

  .collapse {
    margin-bottom: 10px;
  }

  .items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .item {
    width: 50%;
    padding: 5px 20px;

  }
  .item:not(:nth-last-child(-n+2)) {
    border-bottom: 1px solid var(--cozh-light-grey);
  }
  .item:nth-child(2n) {
    border-left: 1px solid var(--cozh-light-grey);
  }
  .collapse__body {
    padding: 0px;
  }
</style>