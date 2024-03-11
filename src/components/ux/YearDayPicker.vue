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
		    	<div class="custom-periodical__items">
		    		<div class="custom-periodical__item">
			    		<div class="custom-periodical__fields">
				    		<div class="form-control form-control--xs" v-for="(day, index) in picked" :key="index">
				    			<input type="text" placeholder="dd.mm" v-model="picked[index]">
				    		</div>
			    		</div>
			    		<div class="custom-periodical__buttons">
			    			<div class="custom-periodical__btn" @click="minusDays" v-show="picked.length > 1">
				    			<svg width="6" height="2" viewBox="0 0 6 2" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M0 1C0 0.447715 0.447715 0 1 0H5C5.55228 0 6 0.447715 6 1V1C6 1.55228 5.55228 2 5 2H1C0.447715 2 0 1.55228 0 1V1Z" fill="#0B2836"/>
								</svg>
			    			</div>
			    			<div class="custom-periodical__btn" @click="plusDays" v-show="picked.length < 12">
				    			<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M4 0.25C4.41421 0.25 4.75 0.585786 4.75 1V3.25H7C7.41421 3.25 7.75 3.58579 7.75 4C7.75 4.41421 7.41421 4.75 7 4.75H4.75V7C4.75 7.41421 4.41421 7.75 4 7.75C3.58579 7.75 3.25 7.41421 3.25 7V4.75H1C0.585786 4.75 0.25 4.41421 0.25 4C0.25 3.58579 0.585786 3.25 1 3.25H3.25V1C3.25 0.585786 3.58579 0.25 4 0.25Z" fill="#0B2836"/>
								</svg>
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
		name: 'YearDayPicker',
		props: ['label', 'modelValue'],
		data: () => ({
	    	isTop: false,
	    	isOpen: false,
	    	uniq: null,
	    	picked: [null],
	    }),
		created () {
	    	this.uniq = "id" + Math.random().toString(16).slice(2);
			if(this.modelValue.length !== 0) {
				this.picked = this.transformPicked(this.modelValue);
			}
		},
	    computed: {
	    	displayValue () {
	    		let string = '';
	    		this.picked.forEach((item, index) => {
	    			string += item;
	    			if(index !== this.picked.length - 1) {
	    				string += ' | ';
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
	    	transformPicked (val) {
	    		const picked = [];
	    		for (let key1 in val) {
	    			if(val[key1] !== null) {
	    				const str = val[key1].split('.')
	    				picked[key1] = str[1] + '.' + str[0];
	    			}
	    		}
	    		return picked;
	    	},
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
	    	plusDays () {
	    		this.picked.push(null);
	    	},
	    	minusDays () {
	    		this.picked.pop();
	    	},
	    	saveValue () {
	    		let isError = false;
	    		this.picked.forEach((item) => {
    				if (item == null || item.trim() == '') {
    					isError = true;
    				}
	    		});
	    		if(!isError) {
	    			this.$emit('update:modelValue', this.transformPicked(this.picked));
	    			this.isOpen = false;
	    		}
	    	},
	    	clickSelect (e) {
	    		if (this.isOpen) {
	    			if(this.$refs.content.contains(e.target)) return;
	    		}
	    		this.isOpen = !this.isOpen;
	    		if (this.isOpen) {
	    			if(this.modelValue.length !== 0) {
						this.picked = this.transformPicked(this.modelValue);
					}
				    this.$nextTick(() => {
	    				this.calculateVertical();
	    			});
	    		}
	    	},
	    }
	}
</script>