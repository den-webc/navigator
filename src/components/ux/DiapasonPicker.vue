<template>
	<div class="diapason">
		<input class="diapason__field" type="number" :value="value.min" @change="setMin($event)">
		<input class="diapason__field" type="number" :value="value.max" @change="setMax($event)">
	</div>
</template>

<script>
	export default {
	    name: 'DiapasonPicker',
	    props: ['value'],
	    data: () => ({
	    }),
	    created () {
	    },
	    methods: {
	    	setMin (e) {
	    		if (e.currentTarget.value !== '') {
	    			this.$emit('setValue', { min: e.currentTarget.value, max: this.value.max });
	    		}
	    	},
	    	setMax (e) {
	    		if (e.currentTarget.value !== '') {
	    			this.$emit('setValue', { min: this.value.min, max: e.currentTarget.value });
	    		}
	    	},
	    },
    }
</script>

<style scoped>

	.diapason {
		height: 30px;
		width: 200px;
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: rgba(240, 245, 248, 1);
		border-radius: 8px;
		position: relative;
		overflow: hidden;
	}

	.diapason::before {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		height: 17px;
		width: 1px;
		background-color: var(--cozh-grey);
	}

	.diapason__field {
    	border: none;
    	padding: 0px 14px;
    	background-color: transparent;
    	height: 100%;
    	width: 100%;
    	text-align: left;
    	padding-bottom: 1px;
		font-size: 14px;
		font-weight: 600;
		transition: color .2s ease-out;
	}

	.diapason__field:focus {
		color: var(--cozh-blue);
	}

	.diapason__field::-webkit-inner-spin-button {
	    -webkit-appearance: none;
	    margin: 0;
	}

</style>