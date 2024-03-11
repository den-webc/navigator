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

	<div 
		
		v-for="item in modules" :key="item.moduleId"
		class="collapse collapse--noborder"
		:class="{
			'open': state[item.num].open, 
			'collapse--success': item.state >= 90, 
			'collapse--warning': item.state < 90 && item.state > 70, 
			'collapse--error': item.state <= 70
		}">
		
		<div 
			class="collapse__header" 
			@click="{ state[item.num].open = !state[item.num].open; }">
			<div class="collapse__ico">
				<component :is="'Service' + item.num"></component>
			</div>
			{{ item.name }} &nbsp; <span> {{ item.state + '%' }} </span>
		</div>

		<div class="collapse__content" v-if="state[item.num].open">
			<div class="tabs">
				<div class="tabs__header">
					<div 
						class="tabs__item" 
						:class="{'tabs__item--active': state[item.num].action == 'review'}"
						@click="state[item.num].action = 'review'">
						Осмотры
					</div>
					<div 
						class="tabs__item"
						:class="{'tabs__item--active': state[item.num].action == 'work'}"
						@click="state[item.num].action = 'work'">
						Работы
					</div>
				</div>
				<div class="tabs__body">
					<StatModuleSystemReview
						:module_id="item.moduleId"
						:house_id="house_id"
						:begin="filter.begin"
						:end="filter.end"
						v-if="state[item.num].action == 'review'"/>
					<StatModuleSystemWork
						:module_id="item.moduleId"
						:house_id="house_id"
						:begin="filter.begin"
						:end="filter.end"
						v-if="state[item.num].action == 'work'"/>
				</div>
			</div>
		</div>

	</div>

</template>

<script setup>

	import TopMenu from '@/components/TopMenu.vue';
	import Navigator from '@/components/reports/Navigator.vue';
	import DatePicker from '@/components/ux/DatePicker.vue';

	import StatModuleSystemReview from '@/components/reports/system/StatModuleSystemReview.vue';
	import StatModuleSystemWork from '@/components/reports/system/StatModuleSystemWork.vue';


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

    name: 'PageReportsSystemHouse',

    components: { ServiceA, ServiceB, ServiceC, ServiceD, ServiceE, ServiceF, ServiceG },

    data: () => ({
      	
      	breadcrumbs: [],
      	
      	house: null,

      	modules: [],

      	state: {
      		A: { open: false, action: 'review' },
      		B: { open: false, action: 'review' },
      		C: { open: false, action: 'review' },
      		D: { open: false, action: 'review' },
      		E: { open: false, action: 'review' },
      		F: { open: false, action: 'review' },
      		G: { open: false, action: 'review' },
      	},

      	filter: {
	      	begin: null,
	      	end: null,
      	},

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
        	
        	//
        	for (let num in this.state) {
        		this.state[num].open = false;
        	}

        	const param = this.buildfilter();

        	const {modules} = await this.$store.dispatch('getAnaliticsSystemModules', {house_id: this.house_id, data: param});
        	
        	this.modules = [];
        	
        	for (let id in modules) {
        		this.modules.push(modules[id]);
        	}

    	},

    	async loadHouse () {
      		this.house = await this.$store.dispatch('getHouse', {house_id: this.house_id});
    	},
    }
  }
</script>

<style scoped>

	.collapse:not(:last-child) {
		margin-bottom: 5px;
	}
	
	.collapse--noborder .collapse__header {
		padding: 10px 10px;
		font-weight: 500;
	}
	.collapse__content {
		display: block;
		border-top: 1px solid var(--cozh-light-grey);
	}

	.collapse__ico {
		height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: #E9F1F4;
    margin-right: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
	}

	.collapse--success .collapse__ico {
		background-color: rgba(var(--cozh-green-code), .08);
	}
	.collapse--success .collapse__ico:deep(svg path) {
		fill: rgba(var(--cozh-green-code), 1);
	}
	.collapse--success .collapse__header span {
		color: rgba(var(--cozh-green-code), 1);
	}


	.collapse--warning .collapse__ico {
		background-color: rgba(var(--cozh-orange-code), .08);
	}
	.collapse--warning .collapse__ico:deep(svg path) {
		fill: rgba(var(--cozh-orange-code), 1);
	}
	.collapse--warning .collapse__header span {
		color: rgba(var(--cozh-orange-code), 1);
	}


	.collapse--error .collapse__ico {
		background-color: rgba(var(--cozh-red-code), .08);
	}
	.collapse--error .collapse__ico:deep(svg path) {
		fill: rgba(var(--cozh-red-code), 1);
	}
	.collapse--error .collapse__header span {
		color: rgba(var(--cozh-red-code), 1);
	}


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

	


	.tabs {

	}

	.tabs__header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		height: 50px;
		padding: 0px 20px;
	}
	.tabs__body {
		border-top: 1px solid var(--cozh-light-grey);
		padding: 20px;
	}

	.tabs__item {
		font-size: 11px;
		font-weight: 600;
		color: var(--cozh-grey);
		text-transform: uppercase;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		border-bottom: 4px solid transparent;
		transition: all .2s ease-out;
		cursor: pointer;
	}
	.tabs__item:not(:last-child){
		margin-right: 30px;
	}

	.tabs__item--active {
		color: var(--cozh-black);
		border-color: var(--cozh-black);
	}

	.tabs__item:hover {
		color: var(--cozh-balck);
	}



</style>