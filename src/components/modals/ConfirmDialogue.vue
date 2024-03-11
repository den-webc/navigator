<template>
    <popup-modal ref="popup" :size="'xs'" @close="close">
        <div class="popup">
            <div class="popup__body">
                {{ message }}
            </div>
            <div class="popup__footer">
                <a class="btn btn--default btn--sm btn--inline me-1" @click="_confirm">
                  <div class="btn--text"> {{ okButton }}</div>
                  <div class="btn--loader"></div>
                </a>
                <a class="btn btn--outline btn--sm btn--inline" @click="_cancel">
                  <div class="btn--text"> {{ cancelButton }}</div>
                  <div class="btn--loader"></div>
                </a>
            </div>
        </div>
    </popup-modal>

</template>

<script>

import PopupModal from './PopupModal.vue'

export default {

    name: 'ConfirmDialogue',

    components: { PopupModal },

    data: () => ({
        message: null,
        okButton: null,
        cancelButton: 'Отменить',
        
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
    }),

    methods: {
        
        close () {
            this._cancel();
        },

        show(opts = {}) {
            
            this.message = opts.message;
            this.okButton = opts.okButton;

            if (opts.cancelButton) {
                this.cancelButton = opts.cancelButton
            }
            
            this.$refs.popup.open();

            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve
                this.rejectPromise = reject
            })
        },

        _confirm() {
            this.$refs.popup.close()
            this.resolvePromise(true)
        },

        _cancel() {
            this.$refs.popup.close()
            this.resolvePromise(false)
        },
    },
}
</script>

<style scoped>
    .popup__body {
        padding:  25px 25px;
        padding-top: 55px;
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
</style>