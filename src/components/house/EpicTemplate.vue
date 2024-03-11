<template>
   <div class="collapse collapse--noborder" >
		<div class="collapse__header js-collapse">
			<div class="collapse__header-container">
  				<div class="collapse__header-left">
  					<div class="collapse__group">
						<span class="collapse__label me-1">{{ epic.num }}</span> 
					</div>
					{{ epic.name }}
				</div>
			</div>
		</div>
		<div class="collapse__content">
			<div class="collapse__body">
				<TopicTemplate :topic="topic" :functions="functions" :employees="employees" v-for="(topic) in epic.topics" :key="topic.num" />
			</div>
		</div>
	</div>
</template>

<script setup>
  import TopicTemplate from '@/components/house/TopicTemplate.vue'
</script>

<script>
	export default {
		name: 'EpicTemplate',
		props: ['epic', 'functions', 'employees'],
	    data: () => ({
	    }),
	}
</script>

<style scoped>
	
	.collapse__group {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		margin-top: 3px;
	}

	.collapse__label {
    	color: var(--cozh-grey);
    	font-size: 14px;
    	font-weight: 600;
	}

</style>