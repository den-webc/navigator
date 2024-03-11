<template>
	<div 
		class="custom-periodical"
		:class="classObject" 
		@click="clickSelect($event)" 
		ref="parent">

	    <div class="custom-periodical__text" v-if="modelValue.length > 0"> {{ displayValue }} </div>
	    <span class="custom-periodical__label" v-if="modelValue.length == 0"> {{ label }} </span>

      	<transition name="slideY">
		    <div class="custom-periodical__content" ref="content" v-if="isOpen">
		    	<div class="custom-periodical__body">
		    		<div class="custom-periodical__row">
		    			<div class="custom-periodical__col">
		    				<div v-for="(n, index) in 8" :key="index">
		    					<div class="checkbox">
									<input :id="dataset[index].id + '-' + uniq" type="checkbox" :value="dataset[index].id" v-model="picked">
									<label :for="dataset[index].id + '-' + uniq"> {{ dataset[index].name }} </label>
								</div>
		    				</div>
		    			</div>
		    			<div class="custom-periodical__col">
		    				<div v-for="(n, index) in 16" :key="index">
		    					<div class="checkbox" v-if="n > 8">
									<input :id="dataset[index].id + '-' + uniq" type="checkbox" :value="dataset[index].id" v-model="picked">
									<label :for="dataset[index].id + '-' + uniq"> {{ dataset[index].name }} </label>
								</div>
		    				</div>
		    			</div>
		    			<div class="custom-periodical__col">
		    				<div v-for="(n, index) in 24" :key="index">
		    					<div class="checkbox" v-if="n > 16">
									<input :id="dataset[index].id + '-' + uniq" type="checkbox" :value="dataset[index].id" v-model="picked">
									<label :for="dataset[index].id + '-' + uniq"> {{ dataset[index].name }} </label>
								</div>
		    				</div>
		    			</div>
		    			<div class="custom-periodical__col">
		    				<div v-for="(n, index) in 29" :key="index">
		    					<div class="checkbox" v-if="n > 24">
									<input :id="dataset[index].id + '-' + uniq" type="checkbox" :value="dataset[index].id" v-model="picked">
									<label :for="dataset[index].id + '-' + uniq"> {{ dataset[index].name }} </label>
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
		name: 'MonthDayPicker',
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
    			{id: 1, name: '1' },
    			{id: 2, name: '2' },
    			{id: 3, name: '3' },
    			{id: 4, name: '4' },
    			{id: 5, name: '5' },
    			{id: 6, name: '6' },
    			{id: 7, name: '7' },
    			{id: 8, name: '8' },
    			{id: 9, name: '9' },
    			{id: 10, name: '10' },
    			{id: 11, name: '11' },
    			{id: 12, name: '12' },
    			{id: 13, name: '13' },
    			{id: 14, name: '14' },
    			{id: 15, name: '15' },
    			{id: 16, name: '16' },
    			{id: 17, name: '17' },
    			{id: 18, name: '18' },
    			{id: 19, name: '19' },
    			{id: 20, name: '20' },
    			{id: 21, name: '21' },
    			{id: 22, name: '22' },
    			{id: 23, name: '23' },
    			{id: 24, name: '24' },
    			{id: 25, name: '25' },
    			{id: 26, name: '26' },
    			{id: 27, name: '27' },
    			{id: 28, name: '28' },
    			{id: 'last', name: 'Последний' },
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