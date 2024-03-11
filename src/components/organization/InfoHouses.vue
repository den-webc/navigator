<template>
	<div class="load-container" :class="{'load' : isLoad}">
		<div class="content">
			
			<table class="table-custom">
				<thead>
					<tr>
						<th class="nowrap"> Адрес </th>
						<th class="nowrap"> Год ввода в эксплуатацию </th>
						<th class="nowrap"> Подключенные модули </th>
						<th class="nowrap"> Активированные шаблоны </th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in items" :key="item.id" @click="goToHouse(item.id)">
						<td class="nowrap"> {{ item.address }} </td>
						<td class="nowrap"> {{ item.commissioningYear }} </td>
						<td> 
							<span v-if="item.module.length == 0"> - </span>
							<span v-else v-for="(m, index) in item.module" :key="m.id"> 
								{{ m.name }}{{ index != item.module.length - 1 ? ', ' : '' }}
							</span>
						</td>
						<td class="nowrap">-</td>
					</tr>
				</tbody>
			</table>

			<div class="content__footer">
				<router-link class="btn btn--outline-grey btn--sm" :to="{name: 'PageHouseCreate', params: {organization_id: organization_id}}">
					<img class="btn--ico btn--ico--left" src="../../assets/img/2.svg">
					<div class="btn--text"> Добавить дом </div>
				</router-link>
			</div>
	  </div>
	</div>
</template>

<script setup>
</script>

<script>
  export default {
    name: 'InfoHouses',
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
          let r = await this.axios.get(this.$store.state.api_endpoint + '/houses/?companyId=' + this.organization_id + '&detailed=true');
          if(r.status == 200) {
            this.items = r.data.data;
          }
        } catch (e) {e}
      },
      goToHouse (id) {
      	this.$router.push({name: 'PageHouseMain', params: {organization_id: this.organization_id, house_id: id }})
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