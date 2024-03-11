<template>
	<div class="steps">
		<div class="steps__item" v-for="(item, index) in items" :class="{'active' : item.isActive}" :key="index">
			<router-link :to="item.link" v-if="!item.isActive && item.link"> 
				{{ item.name }} 
			</router-link>
			<div v-else>
				{{ item.name }} 
			</div>
		</div>
		
	</div>
</template>

<script>
  	export default {
    	name: 'NavigatorComponent',
    	props: ['items'],
    	data: () => ({
    	}),
	}
</script>
<style scope>
	.steps {
	  	display: flex;
	  	flex-direction: row;
	  	align-content: center;
	  	justify-content: flex-start;
	  	height: 60px;
	}
	.steps--soaring {
	    background-color: var(--cozh-white);
	    border-radius: 8px;
	    margin-bottom: 10px;
	    border: none;
	}
	.steps__item {
	  	height: 100%;
	  	font-weight: 600;
	  	font-size: 12px;
	  	text-transform: uppercase;
	  	letter-spacing: 0.60px;
	  	display: flex;
	  	align-items: center;
	  	justify-content: center;
	  	color: var(--cozh-grey);
	  	position: relative;
	}
	.steps__item:not(:last-child) {
	  	margin-right: 30px;
	}
	.steps__item::before {
	  	position: absolute;
	  	content: '';
	  	left: 0px;
	  	bottom: -1px;
	  	height: 4px;
	  	width: 100%;
	  	background-color: transparent;
	}
	.steps__item.active {
		cursor: default;
	  	color: var(--cozh-black);
	}
	.steps__item.active::before {
  		background-color: var(--cozh-black);
	}
	.steps__item a {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.steps__item a:hover {
		color: var(--cozh-black);
	}
</style>