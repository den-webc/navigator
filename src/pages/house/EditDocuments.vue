<template>

  <AddFileDialogue ref="addFileDialogue" @uploaded="uploadedFile"/>
  <ConfirmDialogue ref="confirmDialogue" />

  <edit-template :breadcrumbs="breadcrumbs" :nav="nav">
    <div class="load-container" :class="{'load' : isLoad}">
      <template v-if="!isLoad && !isError">

        <div class="c-fields" v-if="files.length > 0">
          <div class="c-field" v-for="(file, index) in files" :key="file.id">
          <!--   <div class="c-field__item">
              {{ file.title }}
            </div> -->
            <div class="c-field__item">
              <div class="file">
                <img class="file__ico" src="@/assets/img/file-blue.svg">
                <div class="file__info">
                  <div class="file__name">
                    {{ file.title }}
                  </div>
                  <div class="file__bottom">
                    <a class="file__link" :href="file.link"> <span> Скачать </span> </a>
                    <div class="file__hint">
                      {{ file.ext }} — {{ $helpers.formatBytes(file.size) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="c-field__item">
              <a class="link-gray link-gray--ico-right" @click="deleteFile(file.id, index)">
                <span class="btn--text">Удалить</span>
                <IconCross />
              </a>
            </div>
          </div>
        </div>
        <a class="btn btn--outline-action btn--md btn--inline" @click="openModal">
          <img class="btn__ico btn--ico--left" src="@/assets/img/plus-grey.svg">
          <div class="btn--text"> Добавить документ </div>
        </a>
      </template>
      <ErrorContent  v-else/>
    </div>
  </edit-template>
</template>


<script setup>
  import ErrorContent from '@/components/ErrorContent.vue';
  import EditTemplate from '@/components/house/EditTemplate.vue';
  import AddFileDialogue from '@/components/modals/AddFileDialogue.vue';
  import ConfirmDialogue from '@/components/modals/ConfirmDialogue.vue';
  import IconCross from '@/components/icons/IconCross-b1.5_w8_h8_grey.vue';
</script>

<script>
  export default {
    name: 'PageHouseEditDocuments',
    data: () => ({
      isLoad: true,
      isError: false,

      nav: [],
      breadcrumbs: [],
      
      house: null,
      organization: null,
      files: [],
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
      this.nav =  [
        {name: 'Адрес дома', isActive: false, link: {name: 'PageHouseEdit', params: {organization_id: this.organization_id, house_id: this.house_id}}},
        {name: 'Тех. параметры', isActive: false, link: {name: 'PageHouseEditParam', params: {organization_id: this.organization_id, house_id: this.house_id}}},
        {name: 'Структура', isActive: false, link: {name: 'PageHouseEditStructure', params: {organization_id: this.organization_id, house_id: this.house_id}}},
        {name: 'Документы', isActive: true},
      ];
      Promise.all([
        this.loadOrganization(), 
        this.loadHouse(), 
        this.loadFiles(), 
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
          {name: 'Документы', link: '' },
        ];
      },
      async deleteFile (id, index) {
        const isDelete = await this.$refs.confirmDialogue.show({
          message: 'Удалить файл?',
          okButton: 'Подтвердить',
          cancelButton: 'Отменить',
        });
        if(isDelete) {
          try {
            await this.axios.delete(this.$store.state.api_endpoint + '/document/' + id);
            this.files.splice(index, 1);
          } catch (e) {
            console.log(e);
          }
        }
      },

      async uploadedFile (file) {
        this.files.push(file);
      },
      async loadOrganization () {
        const r = await this.axios.get(this.$store.state.api_endpoint + '/companies/' + this.organization_id);
        this.organization = r.data;
      },
      async loadHouse () {
        const r = await this.axios.get(this.$store.state.api_endpoint + '/houses/' + this.house_id + '?detailed=true');
        this.house = r.data;
      },
      async loadFiles () {
        const r = await this.axios.get(this.$store.state.api_endpoint + '/document/' + this.organization_id + '?house_id=' + this.house_id);
        this.files = r.data.documents == null ? [] : r.data.documents;
      },
      openModal () {
        this.$refs.addFileDialogue.show({
          companyId: this.organization_id,
          houseId: this.house_id,
        });
      },
    },
  }

</script>

<style scoped>
  .load-container {
    padding: 20px;
  }
 .c-field {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    gap: 15px;
    padding: 0px 10px;
  }
  .c-field__item {
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    width: 100%;
  }
  .c-field__item:first-child {
    max-width: 400px;
  }
  .c-field__item:last-child {
    max-width: fit-content;
  }


  .c-field:not(:last-child) {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--cozh-light-grey);
  }
  .c-field:last-child {
    margin-bottom: 20px;
    padding-bottom: 0px;
    border-bottom: none;
  }

</style>