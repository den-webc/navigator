<template>
	<div class="c-navigator">
		<router-link class="c-navigator__item" :to="{name: 'PageReportEmployeessHouse', params: {house_id: house_id}}">
			<svg data-v-edc10994="" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path data-v-edc10994="" fill-rule="evenodd" clip-rule="evenodd" d="M10.0025 3C8.34565 3 7.0025 4.34315 7.0025 6C7.0025 7.65685 8.34565 9 10.0025 9C11.6594 9 13.0025 7.65685 13.0025 6C13.0025 4.34315 11.6594 3 10.0025 3ZM5.0025 6C5.0025 3.23858 7.24108 1 10.0025 1C12.7639 1 15.0025 3.23858 15.0025 6C15.0025 8.76142 12.7639 11 10.0025 11C7.24108 11 5.0025 8.76142 5.0025 6Z" fill="#AEC1CC">
				</path>
				<path data-v-edc10994="" fill-rule="evenodd" clip-rule="evenodd" d="M9.59532 11.0045C9.74489 11.0068 9.88144 11.0089 10.0025 11.0089C10.1235 11.0089 10.2601 11.0068 10.4096 11.0045C11.3775 10.9897 12.8905 10.9666 14.2738 11.447C15.1027 11.7349 15.9234 12.211 16.5954 12.991C17.268 13.7718 17.7439 14.802 17.9686 16.1228C18.2583 17.8262 16.7666 19 15.3374 19H4.66751C3.23835 19 1.74669 17.8262 2.0364 16.1228C2.26103 14.802 2.73696 13.7718 3.40957 12.991C4.08153 12.211 4.90226 11.7349 5.73113 11.447C7.11448 10.9666 8.62749 10.9897 9.59532 11.0045ZM4.92486 14.2964C4.52731 14.7579 4.1821 15.4349 4.00809 16.4581C3.98867 16.5723 4.01969 16.6833 4.12659 16.791C4.24213 16.9074 4.4355 17 4.66751 17H15.3374C15.5694 17 15.7628 16.9074 15.8784 16.791C15.9853 16.6833 16.0163 16.5723 15.9969 16.4581C15.8229 15.4349 15.4776 14.7579 15.0801 14.2964C14.6819 13.8341 14.1835 13.5328 13.6176 13.3363C12.5975 12.982 11.4827 12.9943 10.4921 13.0052C10.325 13.0071 10.1615 13.0089 10.0025 13.0089C9.8435 13.0089 9.67994 13.0071 9.51285 13.0052C8.52227 12.9943 7.40746 12.982 6.3873 13.3363C5.82149 13.5328 5.32305 13.8341 4.92486 14.2964Z" fill="#AEC1CC">
				</path>
			</svg>
			Отчёт по сотрудникам
		</router-link>
		<router-link class="c-navigator__item" :to="{name: 'PageReportsSystemHouse', params: {house_id: house_id}}">
			<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M2 3C2 1.34315 3.34315 0 5 0H13C14.6569 0 16 1.34315 16 3V19C16 19.5523 15.5523 20 15 20H3C2.44772 20 2 19.5523 2 19V3ZM5 2C4.44772 2 4 2.44772 4 3V18H14V3C14 2.44772 13.5523 2 13 2H5Z" fill="#AEC1CC"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M0 19C0 18.4477 0.447715 18 1 18H3C3.55228 18 4 18.4477 4 19C4 19.5523 3.55228 20 3 20H1C0.447715 20 0 19.5523 0 19ZM14 19C14 18.4477 14.4477 18 15 18H17C17.5523 18 18 18.4477 18 19C18 19.5523 17.5523 20 17 20H15C14.4477 20 14 19.5523 14 19Z" fill="#AEC1CC"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M2 13C2 12.4477 2.44772 12 3 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H3C2.44772 14 2 13.5523 2 13Z" fill="#AEC1CC"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M6 5C6 4.44772 6.44772 4 7 4H11C11.5523 4 12 4.44772 12 5C12 5.55228 11.5523 6 11 6H7C6.44772 6 6 5.55228 6 5ZM6 9C6 8.44772 6.44772 8 7 8H11C11.5523 8 12 8.44772 12 9C12 9.55228 11.5523 10 11 10H7C6.44772 10 6 9.55228 6 9Z" fill="#AEC1CC"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M7 12C7.55228 12 8 12.4477 8 13V19C8 19.5523 7.55228 20 7 20C6.44772 20 6 19.5523 6 19V13C6 12.4477 6.44772 12 7 12Z" fill="#AEC1CC"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M11 12C11.5523 12 12 12.4477 12 13V19C12 19.5523 11.5523 20 11 20C10.4477 20 10 19.5523 10 19V13C10 12.4477 10.4477 12 11 12Z" fill="#AEC1CC"/>
			</svg>
			Отчёт о системах дома
		</router-link>
		<router-link class="c-navigator__item" :to="{name: 'PageReportsCompleteHouse', params: {house_id: house_id}}">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M6 9C6 7.34315 7.34315 6 9 6H17C18.6569 6 20 7.34315 20 9V17C20 18.6569 18.6569 20 17 20H9C7.34315 20 6 18.6569 6 17V9ZM9 8C8.44772 8 8 8.44772 8 9V17C8 17.5523 8.44772 18 9 18H17C17.5523 18 18 17.5523 18 17V9C18 8.44772 17.5523 8 17 8H9Z" fill="#AEC1CC"/>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M0 3C0 1.34315 1.34315 0 3 0H11C12.6569 0 14 1.34315 14 3V4C14 4.55228 13.5523 5 13 5C12.4477 5 12 4.55228 12 4V3C12 2.44772 11.5523 2 11 2H3C2.44772 2 2 2.44772 2 3V11C2 11.5523 2.44772 12 3 12H7C7.55228 12 8 12.4477 8 13C8 13.5523 7.55228 14 7 14H3C1.34315 14 0 12.6569 0 11V3Z" fill="#AEC1CC"/>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M16.7071 10.2929C17.0976 10.6834 17.0976 11.3166 16.7071 11.7071L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L9.29289 13.7071C8.90237 13.3166 8.90237 12.6834 9.29289 12.2929C9.68342 11.9024 10.3166 11.9024 10.7071 12.2929L12 13.5858L15.2929 10.2929C15.6834 9.90237 16.3166 9.90237 16.7071 10.2929Z" fill="#AEC1CC"/>
			</svg>
			Отчёт о выполненных работах
		</router-link>
	</div>
</template>

<script setup>
</script>

<script>
 	export default {
    	name: 'NavigatorComponent',
    	computed: {
    		house_id () {
    			return this.$route.params.house_id;
    		}
    	}
    }
</script>

<style scoped>

	.c-navigator {
		background-color: #fff;
		padding: 5px;
		border-radius: 8px;
		height: 58px;
		widows: 100%;
		margin-bottom: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}

	.c-navigator__item {
		height: 100%;
		border-radius: 8px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		padding: 0px 20px 0px 15px;
		font-size: 12px;
		font-weight: 500;
	}
	.c-navigator__item svg {
		margin-right: 10px;
	}
	.c-navigator__item svg path {
		transition: all .2s ease-out;
	}

	.c-navigator__item.router-link-active {
		background-color: rgba(var(--cozh-blue-code), .08);
	}

	.c-navigator__item.router-link-active svg path {
		fill: var(--cozh-blue);
	}

/*	.c-navigator__item:hover {
		color: var(--cozh-blue);
	}*/
	.c-navigator__item:hover svg path {
		fill: var(--cozh-blue);
	}


</style>