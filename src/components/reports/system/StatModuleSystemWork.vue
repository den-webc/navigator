<template>
	<div class="load-container" :class="{'load': isLoad}">
		<div class="c-container">
			<div class="c-container__left">
				<div class="c-block">
					<div class="c-block__header">
						Результаты работ
					</div>
					<div class="c-block__body">
						<DoubleProgressBar 
							:percent="result.doneP" 
							:count_left="result.done" 
							:count_right="result.issue" 
							color_left="#7ecd77" 
							color_right="#e03712"
						/>
					</div>
					<div class="c-block__footer">
						<div class="c-legend">
							<div class="c-legend__item">
								<div class="c-legend__badge" :style="{backgroundColor: '#7ecd77'}"></div> 
								Сделано — всё хорошо
							</div>
							<div class="c-legend__item">
								<div class="c-legend__badge" :style="{backgroundColor: '#e03712'}"></div> 
								Сделано — есть проблема
							</div>
						</div>
					</div>
				</div>
				<div class="c-block mt-1" v-if="issueList.length > 0">
					<div class="c-block__header">
						Работы, не прошедшие контроль
					</div>
					<div class="c-block__body" style="padding: 0px;">
						<table class="table-custom">
							<thead>
								<tr>
									<th>Дата</th>
									<th>Место</th>
									<th>Наименование задания</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item in issueList" :key="item.id">
									<td class="nowrap"> {{ $moment(item.dateCreated).format('DD MMMM YYYY')}} </td>
									<td class="nowrap"> {{ item.locTitle }} </td>
									<td> {{ item.name }} </td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="c-container__right" v-if="chartPassedNum.chartData.labels.length > 0 || chartIssueNum.chartData.labels.length > 0">
				<div class="c-block" v-if="chartPassedNum.chartData.labels.length > 0">
					<div class="c-block__header">
						Количество работ, не прошедших контроль
					</div>
					<div class="c-block__body">
						<div class="c-chart">
							<div class="c-chart__container">
								<PieChart :chartData="chartPassedNum.chartData" :options="chartPassedNum.options"/>
							</div>
						</div>
					</div>
					<div class="c-block__footer">
						<div class="c-legend">
							<div class="c-legend__item" v-for="(label, index) in chartPassedNum.chartData.labels" :key="index">
								<div class="c-legend__badge" :style="{backgroundColor: chartPassedNum.chartData.datasets[0].backgroundColor[index]}"></div> 
								{{label}}
							</div>
						</div>
					</div>
				</div>
				<div class="c-block" v-if="chartIssueNum.chartData.labels.length > 0">
					<div class="c-block__header">
						Количество работ, прошедших контроль
					</div>
					<div class="c-block__body">
						<div class="c-chart">
							<div class="c-chart__container">
								<PieChart :chartData="chartIssueNum.chartData" :options="chartIssueNum.options"/>
							</div>
						</div>
					</div>
					<div class="c-block__footer">
						<div class="c-legend">
							<div class="c-legend__item" v-for="(label, index) in chartIssueNum.chartData.labels" :key="index">
								<div class="c-legend__badge" :style="{backgroundColor: chartIssueNum.chartData.datasets[0].backgroundColor[index]}"></div> 
								{{label}}
							</div>
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

	import DoubleProgressBar from '@/components/ux/DoubleProgressBar.vue';
</script>

<script>
  	export default {
	    name: 'StatModuleSystemWork',
	    props: ['module_id', 'house_id', 'begin', 'end'],
	    data: () => ({

	    	isLoad: true,

	    	colors: ['#008dd2', '#7ecd77', '#ff9100' , '#0b2836', '#750000', '#aec1cc', '#e03712'],

	    	result: {
	    		done: 0,
	    		doneP: 0,
	    		issue: 0,
				issueP: 0,
	    	},

	    	issueList: [],


	    	chartPassedNum: {
	    		chartData: {
			      	labels: [],
			      	datasets: [{
			          	data: [],
			          	percentage: [],
			          	backgroundColor: [],
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
					        	size: 8,
					        	family: 'Inter',
					        	weight: 600,
					        },
					        formatter (val, context) {
					        	return val == 0 ? null : val + ' / ' + context.dataset.percentage[context.dataIndex] + '%';
					        }
					    }
		    		},
			    }
	    	},

	    	chartIssueNum: {
	    		chartData: {
			      	labels: [],
			      	datasets: [{
			          	data: [],
			          	percentage: [],
			          	backgroundColor: [],
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
					        	size: 8,
					        	family: 'Inter',
					        	weight: 600,
					        },
					        formatter (val, context) {
					        	return val == 0 ? null : val + ' / ' + context.dataset.percentage[context.dataIndex] + '%';
					        }
					    }
		    		},
			    }
	    	},



	    }),
	    mounted () {
	    },
	    computed: {
	    },
	    created () {
		    Promise.all([this.loadResult()])
			    .then(() => {
			      	this.beforeRender();
			    })
			    .catch((e)=> {
			      	console.log(e);
			    })
			    .finally(()=> {
			      	this.isLoad = false;
			    })
	    },

	    methods: {
	    	beforeRender () {

	    	},
	    	buildfilter () {
	    		const param = new URLSearchParams({});
	    		if(this.begin !== null) {
	        		param.set("begin", this.begin + 'T00:00:00.802333+00:00');
		        }
		        if(this.end !== null) {
		        	param.set("end", this.end + 'T23:59:59.802443+00:00');
		        }
		        return param;
	    	},

	    	async loadResult () {
	        	
	        	await new Promise(r => setTimeout(r, 300));

	        	const param = this.buildfilter();

	      		this.result = await this.$store.dispatch('getAnaliticsSystemModuleWorkResult', {house_id: this.house_id, module_id: this.module_id, data: param});
	      		
	      		this.issueList = await this.$store.dispatch('getAnaliticsSystemModuleWorkIssuelist', {house_id: this.house_id, module_id: this.module_id, data: param});

	      		const passedNum = await this.$store.dispatch('getAnaliticsSystemModuleWorkPassedNum', {house_id: this.house_id, module_id: this.module_id, data: param});

	      		passedNum.forEach((item, index) => {
	      			this.chartPassedNum.chartData.labels.push(item.locTitle);
	      			this.chartPassedNum.chartData.datasets[0].data.push(item.count);
	      			this.chartPassedNum.chartData.datasets[0].percentage.push(item.countP);
	      			this.chartPassedNum.chartData.datasets[0].backgroundColor.push(this.colors[index]);
	      		});


	      		const issueNum = await this.$store.dispatch('getAnaliticsSystemModuleWorkIssueNum', {house_id: this.house_id, module_id: this.module_id, data: param});

	      		issueNum.forEach((item, index) => {
	      			this.chartIssueNum.chartData.labels.push(item.locTitle);
	      			this.chartIssueNum.chartData.datasets[0].data.push(item.count);
	      			this.chartIssueNum.chartData.datasets[0].percentage.push(item.countP);
	      			this.chartIssueNum.chartData.datasets[0].backgroundColor.push(this.colors[index]);
	      		});

	    	},

	    }
  	}
</script>

<style scoped>
	
	.c-block {
		border-radius: 8px;
		border: 1px solid var(--cozh-light-grey);
	}

	.c-block__header {
		padding: 18px 20px;
		font-size: 14px;
		font-weight: 500;
	}

	.c-block__body {
		border-top: 1px solid var(--cozh-light-grey);
		padding: 20px;
	}

	.c-block__footer {
		border-top: 1px solid var(--cozh-light-grey);
		padding: 20px;
	}



	.c-container__left {
		width: 100%;
	}

	.c-container__right {
		width: fit-content;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
		margin-left: 10px;
	}

	.c-container__right .c-block {
		width: 320px;
		max-width: 320px;
	}
	.c-container__right .c-block:not(:last-child) {
		margin-right: 10px;
	}

	.c-container {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
	}


	.c-chart {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.c-chart__container {
		max-width: 200px;
	}

</style>
