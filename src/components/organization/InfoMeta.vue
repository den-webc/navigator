<template>
	<div class="content">
	  <div class="row">
	  	<div class="col-xs-6 col-md-6 col-md-6">
	  		<table class="table-info">
	  			<tr>
	  				<td>Статус</td>
	  				<td> {{ organization.active ? 'Активна': 'Не активна' }} </td>
	  			</tr>
	  			<tr>
	  				<td>Адрес</td>
	  				<td>{{ organization.address }}</td>
	  			</tr>
	  			<tr>
	  				<td>Телефон</td>
	  				<td>{{ organization.phoneNumber }}</td>
	  			</tr>
	  			<tr>
	  				<td>Электронная почта</td>
	  				<td>{{ organization.email }}</td>
	  			</tr>
	  			<tr>
	  				<td>Директор</td>
	  				<td>{{ organization.director }}</td>
	  			</tr>
	  		</table>
	  	</div>
	  	<div class="col-xs-6 col-md-6 col-md-6">
				<table class="table-info">
	  			<tr>
	  				<td>Договор</td>
	  				<td>{{ organization.contractNumber }}</td>
	  			</tr>
	  			<tr>
	  				<td>Дата добавления</td>
	  				<td>05.10.2023</td>
	  			</tr>
	  		</table>
	  	</div>
	  </div>
  </div>
</template>
<script setup>
</script>
<script>
  export default {
    name: 'InfoMeta',
    props: ['organization'],
    data: () => ({}),
  }
</script>

<style scoped>

	.content {
		padding: 15px 0px;
	}

</style>