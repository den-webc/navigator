<template>
	
	<div class="collapse mt-1" v-for="item in employees" :key="item.employeeId" :class="{'open': item.isOpen}">
		<div class="collapse__header" @click="{ item.isOpen = !item.isOpen; }">
			<div class="collapse__avatar" :style="{backgroundImage: 'url(' + item.imagePath + ')'}">
				<div 
					class="collapse__badge"
					:class="{
						'collapse__badge--red': item.percentage <= 50, 
						'collapse__badge--orange': item.percentage > 50 && item.percentage <= 75, 
						'collapse__badge--green': item.percentage > 75}"> 
					{{ item.percentage + '%' }} 
				</div>
			</div>
			<div class="collapse__info">
				<div class="collapse__name">
					{{ item.employeeName }}
				</div>
				<div class="collapse__functions">
					<span v-for="(func, index) in item.employeeFunctions" :key="index"> {{ func }} </span>
				</div>
			</div>
		</div>
		<div class="collapse__content" v-if="item.isOpen">

			<template v-for="(module, index) in item.module" :key="index">
				
				<div class="c-module">
					<div class="c-module__ico">
						<component :is="'Service' + module.num"></component>
					</div>
					<div class="c-module__name">
						{{ module.name }}
					</div>
				</div>

				<template v-for="(epic, index) in module.epic" :key="index">
					
					<div class="c-topic" >
						{{ epic.name }}
					</div>

					<div class="c-place" v-for="(topic, index) in epic.topic" :key="index">
						<table class="table-custom">
							<thead>
								<tr class="c-place__header">
									<th colspan='3'>
										{{ topic.name }}
									</th>
									<th>
										<div class="c-badge c-badge--blue">
											<div class="c-badge__round">{{ topic.done }}</div>
											<div class="c-badge__text">Сделано, всё&nbsp;хорошо</div>
										</div>
									</th>
									<th>
										<div class="c-badge c-badge--orange">
											<div class="c-badge__round">{{ topic.issue }}</div>
											<div class="c-badge__text">Сделано, есть&nbsp;проблема</div>
										</div>
									</th>
									<th>
										<div class="c-badge c-badge--red">
											<div class="c-badge__round">{{ topic.failed }}</div>
											<div class="c-badge__text">Не сделано</div>
										</div>
									</th>
									<th>
										<div class="c-badge c-badge--darkred">
											<div class="c-badge__round">{{ topic.expired }}</div>
											<div class="c-badge__text">Просрочено</div>
										</div>
									</th>
								</tr>
								<tr>
									<th> Задания </th>
									<th> Место </th>
									<th> Тип </th>
									<th width="1px" class="nowrap"> Сделано </th>
									<th width="1px" class="nowrap"> Есть проблема </th>
									<th width="1px" class="nowrap"> Не выполнено </th>
									<th width="1px" class="nowrap"> Просрочено </th>
								</tr>
							</thead>
							<tbody>

								<template v-for="(task, index) in topic.tasks" :key="index">

									<tr class="c-place__task" :class="{'open': task.isOpen}" @click="{ task.isOpen = !task.isOpen; }">
										<td> {{ task.name }} </td>
										<td></td>
										<td> 
											<span v-if="task.type == 'work'">
												Работа
											</span> 
											<span v-if="task.type == 'review'">
												Осмотр
											</span> 
											<span v-if="task.type == 'control'">
												Контроль
											</span>
										</td>
										<td> {{ task.done }} </td>
										<td> {{ task.issue }} </td>
										<td> {{ task.failed }} </td>
										<td> {{ task.expired }} </td>
									</tr>

									<template v-if="task.isOpen">
										
										<tr class="c-place__info" v-for="(location, index) in task.locations" :key="index">
											<td> </td>
											<td class="nowrap"> {{ location.name }} </td>
											<td> </td>
											<td> {{ location.done }} </td>
											<td> {{ location.issue }} </td>
											<td> {{ location.failed }} </td>
											<td> {{ location.expired }} </td>
										</tr>
								
									</template>

								</template>


							</tbody>
						</table>
					</div>

				</template>

			</template>

		</div>
	</div>


</template>

<script setup>

	import ServiceA from '@/components/icons/services/ServiceA.vue';
	import ServiceB from '@/components/icons/services/ServiceB.vue';
	import ServiceC from '@/components/icons/services/ServiceC.vue';
	import ServiceD from '@/components/icons/services/ServiceD.vue';
	import ServiceE from '@/components/icons/services/ServiceE.vue';
	import ServiceF from '@/components/icons/services/ServiceF.vue';
	import ServiceG from '@/components/icons/services/ServiceG.vue';

</script>

<script>
 	export default {
    	name: 'StatEmployeesTasks',
    	props: ['employees'],
    	components: { ServiceA, ServiceB, ServiceC, ServiceD, ServiceE, ServiceF, ServiceG },
    	data: () => ({
    	}),
    	mounted () {
    	},
    	methods: {
    	}
    }
</script>


<style scoped>

	.table-custom tbody tr:hover {
	    background-color: rgba(var(--cozh-blue-code), .05);
	}

	.table-custom tbody tr:not(:last-child) td {
     	border-bottom: none; 
	}

	.collapse {
		border: none;
	}
	.collapse__avatar {
		height: 50px;
		width: 50px;
		min-height: 50px;
		min-width: 50px;
		border-radius: 50%;
		background-color: var(--cozh-light-grey);
		margin-right: 15px;
		background-position: center;
   	 	background-size: cover;
    	background-repeat: no-repeat;
    	background-origin: border-box;
    	position: relative;
	}

	.collapse__header {
	    padding: 15px 20px;
	    padding-right: 50px;
	    background-color: #fff;
	    border-radius: 8px;
	}

	.collapse__content {
		padding-left: 10px;
	}

	
	
	.collapse__info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.collapse__name {
	    font-size: 14px;
	    font-weight: 500;
	}

	.collapse__functions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 2px 25px;
		margin-top: 2px;
		overflow: hidden;
	}

	.collapse__functions span {
		font-size: 12px;
		font-weight: 400;
		color: rgba(var(--cozh-black-code), .5);
		position: relative;
	}

	.collapse__functions span:not(:first-child)::before {
		content: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nOCcgaGVpZ2h0PScxMScgdmlld0JveD0nMCAwIDggMTEnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTcgMC41TDEgMTAuNScgc3Ryb2tlPScjQUFCNEI5Jy8+PC9zdmc+Cg==");
		position: absolute;
		left: -16px;
		top: 1px;
	}

	.collapse__badge {
		height: 15px;
		border-radius: 8px;
		color: #fff;
		background-color: var(--cozh-grey);
		font-size: 10px;
		font-weight: 700;
		width: fit-content;
	    padding: 0px 5px;
	    display: flex;
	    flex-direction: row;
	    align-items: center;
	    justify-content: center;
	    position: absolute;
	    left: -10px;
	    top: -5px;
	}

	.collapse__badge--red {
		background-color: var(--cozh-red);
	}
	.collapse__badge--orange {
		background-color: var(--cozh-orange);
	}
	.collapse__badge--green {
		background-color: var(--cozh-green);
	}


	.c-module {
		background-color: #fff;
		border-radius: 8px;
		padding: 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		margin-top: 5px;
	}

	.c-module__name {
		font-size: 16px;
		font-weight: 500;
	}

	.c-module__ico {
		height: 50px;
    	width: 50px;
    	border-radius: 50%;
    	background-color: #E9F1F4;
    	margin-right: 15px;
    	display: flex;
    	flex-direction: row;
    	align-items: center;
    	justify-content: center;
		background-color: rgba(var(--cozh-blue-code), .08);
	}

	.c-module__ico:deep(svg path) {
		fill: rgba(var(--cozh-blue-code), 1);
	}


	.c-topic {
		margin-top: 5px;
	    margin-left: 10px;
	    background-color: #fff;
	    border-radius: 8px;
	    padding: 13px 25px;
	    font-size: 16px;
	    font-weight: 500;
	}


	.c-place {
	    background-color: #fff;
	    border-radius: 8px;
	    margin-left: 20px;
	    min-height: 100px;
	    margin-top: 5px;
	    overflow: hidden;
	}


	.c-place__header th {
		padding: 16px 25px;
		font-size: 14px;
    	font-weight: 500;
    	color: var(--cozh-black);
    	text-transform: none;
    	letter-spacing: 0em;
	}	

	.c-place__task {
		cursor: pointer;
		position: relative;
		user-select: none;
	}
	.table-custom tbody .c-place__task:not(:last-child) td {
		border-bottom: 1px solid var(--cozh-light-grey);
	}

	.c-place__task::after {
		content: '';
	    background-image: url('@/assets/img/collapse-black-slim-ico.svg');
	    position: absolute;
	    right: 27px;
	    top: 50%;
	    transform: translateY(-50%) rotate(-180deg);
	    height: 6px;
	    width: 8px;
	    transition: all .2s ease-out;
	}
	.c-place__task.open::after {
	    transform: translateY(-50%) rotate(0deg);
	}
	.table-custom tbody .c-place__task.open:not(:last-child) td {
		border-bottom: none;
	}
	.c-place__task td {
		padding: 10px 25px;
		height: auto;
	}


	.c-place__info {
		background-color: #F4F8FA;
	}
	.c-place__info td {
		font-size: 12px;
		height: auto;
		padding: 10px 25px;
	}
	.c-place__info + .c-place__info td {
		border-top: 1px solid var(--cozh-light-grey);
	}



	.c-badge {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	} 

	.c-badge__round {
		height: 30px;
		width: 30px;
		min-height: 30px;
		min-width: 30px;
		color: #fff;
		font-size: 11px;
		font-weight: 600;
		background-color: var(--cozh-grey);
		border-radius: 50%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.c-badge__text {
		font-size: 11px;
		margin-left: 10px;
		white-space: nowrap;
	}


	.c-badge--blue .c-badge__round {
		background-color: var(--cozh-blue);
	}
	.c-badge--orange .c-badge__round {
		background-color: var(--cozh-orange);
	}
	.c-badge--red .c-badge__round {
		background-color: var(--cozh-red);
	}
	.c-badge--darkred .c-badge__round {
		background-color: var(--cozh-dark-red);
	}





</style>
