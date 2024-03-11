<template>
  <div class="breadcrumbs">
    <div class="breadcrumbs__item" v-for="(item, index) in breadcrumbs" :key="index">
      <img class="breadcrumbs__ico" :src="'/img/' + item.ico" v-if="item.hasOwnProperty('ico')">
      <router-link class="breadcrumbs__link" :to="item.link" v-if="index != breadcrumbs.length - 1">
        <span> {{ item.name }} </span>
      </router-link>
      <span class="breadcrumbs__text" v-else>
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BreadCrumb',
    props: ['breadcrumbs'],
    data: () => ({
      bread: [],
    }),
    computed: {
      name () {
        return this.$route.meta.name;
      },
      ico () {
        return this.$route.meta.ico;
      },
    },
  }
</script>

<style scoped>
  .breadcrumbs {
    padding: 0px 20px;
    background-color: var(--cozh-white);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 60px;
    width: 100%;
    overflow: hidden;
  }
  .breadcrumbs__item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .breadcrumbs__item:first-child .breadcrumbs__link, .breadcrumbs__item:first-child .breadcrumbs__text {
    font-weight: 600;
    text-transform: uppercase;
  }
  .breadcrumbs__item:not(:last-child) {
    padding-right: 25px;
  }
  .breadcrumbs__item:not(:last-child)::before {
    content: url('@/assets/img/5.svg');
    position: absolute;
    right: 8px;
    top: calc(50% + 1px);
    transform: translateY(-50%);
  }
  .breadcrumbs__ico {
    margin-right: 10px;
  }
  .breadcrumbs__link {
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    color: var(--cozh-blue);
    border-bottom: 1px solid rgba(var(--cozh-blue-code), .35);
    white-space: nowrap;
  }
  .breadcrumbs__link:hover {
    border-color: transparent;
  }
  .breadcrumbs__text {
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
  }
</style>