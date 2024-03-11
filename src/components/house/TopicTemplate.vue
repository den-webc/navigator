<template>

	<MessageDialogue ref="messageDialogue" />
  <ConfirmDialogue ref="confirmDialogue" />

	<div class="collapse">
		<div class="collapse__header js-collapse">
			<div class="collapse__header-container">
				<div class="collapse__header-left">
					<div class="collapse__group">
						<div class="collapse__badge" :class="{'active': topic.active}"></div>
						<span class="collapse__label me-1 ms-1" :for="topic.num">{{ topic.num }}</span> 
					</div>
					{{ topic.name }}
				</div>
				<div class="collapse__header-right">
					<div class="collapse__header-buttons">
						<a class="btn btn--sm btn--default me-1" @click="saveTopic($event, topic)">
	            <img class="btn--ico btn--ico--left" src="@/assets/img/check-white.svg">
	            <div class="btn--text"> Сохранить шаблон </div>
	            <div class="btn--loader"></div>
		        </a>
					</div>
					<div class="collapse__header-message">
						<span v-if="topic.active"> Шаблон сохранён </span>
						<span v-else class="nowrap"> Шаблон не сохранён </span>
					</div>
				</div>
			</div>
		</div>
		
		<div class="collapse__content">
			<div class="collapse__body nopadding">

				<template v-for="(loc_lvl_1,  key_lvl_1) in topic.locations" :key="key_lvl_1">

					<template v-if="key_lvl_1 !== 'default'">
							
							<!-- Локации первого уровня -->
							<div class="location" v-for="loc in loc_lvl_1" :key="loc.id">
								<div class="location__header">
									<img src="@/assets/img/place.svg">
									<span> {{ loc.title }} </span> 
								</div>
								<div class="location__body">
									
									<template v-for="(loc_lvl_2, key_lvl_2) in loc.locations" :key="key_lvl_2">

										<template v-if="key_lvl_2 !== 'default'">

											<!-- Локации второго уровня -->
											<div class="location" v-for="loc in loc_lvl_2" :key="loc.id">
												<div class="location__header">
													<img src="@/assets/img/place.svg">
													<span> {{ loc.title }} </span> 
												</div>
												<div class="location__body">
													<GroupTemplate 
														:topic="loc" 
														:functions="functions" 
														:employees="employees" 
													/>
												</div>
											</div>

										</template>

										<!-- Дэфолт на втором уровне -->
										<template v-else>
								
											<GroupTemplate 
												:topic="loc_lvl_2[0]" 
												:functions="functions" 
												:employees="employees" 
											/>

										</template>


									</template>

								</div>
							</div>

					</template>

					<!-- Дэфолт на первом уровне -->
					<template v-else>

						<template v-for="(loc_lvl_2, key_lvl_2) in loc_lvl_1[0].locations" :key="key_lvl_2">

							<template v-if="key_lvl_2 !== 'default'">

								<!-- Локации второго уровня -->
								<div class="location" v-for="loc in loc_lvl_2" :key="loc.id">
									<div class="location__header">
										<img src="@/assets/img/place.svg">
										<span> {{ loc.title }} </span> 
									</div>
									<div class="location__body">
										<GroupTemplate 
											:topic="loc" 
											:functions="functions" 
											:employees="employees" 
										/>
									</div>
								</div>

							</template>

							<!-- Дэфолт на втором уровне -->
							<template v-else>
								
								<div class="location location--nongroup">
									<div class="location__header">
										<img src="@/assets/img/place.svg">
										<span> Задания без группировки </span> 
									</div>
									<div class="location__body">
										<GroupTemplate 
											:topic="loc_lvl_2[0]" 
											:functions="functions" 
											:employees="employees" 
										/>
									</div>
								</div>

							</template>

						</template>

					</template>

				</template>
		
			</div>
		</div>
	</div>


</template>

<script setup>
  import GroupTemplate from '@/components/house/GroupTemplate.vue'
  import MessageDialogue from '@/components/modals/MessageDialogue.vue';
  import ConfirmDialogue from '@/components/modals/ConfirmDialogue.vue';
</script>

<script>
	export default {
		name: 'TopicTemplate',
		props: ['topic', 'functions', 'employees'],
	  data: () => ({
	  }),
	  computed: {
      house_id () {
        return this.$route.params.house_id;
      },
    },
	  methods: {
	  	
	  	async saveTopic (e, topic) {

  			const btn = e.currentTarget;
    		const data = {templates:[]};
    		const dataTopic = this.$helpers.buildTopic(topic);

    		data.templates.push(dataTopic);

    		btn.classList.add('btn--load');

    		try {
    			
    			await new Promise(r => setTimeout(r, 300));

    			await this.axios.post(this.$store.state.api_endpoint + '/houses/' + this.house_id + '/template/activate', data);

    			this.$refs.messageDialogue.show({
            message: 'Шаблон сохранен!',
            okButton: 'Продолжить',
          });

    			topic.active = true;

    		} catch (e) {

    			this.$refs.messageDialogue.show({
            message: e.message,
            okButton: 'Подтвердить',
          });

    		}
    		
    		btn.classList.remove('btn--load');

	  	}

	  } 
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
	.collapse__badge {
		height: 6px;
		width: 6px;
		min-height: 6px;
		min-width: 6px;
		background-color: var(--cozh-light-grey);
		border-radius: 50%;
	}
	.collapse__badge.active {
		background-color: var(--cozh-blue);
	}
	.collapse__label {
    	color: var(--cozh-grey);
    	font-size: 14px;
    	font-weight: 600;
	}

	.collapse:not(:last-child) {
		margin-bottom: 10px;
	}
	.collapse.open:not(:last-child) {
    	margin-bottom: 10px;
  	}
	.collapse__header-buttons {
		display: none;
	}
	.collapse__header-message {
		display: flex;
	}
	.collapse .collapse.open .collapse__header-buttons {
		display: flex;
	}
	.collapse .collapse.open .collapse__header-message {
		display: none;
	}


	.location {
	  border-top: 1px solid var(--cozh-light-grey);
	}
	.location:first-child {
	  border-top: none;
	}
	
	.location__header {
 		font-size: 14px;
	  font-weight: 500;
	  padding: 10px 15px;
	  border-bottom: 1px solid var(--cozh-light-grey);
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  justify-content: flex-start;
	  line-height: 1;
	  background: #e9f1f4;
	}
	.location__header img {
		margin-right: 5px;
	}
	.location .topic__header, 
	.location .topic__body {
    	padding-left: 35px;
    	padding-left: 35px;
	}

	.location .location {
		margin-left: 20px;
	}

	.location .location .location__header {
		background-color: transparent;
	}


	.location + .location--nongroup .location__header {
		display: flex!important;
	}

	.location--nongroup .location__header {
		display: none;
	}

</style>