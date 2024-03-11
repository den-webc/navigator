<template>

	<MessageDialogue ref="messageDialogue" />
  <ConfirmDialogue ref="confirmDialogue" />

	<div class="topic">
		<div class="topic__header">
			<div class="topic__hitem"> Тип </div>
			<div class="topic__hitem"> Наименование </div>
			<div class="topic__hitem"> Периодичность </div>
			<div class="topic__hitem"> Расписание </div>
			<div class="topic__hitem"> Квалификация </div>
			<div class="topic__hitem"> Сотрудник </div>
			<div class="topic__hitem"> Дней на ипсполн </div>
		</div>
		<div class="topic__body">

			<div class="activity" v-for="group in topic.templateGroups" :key="group.num">

				<!-- Заголовок Activity -->
				<div class="activity__header">
					<div class="activity__header-left">
						<div class="me-1_5">
							<span> ID </span> 
							<span> {{ group.groupId }} </span>
						</div>
						<div>
							<span> Индекс </span> 
							<span> {{ group.num }} </span>
						</div>
					</div>
				<!-- 	<div class="activity__header-right">
						<a class="activity__delete" @click="deleteGroup($event, group);">
							<span>Удалить</span>
							<svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M7 1.5L1 7.5M1 1.5L7 7.5" stroke="#AEC1CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</a>
					</div> -->
				</div>

				<!-- Осмотр -->
				<div class="activity__element" v-if="group.activity.hasOwnProperty('review')">
					<div class="activity__item">
						<div class="activity__ico">О</div>
					</div>
					<div class="activity__item" style="margin-top: 5px;">
						{{ group.activity.review.actionName }}
					</div>
					<div class="activity__item">
						<!-- Если необходимо указывать периодичность -->
						<div v-if="group.activity.review.periodical">
							<SelectPicker 
								:label="'Выберите периодичность'" 
								:size="'xs'"
								:list="periodical"
								v-model="group.activity.review.periodicalValue"
								@update:model-value="(val) => { const ob = {}; ob[val] = []; group.activity.review.period = ob; }"
							/>
						</div>
					</div>
					<div class="activity__item">
						<!-- Если необходимо указывать периодичность -->
						<div v-if="group.activity.review.periodical">
							<!-- Периодичность указана как "Ежедневно" -->
							<div v-if="group.activity.review.periodicalValue == 'everyDay'">
								<HoursPicker :label="'Выберите время'" v-model="group.activity.review.period[group.activity.review.periodicalValue]"/>
							</div>
							<!-- Периодичность указана как "Еженедельно" -->
							<div v-if="group.activity.review.periodicalValue == 'everyWeek'">
								<WeekDayPicker :label="'Выберите дни недели'" v-model="group.activity.review.period[group.activity.review.periodicalValue]"/>
							</div>
							<!-- Периодичность указана как "Ежемесячно" -->
							<div v-if="group.activity.review.periodicalValue == 'everyMonth'">
								<MonthDayPicker :label="'Выберите дни месяца'" v-model="group.activity.review.period[group.activity.review.periodicalValue]"/>
							</div>
							<!-- Периодичность указана как "Ежеквартально" -->
							<div v-if="group.activity.review.periodicalValue == 'everyQuarter'">
								<QuarterDayPicker :label="'Укажите дни квартала'" v-model="group.activity.review.period[group.activity.review.periodicalValue]"/>
							</div>
							<!-- Периодичность указана как "Каждые пол года" -->
							<div v-if="group.activity.review.periodicalValue == 'everySixMonths'">
								<SixMonthDayPicker :label="'Укажите дни полугодий'" v-model="group.activity.review.period[group.activity.review.periodicalValue]"/>
							</div>
							<!-- Периодичность указана как "Каждый год" -->
							<div v-if="group.activity.review.periodicalValue == 'everyYear'">
								<YearDayPicker :label="'Укажите дни в году'" v-model="group.activity.review.period[group.activity.review.periodicalValue]"/>
							</div>
						</div>
					</div>
					<div class="activity__item">
						<SelectPicker 
							:label="'Выберите квалификацию'" 
							:size="'xs'"
							:list="functions"
							v-model="group.activity.review.function.id"
							@update:model-value="(val) => { group.activity.review.employee.id = null }"
						/>
					</div>
					<div class="activity__item">
						<SelectPicker 
							:label="'Выберите сотрудника'" 
							:size="'xs'"
							:list="employeesListReview(group.activity.review)" 
							v-model="group.activity.review.employee.id"
						/>
					</div>
					<div class="activity__item">
						<div class="form-control form-control--xs">
							<input type="text" v-model="group.activity.review.ttl" style="text-align: center;"> 
						</div>
					</div>
				</div>



				<!-- Работа -->
				<div class="activity__element" v-if="group.activity.hasOwnProperty('work')">
					<div class="activity__item">
						<div class="activity__ico">Р</div>
					</div>
					<div class="activity__item" style="margin-top: 5px;">
						{{ group.activity.work.actionName }}
					</div>
					<div class="activity__item">
						<!-- Если необходимо указывать периодичность -->
						<div v-if="group.activity.work.periodical">
							<SelectPicker 
								:label="'Выберите периодичность'" 
								:size="'xs'"
								:list="periodical"
								v-model="group.activity.work.periodicalValue"
								@update:model-value="(val) => { const ob = {}; ob[val] = []; group.activity.work.period = ob; }"
							/>
						</div>
					</div>
					<div class="activity__item">
						<!-- Если необходимо указывать периодичность -->
						<div v-if="group.activity.work.periodical">
							<!-- Периодичность указана как "Ежедневно" -->
							<div v-if="group.activity.work.periodicalValue == 'everyDay'">
								<HoursPicker :label="'Выберите время'" v-model="group.activity.work.period[group.activity.work.periodicalValue]"/>
							</div>
							<!-- Периодичность указана как "Еженедельно" -->
							<div v-if="group.activity.work.periodicalValue == 'everyWeek'">
								<WeekDayPicker :label="'Выберите дни недели'" v-model="group.activity.work.period[group.activity.work.periodicalValue]"/>
							</div>
							<!-- Периодичность указана как "Ежемесячно" -->
							<div v-if="group.activity.work.periodicalValue == 'everyMonth'">
								<MonthDayPicker :label="'Выберите дни месяца'" v-model="group.activity.work.period[group.activity.work.periodicalValue]"/>
							</div>
							<!-- Периодичность указана как "Ежеквартально" -->
							<div v-if="group.activity.work.periodicalValue == 'everyQuarter'">
								<QuarterDayPicker :label="'Укажите дни квартала'" v-model="group.activity.work.period[group.activity.work.periodicalValue]"/>
							</div>
							<!-- Периодичность указана как "Каждые пол года" -->
							<div v-if="group.activity.work.periodicalValue == 'everySixMonths'">
								<SixMonthDayPicker :label="'Укажите дни полугодий'" v-model="group.activity.work.period[group.activity.work.periodicalValue]"/>
							</div>
							<!-- Периодичность указана как "Каждый год" -->
							<div v-if="group.activity.work.periodicalValue == 'everyYear'">
								<YearDayPicker :label="'Укажите дни в году'" v-model="group.activity.work.period[group.activity.work.periodicalValue]"/>
							</div>
						</div>
					</div>
					<div class="activity__item">
						<SelectPicker 
							:label="'Выберите квалификацию'" 
							:size="'xs'"
							:list="functions"
							v-model="group.activity.work.function.id"
							@update:model-value="(val) => { group.activity.work.employee.id = null }"
						/>
					</div>
					<div class="activity__item">
						<SelectPicker 
							:label="'Выберите сотрудника'" 
							:size="'xs'"
							:list="employeesListWork(group.activity.work)" 
							v-model="group.activity.work.employee.id"
						/>
					</div>
					<div class="activity__item">
						<div class="form-control form-control--xs">
							<input type="text" v-model="group.activity.work.ttl" style="text-align: center;"> 
						</div>
					</div>
				</div>


				<!-- Контроль -->
				<div class="activity__element" v-if="group.activity.hasOwnProperty('control')">
					<div class="activity__item">
						<div class="activity__ico">К</div>
					</div>
					<div class="activity__item" style="margin-top: 5px;">
						{{ group.activity.control.actionName }}
					</div>
					<div class="activity__item">
						<!-- Если необходимо указывать периодичность -->
						<div v-if="group.activity.control.periodical">
							<SelectPicker 
								:label="'Выберите периодичность'" 
								:size="'xs'"
								:list="periodical"
								v-model="group.activity.control.periodicalValue"
								@update:model-value="(val) => { const ob = {}; ob[val] = []; group.activity.control.period = ob; }"
							/>
						</div>
					</div>
					<div class="activity__item">
						<!-- Если необходимо указывать периодичность -->
						<div v-if="group.activity.control.periodical">
							<!-- Периодичность указана как "Ежедневно" -->
							<div v-if="group.activity.control.periodicalValue == 'everyDay'">
								<HoursPicker :label="'Выберите время'" v-model="group.activity.control.period[group.activity.control.periodicalValue]"/>
							</div>
							<!-- Периодичность указана как "Еженедельно" -->
							<div v-if="group.activity.control.periodicalValue == 'everyWeek'">
								<WeekDayPicker :label="'Выберите дни недели'" v-model="group.activity.control.period[group.activity.control.periodicalValue]"/>
							</div>
							<!-- Периодичность указана как "Ежемесячно" -->
							<div v-if="group.activity.control.periodicalValue == 'everyMonth'">
								<MonthDayPicker :label="'Выберите дни месяца'" v-model="group.activity.control.period[group.activity.control.periodicalValue]"/>
							</div>
							<!-- Периодичность указана как "Ежеквартально" -->
							<div v-if="group.activity.control.periodicalValue == 'everyQuarter'">
								<QuarterDayPicker :label="'Укажите дни квартала'" v-model="group.activity.control.period[group.activity.control.periodicalValue]"/>
							</div>
							<!-- Периодичность указана как "Каждые пол года" -->
							<div v-if="group.activity.control.periodicalValue == 'everySixMonths'">
								<SixMonthDayPicker :label="'Укажите дни полугодий'" v-model="group.activity.control.period[group.activity.control.periodicalValue]"/>
							</div>
							<!-- Периодичность указана как "Каждый год" -->
							<div v-if="group.activity.control.periodicalValue == 'everyYear'">
								<YearDayPicker :label="'Укажите дни в году'" v-model="group.activity.control.period[group.activity.control.periodicalValue]"/>
							</div>
						</div>
					</div>
					<div class="activity__item">
						<SelectPicker 
							:label="'Выберите квалификацию'" 
							:size="'xs'"
							:list="functions"
							v-model="group.activity.control.function.id"
							@update:model-value="(val) => { group.activity.control.employee.id = null }"
						/>
					</div>
					<div class="activity__item">
						<SelectPicker 
							:label="'Выберите сотрудника'" 
							:size="'xs'"
							:list="employeesListControl(group.activity.control)" 
							v-model="group.activity.control.employee.id"
						/>
					</div>
					<div class="activity__item">
						<div class="form-control form-control--xs">
							<input type="text" v-model="group.activity.control.ttl" style="text-align: center;" :id="'ttl-' + group.num" :name="'ttl-' + group.num"> 
						</div>
					</div>
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

  import MessageDialogue from '../modals/MessageDialogue.vue';
  import ConfirmDialogue from '../modals/ConfirmDialogue.vue';
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
    	for (let key in this.topic.templateGroups) {

    		const activity = this.topic.templateGroups[key].activity;

    		if(activity.review) {
    			if (activity.review.employee == null) {
    				activity.review.employee = { id: null };
    			}
	    		if (activity.review.periodical) {
    				activity.review.periodicalValue = Object.keys(activity.review.period)[0];
	    		}
    		}
    		if(activity.work) {
    			if (activity.work.employee == null) {
    				activity.work.employee = { id: null };
    			}
    			if (activity.work.periodical) {
    				activity.work.periodicalValue = Object.keys(activity.work.period)[0];
	    		}
    		}
    		if(activity.control) {
    			if (activity.control.employee == null) {
    				activity.control.employee = { id: null };
    			}
    			if (activity.control.periodical) {
    				activity.control.periodicalValue = Object.keys(activity.control.period)[0];
	    		}
    		}
    	}
    },	

    computed: {
    	employeesListReview () {
    		return (review) => {
	    		let employees = [];
	    		if (review.function && review.function != null) {
		    		this.employees.forEach((item) => {
		    			if(!item.active) { return }
		    			let employerFuncsArr = [];
		    			item.functions.forEach((func) => { employerFuncsArr.push(func.id) });
		    			if(employerFuncsArr.includes(review.function.id)) {
		    				employees.push({ id: item.id, name: item.name });
		    			}
		    		});
	    		}
	    		return employees;
    		}
    	},
    	employeesListWork () {
    		return (work) => {
	    		let employees = [];
	    		if (work.function && work.function != null) {
		    		this.employees.forEach((item) => {
		    			if(!item.active) { return }
		    			let employerFuncsArr = [];
		    			item.functions.forEach((func) => { employerFuncsArr.push(func.id) });
		    			if(employerFuncsArr.includes(work.function.id)) {
		    				employees.push({ id: item.id, name: item.name });
		    			}
		    		});
	    		}
	    		return employees;
    		}
    	},
    	employeesListControl () {
    		return (control) => {
	    		let employees = [];
	    		if (control.function && control.function != null) {
		    		this.employees.forEach((item) => {
		    			if(!item.active) { return }
		    			let employerFuncsArr = [];
		    			item.functions.forEach((func) => { employerFuncsArr.push(func.id) });
		    			if(employerFuncsArr.includes(control.function.id)) {
		    				employees.push({ id: item.id, name: item.name });
		    			}
		    		});
	    		}
	    		return employees;
    		}
    	},

    },

    methods: {
    	async deleteGroup (e, group) {
			  const confirm = await this.$refs.confirmDialogue.show({
          message: 'Вы уверены, что хотите удалить группу?',
          okButton: 'Удалить',
          cancelButton: 'Отменить',
        });
			  if(confirm) {
    			console.log(e);
    			console.log(group);
			  }
    	}
    },

	}
</script>

<style scoped>


	.activity:not(:last-child) {
		border-bottom: 1px solid var(--cozh-light-grey);
	}

	.activity__header {
		padding: 10px 0px;
		border-bottom: 1px solid var(--cozh-light-grey);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.activity__header-left {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	.activity__header-left span:first-child {
		color: var(--cozh-grey);
		font-size: 12px;
		font-weight: 500;
		margin-right: 8px;
	}

	.activity__header-left span:last-child {
		color: var(--cozh-black);
 		font-size: 12px;
 		font-weight: 500;
	}

	.activity__delete {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	.activity__delete span {
		font-size: 10px;
		font-weight: 600;
		line-height: 1;
		letter-spacing: 0.05em;
		text-align: center;
		color: var(--cozh-grey);
		text-transform: uppercase;
		line-height: 1.3;
		transition: all .2s ease-out;
	}
	.activity__delete svg {
		margin-left: 5px;
	}
	.activity__delete svg path {
		transition: all .2s ease-out;
	}
	.activity__delete:hover svg path {
		stroke: var(--cozh-blue);
	}
	.activity__delete:hover span {
		color: var(--cozh-blue);
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

	.activity__item:nth-child(7) {
		min-width: 60px;
		max-width: 60px;
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
		min-width: 200px;
		max-width: 200px;
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




	.topic__header {
		display: flex;
		flex-direction: row;
		align-items: center;
    	align-self: stretch;
    	border-bottom: 1px solid #d9e4eb;
    	flex-shrink: 0;
    	gap: 10px;
    	justify-content: flex-start;
    	padding: 10px 20px;
    	position: relative;
	}
	.topic__body {
    	padding: 0px 20px;
	}
	.topic__hitem {
		color: var(--cozh-dark-grey);
    	font-size: 12px;
    	font-weight: 500;
	}

 	.topic__hitem:nth-child(7) {
		min-width: 60px;
		max-width: 60px;
	}
	.topic__hitem:nth-child(6) {
		min-width: 150px;
		max-width: 150px;
	}
	.topic__hitem:nth-child(5) {
		min-width: 150px;
		max-width: 150px;
	}
	.topic__hitem:nth-child(4) {
		min-width: 200px;
		max-width: 200px;
	}
	.topic__hitem:nth-child(3) {
		min-width: 150px;
		max-width: 150px;
	}
	.topic__hitem:nth-child(2) {
		width: 100%;
	}
	.topic__hitem:nth-child(1) {
		min-width: 30px;
		max-width: 30px;
	}



</style>