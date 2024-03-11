<template>
	<div class="error-content">
      Произошла ошибка при загрузке данных, пожалуйста, попробуйте обновить страницу или обратитесь к администратору сервиса
    </div>
</template>
<script>
  	export default {
    	name: 'ErrorContent',
    	data: () => ({
      		isLoad: true,
    	})
   	}
</script>
<style scoped>
	.error-content {
    	height: 130px;
	    width: 100%;
	    padding: 30px;
	    display: flex;
	    flex-direction: row;
	    align-items: center;
	    justify-content: center;
	    background-color: #fff;
	    border-radius: 8px;
	    text-align: center;
	    font-size: 13px;
	    font-weight: 500;
	    color: var(--cozh-dark-grey);
	}
</style>