<template>
	<div class="load-container" :class="{'load' : isLoad}">
		<div class="content">
			<table class="table-custom">
				<thead>
					<tr>
						<th> Логин </th>
						<th> Фио </th>
						<th> Роль </th>
						<th> Квалификация </th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in items" :key="item.id" @click="goToEmployee(item.id)">
						<td class="nowrap">{{ item.login }}</td>
						<td class="nowrap">{{ item.name }}</td>
						<td class="nowrap">{{ item.roleId }}</td>
						<td class="relative">
							<span v-if="item.functions.length == 0"> - </span>
							<span v-else v-for="(func, index) in item.functions" :key="func.id"> 
								{{ func.description }}{{ index != item.functions.length - 1 ? ', ' : '' }}
							</span>
					<!-- 		<span class="badge badge--xs badge--round badge--gray" v-if="item.functions.length > 0">
								{{ item.functions.length }}
							</span> -->
						</td>
					</tr>
				</tbody>
			</table>

			<div class="content__footer">
				<router-link class="btn btn--outline-grey btn--sm" :to="{name: 'PageEmployeeCreate', params: {organization_id: organization_id}}">
					<img class="btn--ico btn--ico--left" src="../../assets/img/2.svg">
					<div class="btn--text"> Добавить сотрудника </div>
				</router-link>
			</div>

	  </div> 
	</div>
</template>
<script setup>
</script>
<script>
  export default {
    name: 'InfoEmployees',
    props: ['organization_id'],
    data: () => ({
    	isLoad: true,
    	items: [],
    }),
    async created () {
    	await this.loadItems();
    	this.isLoad = false;
    },
    methods: {
    	async loadItems () {
        try {
          let r = await this.axios.get(this.$store.state.api_endpoint + '/employees/?companyId=' + this.organization_id + '&detailed=true');
          if(r.status == 200) {
            this.items = r.data.data;
          }
        } catch (e) {e}
      },
      goToEmployee (id) {
      	this.$router.push({name: 'PageEmployeeMain', params: {organization_id: this.organization_id, employee_id: id}})
      }
    },
  }
</script>

<style scoped>
	.content {
		padding: 0px 0px;
	}
	.content__footer {
		padding: 20px 25px;
		border-top: 1px solid var(--cozh-light-grey);
	}
	.table-custom tr {
		cursor: pointer;
	}
</style>