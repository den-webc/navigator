<template>
    <popup-modal ref="popup" :size="'xs'" @close="close">
        <div class="popup">
            <div class="popup__body">
                {{ message }}
                <p v-if="text && text !== null">
                    {{ text }}
                </p>
            </div>
            <div class="popup__footer">
                <a class="btn btn--default btn--sm btn--inline" @click="close">
                  <div class="btn--text"> {{ okButton }}</div>
                  <div class="btn--loader"></div>
                </a>
            </div>
        </div>
    </popup-modal>
</template>

<script>

import PopupModal from './PopupModal.vue'

export default {

    name: 'MessageDialogue',

    components: { PopupModal },

    data: () => ({
        message: null,
        text: null,
        okButton: null,
    }),

    methods: {
        close () {
            this.$refs.popup.close();
        },
        show(opts = {}) {
            this.message = opts.message;
            this.text = opts.text;
            this.okButton = opts.okButton;

            this.$refs.popup.open();
        },
    },
}
</script>

<style scoped>
    .popup__body {
        padding:  25px 25px;
        padding-top: 55px;
        color: var(--cozh-black);
        font-size: 20px;
        font-weight: 600;
        line-height: 1.3;
        word-wrap: break-word;
        text-align: center;
        padding-bottom: 0px;
    }
    .popup__footer {
        border-top: none;
    }
    .popup__body p {
        margin-bottom: 0px;
        font-size: 15px;
        font-weight: 400;
    }
</style>