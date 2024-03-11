<template>
  <TopMenu :breadcrumbs="breadcrumbs"/>
  <div class="load-container" :class="{'load' : isLoad}">
    <div class="content" v-if="!isLoad && !isError">
    	<div class="row">
    		<div class="col-xs-12 col-sm-4 col-md-4">
    			<div class="component-image" :style="{backgroundImage:'url(' + mkdImage + ')'}"></div>
    		</div>
    		<div class="col-xs-12 col-sm-8 col-md-8">
			  	<div class="block">
			  		<div class="block__header">
			  			{{ house.address }}
			  		</div>
			  		<div class="block__body">
			  			<table class="table-info table-info--sm">
			  				<tr>
			  					<td> Управляющая организация </td>
			  					<td> {{ organization.name }} </td>
			  				</tr>
			  				<tr>
			  					<td> Город </td>
			  					<td> {{ house.city.name }} </td>
			  				</tr>
			  				<tr>
			  					<td> Адрес </td>
			  					<td> {{ house.address }} </td>
			  				</tr>
			  				<tr>
			  					<td> Название ЖК </td>
			  					<td> {{ house.district }} </td>
			  				</tr>
			  				<tr>
			  					<td> Год постройки </td>
			  					<td> {{ house.commissioningYear }} </td>
			  				</tr>
			  				<tr>
			  					<td> Подключенные модули </td>
			  					<td>
			  						<span v-if="house.module.length == 0"> - </span>
										<span v-else v-for="(module, index) in house.module" :key="module.num"> 
											{{ module.name }}{{ index != house.module.length - 1 ? ', ' : '' }}
										</span>
			  					</td>
			  				</tr>
			  			</table>
			  		</div>
			  		<div class="block__footer">
			  			<div class="btn-group">
			  				<router-link :to="{name: 'PageHouseEdit', params: {organization_id: organization.id, house_id: house.id}}" class="btn btn--grey btn--sm">
			  					<img class="btn--ico btn--ico--left" src="@/assets/img/18.svg">
			  					<div class="btn--text">Редактировать</div>
			  					<div class="btn--loader"></div>
			  				</router-link>
			  				<router-link :to="{name: 'PageOrganizationHouseTechMap', params: {organization_id: organization.id, house_id: house.id}}"  class="btn btn--grey btn--sm">
			  					<img class="btn--ico btn--ico--left" src="@/assets/img/21.svg">
			  					<div class="btn--text">Техкарта</div>
			  					<div class="btn--loader"></div>
			  				</router-link>
			  				<router-link :to="{name: 'PageOrganizationHouseTemplate', params: {organization_id: organization.id, house_id: house.id}}" class="btn btn--grey btn--sm">
			  					<img class="btn--ico btn--ico--left" src="@/assets/img/20.svg">
			  					<div class="btn--text">Шаблоны</div>
			  					<div class="btn--loader"></div>
			  				</router-link>
			  			</div>
			  			<a href="javascript:;" class="btn btn--grey btn--sm">
							<img class="btn--ico btn--ico--left" src="@/assets/img/19.svg">
							<div class="btn--text">Архивировать дом</div>
							<div class="btn--loader"></div>
						</a>
			  		</div>
			  	</div>
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
    name: 'PageHouseMain',
    data: () => ({
      isLoad: true,
      isError: false,

      breadcrumbs: [],
      
      organization: null,
      house: null,
      image: null,
    }),

    computed: {
      organization_id () {
        return this.$route.params.organization_id;
      },
      house_id () {
        return this.$route.params.house_id;
      },
      mkdImage () {
        return this.house.imgLinks && this.house.imgLinks !== null && this.house.imgLinks.length > 0 ? this.house.imgLinks[0] : '/img/plug.png';
      },
    },

   	created () {
      Promise.all([this.loadOrganization(), this.loadHouse()])
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
        	{name: this.$route.meta.name, link: this.$route.matched[0].path, ico: this.$route.meta.ico},
        	{name: this.organization.name, link: {name:'PageOrganization', params: {organization_id: this.organization_id}}},
        	{name: this.house.address, link: ''},
      	];
      },
    	async loadOrganization () {
        const r = await this.axios.get(this.$store.state.api_endpoint + '/companies/' + this.organization_id);
        this.organization = r.data;
    	},
    	async loadHouse () {
        const r = await this.axios.get(this.$store.state.api_endpoint + '/houses/' + this.house_id + '?detailed=true');
        this.house = r.data;
    	},
    },
  }
</script>

<style scoped>
	
	.block__body {
		padding: 15px 0px;
	}

	.component-image {
		height: 100%;
		background-color: var(--cozh-white);
		border-radius: 8px;
		width: calc(100% + 20px);
		background-position: center;
    background-origin: border-box;
    background-repeat: no-repeat;
    background-size: cover;
	}


</style>