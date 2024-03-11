<template>
	<div class="load-container" :class="{'load' : isLoad}">
  	<div class="content" v-if="!isLoad && !isError">

  		<div class="component-container">
  			<div class="component-container__left">

  				<div class="component-work" :class="'component-work--' + task.status">
		  			<div class="component-work__header">
		  				<div class="component-work__badge">

	  						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="task.actionType == 'control'">
								<g clip-path="url(#clip0_38_8)">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z" fill="#AEC1CC"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M14.7071 6.29289C15.0976 6.68342 15.0976 7.31658 14.7071 7.70711L8.70711 13.7071C8.31658 14.0976 7.68342 14.0976 7.29289 13.7071L5.29289 11.7071C4.90237 11.3166 4.90237 10.6834 5.29289 10.2929C5.68342 9.90237 6.31658 9.90237 6.70711 10.2929L8 11.5858L13.2929 6.29289C13.6834 5.90237 14.3166 5.90237 14.7071 6.29289Z" fill="#AEC1CC"/>
								</g>
								<defs>
								<clipPath id="clip0_38_8">
								<rect width="20" height="20" fill="white"/>
								</clipPath>
								</defs>
								</svg>

								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="task.actionType == 'review'">
								<g clip-path="url(#clip0_38_5)">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M10 8C8.34315 8 7 9.34315 7 11C7 12.6569 8.34315 14 10 14C11.6569 14 13 12.6569 13 11C13 9.34315 11.6569 8 10 8ZM5 11C5 8.23858 7.23858 6 10 6C12.7614 6 15 8.23858 15 11C15 13.7614 12.7614 16 10 16C7.23858 16 5 13.7614 5 11Z" fill="#AEC1CC"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M0.120095 8.52485C1.14267 6.63118 4.49469 3 10 3C15.5053 3 18.8573 6.63118 19.8799 8.52485C20.1423 9.01081 19.9611 9.61749 19.4751 9.87991C18.9892 10.1423 18.3825 9.96111 18.1201 9.47515C17.3427 8.03548 14.5747 5 10 5C5.42531 5 2.65733 8.03548 1.87991 9.47515C1.61749 9.96111 1.01081 10.1423 0.524851 9.87991C0.038893 9.61749 -0.142323 9.01081 0.120095 8.52485Z" fill="#AEC1CC"/>
								</g>
								<defs>
								<clipPath id="clip0_38_5">
								<rect width="20" height="20" fill="white"/>
								</clipPath>
								</defs>
								</svg>

								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="task.actionType == 'work'">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M7.20119 0.97929C7.39006 0.779728 7.65272 0.666672 7.92749 0.666672H12.2565C12.5313 0.666672 12.7939 0.779728 12.9828 0.97929L19.4763 7.8404C19.8412 8.226 19.8412 8.82957 19.4763 9.21517L16.2295 12.6457C16.0407 12.8453 15.778 12.9583 15.5032 12.9583C15.2285 12.9583 14.9658 12.8453 14.7769 12.6457L12.9732 10.7399L7.02816 17.3678C5.72409 18.8216 3.4647 18.884 2.08205 17.5048C0.697795 16.124 0.760787 13.8659 2.21942 12.564L8.98493 6.52581L6.11894 3.49757C5.754 3.11197 5.754 2.50841 6.11894 2.12281L7.20119 0.97929ZM10.3603 7.97902L3.55116 14.0562C2.9504 14.5923 2.92473 15.5205 3.49449 16.0888C4.06585 16.6588 5.0008 16.6327 5.53934 16.0323L11.5939 9.28243L10.3603 7.97902ZM8.22208 2.81019L8.35791 2.66667H11.8261L17.3731 8.52778L15.5032 10.5035L8.22208 2.81019Z" fill="#AEC1CC"/>
								</svg>

		  				</div>
		  				<div class="component-work__num"> {{ task.num }} </div>
		  				<div class="component-work__status"> {{ statusText }} </div>
		  			</div>
		  			<div class="component-work__body">
								{{ task.name }}
		  			</div>
		  		</div>
		  		<div class="component-comment" v-if="task.supplierComment">
						<div class="component-comment__label">
							Комментарий постановщика
						</div>
						<div class="component-comment__text">
							{{ task.supplierComment }}
						</div>
					</div>
					<div class="component-comment" v-if="task.employeeComment">
						<div class="component-comment__label">
							Комментарий исполнителя
						</div>
						<div class="component-comment__text">
							{{ task.employeeComment }}
						</div>
					</div>
					<div class="component-comment" v-if="task.imgLinks && task.imgLinks.length > 0">
						<div class="component-comment__label">
							Фотографии
						</div>
						<GalleryPhoto :images="task.imgLinks" />
					</div>
  			</div> 
  			<div class="component-container__right">
		  		<div class="component-info">
		  			<div class="component-info__header">
		  				<span> Назначено </span>
		  				<span> {{ $moment(task.dateCreated).format('DD.MM.YYYY') }} </span>
		  			</div>
		  			<div class="component-info__body">
		  				<div class="component-info__item">
		  					<div class="component-info__badge">
		  						<img src="@/assets/img/task-icons/1.svg">
		  					</div>
		  					<div class="component-info__content">
		  						<div class="component-info__label">
		  							Крайний срок
		  						</div>
		  						<div class="component-info__data">
		  							<span v-if="task.dateExpire !== null ">
		  								{{ $moment(task.dateExpire).format('DD.MM.YYYY') }}
		  							</span>
		  							<span v-else>
		  									-
		  							</span>
		  						</div>
		  					</div>
		  				</div>
		  				<div class="component-info__item">
		  					<div class="component-info__badge">
		  						<img src="@/assets/img/task-icons/2.svg">
		  					</div>
		  					<div class="component-info__content">
		  						<div class="component-info__label">
		  							Место
		  						</div>
		  						<div class="component-info__data">
		  							<div class="component-info__path" v-if="task.title !== ''">
											<div class="component-info__path-item" v-for="(path, index) in currentPath" :key="index">
												{{ path }}
											</div>
										</div>
										<span v-else> - </span>
		  						</div>
		  					</div>
		  				</div>
		  				<div class="component-info__item">
		  					<div class="component-info__badge">
		  						<img src="@/assets/img/task-icons/3.svg">
		  					</div>
		  					<div class="component-info__content">
		  						<div class="component-info__label">
		  							Квалификация
		  						</div>
		  						<div class="component-info__data">
		  							{{ task.function.name }}
		  						</div>
		  					</div>
		  				</div>
		  				<div class="component-info__item">
		  					<div class="component-info__badge">
		  						<img src="@/assets/img/task-icons/4.svg">
		  					</div>
		  					<div class="component-info__content">
		  						<div class="component-info__label">
		  							Сотрудник
		  						</div>
		  						<div class="component-info__data">
		  							{{ task.empl.name }}
		  						</div>
		  					</div>
		  				</div>
		  			</div>
					</div>

  		  </div>
  		</div>

  	</div>
	</div>

</template>

<script setup>
    import GalleryPhoto from '@/components/ux/GalleryPhoto.vue'
</script>

<script>

  export default {

    name: 'PageTrackerHouseTask',

    props: ['house_id', 'task_id'],

    data: () => ({
      isLoad: true,
      isError: false,

      task: null,
    }),

    computed: {
    	statusText () {
    		switch (this.task.status) {
    			case 'assigned':
    				return 'Назначено';
    			case 'done':
    				return 'Всё в порядке';
    			case 'issue':
    				return 'Есть проблемы';
    			case 'failed':
    				return 'Не сделано';
    			case 'expired':
    				return 'Просрочено';
    			case 'new':
    				return 'Закрыто';
    			default:
    				return 'Назначено';
    		}
    	},
    	currentPath () {
    		return this.task.title.split(' / ');
    	}
    },

    created () {
      	Promise.all([ this.loadTask() ])
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
	   
    	},
    	async loadTask () {
        const r = await this.axios.get(this.$store.state.api_endpoint + '/tracker/' + this.house_id + '/tasks/' + this.task_id);
        if(r.status == 200) {
          this.task = r.data;
        }
    	},
    },
  }
</script>


<style scoped>


	.component-container {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.component-container__left {
		width: 100%;
		margin-right: 15px;
	}

	.component-container__right {
		min-width: 525px;
	}


	.component-info {
		background-color: var(--cozh-white);
		border-radius: 15px;
		overflow: hidden;
		width: 100%;
	}
	
	.component-info__header {
		border-bottom: 1px solid var(--cozh-light-grey);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		height: 65px;
		padding: 0px 25px;
	}

	.component-info__header span:first-child {
 		margin-right: 10px;
		color: var(--cozh-grey);
 		font-size: 15px;
	 	line-height: 1.1;
	 	word-wrap: break-word;
	}

	.component-info__header span:last-child {
		font-size: 15px;
    font-weight: 500;
    line-height: 1.1;
    word-wrap: break-word;
	}
	.component-info__body {
		padding: 8px 20px;
	}

	.component-info__item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		padding-top: 12px;
		padding-bottom: 12px;
	}

	.component-info__item:not(:last-child) {
		border-bottom: 1px solid var(--cozh-light-grey);
	}


	.component-info__badge {
		height: 40px;
		width: 40px;
		min-height: 40px;
    min-width: 40px;
		background-color: rgba(var(--cozh-blue-code), .12);
		border-radius: 50%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-right: 15px;
	}

	.component-info__content {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.component-info__label {
		color: var(--cozh-grey);
 		font-size: 10px;
 		font-weight: 500;
 		text-transform: uppercase;
 		letter-spacing: 0.50px;
 		word-wrap: break-word
	}

	.component-info__data {
		font-size: 15px;
		font-weight: 500;
		line-height: 1.2;
 		word-wrap: break-word;
	}

	.component-info__path {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	.component-info__path-item {
 		font-size: 15px;
	 	font-weight: 500;
	 	max-width: 50%;
	 	text-overflow: ellipsis;
	 	overflow: hidden;
	 	white-space: nowrap;
	 	position: relative;
	}
	.component-info__path-item:not(:last-child) {
		padding-right: 32px;
	 	max-width: calc(50% + 20px);
	}
	.component-info__path-item:not(:last-child)::before {
		content: url('../../assets/img/check-right-grey.svg');
		position: absolute;
		right: 13px;
		top: 50%;
		transform: translateY(-50%);
	}









	.component-comment {
		background-color: var(--cozh-white);
		border-radius: 15px;
		padding: 20px 20px;
		margin-top: 15px;
	}
	.component-comment__label {
		color: var(--cozh-grey);
	 	font-size: 10px;
	 	font-weight: 500;
	 	text-transform: uppercase;
	 	letter-spacing: 0.50px;
	 	margin-bottom: 10px;
	}
	.component-comment__text {
 		font-size: 14px;
 		word-wrap: break-word;
	}



	.component-work {
		background-color: var(--cozh-white);
		border-radius: 15px;
		min-height: 340px;
	}
	
	.component-work__header {
		border-bottom: 1px solid var(--cozh-light-grey);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		height: 65px;
		padding: 0px 13px;
	}

	.component-work__body {
		padding: 20px 20px;
		font-size: 20px;
		line-height: 1.4;
		font-weight: 500;

	}

	.component-work__badge {
		height: 40px;
		width: 40px;
		border-radius: 50%;
		margin-right: 12px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.component-work__num {
	 	font-size: 15px;
	 	font-weight: 500;
	 	line-height: 1.1;
	 	word-wrap: break-word;
		margin-right: 20px;
	}

	.component-work__status {
	 	font-size: 15px;
	 	line-height: 1.1;
	 	word-wrap: break-word;
	 	padding-left: 15px;
	 	position: relative;
	 	font-weight: 500;
	}

	.component-work__status::before {
		content: '';
    height: 7px;
    width: 7px;
    border-radius: 50%;
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
	}


	/* assigned  */
	.component-work--assigned .component-work__status {
		color: var(--cozh-grey);
	}
	.component-work--assigned .component-work__badge {
		background-color: rgba(233, 241, 244, 1);
	}
	.component-work--assigned .component-work__status::before {
		background-color: var(--cozh-grey);
	}
	.component-work--assigned .component-work__badge svg path {
		fill: var(--cozh-grey);
	}


	/* done  */
	.component-work--done .component-work__status {
		color: var(--cozh-blue);
	}
	.component-work--done .component-work__badge {
		background-color: rgba(233, 241, 244, 1);
	}
	.component-work--done .component-work__status::before {
		background-color: var(--cozh-blue);
	}
	.component-work--done .component-work__badge svg path {
		fill: var(--cozh-blue);
	}

	/* issue  */
	.component-work--issue .component-work__status {
		color: var(--cozh-orange);
	}
	.component-work--issue .component-work__badge {
		background-color: rgba(var(--cozh-orange-code), .12);
	}
	.component-work--issue .component-work__status::before {
		background-color: var(--cozh-orange);
	}
	.component-work--issue .component-work__badge svg path {
		fill: var(--cozh-orange);
	}

	/* failed  */
	.component-work--failed .component-work__status {
		color: var(--cozh-red);
	}
	.component-work--failed .component-work__badge {
		background-color: rgba(var(--cozh-red-code), .12);
	}
	.component-work--failed .component-work__status::before {
		background-color: var(--cozh-red);
	}
	.component-work--failed .component-work__badge svg path {
		fill: var(--cozh-red);
	}

	/* expired  */
	.component-work--expired .component-work__status {
		color: var(--cozh-dark-red);
	}
	.component-work--expired .component-work__badge {
		background-color: rgba(var(--cozh-dark-red-code), .08);
	}
	.component-work--expired .component-work__status::before {
		background-color: var(--cozh-dark-red);
	}
	.component-work--expired .component-work__badge svg path {
		fill: var(--cozh-dark-red);
	}

	/* new  */
	.component-work--new .component-work__status {
		color: var(--cozh-green);
	}
	.component-work--new .component-work__badge {
		background-color: rgba(var(--cozh-green-code), .15);
	}
	.component-work--new .component-work__status::before {
		background-color: var(--cozh-green);
	}
	.component-work--new .component-work__badge svg path {
		fill: var(--cozh-green);
	}


</style>