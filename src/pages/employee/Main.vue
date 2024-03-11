<template>
  <TopMenu :breadcrumbs="breadcrumbs"/>
  <div class="load-container" :class="{'load' : isLoad}">
    <div class="content" v-if="!isLoad && !isError">
    	<div class="row">
    		<div class="col-xs-12 col-sm-3 col-md-3">
    			<div class="component-image" :style="{backgroundImage:'url(' + userImage + ')'}"></div>
    		</div>
    		<div class="col-xs-12 col-sm-9 col-md-9">
			  	<div class="block">
			  		<div class="block__header">
			  			Сотрудник
			  		</div>
			  		<div class="block__body">
			  			<table class="table-info table-info--sm">
			  				<tr>
			  					<td> ФИО </td>
			  					<td> {{ employee.name }} </td>
			  				</tr>
			  				<tr>
			  					<td> Роль </td>
			  					<td> {{ employee.roleId }} </td>
			  				</tr>
			  				<tr>
			  					<td> Статус </td>
			  					<td> {{ employee.active ? 'Активен' : 'Не активен' }} </td>
			  				</tr>
			  				<tr>
			  					<td> Квалификации </td>
			  					<td>
			  						<span v-if="employee.functions.length == 0"> - </span>
										<span v-else v-for="(func, index) in employee.functions" :key="func.id"> 
											{{ func.description }}{{ index != employee.functions.length - 1 ? ', ' : '' }}
										</span>
			  					</td>
			  				</tr>
			  			</table>
			  		</div>
			  		<div class="block__footer">
			  			<div class="btn-group">
			  				<router-link :to="{name: 'PageEmployeeEdit', params: {organization_id: organization.id, employee_id: employee_id}}" class="btn btn--grey btn--sm">
			  					<img class="btn--ico btn--ico--left" src="@/assets/img/18.svg">
			  					<div class="btn--text">Редактировать</div>
			  					<div class="btn--loader"></div>
			  				</router-link>
				  			<a href="javascript:;" class="btn btn--grey btn--sm">
									<img class="btn--ico btn--ico--left" src="@/assets/img/19.svg">
									<div class="btn--text">Архивировать сотрудника</div>
									<div class="btn--loader"></div>
								</a>
			  			</div>
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
    name: 'PageOrganizationEmployee',
    data: () => ({
      isLoad: true,
      isError: false,
      breadcrumbs: [],
      organization: null,
      employee: null,
      image: null,
    }),
    computed: {
      organization_id () {
        return this.$route.params.organization_id;
      },
      employee_id () {
        return this.$route.params.employee_id;
      },
      userImage () {
      	return this.employee.imgLinks && this.employee.imgLinks !== null && this.employee.imgLinks.length > 0 ? this.employee.imgLinks[0] : '/img/plug.png';
      },
    },
   	created () {
      Promise.all([this.loadOrganization(), this.loadEmployee()])
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
        	{name: this.organization.name, link: {name:'PageOrganization', params: {organization_id: this.organization_id}}},
        	{name: this.employee.name, link: ''},
      	];
      },
    	async loadOrganization () {
        const r = await this.axios.get(this.$store.state.api_endpoint + '/companies/' + this.organization_id);
        this.organization = r.data;
    	},
    	async loadEmployee () {
        const r = await this.axios.get(this.$store.state.api_endpoint + '/employees/' + this.employee_id);
        this.employee = r.data;
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