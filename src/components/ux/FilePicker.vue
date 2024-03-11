<template>
	<div class="choose-file">
        <input type="file" :id="uniq" @change="onFileChanged($event)" ref="input" :accept="accept">
        <label class="btn btn--outline-action btn--medium" :for="uniq" v-if="modelValue == null">
	       <img class="btn__ico btn--ico--left" src="@/assets/img/plus-grey.svg">
	       <div class="btn--text"> Прикрепить файл </div>
	    </label>
	    <div class="file" v-else>
	    	<img class="file__ico" src="@/assets/img/file-blue.svg">
            <div class="file__content">
                <div class="file__info">
                    <div class="file__name"> {{ modelValue.name }} </div>
                    <div class="file__hint"> {{ modelValue.type }} </div>
                </div>
                <div class="file__control">
                    <label class="file__link" :for="uniq">
                        <span> Изменить </span>
                    </label>
                    <a class="file__link" @click="clear">
                        <span> Удалить </span>
                    </a>
                </div>
            </div>
	    </div>
	</div>
</template>

<script>
    export default {
        name: 'FilePicker',
        props: ['modelValue'],
        data: () => ({
            uniq: null,
            accept: '.doc,.docx,.xls,.xlsx,.odt,.ods,.pdf,.rtf,.png,.jpg,.jpeg,.zip,.gif,.dwg,.dfx,.dxf,.txt',
        }),
        created () {
            this.uniq = "id" + Math.random().toString(16).slice(2);
        },
        methods: {
            clear () {
                this.$emit('update:modelValue', null);
                this.$refs.input.value = null;
            },
            async onFileChanged (e) {
                if (e.currentTarget.files.length !== 0) {
                    const file = e.currentTarget.files[0];
                    this.$emit('update:modelValue', file);
                }
            },
        },
    }
</script>