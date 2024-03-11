<template>
    <transition name="fade">
        <div class="modal" v-if="isVisible" :class="sizeClass">
            <div class="modal__backdrop" @click="this.$emit('close')"></div>
            <transition name="slide">
                <div class="modal__container" v-show="isVisibleContent">
                    <a class="modal__close" @click="this.$emit('close')">
                        <span> Закрыть </span>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13 1.5L1 13.5M1 1.5L13 13.5" stroke="#AEC1CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                    <slot></slot>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'PopupModal',
    props: ['size'],
    data: () => ({
        isVisible: false,
        isVisibleContent: false,
    }),
    methods: {
        open() {
            document.querySelectorAll('body')[0].classList.add('overflow');
            this.isVisible = true;
            setTimeout(() => {
                this.isVisibleContent = true;
            }, 200);
        },
        close() {
            document.querySelectorAll('body')[0].classList.remove('overflow');
            this.isVisibleContent = false;
            setTimeout(() => {
                this.isVisible = false;
            }, 200);
        },
    },
    computed: {
        sizeClass () {
            return this.size ? 'modal--' + this.size : '';
        },
    }
}
</script>


<style scoped>
    

    
    .slide-enter-active {
      transition: all 0.1s ease-out;
    }
    .slide-leave-active {
      transition: all 0.1s ease-out;
    }
    .slide-leave-to {
      transform: translateY(20px);
      opacity: 0;
    }
    .slide-enter-from {
      transform: translateY(-20px);
      opacity: 0;
    }

    .fade-enter-active {
      transition: all 0.2s ease-out;
    }
    .fade-leave-active {
      transition: all 0.2s ease-out;
    }
    .fade-leave-to {
      opacity: 0;
    }
    .fade-enter-from {
      opacity: 0;
    }




    .modal {
        position: fixed;
        top: 0;
        left: 0;
        height: 100dvh;
        width: 100dvw;
        z-index: 999999;
        overflow: hidden;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal__backdrop {
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 2, .35);
        z-index: 1;
        position: absolute;
    }

    .modal__container {

        position: relative;
        z-index: 2;
        height: auto;

        min-width: 300px;
        width: calc(100% - 40px);


        border-radius: 8px;
        box-shadow: 0px 10px 30px rgba(11, 40, 54, 0.15);
        background: var(--cozh-white);
    }

    .modal__close {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: absolute;
        right: 0px;
        top: 0px;
        padding: 20px;
        z-index: 1;
    }
    .modal__close span {
        margin-top: 2px;
        margin-right: 7px;
        font-size: 11px;
        font-weight: 600;
        line-height: 1;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        transition: all .2s ease-out;
    }
    .modal__close svg path {
        transition: all .2s ease-out;
    }
    .modal__close:hover span {
    }
    .modal__close:hover svg path {
        stroke: var(--cozh-black);
    }

    .modal--lg .modal__container{
        max-width: 995px;
    }
    .modal--xmd .modal__container {
        max-width: 850px;
    }
    .modal--md .modal__container {
        max-width: 670px;
    }
    .modal--xs .modal__container {
        max-width: 320px;
    }
</style>