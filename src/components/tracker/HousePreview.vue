<template>
  <div class="component-card">
    <div class="component-card__left">
      <div class="component-card__image" :style="{backgroundImage:'url(' + mkdImage + ')'}"></div>
    </div>
    <div class="component-card__right">
      <div class="component-card__top">
        <div class="component-card__name"> {{ house.address }} </div>
        <router-link class="component-card__link link-default" :to="{name: 'PageTrackerHouse', params: {organization_id: company.id, house_id: house.id }}">
          <span>Подробнее</span>
          <img class="btn--ico btn--ico--right" src="@/assets/img/mark-right-blue.svg">
        </router-link>
      </div>
      <div class="component-card__bottom">
        <div class="component-card__item">
          <div class="component-card__label"> Всего заданий </div>
          <div class="component-card__text"> {{ countAllTasks }} </div>
        </div>
        <div class="component-card__item">
          <div class="component-card__label"> Назначено </div>
          <div class="component-card__text"> {{ house.counter.assigned }} </div>
        </div>
        <div class="component-card__item">
          <div class="component-card__label"> Сделано </div>
          <div class="component-card__text"> {{ house.counter.done }} </div>
        </div>
        <div class="component-card__item">
          <div class="component-card__label"> Есть проблемы </div>
          <div class="component-card__text"> {{ house.counter.issue }} </div>
        </div>
        <div class="component-card__item">
          <div class="component-card__label"> Не сделано </div>
          <div class="component-card__text"> {{ house.counter.failed}} </div>
        </div>
        <div class="component-card__item">
          <div class="component-card__label"> Просрочено </div>
          <div class="component-card__text"> {{ house.counter.expired }} </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'HousePreview',
    props: ['house', 'company'],
    computed: {
      mkdImage () {
        return this.house.imageLink && this.house.imageLink !== null && this.house.imageLink.length > 0 ? this.house.imageLink[0] : '/img/plug.png';
      },
      countAllTasks () {
        let summ = 0;
        for (let key in this.house.counter) {
          summ += this.house.counter[key];
        }
        return summ;
      },
    },
  }
</script>

<style scoped>

  .component-card {
    background-color: var(--cozh-white);
    border-radius: 8px;
    padding: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  .component-card:not(:last-child) {
    margin-bottom: 5px;
  }

  .component-card__left {
    margin-right: 30px;

  }

  .component-card__right {
    width: 100%;
  }



  .component-card__image {
    width: 240px;
    aspect-ratio: 3/2;

    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #E9F1F4;


    border-radius: 8px;
  }

  .component-card__name {
    font-size: 20px;
    font-weight: 500;
  }

  .component-card__link {
    margin-top: 5px;
    text-transform: uppercase;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: .05em;
  }

  .component-card__top {
    margin-bottom: 20px;
  }

  .component-card__bottom {
    border-top: 1px solid var(--cozh-light-grey);
    padding-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }




  .component-card__item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: fit-content;
    flex-basis: 120px;
    position: relative;
  }

  .component-card__label {
    font-size: 11px;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: 0.05em;
    margin-bottom: 2px;
    color: var(--cozh-dark-grey);
    text-transform: uppercase;
    white-space: nowrap;
  }

  .component-card__text {
    font-size: 15px;
    font-weight: 500;
    line-height: 1.2;
  }

  .component-card__item:not(:last-child) {
    margin-right: 25px;
  }

  .component-card__item:first-child {
    margin-right: 50px;
    flex-basis: auto;
  }
  .component-card__item:first-child::before {
    content: '';
    height: 100%;
    width: 1px;
    background-color: var(--cozh-light-grey);
    position: absolute;
    top: 0px;
    right: -25px;
  }

</style>