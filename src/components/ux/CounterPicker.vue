<template>
	<div class="counter" :class="{ 'empty': value == 0, 'large': size == 'large' }">
		<a class="counter__button" @click="minusValue()">
			<svg width="12" height="3" viewBox="0 0 12 3" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M11 1.5H1" stroke="#AEC1CC" stroke-width="2" stroke-linecap="round"/>
			</svg>
		</a>
		<input class="counter__field" type="number" :value="value" @change="fieldValue($event)">
		<a class="counter__button" @click="plusValue()">
			<svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M6 11.5V1.5M11 6.5H1" stroke="#AEC1CC" stroke-width="2" stroke-linecap="round"/>
			</svg>
		</a>
	</div>
</template>

<script>
	export default {
	    name: 'CounterPicker',
	    props: ['value', 'size'],
	    data: () => ({
	    }),
	    created () {
	    },
	    methods: {
	    	fieldValue (e) {
	    		if (e.currentTarget.value !== '') {
	    			this.$emit('setValue', e.currentTarget.value)
	    		}
	    	},
	    	plusValue () {
	    		this.$emit('setValue', this.value + 1)
	    	},
	    	minusValue () {
	    		this.$emit('setValue', this.value - 1)
	    	},
	    },
    }
</script>

<style scoped>
	.counter {
		height: 30px;
		width: 120px;
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: rgba(240, 245, 248, 1);
		border-radius: 8px;	
		overflow: hidden;
	}

	.counter__button {
		padding: 0px 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	.counter__button:first-child {
		padding: 0px 8px 0px 15px;
	}
	.counter__button:last-child {
		padding: 0px 15px 0px 8px;
	}
	.counter__button svg path {
		transition: all .2s ease-out;
	}
	.counter__button:hover svg path {
		stroke:  var(--cozh-blue);
	}
	.counter__field {
    	border: none;
    	padding: 0px 6px;
    	background-color: transparent;
    	height: 100%;
    	width: 100%;
    	text-align: center;
    	padding-bottom: 1px;
		font-size: 14px;
		font-weight: 600;
		transition: color .2s ease-out;
	}
	.counter__field:focus {
		color: var(--cozh-blue);
	}
	.counter__field::-webkit-inner-spin-button {
	    /* display: none; <- Crashes Chrome on hover */
	    -webkit-appearance: none;
	    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
	}
	.counter.empty .counter__button:first-child {
		opacity: 0;
		visibility: hidden;
	}


	.counter.large {
		width: 130px;
		height: 56px;
	}

	.counter.large .counter__field {
		font-size: 18px;
	}

	.counter.large .counter__button:first-child {
		padding: 0px 8px 0px 17px;
	}
	.counter.large .counter__button:last-child {
		padding: 0px 17px 0px 8px;
	}


</style>