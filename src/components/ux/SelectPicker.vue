<template>
	<div 
		class="custom-select" 
		:class="classObject" 
		@click="clickSelect($event)" 
		ref="select">
	    <span class="custom-select__label" v-if="displayLabel"> {{ label }} </span>
	    <span class="custom-select__text"> {{ displayName }} </span>
      <transition name="slide">
		    <a class="custom-select__clear" @click.stop="setValue(null)" v-if="isClear && modelValue !== null">
		    	<svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M7 1.5L1 7.5M1 1.5L7 7.5" stroke="#AEC1CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
		    </a>
			</transition>
      <transition name="slideY">
		    <div class="custom-select__content" v-if="isOpen" >
		    	<div class="custom-select__search" ref="search" v-show="list.length > 5">
		    		<input type="text" placeholder="Найти" v-model="search" tabindex="0" id="search">
		    	</div>
		      	<ul v-if="filteredList.length > 0" ref="content">
			        <li v-for="(item) in filteredList" :key="item.id"> 
			          	<a href="javascript:;" :class="{ 'active': item.id == modelValue }" @click="setValue(item.id)" v-html="item.name"></a>
			        </li>
		      	</ul>
		      	<div class="custom-select__empty" v-else>
		      		Совпадений не найдено
		      	</div>
		    </div>
			</transition>
  	</div>
</template>
<script>
	export default {
	    name: 'SelectPicker',
	    props: ['list', 'label', 'modelValue', 'size', 'isClear'],
	    data: () => ({
	    	search: null,
	    	isOpen: false,
	    	isTop: false,
	    }),

	    mounted () {
		    this.$nextTick(() => {
				  window.addEventListener('click', this.clickEvent);
		    })
	    },

	    unmounted () {
	    	window.removeEventListener('click', this.clickEvent);
			},

	    computed: {
	    	filteredList () {
	    		let list = [];
	    		if(this.search !== null && this.search !== '') {
	    			this.list.forEach((item) => {
	    				if(item.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0) {
	    					list.push(item);
	    				}
	    			});
	    		} else {
	    			list = this.list;
	    		}
	    		return list;
	    	},
	    	displayName () {
	    		if(this.modelValue !== null) {
		    		var index = this.list.findIndex((item) => {
				        return item.id == this.modelValue;
				    });
				    if(index !== - 1) {
			    		return this.list[index].name;
				    }
	    		}
	    		return null;
	    	},
	    	displayLabel () {
	    		if(typeof this.size === 'undefined' || (typeof this.size !== 'undefined' && this.modelValue == null)) {
	    			return true;
	    		} else {
	    			return false;
	    		}
	    	},
	    	classObject () {
	    		const classes = {
	    			'custom-select--open': this.isOpen, 
	    			'custom-select--top': this.isTop, 
	    		}
	    		if(this.size) {
	    			classes['custom-select--' + this.size] = true;
	    		}
	    		return classes;
	    	},
	    },

	    methods: {

	    	clickEvent (e) {
	    		// Только если открыт
			  	if(this.isOpen) {
			  		// Элемент на который нажали находится за пределами этого селекта
				  	if(!this.$refs.select.contains(e.target)) {
				  		// Закрываем этот селект
				  		this.isOpen = false;
				  	}
			  	}
	    	},

	    	calculateVertical () {
	    		const content = this.$refs.select.getElementsByClassName('custom-select__content')[0];
	    		const boundingContent = content.getBoundingClientRect();
	    		const boundingSelect = this.$refs.select.getBoundingClientRect();
	    		if ((boundingSelect.bottom + boundingContent.height) > window.innerHeight) {
	    			this.isTop = true;
	    		} else {
	    			this.isTop = false;
	    		}
	    	},

	    	// Клик на селект
	    	clickSelect (e) {
	    		// Клик на поле с поиском
	    		if (this.isOpen) {
	    			if(this.$refs.search.contains(e.target)) return;
	    		}
	    		// Открываем если закрыт и закрываем если открыт
	    		this.isOpen = !this.isOpen;
	    		// Селект открылся
	    		if (this.isOpen) {
	    			// Поле с поиском пустое
	    			this.search = null;
	    			// Ждём рендер
				    this.$nextTick(() => {
				    	// Вычисляем нижний он или верхний
	    				this.calculateVertical();
				    	// Поле с поиском появляется если элементов больше 5
				    	if(this.list.length > 5) {
				    		// Поле с поиском
				    		const input = this.$refs.search.querySelector('input');
				    		// Фокусируемся на поле
								input.focus()
		    			}
		    			// Плавно скролим к выбранному сейчас элементу
				    	const parent = this.$refs.content;
		    			const childs = this.$refs.content.getElementsByClassName("active");
		    			// Если есть выбранный элемент
		    			if(childs.length > 0) {
		    				const child = childs[0];
			    			parent.scrollTo({top: 0});
								const parentPos = parent.getBoundingClientRect();
								const childPos = child.getBoundingClientRect();
								const centerPosition = childPos.top - parentPos.top - (parentPos.height / 2) + (childPos.height / 2);
								this.$refs.content.scrollTo({top: centerPosition, behavior: "smooth" });
		    			}
				    })
	    		}
	    	},
	    	setValue (val) {
	    		// Можно Передавать null для очищения
	    		this.$emit('update:modelValue', val);
	    	},
	    },
    }
</script>

<style scoped>
	.custom-select {
	    background-color: rgba(240, 245, 248, 1);
	    border-radius: 8px;
	    position: relative;
	    height: 62px;
	    padding: 0px 20px;
	    padding-top: 20px;
	    padding-right: 60px;
	    box-sizing: border-box;
	    cursor: pointer;
	    transition: all .2s ease-out;
	    user-select: none;
	    border: 1px solid transparent;
	    text-align: left;
	    display: flex;
	    align-items: center;
	}
	.custom-select__text {
	    font-size: 18px;
	    color: var(--cozh-black);
	    text-overflow: ellipsis;
	    font-weight: 600;
	    overflow: hidden;
	    width: 100%;
	    white-space: nowrap;
	    display: block;
	    line-height: 1;
	}
	.custom-select__label {
	    position: absolute;
	    left: 20px;
	    top: 15px;
	    font-size: 11px;
	    font-weight: 600;
	    line-height: 1;
	    letter-spacing: 0.05em;
	    text-transform: uppercase;
	    color: rgba(var(--cozh-black-code), .35);
	    user-select: none;
	    pointer-events: none;
	}
	.custom-select__content {
	    position: absolute;
	    overflow: hidden;

	    width: max-content;
	    min-width: calc(100%);
	    max-width: 150%;

	    background-color: var(--cozh-white);
	    border-radius: 8px;
	    z-index: 6;

	    box-shadow: 0px 5px 20px 0px rgba(11, 40, 54, 0.18);

	    top: 68px;
	    left: 0px;
	}

	.custom-select__content ul {
	    list-style: none;
	    padding: 0px;
	    margin: 0px;

	    height: auto;
	    max-height: 250px;
	    overflow-y: auto;

	    padding-top: 8px;
	    padding-bottom: 8px;

	}
	.custom-select__content ul li {
	    margin-bottom: 0px;
	}
	.custom-select__content ul li a {
	    display: flex;
	    flex-direction: row;
	    padding: 8px 15px;
	    padding-left: 27px;
	    color: var(--cozh-black);
	    font-size: 13px;
	    line-height: 1.3;
	    font-weight: 500;
	    position: relative;
	}

	.custom-select__content ul li:not(:last-child) a {
	}
	.custom-select__content ul li a:hover {
	    background-color: rgba(var(--cozh-blue-code), .08);
	    border-color: transparent;
	}
	.custom-select__content ul li a::before {
		content: url('../../assets/img/check-blue.svg');
		position: absolute;
		left: 10px;
		top: 7px;
		display: none;
	}

	.custom-select__content ul li a.active {
	    background-color: rgba(var(--cozh-blue-code), .08);
	}
	.custom-select__content ul li a.active::before {
		display: block;
	}


	.custom-select:hover {
	    background-color: rgb(174 193 204 / 35%);
	}
	.custom-select::before {
	    content: '';
	    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI1IiB2aWV3Qm94PSIwIDAgOCA1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMSAxTDQgNEw3IDEiIHN0cm9rZT0iI0FFQzFDQyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==');
	    position: absolute;
	    background-repeat: no-repeat;
	    position: absolute;
	    top: 52%;
	    right: 26px;
	    width: 8px;
	    height: 6px;
	    transform: translateY(-50%);
	    transition: all .2s ease-out;
	    transform-origin: center;
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


	.custom-select__search {
		padding: 10px;
	    border-bottom: 1px solid var(--cozh-light-grey);
	    background-color: var(--cozh-white);
	    position: relative;
	    z-index: 2;
	}
	
	.custom-select__search::before {
		content: url('../../assets/img/search-black.svg');
		position: absolute;
		right: 20px;
	    top: calc(50% + 2px);
	    transform: translateY(-50%);
	    display: flex;
	    height: auto;
	    width: auto;
	    user-select: none;
	    pointer-events: none;
	}
	.custom-select__search input {
		background: rgba(233, 241, 244, 1);
		border: 1px solid transparent;
		border-radius: 4px;
		height: 32px;
		width: 100%;

		padding: 0px 12px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;

		font-size: 12px;
		font-weight: 400;
	    padding-right: 35px;
	    transition: all .2s ease-out;
	}
	.custom-select__search input:hover {
		background-color: rgb(174 193 204 / 35%);
	}
	.custom-select__search input:focus {
		border-color: var(--cozh-grey);
	}
	.custom-select__search input::placeholder {
		color: var(--cozh-grey);
	}
	.custom-select__empty {
		padding: 10px;
		font-size: 12px;
		font-weight: 500;
	}




	.custom-select--xs {
		height: 27px;
    	padding: 0px 10px;
    	padding-right: 25px;
    	border-radius: 4px;
    	background-color: #E9F1F4;
	}
	.custom-select--xs .custom-select__text {
		font-size: 12px;
	}
	.custom-select--xs::before {
		right: 9px;
	}
	.custom-select--xs .custom-select__label {
		color: var(--cozh-grey);
	    font-size: 12px;
	    text-transform: none;
	    top: 50%;
	    transform: translateY(-50%);
	    left: 10px;
	    text-overflow: ellipsis;
	    overflow: hidden;
	    white-space: nowrap;
	    line-height: 1;
	    width: calc(100% - 35px);
	    font-weight: 500;
	    letter-spacing: normal;
	}
	.custom-select--xs .custom-select__content {
		top: 30px;
	}
	.custom-select--xs .custom-select__text {
		font-weight: 500;
	}




	.custom-select--sm {
		height: 40px;
    	padding: 0px 15px;
    	padding-right: 35px;
    	border-radius: 4px;
    	background-color: transparent;
    	border: 1px solid var(--cozh-light-grey);
	}
	.custom-select--sm .custom-select__text {
		font-size: 12px;
	}
	.custom-select--sm::before {
		right: 15px;
	}
	.custom-select--sm .custom-select__label {
		color: var(--cozh-grey);
	    text-transform: none;
	    top: 50%;
	    transform: translateY(-50%);
	    left: 15px;
	    text-overflow: ellipsis;
	    overflow: hidden;
	    white-space: nowrap;
	    line-height: 1;
	    width: calc(100% - 45px);

		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0em;
	}
	.custom-select--sm .custom-select__content {
		top: 42px;
	}
	.custom-select--sm .custom-select__text {
		font-weight: 500;
	}
	.custom-select--sm:hover {
    	background-color: transparent;
    	border-color: var(--cozh-grey);
	}









	.custom-select--open {
	    border-color: var(--cozh-grey);
	}
	.custom-select--open::before {
	    transform: translateY(-50%) rotate(180deg);
	}




	.custom-select--top.custom-select--xs .custom-select__content {
		top: auto;
    bottom: 30px;
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




</style>