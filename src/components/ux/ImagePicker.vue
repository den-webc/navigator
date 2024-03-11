<template>
    <div class="choose-file" :class="{'choosen' : modelValue !== null}">
        <input type="file" :id="uniq" @change="onFileChanged($event)" accept="image/png, image/gif, image/jpeg">
        <label class="choose-file__label" :for=" (modelValue == null && !viewMode) ? uniq : ''" :style="{ backgroundImage: modelValue !== null ? 'url(' + modelValue + ')' : '' }">
            <transition name="slide-fade">
                <!-- Плюсик и текст пока не выбрано фото -->
                <div class="choose-file__help" v-if="modelValue == null && !viewMode">
                    <div class="choose-file__ico">
                        <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 1.5V9.5M1 5.5H9" stroke="#AAB4B9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="choose-file__text">
                        <span> Добавить фото </span>
                    </div>
                </div>
            </transition>
            <transition name="slide-fade">
                <!--  Элементы управления при выбранном фото -->
                <div class="choose-file__control" v-if="modelValue !== null && !viewMode">
                    <label class="choose-file__btn" :for="uniq">
                        <IconEdit />
                    </label>
                    <a class="choose-file__btn" @click.prevent="clear">
                        <IconCross />
                    </a>
                </div>
            </transition>
        </label>
    </div>
</template>

<script setup>
    import IconEdit from '../icons/IconEdit.vue'
    import IconCross from '../icons/IconCross-b2.w14.h14.vue'
</script>

<script>
    export default {
        name: 'ImagePicker',
        props: ['modelValue', 'viewMode'],
        data: () => ({
            uniq: null,
        }),
        created () {
            this.uniq = "id" + Math.random().toString(16).slice(2);
        },
        methods: {
            clear () {
                this.$emit('update:modelValue', null);
            },
            async onFileChanged (e) {
                const input = e.currentTarget;
                if(input.files.length > 0) {
                    Array.from(input.files).forEach(async file => {
                        let base64 = await this.$helpers.toBase64(file);
                        this.$emit('update:modelValue', base64);
                    });
                }
            },
        },
    }
</script>

<style scoped>

    .choose-file {
        /*height: 100%;*/
        /*aspect-ratio: 1 / 1;*/
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }
    .choose-file input {
       opacity: 0;
       position: absolute;
       z-index: -1;
    }

    .choose-file__label {
        /*height: 100%;*/
        aspect-ratio: 1/1;
        width: 100%;
        border: 1px dashed var(--cozh-light-grey);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        transition: border .2s ease-out;
        cursor: pointer;
        min-height: 140px;
        overflow: hidden;
        position: relative;

        background-color: transparent;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

/*    .choose-file__label::before {
        content: '';
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        background-color: transparent;
        transition: all .2s ease-out;
        background: rgba(var(--cozh-black-code),.1);
        opacity: 0;
        visibility: hidden;
        transition: all .2s ease-out;
        z-index: 1;
    }*/

    .choose-file__label:hover {
        border-color: var(--cozh-grey);
    }

    .choose-file__ico {
        width: 36px;
        height: 36px;
        border: 1px solid rgba(var(--cozh-grey-code), .25);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all .2s ease-out;
        z-index: 2;
    }

    .choose-file__text {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.07em;
        color: var(--cozh-grey);
        text-transform: uppercase;
        margin-top: 10px;
        transition: all .2s ease-out;
        z-index: 2;
    }
    .choose-file__help {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .choose-file__control {
        background: rgba(var(--cozh-black-code), .25); 
        border-radius: 8px; 
        backdrop-filter: blur(18px);
        height: 44px;
        width: 88px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        
        position: absolute;
        right: 15px;
        top: 15px;
        z-index: 2;
    }
    .choose-file__btn {
        height: 100%;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .choose-file__control .choose-file__btn:first-child {
        padding-left: 10px;
    }
    .choose-file__control .choose-file__btn:last-child {
        padding-right: 10px;
    }
    .choose-file__btn:deep(svg path) {
        transition: all .2s ease-out;
        stroke: rgba(var(--cozh-white-code), .6);
    }
    .choose-file__btn:hover:deep(svg path) {
        stroke: rgba(var(--cozh-white-code), 1);
    }

    .choose-file.choosen .choose-file__label {
        border: none;
        cursor: unset;
    }
    .choose-file.choosen .choose-file__label::before {
        opacity: 1;
        visibility: visible;
    }

     @media (max-width: 767px) {
        .choose-file {
            aspect-ratio: 9/6;
        }
    }
</style>