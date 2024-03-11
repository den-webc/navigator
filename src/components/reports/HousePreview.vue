<template>
  <div class="c-card">
    <div class="c-card__left">
      <div class="c-card__image" :style="{backgroundImage:'url(' + house.imgLink + ')'}"></div>
    </div>
    <div class="c-card__right">
      <div class="c-card__top">
        <div class="c-card__group">
          <div class="c-card__name"> {{ house.address }} </div>
          <router-link class="c-card__link link-default" :to="{name: 'PageReportEmployeessHouse', params: {house_id: house.id}}">
            <span>Перейти к отчётам</span>
            <img class="btn--ico btn--ico--right" src="@/assets/img/mark-right-blue.svg">
          </router-link>
        </div>
        <div class="c-card__hint">
          {{ hint }}
        </div>
      </div>
      <div class="c-card__bottom">

        <div class="c-card__item">
          <div class="c-card__data">
            <div class="c-card__number"> {{ house.total }} </div>
            <div class="c-card__percent"> {{ house.totalP }}% </div>
          </div>
          <div class="c-card__label"> Всего заданий </div>
        </div>

        <div class="c-card__item c-card__item--blue">
          <div class="c-card__data">
            <div class="c-card__number"> {{ house.done }} </div>
            <div class="c-card__percent"> {{ house.doneP }}% </div>
          </div>
          <div class="c-card__label"> Выполнено </div>
        </div>

        <div class="c-card__item c-card__item--red">
          <div class="c-card__data">
            <div class="c-card__number"> {{ house.failed }} </div>
            <div class="c-card__percent"> {{ house.failedP }}% </div>
          </div>
          <div class="c-card__label"> Не сделано </div>
        </div>
      
        <div class="c-card__item c-card__item--darkred">
          <div class="c-card__data">
            <div class="c-card__number"> {{ house.expired }} </div>
            <div class="c-card__percent"> {{ house.expiredP }}% </div>
          </div>
          <div class="c-card__label"> Просрочено </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'HouseTrackerPreview',
    props: ['house', 'company', 'hint'],
    computed: {
    },
  }
</script>

<style scoped>
  .c-card {
    background-color: var(--cozh-white);
    border-radius: 8px;
    padding: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .c-card:not(:last-child) {
    margin-bottom: 10px;
  }
  .c-card__left {
    margin-right: 30px;
  }
  .c-card__right {
    width: 100%;
  }

  .c-card__image {
    width: 240px;
    aspect-ratio: 3/2;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #E9F1F4;
    border-radius: 8px;
  }
  .c-card__name {
    font-size: 20px;
    font-weight: 500;
  }
  .c-card__link {
    font-size: 14px;
    font-weight: 500;
    margin-left: 25px;
  }
  .c-card__top {
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .c-card__bottom {
    border-top: 1px solid var(--cozh-light-grey);
    padding-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  .c-card__item {
    width: 100%;
  }

  .c-card__label {
    font-size: 12px;
    font-weight: 500;
    margin-top: 6px;
  }

  .c-card__number {
    font-size: 24px;
    font-weight: 600;
    line-height: 1;
  }

  .c-card__percent {
    font-size: 10px;
    font-weight: 700;
    margin-left: 5px;
  }

  .c-card__data {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .c-card__item--blue .c-card__data {
    color: var(--cozh-blue);
  }

  .c-card__item--red .c-card__data {
    color: var(--cozh-red);
  }

  .c-card__item--darkred .c-card__data {
    color: var(--cozh-dark-red);
  }

  .c-card__group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  .c-card__hint {
    color: var(--cozh-grey);
    font-size: 11px;
    font-weight: 600;
  }

</style>