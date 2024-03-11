<template>
	<div 
		class="custom-periodical"
		:class="classObject" 
		@click="clickSelect($event)" 
		ref="parent">

	    <div class="custom-periodical__text"> {{ displayValue }} </div>
	    <span class="custom-periodical__label" v-if="modelValue.length == 0"> {{ label }} </span>

      	<transition name="slideY">
		    <div class="custom-periodical__content" ref="content" v-if="isOpen">
		    	<div class="custom-periodical__body">
		    		<div class="custom-periodical__row">
		    			<div class="custom-periodical__col">
		    				<div v-for="item in dataset" :key="item.id">
		    					<div class="checkbox">
									<input :id="item.id + '-' + uniq" type="checkbox" :value="item.id" v-model="picked">
									<label :for="item.id + '-' + uniq"> {{ item.name }} </label>
								</div>
		    				</div>
		    			</div>
		    		</div>
		    	</div>
		    	<div class="custom-periodical__footer">
		    		<a class="btn btn--default btn--sm btn--inline" @click="saveValue">
		    			Выбрать
		    		</a>
		    	</div>
		    </div>
		</transition>

	</div>
</template>

<script>
	export default {
		name: 'WeekDayPicker',
		props: ['label', 'modelValue'],
		created () {
			this.picked = this.modelValue;
	    	this.uniq = "id" + Math.random().toString(16).slice(2);
		},
	    data: () => ({
	    	isTop: false,
	    	isOpen: false,
	    	uniq: null,
	    	picked: [],
	    	dataset: [
				{ id: 'Mon', name: 'Понедельник' },
    			{ id: 'Tue', name: 'Вторник' },
    			{ id: 'Wed', name: 'Среда' },
    			{ id: 'Thu', name: 'Четверг' },
    			{ id: 'Fri', name: 'Пятница' },
    			{ id: 'Sat', name: 'Суббота' },
    			{ id: 'Sun', name: 'Воскресенье' },
    		],
	    }),
	    computed: {
	    	displayValue () {
	    		let string = '';
	    		this.modelValue.forEach((item, index) => {
	    			let idx = this.dataset.findIndex( (elem) => { return elem.id == item } );
	    			if(idx !== -1) {
	    				string += this.dataset[idx].name;
	    				string += index !== this.modelValue.length - 1 ? ', ' : '';
	    			}
	    		});
	    		return string;
	    	},
	    	classObject () {
	    		return {
	    			'custom-periodical--open': this.isOpen, 
	    			'custom-periodical--top': this.isTop, 
	    			'custom-periodical--xs': true, 
	    		}
	    	},
	    },
	    mounted () {
		    this.$nextTick(() => {
				window.addEventListener('click', this.clickEvent);
		    })
	    },
	    unmounted () {
	    	window.removeEventListener('click', this.clickEvent);
		},
	    methods: {
	    	clickEvent (e) {
			  	if(this.isOpen) {
				  	if(!this.$refs.parent.contains(e.target)) {
				  		this.isOpen = false;
				  	}
			  	}
	    	},
	    	calculateVertical () {
	    		const boundingContent = this.$refs.content.getBoundingClientRect();
	    		const boundingSelect = this.$refs.parent.getBoundingClientRect();
	    		if ((boundingSelect.bottom + boundingContent.height) > window.innerHeight) {
	    			this.isTop = true;
	    		} else {
	    			this.isTop = false;
	    		}
	    	},
	    	saveValue() {
	    		this.$emit('update:modelValue', this.picked);
	    		this.isOpen = false;
	    	},
	    	clickSelect (e) {
	    		if (this.isOpen) {
	    			if(this.$refs.content.contains(e.target)) return;
	    		}
	    		this.isOpen = !this.isOpen;
	    		if (this.isOpen) {
					this.picked = this.modelValue;
				    this.$nextTick(() => {
	    				this.calculateVertical();
	    			});
	    		}
	    	},
	    }
	}
</script>