<template>

	<MessageDialogue ref="messageDialogue" />
  <ConfirmDialogue ref="confirmDialogue" />

  <TopMenu :breadcrumbs="breadcrumbs"/>

	<div class="load-container" :class="{'load' : isLoad}">
    <div class="content" v-if="!isLoad && !isError">
    	<div class="content-header">
    		<div class="content-header__ico">
		    	<img :src="'/img/modules/' + module_id + '.svg'">
    		</div>
    		<div class="content-header__name">
    			{{ module.name }}
    		</div>
    	</div>

    	<EpicTemplate :epic="epic" :functions="functions" :employees="employees" v-for="(epic) in module.epics" :key="epic.num"/>

    	<div class="block">
    		<div class="block__body">
    			<div class="btn-group">
	    			<router-link :to="{name: 'PageOrganizationHouseTemplate', params: {organization_id: organization_id, house_id: house_id} }" class="btn btn--lg btn--outline">
	            <img class="btn--ico btn--ico--left" src="@/assets/img/prew-arrow-blue.svg">
	            <div class="btn--text"> вернуться </div>
	            <div class="btn--loader"></div>
	          </router-link>
	          <a class="btn btn--lg btn--default" @click="saveTemplate($event)">
	            <img class="btn--ico btn--ico--left" src="@/assets/img/check-white.svg">
	            <div class="btn--text"> Сохранить шаблоны </div>
	            <div class="btn--loader"></div>
	          </a>
    			</div>
    		</div>
    	</div>
		</div>
		<ErrorContent v-else />
	</div>
</template>

<script setup>
  import TopMenu from '@/components/TopMenu.vue'
  import ErrorContent from '@/components/ErrorContent.vue'

  import MessageDialogue from '@/components/modals/MessageDialogue.vue';
  import ConfirmDialogue from '@/components/modals/ConfirmDialogue.vue';

  import EpicTemplate from '@/components/house/EpicTemplate.vue'

</script>

<script>
  export default {
    
    name: 'PageOrganizationHouseTemplateModule',

    data: () => ({
      isLoad: true,
      isError: false,

      breadcrumbs: [],
      
      organization: null,
      house: null,
      template: null,
      employees: null,
    }),

    computed: {
      organization_id () {
        return this.$route.params.organization_id;
      },
      house_id () {
        return this.$route.params.house_id;
      },
      module_id () {
        return this.$route.params.module_id;
      },
      module () {
      	return this.template.modules[this.module_id];
      },
      functions () {
        return this.$store.state.functions;
      },
    },

   	created () {
      Promise.all([
      	this.loadOrganization(), 
      	this.loadHouse(), 
      	this.loadTemplate(), 
      	this.loadEmployees(),
        this.$store.dispatch('getFunctions'),
      ])
      .then(async () => {
        await this.beforeRender();
        this.isLoad = false;
      })
      .catch((e)=> {
        console.log(e);
        this.isError = true;
        this.isLoad = false;
      })
    },

    methods: {

  		async beforeRender () {
  			if(!this.template.modules || !this.module) {
  				await this.$refs.confirmDialogue.show({
	          message: 'Шаблон не сгенерирован',
	          okButton: 'Подтвердить',
	          cancelButton: 'Отменить',
	        });
  				this.$router.push({name: 'PageOrganizationHouseTemplate', params: {organization_id: this.organization_id, house_id: this.house_id}});
  			}
        this.breadcrumbs = [
        	{name: this.$route.meta.name, link: this.$route.matched[0].path, ico: this.$route.meta.ico },
        	{name: this.organization.name, link: {name:'PageOrganization', params: {organization_id: this.organization_id}}},
        	{name: this.house.address, link: {name:'PageHouseMain', params: {house_id: this.house_id}} },
        	{name: 'Шаблоны', link: {name: 'PageOrganizationHouseTemplate', params: {organization_id: this.organization_id, house_id: this.house_id}} },
        	{name: this.module.name, link: '' },
      	];
    	},

    	async saveTemplate (e) {

    		const btn = e.currentTarget;
    		const data = {};
    		const dataTemplate = this.$helpers.buildModule(this.module);

    		data.templates = dataTemplate;

    		btn.classList.add('btn--load');

    		try {

    			await new Promise(r => setTimeout(r, 300));

    			await this.axios.post(this.$store.state.api_endpoint + '/houses/' + this.house_id + '/template/activate', data);

    			this.$refs.messageDialogue.show({
            message: 'Все шаблоны сохранены!',
            okButton: 'Продолжить',
          });	 

          // Ставим всем топикам статус
          for (let epicKey in this.module.epics) {
      			for (let topicKey in this.module.epics[epicKey].topics) {
      				this.module.epics[epicKey].topics[topicKey].active = true;
      			}
      		}

    		} catch (e) {
    			
    			this.$refs.messageDialogue.show({
            message: e.message,
            okButton: 'Подтвердить',
          });
    		
    		}
    		
    		btn.classList.remove('btn--load');
    	
    	},

  
    	async loadTemplate () {
    		const r = await this.axios.get(this.$store.state.api_endpoint + '/houses/' + this.house_id + '/template');
        if(r.status == 200) {
          this.template = r.data;
        }
    	},
  		async loadOrganization () {
        const r = await this.axios.get(this.$store.state.api_endpoint + '/companies/' + this.organization_id);
        if(r.status == 200) {
          this.organization = r.data;
        }
  		},
  		async loadHouse () {
        const r = await this.axios.get(this.$store.state.api_endpoint + '/houses/' + this.house_id + '?detailed=true');
        if(r.status == 200) {
        	this.house = r.data;
      	}
  	  },
  	  async loadEmployees () {
  	  	const r = await this.axios.get(this.$store.state.api_endpoint + '/employees/?companyId=' + this.organization_id + '&detailed=true');
        if(r.status == 200) {
        	this.employees = r.data.data;
      	}
  	  },


    },
  }
</script>

<style scoped>


	.btn-group {
		justify-content: space-between;
	}

	.block__body {
	  padding: 20px 25px;
	}

	.content-header {
		background-color: var(--cozh-white);
		padding: 20px 25px;
		border-radius: 8px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		margin-bottom: 10px;
	}

	.content-header__name {
		font-size: 24px;
		font-weight: 600;
	}
	.content-header__ico {
		min-height: 50px;
		min-width: 50px;
		background-color: rgba(var(--cozh-blue-code), .08);
		border-radius: 50%;
		margin-right: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	









		



	.collapse:not(:last-child) {
		margin-bottom: 10px;
	}
/*	.collapse.open:not(:last-child) {
    margin-bottom: 10px;
  }*/







</style>
