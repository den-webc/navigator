<template>

  <MessageDialogue ref="messageDialogue" />
  <ConfirmDialogue ref="confirmDialogue" />

  <edit-template :breadcrumbs="breadcrumbs" :nav="nav">
    <div class="load-container" :class="{'load' : isLoad}">
      <template v-if="!isLoad && !isError">

        <div class="section-count">
          <div class="label"> Количество <br /> секций </div>
          <CounterPicker 
            :value="structure.section.length"
            :size="'large'"
            @setValue="(val) => { setSectionCount(val) }"
          />
        </div>
        <!-- Строимся по мета структуре -->
        <div v-for="(meta, index) in structureMeta" :key="index">
          <!-- Стандартные элементы -->
          <div class="collapse" v-if="meta.name !== 'section'">
            <div class="collapse__header js-collapse">
              {{ meta.description }}
            </div>
            <div class="collapse__content">
              <div class="collapse__body">
                <table class="table-custom">
                  <tbody>
                    <tr v-for="(child, idx) in meta.child" :key="idx">
                      <td> 
                        <span :class="{'empty': structure[$helpers._snake2Pascal(meta.name)][0][$helpers._snake2Pascal(child.name)].length == 0}"> 
                          {{ child.description }}
                        </span> 
                      </td>
                      <td>
                        <CounterPicker 
                          :value="structure[$helpers._snake2Pascal(meta.name)][0][$helpers._snake2Pascal(child.name)].length"
                          @setValue="(val) => { setValue(val, meta.name, child.name) }"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- Секции -->
          <template v-else>
            <div class="collapse" v-for="(section, index) in structure.section" :key="index">
              <div class="collapse__header js-collapse">
                Секция {{ index + 1 }}
              </div>
              <div class="collapse__content">
                <div class="collapse__body">
                  <table class="table-custom">
                    <tbody>
                      <tr>
                        <td> <span :class="{'empty': section.level.length == 0}"> Этаж </span> </td>
                        <td colspan="2"> 
                          <CounterPicker :value="section.level.length" @setValue="(val) => { setValueSection(val, index, 'level') }" />
                        </td>
                      </tr>
                      <tr v-for="(range, idx) in section.levelRange" :key="'range' + index + idx">
                        <td> Диапазон этажей </td>
                        <td>
                          <DiapasonPicker :value="{ min: range.min, max: range.max }" @setValue="(val) => { setDiapason(val, index, idx) }" />
                        </td>
                        <td>
                          <a class="btn--delete" href="javascript:;" @click="deleteDiapason(index, idx)" v-if="idx > 0">
                            <span> Удалить </span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13 1L1 13M1 1L13 13" stroke="#AEC1CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td> <span :class="{'empty': section.elevator.length == 0}"> Лифт </span> </td>
                        <td colspan="2"> 
                          <CounterPicker :value="section.elevator.length" @setValue="(val) => { setValueSection(val, index, 'elevator') }" />
                        </td>
                      </tr>
                      <tr>
                        <td colspan="3" style="padding: 15px 25px;">
                          <a class="btn btn--outline-action btn--md btn--inline" @click="createDiapasonFloor(index)">
                            <img class="btn__ico btn--ico--left" src="@/assets/img/plus-grey.svg">
                            <div class="btn--text"> Добавить диапазон этажей </div>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          <!-- Секции -->
          </template>
        <!-- Строимся по мета структуре -->
        </div>
        <!-- Управление страницей -->
        <div class="btn-group">
          <!-- Назад к тех. параметрам -->
          <router-link :to="{name: 'PageHouseEditParam', params: {organization_id: organization_id, house_id: house_id} }" class="btn btn--lg btn--outline">
            <img class="btn--ico btn--ico--left" src="@/assets/img/prew-arrow-blue.svg">
            <div class="btn--text"> вернуться </div>
            <div class="btn--loader"></div>
          </router-link>
          <!-- Сохранить -->
          <a class="btn btn--lg btn--default" @click="saveStructure($event)" href="javascript:;">
            <img class="btn--ico btn--ico--left" src="@/assets/img/check-white.svg">
            <div class="btn--text"> Сохранить </div>
            <div class="btn--loader"></div>
          </a>
        </div>

      </template>
      <ErrorContent  v-else/>
    </div>
  </edit-template>
</template>

<script setup>
  import EditTemplate from '@/components/house/EditTemplate.vue';
  import ErrorContent from '@/components/ErrorContent.vue';
  import CounterPicker from '@/components/ux/CounterPicker.vue';
  import DiapasonPicker from '@/components/ux/DiapasonPicker.vue';
  import MessageDialogue from '@/components/modals/MessageDialogue.vue';
  import ConfirmDialogue from '@/components/modals/ConfirmDialogue.vue';
</script>

<script>
  export default {
    name: 'PageHouseEditStructure',
    data: () => ({
      isLoad: true,
      isError: false,

      breadcrumbs: [],
      nav: [],

      organization: null,
      house: null,
      structure: null,
    }),
    computed: {
      organization_id () {
    		return this.$route.params.organization_id;
    	},
      house_id () {
        return this.$route.params.house_id;
      },
      structureMeta () {
        return this.$store.state.location_types;
      },
    },

    created () {
      this.nav = [
        {name: 'Адрес дома', isActive: false, link: {name: 'PageHouseEdit', params: {organization_id: this.organization_id, house_id: this.house_id}}},
        {name: 'Тех. параметры', isActive: false, link: {name: 'PageHouseEditParam', params: {organization_id: this.organization_id, house_id: this.house_id}}},
        {name: 'Структура', isActive: true},
        {name: 'Документы', isActive: false, link: {name: 'PageHouseEditDocuments', params: {organization_id: this.organization_id, house_id: this.house_id}}},
      ];
      Promise.all([
        this.loadOrganization(), 
        this.loadHouse(), 
        this.loadStructure(),
        this.$store.dispatch('getLocationTypes'),
      ])
      .then(() => {
        this.beforeRender();
        if(this.structure == null) {
          this.structure = this.$helpers.buildDefaultStructure(this.structureMeta);
        }
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
          {name: this.house.address, link: {name: 'PageHouseMain', params: {organization_id: this.organization_id, house_id: this.house_id}}},
          {name: 'Структура', link: ''},
        ];
      },
      async loadStructure () {
        const r = await this.axios.get(this.$store.state.api_endpoint + '/houses/' + this.house_id + '/structure');
        this.structure = r.data.structure;
      },
    	async loadOrganization () {
      	const r = await this.axios.get(this.$store.state.api_endpoint + '/companies/' + this.organization_id);
        this.organization = r.data;
    	},
      async loadHouse () {
        const r = await this.axios.get(this.$store.state.api_endpoint + '/houses/' + this.house_id + '?detailed=true');
        this.house = r.data;
      },
      setValue (val, name, child) {
        const metaIdx = this.structureMeta.findIndex((element) => { return element.name == name })
        const metaChildIdx = this.structureMeta[metaIdx].child.findIndex((element) => { return element.name == child })
        const metaData = this.structureMeta[metaIdx].child[metaChildIdx];
        let arr = this.structure[this.$helpers._snake2Pascal(name)][0][this.$helpers._snake2Pascal(child)];
        const data = { type: metaData.name, description: metaData.description, info:'string' };
        this.$helpers.resizeArray(arr, val, data);
      },
      setValueSection (val, secIdx, prop) {
        let arr = this.structure.section[secIdx][prop];
        const metaChildIdx = this.structureMeta[0].child.findIndex((element) => { return element.name == prop })
        const metaData = this.structureMeta[0].child[metaChildIdx];
        const data = { type: metaData.name, description: metaData.description, info:'string' };
        this.$helpers.resizeArray(arr, val, data);
      },
      setDiapason(val, secIdx, diapasonIdx) {
        let arr = this.structure.section[secIdx].levelRange[diapasonIdx];
        arr.min = Number(val.min);
        arr.max = Number(val.max);
      },
      setSectionCount (val) {
        let arr = this.structure.section;
        const newSection = this.$helpers.buildDefaultBlock(this.structureMeta[0]);
        this.$helpers.resizeArray(arr, val, newSection);
      },
      createDiapasonFloor (secIdx) {
        let arr = this.structure.section[secIdx].levelRange;
        arr.push( {type: 'level_range', description: 'Диапазон этажей', info: 'string', min: 0, max: 0 } );
      },
      deleteDiapason (secIdx, diapasonIdx) {
        this.structure.section[secIdx].levelRange.splice(diapasonIdx, 1);
      },
      async saveStructure (e) {
        let btn = e.currentTarget;
        btn.classList.add('btn--load');
        try {
          await this.axios.put(this.$store.state.api_endpoint + '/houses/' + this.house.id + '/structure', { structure: this.structure });
          this.$router.push({name: 'PageHouseMain', params: {organization_id: this.organization_id, house_id: this.house_id }});
        } catch (e) {
          this.$refs.messageDialogue.show({message: e.message, okButton: 'Подтвердить'});
        }
        btn.classList.remove('btn--load');
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
  .collapse__footer {
    padding: 15px 20px;
  }
  .collapse__body {
    padding: 0px;
  }

  .table-custom tr td:first-child {
    width: 400px;
  }
  .table-custom td, .table-custom th {
    padding: 10px 25px;
  }
  .table-custom tbody tr:hover {
    background-color: transparent;
  }

  .table-custom tr td span.empty {
    color: var(--cozh-dark-grey);
  }

  
  .section-count {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 30px;
  }

  .section-count .label {
    margin-right: 30px;
  }

</style>