<template>
    <popup-modal ref="popup" :size="'xmd'" @close="close">
        <div class="popup">
            <div class="popup__header">
                {{ title }}
            </div>
            <div class="component-filter">
                <div class="range-picker">
                    <DatePicker v-model="filter.begin" label="Дата от" :isClear="false" />
                    <DatePicker v-model="filter.end" label="Дата до" :isClear="false" />
                </div>
                <div class="component-filter__item">
                    <SelectPicker :list="modules" label="Модуль" v-model="filter.module" :size="'sm'" :isClear="true" />
                </div>
            </div>
            
            <div class="btn-group">
                <a class="btn btn--medium btn--default btn--inline" @click="saveFilter($event)">
                    <div class="btn--text"> Применить фильтры </div>
                    <div class="btn--loader"> </div>
                </a>
                <a class="btn btn--medium btn--outline btn--inline" @click="clearFilter($event)">
                    <div class="btn--text"> Сбросить фильтры </div>
                    <div class="btn--loader"> </div>
                </a>
            </div>

            <div class="popup__body">
                <div class="chart">
                    <LineChart :chartData="testData" :options="options" />
                </div>
            </div>
            <div class="popup__footer">
                <div class="c-legend">
                    <div class="c-legend__item" @click="clickLegend(0)" :class="{'c-legend__item--disabled' : !chartData.datasets[0].isVisible}">
                        <div class="c-legend__badge" :style="{backgroundColor: '#7ecd77'}"></div> 
                        Сделано — всё хорошо
                    </div>
                    <div class="c-legend__item" @click="clickLegend(1)" :class="{'c-legend__item--disabled' : !chartData.datasets[1].isVisible}">
                        <div class="c-legend__badge" :style="{backgroundColor: '#ff9100'}"></div> 
                        Сделано — есть проблема
                    </div>
                    <div class="c-legend__item" @click="clickLegend(2)" :class="{'c-legend__item--disabled' : !chartData.datasets[2].isVisible}">
                        <div class="c-legend__badge" :style="{backgroundColor: '#750000'}"></div> 
                        Просрочено
                    </div>
                    <div class="c-legend__item" @click="clickLegend(3)" :class="{'c-legend__item--disabled' : !chartData.datasets[3].isVisible}">
                        <div class="c-legend__badge" :style="{backgroundColor: '#e03712'}"></div> 
                        Не сделано
                    </div>
                </div>

            </div>
        </div>
    </popup-modal>
</template>

<script>

    import PopupModal from './PopupModal.vue';
    import { LineChart } from 'vue-chart-3';
    import { Chart, registerables} from 'chart.js';
    import SelectPicker from '@/components/ux/SelectPicker.vue';
    import DatePicker from '@/components/ux/DatePicker.vue';

    Chart.register(...registerables);

    export default {
        name: 'DynamicsDialogue',
        
        components: { PopupModal, LineChart, SelectPicker, DatePicker },

        data: () => ({

            modules: [
                {id: 'A', name: 'A - Лифтовое хозяйство'},
                {id: 'B', name: 'B - Санитарное содержание'},
                {id: 'C', name: 'C - Конструктивные элементы'},
                {id: 'D', name: 'D - Оборудование и системы инженерно-технического обеспечения'},
                {id: 'E', name: 'E - Благоустройство и озеленение придомовой территории'},
                {id: 'F', name: 'F - Обеспечение пожарной безопасности'},
                {id: 'G', name: 'G - Качество специальных сервисов: безопасность и комфорт жизни'},
            ],

            type: null,

            filter: {
                module: null,
                begin: null,
                end: null,
            },

            chartData: {
                labels: [],
                datasets: [],
            },

            options: {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    tooltip: {
                        enabled: true,
                    },
                    legend: {
                        display: false,
                    },
                    datalabels: {
                        display: false,
                    }
                },
                scales: {
                    x: {
                        // offset: true,
                        ticks: {
                            font: {
                                size: 10,
                                weight: 700,
                                family: 'Inter',
                            },
                            color: '#0b2836',
                        }
                    },
                    y: {
                        // offset: true,
                        ticks: {
                            font: {
                                size: 10,
                                weight: 700,
                                family: 'Inter',
                            },
                            color: '#0b2836',
                        }
                    }
                }
            }
        }),
        computed: {
            testData () {
                const datasets = [];
                const chartData = {...this.chartData};
                chartData.datasets.forEach((item) => {
                    if(item.isVisible) {
                        datasets.push(item);
                    } else {
                        datasets.push([0, 0, 0, 0, 0, 0, 0, 0]);
                    }
                });
                chartData.datasets = datasets;
                return chartData;
            },
            title () {
                switch (this.type) {
                    case 'review':
                        return 'Динамика по осмотрам';
                    case 'work':
                        return 'Динамика по работам';
                    case 'control':
                        return 'Динамика по контролю';
                    default:
                        return 'Динамика по осмотрам';
                }
            },
        },
        methods: {
            
            close () {
                this.$refs.popup.close();
            },

            clickLegend (pos) {

                this.chartData.datasets[pos].isVisible = !this.chartData.datasets[pos].isVisible;

            },

            async show(filter, type) {

                this.type = type;

                this.filter = {
                    module: null,
                    begin: null,
                    end: null,
                }

                this.recoverFilter(filter);

                this.chartData.labels = ['01.01', '02.01', '03.01', '04.01', '05.01', '06.01', '07.01', '08.01'];

                this.chartData.datasets = [{
                    label: 'Сделано — всё хорошо',
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                    fill: false,
                    borderColor: '#7ecd7780',
                    pointStyle: 'circle',
                    pointRadius: 2,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#7ecd77',
                    borderWidth: 1.5,
                    tension: 0.4,
                    isVisible: true,
                },{
                    label: 'Сделано — есть проблема',
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                    fill: false,
                    borderColor: '#ff910080',
                    pointStyle: 'circle',
                    pointRadius: 2,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#ff9100',
                    borderWidth: 1.5,
                    tension: 0.4,
                    isVisible: true,
                },{
                    label: 'Просрочено',
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                    fill: false,
                    borderColor: '#75000080',
                    pointStyle: 'circle',
                    pointRadius: 2,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#750000',
                    borderWidth: 1.5,
                    tension: 0.4,
                    isVisible: true,
                },{
                    label: 'Не сделано',
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                    fill: false,
                    borderColor: '#e0371280',
                    pointStyle: 'circle',
                    pointRadius: 2,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#e03712',
                    borderWidth: 1.5,
                    tension: 0.4,
                    isVisible: true,
                }];

                this.$refs.popup.open();

                this.loadData();

            },

            recoverFilter (filter) {
                
                if(filter.module) {
                    const idx = this.modules.findIndex((item) => { return item.id == filter.module});
                    if(idx !== -1) {
                        this.filter.module = this.modules[idx].id;
                    }
                }
                if (
                    filter.begin 
                    && 
                    filter.end
                    &&
                    this.$moment(filter.begin, 'YYYY-MM-DD', true).isValid()
                    &&
                    this.$moment(filter.end, 'YYYY-MM-DD', true).isValid()
                ) {
                    this.filter.begin = filter.begin;
                    this.filter.end = filter.end;
                } else {
                    this.filter.begin = this.$moment().subtract(7, 'days').format('YYYY-MM-DD');
                    this.filter.end = this.$moment().format('YYYY-MM-DD');
                }
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

            async loadData () {
                const param = this.buildfilter();
                
                console.log(param);

                // this.chartData.datasets = [
                //     [0, 0, 0, 0, 0, 0, 0, 0],
                //     [0, 0, 0, 0, 0, 0, 0, 0],
                //     [0, 0, 0, 0, 0, 0, 0, 0],
                //     [0, 0, 0, 0, 0, 0, 0, 0],
                // ];

                await new Promise(r => setTimeout(r, 500));

                this.chartData.datasets[0].data = [1, 4, 3, 22, 5, 17, 13, 8];
                this.chartData.datasets[1].data = [4, 10, 7, 13, 15, 3, 27, 20];
                this.chartData.datasets[2].data = [20, 10, 17, 15, 22, 22, 22, 11];
                this.chartData.datasets[3].data = [11, 12, 13, 14, 15, 16, 17, 18];

                // this.pie = await this.$store.dispatch('getReportsHousePie', {house_id: this.house_id, data: param});
            },

        },
    }
</script>

<style scoped>
    .chart {
        /*height: 500px;*/
    }
    .popup__header {
        font-size: 20px;
        padding: 20px 25px;
    }
    .popup__body {
        padding: 20px 25px;
    }
    .popup__footer {
        padding: 25px 40px;
    }

    .label {
        margin-top: 10px;
    }
    .field {
        margin-bottom: 10px;
        font-size: 13px;
        font-weight: 500;
    }

    .c-legend {
        width: 100%;
        justify-content: space-between;
    }

    .btn-group {
        padding: 20px 25px;
        border-bottom: 1px solid var(--cozh-light-grey);
        padding-top: 10px;
    }

    .component-filter {
        padding: 20px 25px;
        /*border-bottom: 1px solid var(--cozh-light-grey);*/
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        padding-bottom: 0px;
    }

    .component-filter__item {
        width: 100%;
    }

    .range-picker {
        min-width: 300px;
    }




</style>