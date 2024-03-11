<template>
  <TopMenu :breadcrumbs="breadcrumbs"/>
  <div class="load-container" :class="{'load' : isLoad}">
    <div class="content" v-if="!isLoad && !isError">

    	<div class="block" v-if="activeModules.length > 0">
    		<div class="block__header">
    			Подключенные модули
    		</div>
				<div class="block__modules">
    			<div class="row">
    				<div class="col-lg-3 col-md-4 col-sm-4 col-xs-4" v-for="(module) in activeModules" :key="module.moduleNum">
    					<router-link class="module" :to="{name: 'PageOrganizationHouseTechMapModule', params: {organization_id:organization_id, house_id:house_id, module_id:module.moduleNum}}">
							<div class="module__top">
			    				<div class="module__name">
			    					{{ module.module }}
			    				</div>
			    				<div class="module__ico">
			    					<img :src="'/img/modules/' + module.moduleNum + '.svg'">
			    				</div>
							</div>
							<div class="module__bottom">
								<div class="module__left">
									<div class="module__label">
										Дата подключения
									</div>
									<div class="module__text">
			    						{{ $moment(modules[module.moduleNum].dateStart).format('DD.MM.YYYY') }}
									</div>
								</div>
								<div class="module__right">
									<div class="module__label">
										Дата окончания
									</div>
									<div class="module__text">
			    						{{ $moment(modules[module.moduleNum].dateEnd).format('DD.MM.YYYY') }}
									</div>
								</div>
							</div>
		    			</router-link>
    				</div>
    			</div>
				</div>
    	</div>

    	<div class="block" v-if="inactiveModules.length > 0">
    		<div class="block__header">
    			Неактивные модули
    		</div>
    		<div class="block__modules">
    			<div class="row">
    				<div class="col-lg-3 col-md-4 col-sm-4 col-xs-4" v-for="(module) in inactiveModules" :key="module.moduleNum">
    					<div class="module module--incative">
							<div class="module__top">
			    				<div class="module__name">
			    					{{ module.module }}
			    				</div>
			    				<div class="module__ico">
			    					<img :src="'/img/modules/' + module.moduleNum + '-grey.svg'">
			    				</div>
							</div>
							<div class="module__bottom">
								<div class="module__left">
									<div class="module__label">
										Дата подключения
									</div>
									<div class="module__text">
			    						—
									</div>
								</div>
								<div class="module__right">
									<div class="module__label">
										Дата окончания
									</div>
									<div class="module__text">
			    						—
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
    			<router-link :to="{name: 'PageHouseMain', params: {organization_id: organization_id, house_id: house_id} }" class="btn btn--lg btn--outline">
            <img class="btn--ico btn--ico--left" src="@/assets/img/prew-arrow-blue.svg">
            <div class="btn--text"> вернуться </div>
            <div class="btn--loader"></div>
          </router-link>
    		</div>
    	</div>
  	</div>
    <ErrorContent  v-else/>
	</div>
</template>

<script setup>
  import TopMenu from '@/components/TopMenu.vue'
  import ErrorContent from '@/components/ErrorContent.vue'
</script>

<script>
  export default {
    
    name: 'PageOrganizationHouseTechMap',

    data: () => ({
      isLoad: true,
      isError: false,

      breadcrumbs: [],
      
      organization: null,
      house: null,

      modules: null,
      map: null,
    }),

    computed: {
      organization_id () {
        return this.$route.params.organization_id;
      },
      house_id () {
        return this.$route.params.house_id;
      },
      activeModules () {
      	var m = [];
      	for(let mod in this.map) {
      		if(this.map[mod].active) {
      			m.push(this.map[mod]);
      		}
      	}
      	return m;
      },
      inactiveModules () {
      	var m = [];
      	for(let mod in this.map) {
      		if(!this.map[mod].active) {
      			m.push(this.map[mod]);
      		}
      	}
      	return m;
      },
    },

   	created () {
      Promise.all([this.loadOrganization(), this.loadHouse(), this.loadModules(), this.loadMap()])
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
        	{ name: this.organization.name, link: {name:'PageOrganization', params: {organization_id: this.organization_id}}},
        	{ name: this.house.address, link: {name:'PageHouseMain', params: {house_id: this.house_id}} },
        	{ name: 'Техкарта', link: '' },
      	];
    	},

    	async loadMap () {
    		const r = await this.axios.get(this.$store.state.api_endpoint + '/houses/' + this.house_id + '/techMap');
        if(r.status == 200) {
        	this.map = r.data.modules;
        }
    	},
    	async loadModules() {
    		const r = await this.axios.get(this.$store.state.api_endpoint + '/houses/' + this.house_id + '/modules');
        if(r.status == 200) {
        	this.modules = r.data.data;
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
    	
    },
  }
</script>

<style scoped>

	.block {
		margin-bottom: 10px;
	}

	.block__body {
	    padding: 20px 20px;
	}

	.block__modules {
		padding: 20px;
		padding-right: 30px;
		padding-bottom: 0px;
	}

	.module {
		min-height: 155px;
		height: calc(100% - 25px);
	  margin-right: -10px;
	  margin-bottom: 20px;
	  padding: 20px;
	  border-radius: 8px;
	  border: 1px solid var(--cozh-light-grey);
	  display: block;
	  display: flex;
	  flex-direction: column;
	  align-items: flex-start;
	  justify-content: space-between;
	  transition: border .2s ease-out;
	}

	.module:hover {
		border-color: var(--cozh-blue);
	}

	.module__top {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: 30px;
		width: 100%;
	}
	
	.module__bottom {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
	}

	.module__name {
		color: var(--cozh-black);
    	font-size: 16px;
    	font-weight: 500;
    	line-height: 1.3;
	}

	.module__ico {
		min-height: 50px;
		min-width: 50px;
		background-color: rgba(var(--cozh-blue-code), .08);
		border-radius: 50%;
		margin-left: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}



	.module__label {
		color: var(--cozh-grey);
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		line-height: 1.2;
		letter-spacing: 0.50px;
	}

	.module__text {
		color: var(--cozh-black);
		font-size: 12px;
		font-weight: 500;
		line-height: 1.3;
		margin-top: 3px;
	}

	.module__left, .module__right {
		width: 50%;
	}

	.module__left {
		margin-right: 20px;
	}


	.module--incative .module__ico {
		background-color: rgba(var(--cozh-dark-grey-code), .08);
	}

	.module--incative:hover {
		border-color: var(--cozh-grey);
	}

/*	@media (max-width: 1500px) {
		.module__name {
		    font-size: 14px;
		}
	}*/



</style>