<template>
    <transition name="fade">
        <div class="panel" v-if="isVisible">
            <div class="panel__backdrop" @click="this.$emit('close')"></div>
            <transition name="slide">
                <div class="panel__container" v-show="isVisibleContent">
                    <div class="panel__close" @click="this.$emit('close')">
                        <img src="../../assets/img/panel-elipse.svg">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.35" d="M1 1L11 11M11 1L1 11" stroke="#0B2836" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="panel__content">
                        <slot></slot>
                    </div>
                </div>
            </transition>
        </div>
   </transition>
</template>

<script>
export default {
    name: 'PanelModal',
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
            }, 300);
        },
        close() {
            document.querySelectorAll('body')[0].classList.remove('overflow');
            this.isVisibleContent = false;
            setTimeout(() => {
                this.isVisible = false;
            }, 300);
        },
    },
}
</script>


<style scoped>
    
    .slide-enter-active {
        transition: all 0.2s ease-in-out;
    }
    .slide-leave-active {
        transition: all 0.2s ease-in-out;
    }
    .slide-leave-to {
        transform: translateX(calc(100vw - 90px));
        /*opacity: 0;*/
    }
    .slide-enter-from {
        transform: translateX(calc(100vw - 90px));
        /*opacity: 0;*/
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






    .panel {
        position: fixed;
        top: 0;
        left: 0;
        height: 100dvh;
        width: 100dvw;

        z-index: 99;
        overflow: hidden;
    }

    .panel__backdrop {
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 2, .35);
        z-index: 1;
        position: absolute;
    }

    .panel__container {
        position: absolute;
        z-index: 2;
        top: 0px;
        right: 0px;

        width: calc(100% - 90px);
        height: 100%;

        border-radius: 0px;
        box-shadow: 0px 10px 30px rgba(11, 40, 54, 0.15);
        background: rgba(233, 241, 244, 1);

        border-left: 1px solid #d9e4eb;
        padding: 30px;
    }

    .panel__content {
        height: 100%;
        width: 100%;
        overflow-y: auto;
    }

    .panel__close {
        height: auto;
        width: auto;
        position: absolute;
        left: -30px;
        top: 58px;
        display: flex;
        cursor: pointer;
    }
    .panel__close svg {
        position: absolute;
        left: 15px;
        top: 27px;
    }
    .panel__close svg path {
        transition: all .2s ease-out;
    }
    .panel__close:hover svg path {
        opacity: 1;
    }

</style>