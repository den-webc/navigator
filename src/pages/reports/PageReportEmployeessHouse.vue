<template>

	<TopMenu :breadcrumbs="breadcrumbs"/>

	<Navigator />

	<div class="component-filter">
		<div class="range-picker">
			<DatePicker v-model="filter.begin" label="Дата от" :isClear="false" />
			<DatePicker v-model="filter.end" label="Дата до" :isClear="false" />
		</div>
		<div class="component-filter__item">
			<SelectPicker :list="modules" label="Модуль" v-model="filter.module" :size="'sm'" :isClear="true" />
		</div>
		<a class="btn btn--medium btn--default btn--inline" @click="saveFilter($event)">
			<div class="btn--text"> Применить фильтры </div>
			<div class="btn--loader"> </div>
		</a>
		<a class="btn btn--medium btn--outline btn--inline" @click="clearFilter($event)">
			<div class="btn--text"> Сбросить фильтры </div>
			<div class="btn--loader"> </div>
		</a>
	</div>

	<template v-if="pie !== null">
		<template v-if="pie.actionTypeMetric !== null">
			<div class="c-row">
				<StatTypeTasks 
					type="review" 
					:params="pie.actionTypeMetric.review" 
					v-if="pie.actionTypeMetric.review"
					:filter="displayFilter"
					/>
				<StatTypeTasks 
					type="work" 
					:params="pie.actionTypeMetric.work" 
					v-if="pie.actionTypeMetric.work"
					:filter="displayFilter"
				/>
				<StatTypeTasks 
					type="control" 
					:params="pie.actionTypeMetric.control" 
					v-if="pie.actionTypeMetric.control"
					:filter="displayFilter"
				/>
			</div>
			<StatAllTasks :params="pie.total" :filter="displayFilter"/>
		</template>
		<transition name="slideY">
			<template v-if="pie.actionTypeMetric == null">
				<div class="c-empty">
					Нет данных за рассчётный ппериод
				</div>
			</template>
		</transition>
	</template>

	<template v-if="employees !== null">
		
		<StatEmployeesTasks :employees="employees" />

	</template>



</template>

<script setup>

	import TopMenu from '@/components/TopMenu.vue';
	import Navigator from '@/components/reports/Navigator.vue';

	import StatTypeTasks from '@/components/reports/employees/StatTypeTasks.vue';
	import StatAllTasks from '@/components/reports/employees/StatAllTasks.vue';
	import StatEmployeesTasks from '@/components/reports/employees/StatEmployeesTasks.vue';

	import SelectPicker from '@/components/ux/SelectPicker.vue';
	import DatePicker from '@/components/ux/DatePicker.vue';

</script>

<script>

  export default {
    name: 'PageReportEmployeessHouse',

    data: () => ({

      	breadcrumbs: [],
      	
      	house: null,
      	pie: null,
      	employees: null,

      	// Фильтр
      	filter: {
	      	module: null,
	      	begin: null,
	      	end: null,
      	},

      	displayFilter: {
	      	module: null,
	      	begin: null,
	      	end: null,
      	},

      	modules: [
      		{id: 'A', name: 'A - Лифтовое хозяйство'},
      		{id: 'B', name: 'B - Санитарное содержание'},
      		{id: 'C', name: 'C - Конструктивные элементы'},
      		{id: 'D', name: 'D - Оборудование и системы инженерно-технического обеспечения'},
      		{id: 'E', name: 'E - Благоустройство и озеленение придомовой территории'},
      		{id: 'F', name: 'F - Обеспечение пожарной безопасности'},
      		{id: 'G', name: 'G - Качество специальных сервисов: безопасность и комфорт жизни'},
      	],

    }),

    computed: {
    	house_id () {
    		return this.$route.params.house_id;
    	},
    },

    created () {


    	if(this.$route.query.module) {
  			const idx = this.modules.findIndex((item) => { return item.id == this.$route.query.module});
  			if(idx !== -1) {
	    		this.filter.module = this.modules[idx].id;
  			}
  		}

  		if (
  			this.$route.query.begin 
  			&& 
  			this.$route.query.end
  			&&
  			this.$moment(this.$route.query.begin, 'YYYY-MM-DD', true).isValid()
  			&&
  			this.$moment(this.$route.query.end, 'YYYY-MM-DD', true).isValid()
  		) {
	    	this.filter.begin = this.$route.query.begin;
	    	this.filter.end = this.$route.query.end;
  		} else {
  			this.filter.begin = this.$moment().subtract(7, 'days').format('YYYY-MM-DD');
  			this.filter.end = this.$moment().format('YYYY-MM-DD');
  		}
    		
      Promise.all([this.loadHouse()])
		    .then(() => {
		      this.beforeRender();
		    })
		    .catch((e)=> {
		      console.log(e);
		    })

		  this.loadData();
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
    		this.filter.module = null;
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
        if(this.filter.module !== null) {
        	param.set("moduleNum", this.filter.module);
        }
        if(this.filter.begin !== null) {
        	param.set("begin", this.filter.begin + 'T00:00:00.802333+00:00');
        }
        if(this.filter.end !== null) {
        	param.set("end", this.filter.end + 'T23:59:59.802443+00:00');
        }
        return param;
    	},

    	async loadData () {
        
        const param = this.buildfilter();
        
        this.displayFilter = {...this.filter};

        this.pie = await this.$store.dispatch('getReportsHousePie', {house_id: this.house_id, data: param});

        this.employees = await this.$store.dispatch('getReportsHouseEmployees', {house_id: this.house_id, data: param});

    	},

  		async loadHouse () {
      	this.house = await this.$store.dispatch('getHouse', {house_id: this.house_id});
    	},
      	
    },
  }
</script>

<style scoped>

	.c-row {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	.c-row .block {
		width:calc((100% - 20px) / 3);
	}

	.component-filter {
		background-color: #fff;
		padding: 15px;
		border-radius: 8px;
		display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: flex-start;
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

	
	.c-empty {
		height: 130px;
    width: 100%;
    padding: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
    font-size: 13px;
    font-weight: 500;
    color: var(--cozh-dark-grey);
	}

</style>