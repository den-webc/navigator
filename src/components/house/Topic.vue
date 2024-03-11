<template>
	<div class="activity" v-for="activity in topic.activities" :key="activity.num">

		<!-- Заголовок Activity -->
		<div class="activity__header">
			<span> Индекс </span> 
			<span> {{ activity.num }} </span>
		</div>

		<!-- Осмотр -->
		<div class="activity__element" v-if="activity.review !== null">
			<div class="activity__item">
				<div class="activity__ico">О</div>
			</div>
			<div class="activity__item" style="margin-top: 5px;">
				{{ activity.review }}
			</div>
			<div class="activity__item">
				{{ activity.location }}
			</div>
			<div class="activity__item">
				<!-- Если необходимо указывать периодичность осмотра -->
				<div v-if="activity.reviewPeriodical">
					<SelectPicker 
						:label="'Выберите периодичность'" 
						:size="'xs'"
						:list="periodical"
						v-model="activity.reviewPeriodicalValue"
						@update:model-value="(val) => { const ob = {}; ob[val] = []; activity.reviewPeriod = ob; }"
					/>
				</div>
			</div>
			<div class="activity__item">
				<!-- Если необходимо указывать периодичность осмотра -->
				<div v-if="activity.reviewPeriodical">
					<!-- Периодичность указана как "Ежедневно" -->
					<div v-if="activity.reviewPeriodicalValue == 'everyDay'">
						<HoursPicker :label="'Выберите время'" :uniq="activity.num" v-model="activity.reviewPeriod[activity.reviewPeriodicalValue]"/>
					</div>
					<!-- Периодичность указана как "Еженедельно" -->
					<div v-if="activity.reviewPeriodicalValue == 'everyWeek'">
						<WeekDayPicker :label="'Выберите дни недели'" :uniq="activity.num" v-model="activity.reviewPeriod[activity.reviewPeriodicalValue]"/>
					</div>
					<!-- Периодичность указана как "Ежемесячно" -->
					<div v-if="activity.reviewPeriodicalValue == 'everyMonth'">
						<MonthDayPicker :label="'Выберите дни месяца'" :uniq="activity.num" v-model="activity.reviewPeriod[activity.reviewPeriodicalValue]"/>
					</div>
					<!-- Периодичность указана как "Ежеквартально" -->
					<div v-if="activity.reviewPeriodicalValue == 'everyQuarter'">
						<QuarterDayPicker :label="'Укажите дни квартала'" :uniq="activity.num" v-model="activity.reviewPeriod[activity.reviewPeriodicalValue]"/>
					</div>
					<!-- Периодичность указана как "Каждые пол года" -->
					<div v-if="activity.reviewPeriodicalValue == 'everySixMonths'">
						<SixMonthDayPicker :label="'Укажите дни полугодий'" :uniq="activity.num" v-model="activity.reviewPeriod[activity.reviewPeriodicalValue]"/>
					</div>
					<!-- Периодичность указана как "Каждый год" -->
					<div v-if="activity.reviewPeriodicalValue == 'everyYear'">
						<YearDayPicker :label="'Укажите дни в году'" :uniq="activity.num" v-model="activity.reviewPeriod[activity.reviewPeriodicalValue]"/>
					</div>
				</div>
			</div>
			<div class="activity__item">
				<SelectPicker 
					:label="'Выберите квалификацию'" 
					:size="'xs'"
					:list="functions"
					v-model="activity.reviewFunction.id"
					@update:model-value="(val) => { activity.reviewEmployeeId = null }"
				/>
			</div>
			<div class="activity__item">
				<SelectPicker 
					:label="'Выберите сотрудника'" 
					:size="'xs'"
					:list="employeesListReview(activity)" 
					v-model="activity.reviewEmployeeId" 
				/>
			</div>
			<div class="activity__item">
				<div class="form-control form-control--xs">
					<input type="text" v-model="activity.reviewTtl" style="text-align: center;"> 
				</div>
			</div>
		</div>


		<!-- Работа -->
		<div class="activity__element" v-if="activity.work !== null">
			<div class="activity__item">
				<div class="activity__ico">Р</div>
			</div>
			<div class="activity__item" style="margin-top: 5px;">
				{{ activity.work }}
			</div>
			<div class="activity__item">
				{{ activity.location }}
			</div>
			<div class="activity__item">
				<!-- Если необходимо указывать периодичность осмотра -->
				<div v-if="activity.workPeriodical">
					<SelectPicker
						:label="'Выберите периодичность'"
						:size="'xs'"
						:list="periodical"
						v-model="activity.workPeriodicalValue"
						@update:model-value="(val) => { const ob = {}; ob[val] = []; activity.workPeriod = ob; }"
					/>
				</div>
			</div>

			<div class="activity__item">
				<!-- Если необходимо указывать периодичность осмотра -->
				<div v-if="activity.workPeriodical">
					<!-- Периодичность указана как "Ежедневно" -->
					<div v-if="activity.workPeriodicalValue == 'everyDay'">
						<HoursPicker :label="'Выберите время'" :uniq="activity.num" v-model="activity.workPeriod[activity.workPeriodicalValue]"/>
					</div>
					<!-- Периодичность указана как "Еженедельно" -->
					<div v-if="activity.workPeriodicalValue == 'everyWeek'">
						<WeekDayPicker :label="'Выберите дни недели'" :uniq="activity.num" v-model="activity.workPeriod[activity.workPeriodicalValue]"/>
					</div>
					<!-- Периодичность указана как "Ежемесячно" -->
					<div v-if="activity.workPeriodicalValue == 'everyMonth'">
						<MonthDayPicker :label="'Выберите дни месяца'" :uniq="activity.num" v-model="activity.workPeriod[activity.workPeriodicalValue]"/>
					</div>
					<!-- Периодичность указана как "Ежеквартально" -->
					<div v-if="activity.workPeriodicalValue == 'everyQuarter'">
						<QuarterDayPicker :label="'Укажите дни квартала'" :uniq="activity.num" v-model="activity.workPeriod[activity.workPeriodicalValue]"/>
					</div>
					<!-- Периодичность указана как "Каждые пол года" -->
					<div v-if="activity.workPeriodicalValue == 'everySixMonths'">
						<SixMonthDayPicker :label="'Укажите дни полугодий'" :uniq="activity.num" v-model="activity.workPeriod[activity.workPeriodicalValue]"/>
					</div>
					<!-- Периодичность указана как "Каждый год" -->
					<div v-if="activity.workPeriodicalValue == 'everyYear'">
						<YearDayPicker :label="'Укажите дни в году'" :uniq="activity.num" v-model="activity.workPeriod[activity.workPeriodicalValue]"/>
					</div>
				</div>
			</div>

			<div class="activity__item">
				<SelectPicker 
					:label="'Выберите квалификацию'" 
					:size="'xs'"
					:list="functions" 
					v-model="activity.workFunction.id"
					@update:model-value="(val) => { activity.workEmployeeId = null }"
				/>
			</div>
			<div class="activity__item">
				<SelectPicker 
					:label="'Выберите сотрудника'" 
					:size="'xs'"
					:list="employeesListWork(activity)" 
					v-model="activity.workEmployeeId" 
				/>
			</div>
			<div class="activity__item">
				<div class="form-control form-control--xs">
					<input type="text" v-model="activity.workTtl" style="text-align: center;"> 
				</div>
			</div>
		</div>

		<!-- Контроль -->
		<div class="activity__element" v-if="activity.control !== null">
			<div class="activity__item">
				<div class="activity__ico">К</div>
			</div>
			<div class="activity__item" style="margin-top: 5px;">
				{{ activity.control }}
			</div>
			<div class="activity__item">
				{{ activity.location }}
			</div>
			<div class="activity__item">
				<!-- Если необходимо указывать периодичность осмотра -->
				<div v-if="activity.controlPeriodical">
					<SelectPicker
						:label="'Выберите периодичность'"
						:size="'xs'"
						:list="periodical"
						v-model="activity.controlPeriodicalValue"
						@update:model-value="(val) => { const ob = {}; ob[val] = []; activity.controlPeriod = ob; }"
					/>
				</div>
			</div>

			<div class="activity__item">
				<!-- Если необходимо указывать периодичность осмотра -->
				<div v-if="activity.controlPeriodical">
					<!-- Периодичность указана как "Ежедневно" -->
					<div v-if="activity.controlPeriodicalValue == 'everyDay'">
						<HoursPicker :label="'Выберите время'" :uniq="activity.num" v-model="activity.controlPeriod[activity.controlPeriodicalValue]"/>
					</div>
					<!-- Периодичность указана как "Еженедельно" -->
					<div v-if="activity.controlPeriodicalValue == 'everyWeek'">
						<WeekDayPicker :label="'Выберите дни недели'" :uniq="activity.num" v-model="activity.controlPeriod[activity.controlPeriodicalValue]"/>
					</div>
					<!-- Периодичность указана как "Ежемесячно" -->
					<div v-if="activity.controlPeriodicalValue == 'everyMonth'">
						<MonthDayPicker :label="'Выберите дни месяца'" :uniq="activity.num" v-model="activity.controlPeriod[activity.controlPeriodicalValue]"/>
					</div>
					<!-- Периодичность указана как "Ежеквартально" -->
					<div v-if="activity.controlPeriodicalValue == 'everyQuarter'">
						<QuarterDayPicker :label="'Укажите дни квартала'" :uniq="activity.num" v-model="activity.controlPeriod[activity.controlPeriodicalValue]"/>
					</div>
					<!-- Периодичность указана как "Каждые пол года" -->
					<div v-if="activity.controlPeriodicalValue == 'everySixMonths'">
						<SixMonthDayPicker :label="'Укажите дни полугодий'" :uniq="activity.num" v-model="activity.controlPeriod[activity.controlPeriodicalValue]"/>
					</div>
					<!-- Периодичность указана как "Каждый год" -->
					<div v-if="activity.controlPeriodicalValue == 'everyYear'">
						<YearDayPicker :label="'Укажите дни в году'" :uniq="activity.num" v-model="activity.controlPeriod[activity.controlPeriodicalValue]"/>
					</div>
				</div>
			</div>
			<div class="activity__item">
				<SelectPicker 
					:label="'Выберите квалификацию'" 
					:size="'xs'"
					:list="functions" 
					v-model="activity.controlFunction.id" 
					@update:model-value="(val) => { activity.controlEmployeeId = null }"
				/>
			</div>
			<div class="activity__item">
				<SelectPicker 
					:label="'Выберите сотрудника'" 
					:size="'xs'"
					:list="employeesListControl(activity)" 
					v-model="activity.controlEmployeeId" 
				/>
			</div>
			<div class="activity__item">
				<div class="form-control form-control--xs">
					<input type="text" v-model="activity.controlTtl" style="text-align: center;"> 
				</div>
			</div>
		</div>

	</div>
</template>

<script setup>
  import SelectPicker from '../ux/SelectPicker.vue'
  import HoursPicker from '../ux/HoursPicker.vue'
  import WeekDayPicker from '../ux/WeekDayPicker.vue'
  import MonthDayPicker from '../ux/MonthDayPicker.vue'
  import QuarterDayPicker from '../ux/QuarterDayPicker.vue'
  import SixMonthDayPicker from '../ux/SixMonthDayPicker.vue'
  import YearDayPicker from '../ux/YearDayPicker.vue'
</script>

<script>
	export default {
		
		name: 'ActivityComponent',

		props: ['topic', 'functions', 'employees'],

    data: () => ({

    	periodical: [
    		{ id: 'everyDay', name: 'Ежедневно' },
    		{ id: 'everyWeek', name: 'Еженедельно' },
    		{ id: 'everyMonth', name: 'Ежемесячно' },
    		{ id: 'everyQuarter', name: 'Ежеквартально' },
    		{ id: 'everySixMonths', name: 'Каждые пол года' },
    		{ id: 'everyYear', name: 'Ежегодно' },
    	],

    }),

    created () {
    	for (let key in this.topic.activities) {
    		let activity = this.topic.activities[key];
    		if (activity.reviewPeriodical) {
    			activity.reviewPeriodicalValue = Object.keys(activity.reviewPeriod)[0];
    		}
    		if (activity.workPeriodical) {
    			activity.workPeriodicalValue = Object.keys(activity.workPeriod)[0];
    		}
    		if (activity.controlPeriodical) {
    			activity.controlPeriodicalValue = Object.keys(activity.controlPeriod)[0];
    		}
    	}
    },

    computed: {

    	employeesListControl () {
    		return (activity) => {
	    		let employees = [];
	    		if (activity.controlFunction && activity.controlFunction != null) {
		    		this.employees.forEach((item) => {
		    			if(!item.active) { return }
		    			let employerFuncsArr = [];
		    			item.functions.forEach((func) => { employerFuncsArr.push(func.id) });
		    			if(employerFuncsArr.includes(activity.controlFunction.id)) {
		    				employees.push({ id: item.id, name: item.name });
		    			}
		    		});
	    		}
	    		return employees;
    		}
    	},
    	employeesListWork () {
    		return (activity) => {
	    		let employees = [];
	    		if (activity.workFunction && activity.workFunction != null) {
		    		this.employees.forEach((item) => {
		    			if(!item.active) { return }
		    			let employerFuncsArr = [];
		    			item.functions.forEach((func) => { employerFuncsArr.push(func.id) });
		    			if(employerFuncsArr.includes(activity.workFunction.id)) {
		    				employees.push({ id: item.id, name: item.name });
		    			}
		    		});
	    		}
	    		return employees;
    		}
    	},
    	employeesListReview () {
    		return (activity) => {
	    		let employees = [];
	    		if (activity.reviewFunction && activity.reviewFunction != null) {
		    		this.employees.forEach((item) => {
		    			if(!item.active) { return }
		    			let employerFuncsArr = [];
		    			item.functions.forEach((func) => { employerFuncsArr.push(func.id) });
		    			if(employerFuncsArr.includes(activity.reviewFunction.id)) {
		    				employees.push({ id: item.id, name: item.name });
		    			}
		    		});
	    		}
	    		return employees;
    		}
    	},
    },

	}
</script>

<style scoped>
	
	.activity {
		padding: 0px 20px;
	}

	.activity:not(:last-child) {
		border-bottom: 1px solid var(--cozh-light-grey);
	}

	.activity__header {
		padding: 10px 0px;
		border-bottom: 1px solid var(--cozh-light-grey);
	}


	.activity__header span:first-child {
		color: var(--cozh-grey);
		font-size: 12px;
		font-weight: 500;
		margin-right: 8px;
	}

	.activity__header span:last-child {
		color: var(--cozh-black);
 		font-size: 12px;
 		font-weight: 500;
	}

	.activity__element {
		padding: 10px 0px;

		display: flex;
		flex-direction: row;
		align-items: flex-start;
	    align-self: stretch;
	    flex-shrink: 0;
	    gap: 10px;
	    justify-content: flex-start;
	    position: relative;

	}
	.activity__element:not(:last-child) {
		border-bottom: 1px solid var(--cozh-light-grey);
	}

	.activity__ico {
		height: 24px;
		width: 24px;
		color: #94A9B6;
		font-size: 10px;
		font-weight: 600;
		background-color: #e9f1f4;
		border-radius: 50%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.activity__item {
		font-size: 12px;
		font-weight: 500;
	}

	.activity__item:nth-child(8) {
		min-width: 60px;
		max-width: 60px;
	}
	.activity__item:nth-child(7) {
		min-width: 150px;
		max-width: 150px;
	}
	.activity__item:nth-child(6) {
		min-width: 150px;
		max-width: 150px;
	}
	.activity__item:nth-child(5) {
		min-width: 150px;
		max-width: 150px;
	}
	.activity__item:nth-child(4) {
		min-width: 150px;
		max-width: 150px;
	}
	.activity__item:nth-child(3) {
		min-width: 150px;
		max-width: 150px;
	}
	.activity__item:nth-child(2) {
		width: 100%;
	}
	.activity__item:nth-child(1) {
		min-width: 30px;
		max-width: 30px;
	}

</style>