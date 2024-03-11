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
		    				<div v-for="(n, index) in 7" :key="index">
		    					<div class="checkbox">
									<input :id="dataset[index].id + '-' + uniq" type="checkbox" :value="dataset[index].id" v-model="picked">
									<label :for="dataset[index].id + '-' + uniq"> {{ dataset[index].name }} </label>
								</div>
		    				</div>
		    			</div>
		    			<div class="custom-periodical__col">
		    				<div v-for="(n, index) in 14" :key="index">
		    					<div class="checkbox" v-if="n > 7">
									<input :id="dataset[index].id + '-' + uniq" type="checkbox" :value="dataset[index].id" v-model="picked">
									<label :for="dataset[index].id + '-' + uniq"> {{ dataset[index].name }} </label>
								</div>
		    				</div>
		    			</div>
		    			<div class="custom-periodical__col">
		    				<div v-for="(n, index) in 19" :key="index">
		    					<div class="checkbox" v-if="n > 14">
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
		name: 'HoursPicker',
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
    			{id:'06:00', name:'06:00'},
    			{id:'07:00', name:'07:00'},
    			{id:'08:00', name:'08:00'},
    			{id:'09:00', name:'09:00'},
    			{id:'10:00', name:'10:00'},
    			{id:'11:00', name:'11:00'},
    			{id:'12:00', name:'12:00'},
    			{id:'13:00', name:'13:00'},
    			{id:'14:00', name:'14:00'},
    			{id:'15:00', name:'15:00'},
    			{id:'16:00', name:'16:00'},
    			{id:'17:00', name:'17:00'},
    			{id:'18:00', name:'18:00'},
    			{id:'19:00', name:'19:00'},
    			{id:'20:00', name:'20:00'},
    			{id:'21:00', name:'21:00'},
    			{id:'22:00', name:'22:00'},
    			{id:'23:00', name:'23:00'},
    			{id:'00:00', name:'00:00'},
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