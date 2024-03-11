<template>

  	<TopMenu :breadcrumbs="breadcrumbs"/>

		<div class="component-filter">
			<div class="component-filter__item">
				<SelectPicker :list="employees" :label="'Выберите сотрудника'" v-model="filter.employee" :size="'sm'" :isClear="true"/>
			</div>
			<div class="component-filter__item">
				<SelectPicker :list="actionTypes" :label="'Тип задания'" v-model="filter.actionType" :size="'sm'" :isClear="true"/>
			</div>
			<div class="component-filter__item">
				<SelectPicker :list="modules" :label="'Модуль'" v-model="filter.module" :size="'sm'" :isClear="true"/>
			</div>
			<div class="component-filter__item">
				<SelectPicker :list="epicsDependence" :label="'Группа'" v-model="filter.epic" :size="'sm'" :isClear="true"/>
			</div>
			<div class="component-filter__item">
				<SelectPicker :list="topicsDependence" :label="'Подгруппа'" v-model="filter.topic" :size="'sm'" :isClear="true"/>
			</div>
			
			<div class="component-filter__item">
				<a class="btn btn--medium btn--default btn--inline" @click="loadTasks">
					<div class="btn--text"> Применить фильтры </div>
					<div class="btn--loader"> </div>
				</a>
			</div>
			<div class="component-filter__item">
			<a class="btn btn--medium btn--outline btn--inline" @click="clearFilter">
					<div class="btn--text"> Сбросить фильтры </div>
					<div class="btn--loader"> </div>
				</a>
			</div>
		</div>

		<div class="component-headers">
			<div class="component-headers__item">
			<div class="component-header component-header--grey">
				<div class="component-header__label">Назначено</div>
				<div class="component-header__badge"> {{ counter.assigned }} </div>
			</div>
			</div>
			<div class="component-headers__item">
			<div class="component-header component-header--blue">
				<div class="component-header__label">Сделано</div>
				<div class="component-header__badge"> {{ counter.done }} </div>
			</div>
			</div>
			<div class="component-headers__item">
			<div class="component-header component-header--orange">
				<div class="component-header__label">Проблема</div>
				<div class="component-header__badge"> {{ counter.issue }} </div>
			</div>
			</div>
			<div class="component-headers__item">
			<div class="component-header component-header--red">
				<div class="component-header__label">Не сделано</div>
				<div class="component-header__badge"> {{ counter.failed }} </div>
			</div>
			</div>
			<div class="component-headers__item">
			<div class="component-header component-header--darkred">
				<div class="component-header__label">Просрочено</div>
				<div class="component-header__badge"> {{ counter.expired }} </div>
			</div>
			</div>
		</div>

  	<div class="load-container" :class="{'load' : isLoad}">
    	<div class="content" v-if="!isLoad && !isError">
    		<div class="component-tasks">

    			<div class="component-tasks__item">
    				<TaskPreview 
    					v-for="task in tasks.assigned" 
    					:task="task" 
    					:organization_id="organization_id" 
    					:house_id="house_id" 
    					:key="task.id"
    				/>
    				<a 
    					class="btn btn--md btn--outline-dashed btn--inline mt-1" 
    					@click="uploading($event, 'assigned')" 
    					v-if="tasks.assigned.length > 0 && maxTaskCategory.indexOf('assigned') == -1"
    				>
    					<div class="btn--text">Показать больше</div>
    					<div class="btn--loader"></div>
    				</a>
    			</div>

    			<div class="component-tasks__item">
    				<TaskPreview 
    					v-for="task in tasks.done" 
    					:task="task" 
    					:organization_id="organization_id" 
    					:house_id="house_id"
    					:key="task.id"
    				/>
    				<a 
    					class="btn btn--md btn--outline-dashed btn--inline mt-1" 
    					@click="uploading($event, 'done')" 
    					v-if="tasks.done.length > 0 && maxTaskCategory.indexOf('done') == -1"
    				>
    					<div class="btn--text">Показать больше</div>
    					<div class="btn--loader"></div>
    				</a>
    			</div>

    			<div class="component-tasks__item">
    				<TaskPreview 
    					v-for="task in tasks.issue" 
    					:task="task" 
    					:organization_id="organization_id" 
    					:house_id="house_id" 
    					:key="task.id"
    				/>
    				<a 
    					class="btn btn--md btn--outline-dashed btn--inline mt-1" 
    					@click="uploading($event, 'issue')" 
    					v-if="tasks.issue.length > 0 && maxTaskCategory.indexOf('issue') == -1"
    				>
    					<div class="btn--text">Показать больше</div>
    					<div class="btn--loader"></div>
    				</a>
    			</div>

    			<div class="component-tasks__item">
    				<TaskPreview 
    					v-for="task in tasks.failed" 
    					:task="task" 
    					:organization_id="organization_id" 
    					:house_id="house_id" 
    					:key="task.id"
    				/>
    				<a 
    					class="btn btn--md btn--outline-dashed btn--inline mt-1" 
    					@click="uploading($event, 'failed')" 
    					v-if="tasks.failed.length > 0 && maxTaskCategory.indexOf('failed') == -1"
    				>
    					<div class="btn--text">Показать больше</div>
    					<div class="btn--loader"></div>
    				</a>
    			</div>

    			<div class="component-tasks__item">
    				<TaskPreview 
    					v-for="task in tasks.expired" 
    					:task="task" 
    					:organization_id="organization_id" 
    					:house_id="house_id" 
    					:key="task.id"
    				/>
    				<a 
    					class="btn btn--md btn--outline-dashed btn--inline mt-1" 
    					@click="uploading($event, 'expired')" 
    					v-if="tasks.expired.length > 0 && maxTaskCategory.indexOf('expired') == -1"
    				>
    					<div class="btn--text">Показать больше</div>
    					<div class="btn--loader"></div>
    				</a>
    			</div>

    		</div>

    	</div>
    </div>

</template>

<script setup>
  import TopMenu from '@/components/TopMenu.vue';
  import SelectPicker from '@/components/ux/SelectPicker.vue';
  import TaskPreview from '@/components/tasks/TaskPreview.vue';
</script>

<script>

  export default {

    name: 'PageTrackerHouse',

		data: () => ({
      // Страница
      isLoad: true,
      isError: false,
      breadcrumbs: [],
      address: null,
      counter: [],

      limit: 10,
      limitPreLoad: 10,
      
      // Справочники
      employees: [],
      tasks: [],
      modules: [],
      epics: [],
      topics: [],
      maxTaskCategory: [],

      actionTypes: [
      	{id: 'review', name: 'Осмотр'},
      	{id: 'work', name: 'Работа'},
      	{id: 'control', name: 'Контроль'},
      ],

      // Фильтр
      filter: {
      	employee: null,
      	actionType: null,
      	module: null, 
      	epic: null,
      	topic: null,
      },

    }),

    watch: {
    	'filter.employee': function () { this.loadTasks(); },
    	'filter.actionType': function () { this.loadTasks(); },
    	'filter.module': function () {
    		this.filter.epic = null;
    		this.filter.topic = null;
    		this.loadTasks();
    	},
    	'filter.epic': function () {
    		this.filter.topic = null;
    		this.loadTasks();
    	},
    	'filter.topic': function () { this.loadTasks(); },
    },

    computed: {
    	house_id () {
        return this.$route.params.house_id;
      },
    	organization_id () {
        return this.$route.params.organization_id;
      },
      // Фильтруем эпики на лету
      epicsDependence () {
      	let epics = this.epics.slice(0);
      	if (this.filter.module !== null) {
      		for (var i = epics.length - 1; i >= 0; i--) {
      			if(epics[i].module !== this.filter.module) {
      				epics.splice(i, 1);
      			}
      		}
      	}
      	return epics;
      },
      // Фильтруем топики на лету
      topicsDependence () {
      	let topics = this.topics.slice(0);
      	if (this.filter.module !== null) {
      		for (var i = topics.length - 1; i >= 0; i--) {
      			if(topics[i].module !== this.filter.module) {
      				topics.splice(i, 1);
      			}
      		}
      	}
      	if (this.filter.epic !== null) {
      		for (var j = topics.length - 1; j >= 0; j--) {
      			if(topics[j].epic !== this.filter.epic) {
      				topics.splice(j, 1);
      			}
      		}
      	}
      	return topics;
      },
    },

    created () {
      Promise.all([ this.loadTasks(), this.loadEmployees(), this.loadModules() ])
	      .then(() => {
	        this.beforeRender();
	        this.isLoad = false;
	      })
	      .catch((e)=> {
	        console.log(e);
	        this.isError = true;
	        this.isLoad = false;
	      })
    },

    methods: {
    	
    	beforeRender () {
    		this.breadcrumbs = [
        	{name: this.$route.meta.name, link: this.$route.matched[0].path, ico: this.$route.meta.ico},
        	{name: this.address, link: ''},
	      ];
    	},

    	clearFilter () {
    		this.filter = {
      		employee: null,
      		actionType: null,
      		module: null, 
      		epic: null,
      		topic: null,
      	}
	      this.loadTasks();
    	},

    	async loadEmployees () {
  	  	const r = await this.axios.get(this.$store.state.api_endpoint + '/employees/?companyId=' + this.organization_id + '&detailed=true');
        this.employees = r.data.data;
  	  },
  	  async loadModules () {
				const r = await this.axios.get(this.$store.state.api_endpoint + '/tracker/' + this.house_id + '/modules');
        this.parseFilterData(r.data.modules);
  	  },

  	  buildFilter () {
        const param = new URLSearchParams({});
        if(this.filter.employee !== null) {
        	param.set("employeeId", this.filter.employee);
        }
        if(this.filter.actionType !== null) {
        	param.set("actionType", this.filter.actionType);
        }
        if(this.filter.module !== null) {
        	param.set("moduleNum", this.filter.module);
        }
        if(this.filter.epic !== null) {
        	param.set("epicNum", this.filter.epic);
        }
        if(this.filter.topic !== null) {
        	param.set("topicNum", this.filter.topic);
        }
        param.set("taskLimit", this.limit);
        return param;
    	},

  	  async loadTasks () {
	      this.isLoad = true;
        const param = this.buildFilter();
        const { tasks, address, counter } = await this.$store.dispatch('getTrackerTasks', {house_id: this.house_id, data: param});
        this.tasks = tasks;
        this.address = address;
        this.counter = counter;
        this.maxTaskCategory = [];
        for (let type in this.tasks) {
        	if(this.tasks[type].length < this.limit) {
	      		this.maxTaskCategory.push(type);
	        }
        }
	      this.isLoad = false;
    	},


    	async uploading (e, status) {

    		const btn = e.currentTarget;
    		btn.classList.add('btn--load');

        const param = this.buildFilter();

        param.set("status", status);
        param.set("taskLimit", this.limitPreLoad);
        param.set("offset", this.tasks[status].length);

        const { tasks, counter } = await this.$store.dispatch('getTrackerTasks', {house_id: this.house_id, data: param});

        // Добавляем задачи в нужный раздел
        this.tasks[status].push(...tasks[status]);
        // Обновляем счётчики сверху
        this.counter = counter;
        // будет ли еще дозагрузка по этой категории?
      	if(tasks[status].length < this.limitPreLoad) {
      		this.maxTaskCategory.push(status);
      	}

    		btn.classList.remove('btn--load');
    	},

  	  parseFilterData (modules) {
  	  	this.modules = [];
  	  	this.epics = [];
  	  	this.topics = [];
  	  	for (let moduleKey in modules) {
  	  		this.modules.push({
  	  			id: moduleKey, 
  	  			name: moduleKey + ' - ' + modules[moduleKey].name,
  	  		});
  	  		for (let epicKey in modules[moduleKey].epics) {
  	  			this.epics.push({
	  	  			id: epicKey, 
	  	  			name: epicKey + ' - ' + modules[moduleKey].epics[epicKey].name,
	  	  			module: moduleKey,
	  	  		});
  	  			for (let topicKey in modules[moduleKey].epics[epicKey].topics) {
  	  				this.topics.push({
		  	  			id: topicKey, 
		  	  			name: topicKey + ' - ' + modules[moduleKey].epics[epicKey].topics[topicKey].name,
		  	  			module: moduleKey,
		  	  			epic: epicKey,
		  	  		});
  	  			}
  	  		} 
  	  	}
  	  },


    },

  }
</script>

<style scoped>

	.component-filter {
		background-color: var(--cozh-white);
		padding: 15px;
		border-radius: 8px;

		display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: flex-start;
    position: relative;
	}

	.component-filter__item {
		flex: 1 1 0;
  		width: 0;
	}
/*	.load-container {
		min-height: 600px;
	}
*/

	.component-tasks {
		display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
    position: relative;
	}

	.component-tasks__item {
  	flex: 1 1 0;
    width: 0;
    height: calc(100vh - 244px);
    overflow-y: auto;
	}
	



	.component-headers {
		margin-top: 10px;
		margin-bottom: 10px;
		display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: flex-start;
    position: relative;
	}

	.component-headers__item {
		flex: 1 1 0;
  		width: 0;
	}

	.component-header {
		background-color: var(--cozh-white);
		border-radius: 8px;
		padding: 12px 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}


	.component-header__label {
		color: var(--cozh-grey);
	 	font-size: 11px;
		font-weight: 600;
	 	text-transform: uppercase;
		line-height: 1.3;
	 	letter-spacing: 0.55px;
	 	padding-left: 12px;
	 	position: relative;
	}

	.component-header__label::before {
		content: '';
		height: 5px;
		width: 5px;
		border-radius: 50%;
		position: absolute;
		left: 0px;
		top: 50%;
		transform: translateY(-50%);
	}

	.component-header__badge {
 		font-size: 10px;
 		font-weight: 600;
 		text-transform: uppercase;
 		height: 20px;
 		width: 20px;
 		border-radius: 50%;
 		display: flex;
 		align-items: center;
 		justify-content: center;
 		line-height: 1;
	}

	.component-header--grey .component-header__badge,
	.component-header--grey .component-header__label::before {
		color: var(--cozh-white);
 		background-color: var(--cozh-grey);
	}

	.component-header--blue .component-header__badge,
	.component-header--blue .component-header__label::before {
		color: var(--cozh-white);
 		background-color: var(--cozh-blue);
	}

	.component-header--orange .component-header__badge,
	.component-header--orange .component-header__label::before {
		color: var(--cozh-white);
 		background-color: var(--cozh-orange);
	}

	.component-header--red .component-header__badge,
	.component-header--red .component-header__label::before {
		color: var(--cozh-white);
 		background-color: var(--cozh-red);
	}

	.component-header--darkred .component-header__badge,
	.component-header--darkred .component-header__label::before {
		color: var(--cozh-white);
 		background-color: var(--cozh-dark-red);
	}

	.component-header--green .component-header__badge,
	.component-header--green .component-header__label::before {
		color: var(--cozh-white);
 		background-color: var(--cozh-green);
	}



</style>