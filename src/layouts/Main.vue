<template>
    <section class="template">
        <LeftMenu />
        <div class="page">
            <slot />
        </div>
    </section>
</template>

<script setup>
  import LeftMenu from '@/components/LeftMenu.vue'
</script>

<script>
    export default {
        name: "MainLayuot",
        created () {},
    }
</script>

<style scoped>

    .page {
        padding: 20px;
        width: calc(100% - 90px);
        margin-left: 90px;
        /*overflow-y: hidden;*/
    }

/*    @media (max-width: 767px) {
        .page {
            margin-left: 0px;
            padding: 10px;
            width: 100%;
        }
    }*/

</style>