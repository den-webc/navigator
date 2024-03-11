<template>
  <TopMenu :breadcrumbs="breadcrumbs" />
	<div class="notfound">
		<div class="notfound__content">
			<h1 class="notfound__title"> 404 </h1>
			<div class="notfound__name">
				Ошибка! 
			</div>
			<div class="notfound__text">
				К сожалению, запрашиваемая Вами страница не найдена
			</div>
			<router-link :to="{name: 'PageOrganizations'}" class="btn btn--default btn--md notfound__btn" >
				Вернуться на сайт
			</router-link>
		</div>
	</div>
</template>

<script setup>
  import TopMenu from '@/components/TopMenu.vue'
</script>

<script>
  export default {
    name: 'PageNotFound',
    data: () => ({
    	headerText: null,
    	breadcrumbs: [],
    }),
    created () {
    	this.breadcrumbs = [
        {name: this.$route.meta.name, link: this.$route.matched[0].path, ico: this.$route.meta.ico},
      ];
    },
    methods: {
    },
  }
</script>

<style scoped>
	.notfound {
    height: calc(100dvh - 130px);
    width: 100%;
	}
	.notfound__title {
		font-size: 50px;
    line-height: 1;
    margin-bottom: 20px;
    color: var(--cozh-blue);
	}
	.notfound__content {
		padding: 30px;
    border-radius: 8px;
    background-color: var(--cozh-white);
    max-width: 380px;
    position: absolute;
    width: calc(100% - 30px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
	}
	.notfound__btn {
		margin-top: 20px;
		width: 100%;
	}
	.notfound__name {
		font-size: 18px;
		font-weight: 600;
	}
	.notfound__text {
		margin-top: 5px;
		text-align: center;
	}

	@media (max-width: 767px) {
	  .notfound {
	    height: auto;
		}
		.notfound__content {
			position: unset;
			transform: unset;
			max-width: 100%;
			width: 100%;
		}

  }
  
</style>