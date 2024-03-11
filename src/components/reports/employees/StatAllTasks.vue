<template>
	<div class="block block--small mt-1">
		<div class="block__header">
			Отчёты по заданиям
			<div class="block__hint"> {{ $moment(filter.begin).format('DD.MM') + ' — ' + $moment(filter.end).format('DD.MM') }} </div>
		</div>
		<div class="block__body">
			<div class="c-stat">
				<div class="c-stat__left">
					<PieChart :chartData="chartData" :options="options" />
				</div>
				<div class="c-stat__right">
					<div class="c-block">
						<div class="c-number">
							<div class="c-number__content">
								<div class="c-number__num"> {{ params.total }} </div>
								<div class="c-number__percent"> {{ params.totalP + '%'}} </div>
							</div>
						</div>
						<div class="c-block__label">
							Всего заданий
						</div>
					</div>
					<div class="c-block">
						<div class="c-block__container">
							<div class="c-number c-number--blue">
								<div class="c-number__content">
									<div class="c-number__num"> {{ params.done }} </div>
									<div class="c-number__percent"> {{ params.doneP + '%'}} </div>
								</div>
							</div>
						</div>
						<div class="c-block__label">
							Сделано, всё&nbsp;хорошо
						</div>
					</div>
					<div class="c-block">
						<div class="c-block__container">
							<div class="c-number c-number--orange">
								<div class="c-number__content">
									<div class="c-number__num"> {{ params.issue }} </div>
									<div class="c-number__percent"> {{ params.issueP + '%'}} </div>
								</div>
							</div>
						</div>
						<div class="c-block__label">
							Сделано, есть&nbsp;проблема
						</div>
					</div>
					<div class="c-block">
						<div class="c-block__container">
							<div class="c-number c-number--red">
								<div class="c-number__content">
									<div class="c-number__num"> {{ params.failed }} </div>
									<div class="c-number__percent"> {{ params.failedP + '%'}} </div>
								</div>
							</div>
						</div>
						<div class="c-block__label">
							Не сделано
						</div>
					</div>
					<div class="c-block">
						<div class="c-block__container">
							<div class="c-number c-number--darkred">
								<div class="c-number__content">
									<div class="c-number__num"> {{ params.expired }} </div>
									<div class="c-number__percent"> {{ params.expiredP + '%'}} </div>
								</div>
							</div>
						</div>
						<div class="c-block__label">
							Просрочено
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { PieChart } from 'vue-chart-3';
  	import { Chart, registerables} from 'chart.js';
  	import ChartDataLabels from 'chartjs-plugin-datalabels';
	Chart.register(ChartDataLabels, ...registerables);
</script>

<script>
 	export default {
    	name: 'StatAllTasks',
    	props: ['params', 'filter'],
    	data: () => ({
      		chartData: {
		      	labels: ['done', 'expired', 'failed'],
		      	datasets: [{
		          	data: [0, 0, 0],
		          	backgroundColor: ['#008dd2', '#750000', '#e03712'],
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
				        align: 'center',
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
		    },
    	}),
    	watch: {
    		params: {
    			handler() {
    				this.chartData.datasets[0].data = this.buidlParam();
			    },
			    deep: true,
    		},
    	},
    	mounted () {
    		this.chartData.datasets[0].data = this.buidlParam();
    	},
    	methods: {
    		buidlParam () {
    			return [this.params.doneP + this.params.issueP, this.params.expiredP, this.params.failedP];
    		},
    	}
    }
</script>


<style scoped>

	.c-stat {
		display: flex;
		flex-direction: row;
		align-content: center;
		justify-content: flex-start;
	}	

	.c-stat__left {
		width: 120px;
		margin-right: 30px;
	}
	.c-stat__right {
		display: flex;
		flex-direction: row;
		align-content: center;
		justify-content: flex-start;
		width: 100%;
	}


	.c-block {
		padding: 20px;
		border: 1px solid var(--cozh-light);
		border-radius: 8px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		height: 100%;
	}
	.c-block:not(:last-child) {
		margin-right: 10px;
	}
	.c-block__label {
		font-size: 12px;
		font-weight: 500;
		line-height: 1.3;
	}
	.c-block__container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	.c-block__container img {
		transition: all .2s ease-out;
		margin-bottom: 2px;
	}
	a.c-block:hover {
		border-color: var(--cozh-grey);
	}
	a.c-block:hover .c-block__container img {
		transform: translateX(5px);
	}


	.c-stat__right {

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
		font-size: 24px;
		font-weight: 600;
		line-height: 1;
	}

	.c-number__percent {
		font-size: 10px;
		font-weight: 700;
		line-height: 1;
		margin-left: 4px;
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
