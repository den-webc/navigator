<template>
	<div class="checkboxes">
		<div class="checkboxes__label">
			{{ label }}
		</div>
		<div class="checkboxes__container">

			<div class="switcher" v-for="(item) in list" :key="item.id" :class="{'disabled' : isDisabled(item) }">
				<input :id="item.id" type="checkbox" v-model="picked" :value="item.id">
				<label :for="item.id"> {{ item.name }} </label>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
	    name: 'CheckboxesPicker',
	    props: ['list', 'label', 'modelValue', 'max'],
	    data: () => ({
	    	picked: [],
	    }),
	    watch: {
	    	picked (val) {
	    		this.$emit('update:modelValue', val);
	    	},
	    	modelValue (val) {
	    		this.picked = val;
	    	},
	    },
	    created () {
	    	this.picked = this.modelValue;
	    },
	    computed: {
	    	isDisabled () {
	    		return (item) => {
	    			if(this.max && this.modelValue.length >= this.max) {
	    				const idx = this.modelValue.findIndex((elem) => { return elem == item.id });

	    				return (idx === -1) ? true : false;
	    			}
	    		};
	    	},

	    	displayName () {
	    		if(this.modelValue !== null) {
		    		var index = this.list.findIndex((item) => {
				        return item.id == this.modelValue;
				    });
			    	return this.list[index].name;
	    		} else {
	    			return null;
	    		}
	    	},
	    },
	    methods: {
	    	// setValue (val) {
	    	// 	// Можно Передавать null для очищения
	    	// 	this.$emit('update:modelValue', val);
	    	// },
	    },
    }
</script>

<style scoped>
	.checkboxes {
		padding: 20px 20px 12px 20px;
    	border: 1px solid var(--cozh-light-grey);
    	border-radius: 8px;
	}
	.checkboxes__label {
	    font-size: 11px;
	    font-weight: 600;
	    line-height: 1;
	    letter-spacing: 0.05em;
	    text-transform: uppercase;
	    color: rgba(var(--cozh-black-code), .35);
	    -webkit-user-select: none;
	    -moz-user-select: none;
	    user-select: none;
	    pointer-events: none;
	}
	.checkboxes__container {
		/*display: flex;*/
		/*flex-direction: column;*/
		margin-top: 10px;
	}
</style>