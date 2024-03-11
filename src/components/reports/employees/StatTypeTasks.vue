<template>
	<div class="block block--small">
		<DynamicsDialogue ref="dynamicsDialogue" />
		<div class="block__header">
			<div class="block__title">
				<img src="@/assets/img/task-type/review.svg" v-if="type == 'review'">
				<img src="@/assets/img/task-type/work.svg" v-if="type == 'work'">
				<img src="@/assets/img/task-type/control.svg" v-if="type == 'control'">

				<template v-if="type == 'review'"> Осмотры </template>
				<template v-if="type == 'work'"> Работы </template>
				<template v-if="type == 'control'"> Контроль </template>
			</div>
			<div class="block__hint"> {{ $moment(filter.begin).format('DD.MM') + ' — ' + $moment(filter.end).format('DD.MM') }} </div>
		</div>
		<div class="block__body">
			<div class="c-pie">
				<div class="c-pie__left">
					<div class="c-number c-number--lg mb-2">
						<div class="c-number__content">
							<div class="c-number__num"> {{ params.total }} </div>
						</div>
						<div class="c-number__label" v-if="type == 'review'"> Всего осмотров </div>
						<div class="c-number__label" v-if="type == 'work'"> Всего работ </div>
						<div class="c-number__label" v-if="type == 'control'"> Всего заданий типа «Контроль» </div>
					</div>
					<div class="c-grid">
						<div class="c-grid__col">
							<div class="c-number c-number--blue">
								<div class="c-number__content">
									<div class="c-number__num"> {{ params.done }} </div>
									<div class="c-number__percent"> {{ params.doneP + '%'}} </div>
								</div>
								<div class="c-number__label"> Сделано, всё&nbsp;хорошо </div>
							</div>
							<div class="c-number c-number--darkred">
								<div class="c-number__content">
									<div class="c-number__num"> {{ params.expired }} </div>
									<div class="c-number__percent"> {{ params.expiredP + '%'}} </div>
								</div>
								<div class="c-number__label"> Просрочено </div>
							</div>
						</div>
						<div class="c-grid__col">
							<div class="c-number c-number--orange">
								<div class="c-number__content">
									<div class="c-number__num"> {{ params.issue }} </div>
									<div class="c-number__percent"> {{ params.issueP + '%'}} </div>
								</div>
								<div class="c-number__label"> Сделано, есть&nbsp;проблема </div>
							</div>
							<div class="c-number c-number--red">
								<div class="c-number__content">
									<div class="c-number__num"> {{ params.failed }} </div>
									<div class="c-number__percent"> {{ params.failedP + '%'}} </div>
								</div>
								<div class="c-number__label"> Не сделано </div>
							</div>
						</div>
					</div>
				</div>
				<div class="c-pie__right">
					<PieChart :chartData="chartData" :options="options" />
				</div>
			</div>
			<a class="btn btn--outline btn--medium" @click="showDynamics">
				Посмотреть динамику
			</a>
		</div>
	</div>
</template>

<script setup>
	import { PieChart } from 'vue-chart-3';
  	import { Chart, registerables} from 'chart.js';
  	// https://chartjs-plugin-datalabels.netlify.app/guide/options.html#scriptable-options
  	import ChartDataLabels from 'chartjs-plugin-datalabels';
	Chart.register(ChartDataLabels, ...registerables);
	import DynamicsDialogue from '@/components/modals/DynamicsDialogue.vue';
</script>

<script>
 	export default {
    	name: 'StatTypeTasks',
    	props: ['title', 'params', 'type', 'filter'],
    	data: () => ({
      		chartData: {
		      	labels: ['done', 'issue', 'expired', 'failed'],
		      	datasets: [{
		          	data: [0, 0, 0, 0],
		          	backgroundColor: ['#008dd2', '#ff9100', '#750000', '#e03712'],
		          	borderWidth: 0,
		        }],
		    },
		    options: {
		    	plugins: {
	    			tooltip: {
	    				enabled: false,
	    			},
	    			legend: {
	    				display: false,
	    			},
	    			datalabels: {
				        color: '#fff',
				        display: true,
				        font: {
				        	size: 10,
				        	family: 'Inter',
				        	weight: 600,
				        },
				        formatter (val) {
				        	return val == 0 ? null : val + '%';
				        }
				    }
	    		},
		    }
    	}),
    	watch: {
    		params: {
    			handler() {
    				this.chartData.datasets[0].data = [this.params.doneP, this.params.issueP, this.params.expiredP, this.params.failedP];
			    },
			    deep: true,
    		},
    	},
    	mounted () {
    		this.chartData.datasets[0].data = [this.params.doneP, this.params.issueP, this.params.expiredP, this.params.failedP];
    	},
    	methods: {
    		showDynamics () {
    			this.$refs.dynamicsDialogue.show(this.filter, this.type);
    		}
    	}
    }
</script>

<style scoped>


	.c-grid {
		display: flex;
		flex-direction: row;
		gap: 15px;
	}
	.c-grid__col {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
		width: fit-content;
	}
	.c-grid__col .c-number {
		width: 100%;
	}



	.c-pie {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 20px;
	}
	.c-pie__left {
		width: 100%;
	}
	.c-pie__right {
		min-width: 120px;
		margin-left: 20px;
	}



	.c-number {
		display: flex;
		flex-direction: column;
	}
	.c-number__content {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
	}
	.c-number__num {
		font-size: 18px;
		font-weight: 600;
		line-height: 1;
	}
	.c-number__percent {
		font-size: 10px;
		font-weight: 700;
		line-height: 1;
		margin-left: 4px;
	}
	.c-number__label {
		font-size: 12px;
		font-weight: 500;
		line-height: 1.3;
		margin-top: 3px;
		/*white-space: nowrap;*/
	}

	.c-number--lg .c-number__num {
		font-size: 24px;
	}
	.c-number--lg .c-number__label {
		margin-top: 5px;
	}

	.c-number--blue .c-number__content {
	    color: var(--cozh-blue);
	}
	.c-number--red .c-number__content {
	    color: var(--cozh-red);
	}
	.c-number--darkred .c-number__content {
	    color: var(--cozh-dark-red);
	}
	.c-number--orange .c-number__content {
	    color: var(--cozh-orange);
	}


	.block__hint {
		color: var(--cozh-grey);
	}


</style>