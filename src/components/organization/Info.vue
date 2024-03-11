<template>
    <div class="block">
      <div class="block__header">

      	<div class="block__header-left">
        	
        	<router-link :to="{name: 'PageOrganization', params: {organization_id: organization.id}}"> 
        		{{ organization.name }} 
        	</router-link>

      		<div class="btn-group">
	      		<a href="javascript:;" class="btn btn--grey btn--sm">
		          <img class="btn--ico btn--ico--left" src="../../assets/img/18.svg">
		          <div class="btn--text">Редактировать</div>
		          <div class="btn--loader"></div>
		        </a>
		        <a href="javascript:;" class="btn btn--grey btn--sm">
		          <img class="btn--ico btn--ico--left" src="../../assets/img/19.svg">
		          <div class="btn--text">Архивировать УК</div>
		          <div class="btn--loader"></div>
		        </a>
	      	</div>
      	</div>
      	<div class="block__header-right">
	      	<div class="tabs" v-if="advanced">
	      		<a class="tabs__item" :class="{'active': activeTab == 1}" @click="selectTab(1)">
	      			Информация
	      		</a>
	      		<a class="tabs__item" :class="{'active': activeTab == 2}" @click="selectTab(2)">
	      			Дома
	      		</a>
	      		<a class="tabs__item" :class="{'active': activeTab == 3}" @click="selectTab(3)">
	      			Сотрудники
	      		</a>
	      	</div>
      	</div>

      </div>
      <div class="block__body">
	      	<div v-if="activeTab == 1">
	      		<InfoMeta :organization="organization" />
	      	</div>
	      	<div v-if="activeTab == 2">
	      		<InfoHouses :organization_id="organization.id"/>
	      	</div>
	      	<div v-if="activeTab == 3">
	      		<InfoEmployees :organization_id="organization.id"/>
	      	</div>
      </div>
    </div>
</template>

<script setup>
  import InfoMeta from './InfoMeta.vue'
  import InfoHouses from './InfoHouses.vue'
  import InfoEmployees from './InfoEmployees.vue'
</script>

<script>

  export default {
    name: 'InfoOrganization',
    props: ['organization', 'advanced', 'tab'],
    data: () => ({
    	activeTab: 1,
    }),
    async created () {
    	if(this.tab) {
    		this.activeTab = this.tab;
    	}
    },
    methods: {
    	selectTab (id) {
    		this.activeTab = id;
    	},
    },
  }

</script>

<style scoped>
	.tabs {
		display: flex;
	}
	.tabs__item {
		color: rgba(var(--cozh-black-code), .5);
		font-size: 12px;
		font-weight: 600;
		line-height: 1;
		padding: 5px 10px;
		border-radius: 4px;
		transition: none;
	}
	.tabs__item:not(:last-child) {
		margin-right: 10px;
	}
	.tabs__item.active {
		background-color: var(--cozh-blue);
		color: var(--cozh-white);
	}
	.block__header-left .btn-group {
    margin-left: 30px;
	}
</style>