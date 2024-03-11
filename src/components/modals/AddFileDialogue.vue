<template>
    <popup-modal ref="popup" :size="'md'" @close="close">
        <div class="popup">
            <div class="popup__header">
                Добавить документ
            </div>
            <div class="popup__body">
                <div class="field">
                    <div class="row">
                        <div class="col-xs-12 col-sm-5 col-md-5">
                            <div class="label"> Наименование документа </div>
                        </div>
                        <div class="col-xs-12 col-sm-7 col-md-7">
                            <div class="form-control form-control--md">
                                <input type="text" autocomplete="off" v-model="title" placeholder="Наименование">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <div class="row">
                        <div class="col-xs-12 col-sm-5 col-md-5">
                            <div class="label"> Файл </div>
                        </div>
                        <div class="col-xs-12 col-sm-7 col-md-7">
                            <FilePicker v-model="file" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="popup__footer">
                <a class="btn btn--default btn--sm btn--inline me-1" @click="saveFile($event)" :class="{'disabled': isDisabledSave}">
                  <div class="btn--text"> Сохранить </div>
                  <div class="btn--loader"></div>
                </a>
                <a class="btn btn--outline btn--sm btn--inline" @click="close">
                  <div class="btn--text"> Отменить </div>
                  <div class="btn--loader"></div>
                </a>
            </div>
        </div>
    </popup-modal>
</template>

<script>

    import FilePicker from '@/components/ux/FilePicker.vue'
    import PopupModal from './PopupModal.vue'

    export default {
        name: 'MessageDialogue',
        components: { PopupModal, FilePicker },
        data: () => ({
            title: null,
            file: null,
            houseId: null,
            companyId: null,
        }),
        computed: {
            isDisabledSave () {
                if(this.title == null || this.title.trim() == '' || this.file == null) {
                    return true;
                } else {
                    return false;
                }
            },
        },
        methods: {
            close () {
                this.$refs.popup.close();
            },
            show(opts = {}) {

                this.houseId = opts.houseId;
                this.companyId = opts.companyId;

                this.title = null;
                this.file = null;

                this.$refs.popup.open();
            },
            async saveFile(e) {
                const btn = e.currentTarget;
                btn.classList.add('btn--load');
                const base64 = await this.$helpers.toBase64(this.file);
                const data = {
                    companyId: this.companyId,
                    houseId: this.houseId,
                    documents: [
                        {
                          title: this.title,
                          data: base64,
                          ext: this.file.type
                        }
                    ]
                }
                try {
                    const r = await this.axios.post(this.$store.state.api_endpoint + '/document', data);
                    this.$emit('uploaded', r.data.documents[0]);
                    this.close();
                } catch (e) {
                    console.log(e);
                }
                btn.classList.remove('btn--load');
            },
        },
    }
</script>

<style scoped>
    .popup__header {
        font-size: 20px;
        padding: 20px 25px;
    }
    .popup__body {
        padding: 20px 30px;
    }
    .popup__footer {
        padding: 25px;
    }

    .label {
        margin-top: 10px;
    }
    .field {
        margin-bottom: 10px;
        font-size: 13px;
        font-weight: 500;
    }

</style>