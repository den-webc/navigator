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
    	<div class="collapse collapse--noborder" v-for="(epic) in module.epics" :key="epic.num">
    		<div class="collapse__header js-collapse">
    			<span class="collapse__label me-1">{{ epic.num }}</span> {{ epic.name }}
    		</div>
    		<div class="collapse__content">
  				<div class="collapse__body">
  					<div class="collapse" :class="{'collapse--disabled': !topic.active}" v-for="(topic) in epic.topics" :key="topic.num">
  						<div class="collapse__header js-collapse">
  							<div class="switcher">
									<input type="checkbox" v-model="topic.active" :id="topic.num">
								</div>
  							<span class="collapse__label me-1 ms-1" :for="topic.num">{{ topic.num }}</span> 
  							{{ topic.name }}
  						</div>
  						<div class="collapse__content">
  							<div class="collapse__body nopadding">
  								<div class="topic">
	  								<div class="topic__header">
	  									<div class="topic__hitem"> Тип </div>
	  									<div class="topic__hitem"> Наименование </div>
	  									<div class="topic__hitem"> Локация </div>
	  									<div class="topic__hitem"> Периодичность </div>
	  									<div class="topic__hitem"> Расписание </div>
	  									<div class="topic__hitem"> Квалификация </div>
	  									<div class="topic__hitem"> Сотрудник </div>
	  									<div class="topic__hitem"> Дней на ипсполн </div>
	  								</div>
	  								<div class="topic__body">
  										<Topic 
  											:topic="topic"
  											:employees="employees" 
  											:functions="functions"
  										/>
	  								</div>
  								</div>
  							</div>
  						</div>
  					</div>
  				</div>
    		</div>
    	</div>
    	<div class="block">
    		<div class="block__body">
    			<div class="btn-group">
	    			<router-link :to="{name: 'PageOrganizationHouseTechMap', params: {organization_id: organization_id, house_id: house_id} }" class="btn btn--lg btn--outline">
	            <img class="btn--ico btn--ico--left" src="@/assets/img/prew-arrow-blue.svg">
	            <div class="btn--text"> вернуться </div>
	            <div class="btn--loader"></div>
	          </router-link>
	          <a class="btn btn--lg btn--default" @click="activateTemplate($event)">
	            <img class="btn--ico btn--ico--left" src="@/assets/img/check-white.svg">
	            <div class="btn--text"> Активировать шаблоны </div>
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
  import Topic from '@/components/house/Topic.vue'

  import MessageDialogue from '@/components/modals/MessageDialogue.vue';
  import ConfirmDialogue from '@/components/modals/ConfirmDialogue.vue';
</script>

<script>
  export default {
    
    name: 'PageOrganizationHouseTechMapModule',

    data: () => ({
      isLoad: true,
      isError: false,

      breadcrumbs: [],
      
      organization: null,
      house: null,
      metaTemplate: null,
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
      	return this.metaTemplate.modules[this.module_id];
      },
      functions () {
        return this.$store.state.functions;
      },
    },

   	created () {
      Promise.all([
      	this.loadOrganization(), 
      	this.loadHouse(), 
      	this.loadMetaTemplate(), 
      	this.loadEmployees(), 
      	this.$store.dispatch('getFunctions')
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

    			if(this.metaTemplate['modules'] === undefined || !this.module) {

    				await this.$refs.confirmDialogue.show({
		          message: 'Техкарта не сгенерирована',
		          okButton: 'Подтвердить',
		          cancelButton: 'Отменить',
		        });
    					
    				this.$router.push({name: 'PageOrganizationHouseTechMap', params: {organization_id: this.organization_id, house_id: this.house_id}})
    				
    			}

	        this.breadcrumbs = [
	        	{ name: this.$route.meta.name, link: this.$route.matched[0].path, ico: this.$route.meta.ico },
	        	{ name: this.organization.name, link: {name:'PageOrganization', params: {organization_id: this.organization_id}}},
	        	{ name: this.house.address, link: {name:'PageHouseMain', params: {house_id: this.house_id}} },
	        	{ name: 'Техкарта', link: {name: 'PageOrganizationHouseTechMap', params: {organization_id: this.organization_id, house_id: this.house_id}} },
	        	{ name: this.module.name, link: '' },
	      	];
      	},

      	buildTopicRequest () {
      		const r = [];
      		for (const epic in this.module.epics) {
      			for (const topic in this.module.epics[epic].topics) {
      				r.push({ id: this.module.epics[epic].topics[topic].id, active: this.module.epics[epic].topics[topic].active });
      			}
      		}
      		return r;
      	},

      	buildActivityRequest () {

      		const r = [];

      		for (const epic in this.module.epics) {
      			for (const topic in this.module.epics[epic].topics) {
	      			for (const activity in this.module.epics[epic].topics[topic].activities) {

	      				let a = this.module.epics[epic].topics[topic].activities[activity];

	      				let res = {};

	      				res.id = a.id;

	      				if(a.review !== null) {
		      				res.reviewEmployeeId = a.reviewEmployeeId;
		      				res.reviewTtl = Number(a.reviewTtl);
		      				res.reviewFunctionId = Number(a.reviewFunction.id);
		      				if(a.reviewPeriodical) {
		      					res.reviewPeriod = a.reviewPeriod;
		      				}
	      				}

	      				if(a.work !== null) {
		      				res.workEmployeeId = a.workEmployeeId;
		      				res.workTtl = Number(a.workTtl);
		      				res.workFunctionId = Number(a.workFunction.id);
		      				if(a.workPeriodical) {
		      					res.workPeriod = a.workPeriod;
		      				}
	      				}

	      				if(a.control !== null) {
		      				res.controlEmployeeId = a.controlEmployeeId;
		      				res.controlTtl = Number(a.controlTtl);
		      				res.controlFunctionId = Number(a.controlFunction.id);
		      				if(a.controlPeriodical) {
		      					res.controlPeriod = a.controlPeriod;
		      				}
	      				}

      					r.push(res);

	      			}
      			}
      		}
      		return r;
      	},

      	async saveTopic (topics) {
    			await this.axios.patch(this.$store.state.api_endpoint + '/houses/' + this.house_id + '/metaTemplate/topic', { topics: topics });
      	},
      	async saveActivity (activities) {
    			await this.axios.patch(this.$store.state.api_endpoint + '/houses/' + this.house_id + '/metaTemplate/activity', { activities: activities });
      	},
      	async buildTemplate () {
    			await this.axios.post(this.$store.state.api_endpoint + '/houses/' + this.house_id + '/template');
      	},

      	async activateTemplate (e) {

      		const btn = e.currentTarget;
      		btn.classList.add('btn--load');

      		try {

    				const topics = this.buildTopicRequest();
    				const activities = this.buildActivityRequest();

	      		await this.saveTopic(topics);
	      		await this.saveActivity(activities);

	      		let isBuildTemplate = false;

	      		topics.forEach((topic) => {
	      			if(topic.active) {
	      				isBuildTemplate = true;
	      			}
	      		});

	      		if (isBuildTemplate) {

	      			await this.buildTemplate();

	      			const confirm = await this.$refs.confirmDialogue.show({
			          message: 'Техкарта сохранена!',
			          okButton: 'Продолжить',
			          cancelButton: 'Остаться',
			        });
			        
			        if(confirm) {
		      			this.$router.push({name: 'PageOrganizationHouseTemplateModule', params: {organization_id: this.organization_id, house_id: this.house_id, module_id: this.module_id }});
		      		}
	      		
	      		} else {
			      
			        this.$refs.messageDialogue.show({
		            message: 'Техкарта сохранена!',
		            text: 'Шаблон не сгенерирован, активируйте хотя бы одну группу',
		            okButton: 'Подтвердить',
		          });
	      		
	      		}

      		} catch (e) {
      			this.$refs.messageDialogue.show({
	            message: e.message,
	            okButton: 'Подтвердить',
	          });
      		}

      		btn.classList.remove('btn--load');
      	},

      	async loadMetaTemplate () {
      		const r = await this.axios.get(this.$store.state.api_endpoint + '/houses/' + this.house_id + '/metaTemplate');
	        if(r.status == 200) {
	          this.metaTemplate = r.data;
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

	.topic__header {
		display: flex;
		flex-direction: row;
		align-items: center;
    align-self: stretch;
    border-bottom: 1px solid #d9e4eb;
    flex-shrink: 0;
    gap: 10px;
    justify-content: flex-start;
    padding: 10px 20px;
    position: relative;
	}
	.topic__hitem {
		color: var(--cozh-dark-grey);
    font-size: 12px;
    font-weight: 500;
	}

 	.topic__hitem:nth-child(8) {
		min-width: 60px;
		max-width: 60px;
	}
	.topic__hitem:nth-child(7) {
		min-width: 150px;
		max-width: 150px;
	}
	.topic__hitem:nth-child(6) {
		min-width: 150px;
		max-width: 150px;
	}
	.topic__hitem:nth-child(5) {
		min-width: 150px;
		max-width: 150px;
	}
	.topic__hitem:nth-child(4) {
		min-width: 150px;
		max-width: 150px;
	}
	.topic__hitem:nth-child(3) {
		min-width: 150px;
		max-width: 150px;
	}
	.topic__hitem:nth-child(2) {
		width: 100%;
	}
	.topic__hitem:nth-child(1) {
		min-width: 30px;
		max-width: 30px;
	}




		
	.btn-group {
		justify-content: space-between;
	}

	.collapse:not(:last-child) {
		margin-bottom: 10px;
	}

	.collapse.open:not(:last-child) {
    margin-bottom: 10px;
  }

	.switcher {
		padding: 0px;
	}

	.block__body {
	  padding: 20px 25px;
	}

	.collapse__label {
    color: var(--cozh-grey);
    font-size: 14px;
    font-weight: 600;
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

	


</style>
