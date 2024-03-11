<template>
	<div class="hidden-text" :class="{'open': isOpen}">
        <div class="hidden-text__content">
            {{ currentValue }}
        </div>
        <a class="hidden-text__button" v-if="isHidden" @click.stop="toggle">
            <span v-if="!isOpen"> Развернуть </span>
            <span v-if="isOpen"> Свернуть </span>
        </a>
	</div>
</template>

<script>

export default {

    name: 'HiddenText',
    
    props: ['text', 'limited'],

	data: () => ({
        isHidden: false,
        isOpen: false,
    }),
    
    created () {
        this.isHidden = this.text.length > this.limited ? true : false;
    },

    computed: {
        currentValue () {
            if (this.isHidden) {
                return this.isOpen ? this.text : this.text.substring(-1, this.limited) + '...';
            } else {
                return this.text;
            }
        },
    },
    methods: {
        toggle () {
            this.isOpen = !this.isOpen;
        }
    },
}

</script>

<style scoped>
    
    .hidden-text__button {
        display: flex;
        padding-top: 15px;
    }
    .hidden-text__button span {
        font-size: 11px;
        line-height: 1;
        letter-spacing: 0.05em;
        color: var(--cozh-blue);
        text-transform: uppercase;
        border-bottom: 1px dashed rgba(var(--cozh-blue-code), .35);
        position: relative;
        font-weight: 600;
        transition: all .2s ease-out;
    }
    .hidden-text__button span::before {
        content: url('../../assets/img/collapse-blue-ico-smal.svg');
        position: absolute;
        right: -13px;
        top: 50%;
        transform: translateY(-65%);
        /*transform-origin: center;*/
        transition: all .2s ease-out;
    }

    .hidden-text.open .hidden-text__button span::before {
        transform: translateY(-45%) rotate(180deg);
    }

    .hidden-text__button:hover span {
        border-color: transparent;
    }

</style>
