<template>
	<TopMenu :breadcrumbs="breadcrumbs"/>
	<div class="block">
	    <div class="block__header block__header--nopadding">
	      <Navigator :items="nav"/>
	    </div>
	    <div class="block__body">
            <slot></slot>
	    </div>
  	</div>
</template>

<script setup>
  import TopMenu from '@/components/TopMenu.vue'
  import Navigator from '@/components/Navigator.vue'
</script>

<script>
  export default {
    name: 'EditTemplate',
    props: ['breadcrumbs', 'nav'],
  }
</script>

<style scoped>
	
</style>