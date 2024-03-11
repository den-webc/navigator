<template>
  <div class="header">
    <BreadCrumbs :breadcrumbs="breadcrumbs"/>
    <UserState />
  </div>
</template>

<script setup>
  import BreadCrumbs from './BreadCrumbs.vue';
  import UserState from './UserState.vue';
</script>

<script>
  export default {
    name: 'TopMenu',
    props: ['breadcrumbs'],
    data: () => ({
    }),
    methods: {
    },
  }
</script>

<style scoped>
  .header {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }
</style>