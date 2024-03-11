<template>
		
	<div class="calendar" ref="calendar" @click="clickCalendar($event)">

		<div class="calendar__control">
			<div class="calendar__label" v-if="modelValue == null">
				{{ label }}
			</div>
			<div class="calendar__value" v-if="modelValue !== null">
				{{ $moment(modelValue).format('DD MMMM YYYY') }}
			</div>
			<transition name="slide">
			    <a class="custom-select__clear" v-if="isClear && modelValue !== null" @click.stop="clear">
			    	<svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M7 1.5L1 7.5M1 1.5L7 7.5" stroke="#AEC1CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
			    </a>
			</transition>
		</div>

      	<transition name="slideY">
			<div class="calendar__content" v-if="isOpen">
				<Datepicker v-model="picked" :locale="localeRU"/>
				<div class="calendar__btn">
					<a @click="confirm" class="btn btn--default btn--sm btn--inline"> 
						<img class="btn--ico btn--ico--left" src="@/assets/img/check-white.svg">
						<div class="btn--text"> Выбрать </div>
						<div class="btn--loader"></div>
					</a>
				</div>
			</div>
		</transition>
	</div>
</template>


<script>
	
	import Datepicker from 'vue3-datepicker';
	import { ru } from 'date-fns/locale';

	export default {
	    
	    name: 'DatePicker',

	    components: { Datepicker },

	    props: [ 'modelValue', 'label', 'isClear' ],

	    data: () => ({
	    	isOpen: false,
	    	picked: null,
	    	date: null,
	    	localeRU: ru,
	    }),
	    
	    mounted () {
		    this.$nextTick(() => {
				window.addEventListener('click', this.clickEvent);
		    })
	    },

	    unmounted () {
	    	window.removeEventListener('click', this.clickEvent);
		},

	    methods: {
	    	confirm () {
	    		let date = this.picked !== null ? this.$moment(this.picked).format('YYYY-MM-DD') : null;
	    		this.$emit('update:modelValue', date);
			  	this.isOpen = false;
	    	},
	    	
	    	clear () {
	    		this.picked = null;
	    		this.$emit('update:modelValue', null);
			  	this.isOpen = false;
	    	},

	    	clickEvent (e) {
	    		// Только если открыт
			  	if(this.isOpen) {
			  		// Элемент на который нажали находится за пределами этого селекта
				  	if(!this.$refs.calendar.contains(e.target)) {
				  		// Закрываем этот селект
				  		this.isOpen = false;
				  	}
			  	}
	    	},
	    	// Клик на селект
	    	clickCalendar (e) {
	    		if(!this.$refs.calendar.contains(e.target)) {
			  		// Закрываем этот селект
			  		this.isOpen = false;
			  	} else {
			  		this.isOpen = true;
			  		this.picked = this.modelValue !== null ? new Date(this.modelValue) : null;
			  	}
	    	},

	    },
	};
</script>


<style scoped>

	.calendar {
		position: relative;
	}

	.calendar__control {
		height: 40px;
	  padding: 0px 15px;
	  border-radius: 4px;
	  background-color: transparent;
	  border: 1px solid var(--cozh-light-grey);
	  background-color: #fff;
	  cursor: pointer;
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  position: relative;
	}

	.calendar__label {
		color: var(--cozh-grey);
	    text-transform: none;
	    text-overflow: ellipsis;
	    overflow: hidden;
	    white-space: nowrap;
	    line-height: 1;
	    width: 100%;
	    font-size: 11px;
	    font-weight: 500;
	    letter-spacing: 0em;
	}

	.calendar__value {
	    color: var(--cozh-black);
	    text-overflow: ellipsis;
	    font-weight: 600;
	    overflow: hidden;
	    width: 100%;
	    white-space: nowrap;
	    display: block;
	    line-height: 1;
	    font-size: 12px;
	}

	.calendar__content {
		max-width: 300px;
	    background: #fff;
	    padding: 0px;
	    border-radius: 8px;
	    position: absolute;
	    left: 0px;
	    top: 45px;
	    box-shadow: 0px 5px 20px 0px rgba(11, 40, 54, 0.18);
	    overflow: hidden;
	    z-index: 99;
	}
	.calendar__btn {
		margin-top: 0px;
		padding: 20px;
	}


	.custom-select__clear {
		position: absolute;
	    background-color: var(--cozh-white);
	    border-radius: 50%;
	    top: -8px;
	    right: -7px;
	    border: 1px solid var(--cozh-light-grey);
	    height: 20px;
	    width: 20px;
	    display: flex;
	    flex-direction: revert;
	    align-items: center;
	    justify-content: center;
	    transition: all .2s ease-out;
	    z-index: 1;
	}

	.custom-select__clear path {
		transition: all .2s ease-out;
	}
	.custom-select__clear:hover {
		border-color: transparent;
		background-color: var(--cozh-blue);
	}
	.custom-select__clear:hover path {
		stroke: var(--cozh-white);
	}


  .slide-enter-active {
    transition: all 0.2s ease-out;
  }
  .slide-leave-active {
    transition: all 0.2s ease-out;
  }
  .slide-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
  .slide-enter-from {
    transform: translateX(-20px);
    opacity: 0;
  }

  	@media (max-width: 767px) {

  	}
</style>