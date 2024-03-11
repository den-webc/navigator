<template>

	<TopMenu :breadcrumbs="breadcrumbs"/>
	<Navigator />

	<div class="component-filter">
		<div class="range-picker">
			<DatePicker v-model="filter.begin" label="Дата от" :isClear="false" />
			<DatePicker v-model="filter.end" label="Дата до" :isClear="false" />
		</div>
		<div class="btn-group">
			<a class="btn btn--medium btn--default btn--inline" @click="saveFilter($event)">
				<div class="btn--text"> Применить фильтры </div>
				<div class="btn--loader"> </div>
			</a>
			<a class="btn btn--medium btn--outline btn--inline" @click="clearFilter">
				<div class="btn--text"> Сбросить фильтры </div>
				<div class="btn--loader"> </div>
			</a>
		</div>
	</div>


	<template v-for="(module, index) in modules" :key="index">

		<div class="c-module" :class="{'open': module.isOpen}" @click="module.isOpen = !module.isOpen">
			<div class="c-module__ico">
				<component :is="'Service' + module.num"></component>
			</div>
			<div class="c-module__name">
				{{ module.name }}
			</div>
		</div>
		
		<template v-if="module.isOpen">
			
			<template v-for="(epic, index) in module.epics" :key="index">
				
				<div class="c-epic" :class="{'open': epic.isOpen}" @click="epic.isOpen = !epic.isOpen">

					{{ epic.name }}

				</div>

				<template v-if="epic.isOpen">

					<template v-for="(topic, index) in epic.topics" :key="index">

						<div class="c-topic">

							<div class="c-topic__header" :class="{'open': topic.isOpen}" @click="topic.isOpen = !topic.isOpen">
								<div class="c-topic__badge">
									{{ topic.total }}
								</div>
								<div class="c-topic__name">
									{{ topic.name }}
								</div>
							</div>

							<div class="c-topic__body" v-if="topic.isOpen">
								<table class="table-custom">
									<thead>
										<tr>
											<th>Задания</th>
											<th>Место</th>
											<th>Тип</th>
											<th>Выполнено</th>
										</tr>
									</thead>
									<tbody>

										<template v-for="(task, index) in topic.tasks" :key="index">

											<tr class="c-task" :class="{'open': task.isOpen}" @click="{ task.isOpen = !task.isOpen; }">
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
												<td> {{ task.total }} </td>
											</tr>

											<template v-if="task.isOpen">
												
												<tr class="c-info" v-for="(location, index) in task.locations" :key="index">
													<td> </td>
													<td class="nowrap"> {{ location.name }} </td>
													<td> </td>
													<td> {{ location.done }} </td>
												</tr>
										
											</template>

										</template>

									</tbody>
								</table>
							</div>
						</div>

					</template>

				</template>


			</template>

		</template>

	</template>




</template>

<script setup>
	import TopMenu from '@/components/TopMenu.vue';
	import Navigator from '@/components/reports/Navigator.vue';
	import DatePicker from '@/components/ux/DatePicker.vue';

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
    
    name: 'PageReportsCompleteHouse',
    
    components: { ServiceA, ServiceB, ServiceC, ServiceD, ServiceE, ServiceF, ServiceG },

    data: () => ({
      	breadcrumbs: [],
      	house: null,
      	filter: {
	      	begin: null,
	      	end: null,
      	},

      	modules: [
      		{
      			num: 'A',
      			name: 'Лифтовое хозяйство',
      			epics: [
      				{
      					num: 'A.1',
      					name: 'Регулярная уборка МОП',
      					topics: [
      						{
      							num: 'A.1.1',
      							name: 'Кабина лифта',
      							total: 325,
      							tasks: [
      								{
      									type: 'work',
      									name: 'Помыть полы',
      									total: 21,
      									locations: [
      										{
      											name: 'Секция 1 Лифт 1',
      											done: 10,
      										},
      										{
      											name: 'Секция 1 Лифт 2',
      											done: 11,
      										}
      									]
      								},
      								{
      									type: 'review',
      									name: 'Помыть зеркало',
      									total: 7,
      									locations: [
      										{
      											name: 'Секция 1 Лифт 1',
      											done: 3,
      										},
      										{
      											name: 'Секция 1 Лифт 2',
      											done: 4,
      										}
      									]
      								}
      							]
      						}
      					]
      				}
      			]
      		},
      		{
      			num: 'B',
      			name: 'Санитарное содержание',
      			epics: [],
      		},
      		{
      			num: 'C',
      			name: 'Конструктивные элементы',
      			epics: [],
      		},
      		{
      			num: 'D',
      			name: 'Оборудование и системы инженерно-технического обеспечения',
      			epics: [],
      		},
      		{
      			num: 'E',
      			name: 'Благоустройство и озеленение придомовой территории',
      			epics: [],
      		},
      		{
      			num: 'F',
      			name: 'Обеспечение пожарной безопасности',
      			epics: [],
      		},
      		{
      			num: 'G',
      			name: 'Качество специальных сервисов: безопасность и комфорт жизни',
      			epics: [],
      		},
      	]
    }),
    
    computed: {
    	house_id () {
    		return this.$route.params.house_id;
    	},
    },

    created () {

    	this.filter.begin = this.$moment().subtract(7, 'days').format('YYYY-MM-DD');
    	this.filter.end = this.$moment().format('YYYY-MM-DD');

    	Promise.all([this.loadHouse()])
		    .then(() => {
		      	this.beforeRender();
		    })
		    .catch((e)=> {
		      	console.log(e);
		    })
    },
    methods: {
    	beforeRender () {
    		this.breadcrumbs = [
	        	{name: this.$route.meta.name, link: this.$route.matched[0].path, ico: this.$route.meta.ico},
	        	{name: this.house.address, link: ''},
	        ];
    	},

    	async clearFilter (e) {
	 			const btn = e.currentTarget;
	 			btn.classList.add('btn--load');
    		this.filter.begin = this.$moment().subtract(7, 'days').format('YYYY-MM-DD');
    		this.filter.end = this.$moment().format('YYYY-MM-DD');
    		await this.loadData();
	 			btn.classList.remove('btn--load');
    	},

    	async saveFilter (e) {
	 			const btn = e.currentTarget;
	 			btn.classList.add('btn--load');
    		await this.loadData();
	 			btn.classList.remove('btn--load');
    	},

    	buildfilter () {
    		const param = new URLSearchParams({});
    		if(this.filter.begin !== null) {
        		param.set("begin", this.filter.begin + 'T00:00:00.802333+00:00');
	        }
	        if(this.filter.end !== null) {
	        	param.set("end", this.filter.end + 'T23:59:59.802443+00:00');
	        }
	        return param;
    	},

    	async loadData () {
        	
        await new Promise(r => setTimeout(r, 500));

    	},

    	async loadHouse () {
      		this.house = await this.$store.dispatch('getHouse', {house_id: this.house_id});
    	},
    }
  }
</script>

<style scoped>
	
	.component-filter {
		background-color: #fff;
		padding: 15px;
		border-radius: 8px;
		display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    position: relative;
    margin-bottom: 10px;
	}

	.component-filter__item {
		flex: 1 1 0;
  	width: 0;
	}

	.component-filter a {
		width: fit-content;
	}





	.c-module::before, .c-epic::before, .c-task::after, .c-topic__header::before {
    content: '';
    background-image: url('@/assets/img/collapse-black-ico.svg');
    position: absolute;
    right: 27px;
    top: 50%;
    transform: translateY(-50%) rotate(-180deg);
    height: 5px;
    width: 8px;
    transition: all .2s ease-out;
	}
	.c-module.open::before, .c-epic.open::before, .c-task.open::after, .c-topic__header.open::before {
    transform: translateY(-50%) rotate(0deg);
	}


	.c-module {
		padding: 10px;
		background-color: #fff;
		border-radius: 8px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		cursor: pointer;
	}
	.c-module:not(:first-child) {
		margin-top: 5px;
	}
	.c-module__ico {
		height: 50px;
		width: 50px;
		border-radius: 50%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-right: 15px;
		background-color: rgba(var(--cozh-blue-code), .08);
	}
	.c-module__ico:deep(svg path) {
		fill: var(--cozh-blue);
	}
	.c-module__name {
		font-size: 18px;
		font-weight: 500;
	}


	.c-epic {
		padding: 15px 25px;
		background-color: #fff;
		border-radius: 8px;
		font-size: 16px;
		font-weight: 500;
		margin-top: 5px;
		margin-left: 10px;
		position: relative;
		cursor: pointer;
	}

	.c-topic {
		background-color: #fff;
		border-radius: 8px;
		margin-top: 5px;
		margin-left: 20px;
	}

	.c-topic__header {
		padding: 10px 25px;
		position: relative;
		cursor: pointer;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		cursor: pointer;
	}

	.c-topic__badge {
		height: 40px;
		width: 40px;
		border-radius: 50%;
		background-color: var(--cozh-blue);
		color: #fff;
		font-size: 12px;
		font-weight: 600;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.c-topic__name {
		font-size: 14px;
		font-weight: 500;
		margin-left: 10px;
	}

	.c-topic__body {
		border-top: 1px solid var(--cozh-light-grey);
	}




	.table-custom tbody tr:hover {
	  background-color: rgba(var(--cozh-blue-code), .05);
	}

	.table-custom tbody tr:not(:last-child) td {
    border-bottom: none; 
	}



	.c-info {
		background-color: #F4F8FA;
	}
	.c-info td {
		font-size: 12px;
		height: auto;
		padding: 10px 25px;
	}
	.c-info + .c-info td {
		border-top: 1px solid var(--cozh-light-grey);
	}


	.c-task {
		cursor: pointer;
		position: relative;
		user-select: none;
	}
	.table-custom tbody .c-task:not(:last-child) td {
		border-bottom: 1px solid var(--cozh-light-grey);
	}
	.table-custom tbody .c-task.open:not(:last-child) td {
		border-bottom: none;
	}

	.c-task td {
		padding: 10px 25px;
		height: auto;
	}


</style>