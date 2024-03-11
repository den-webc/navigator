<template>

    <div>

      <div class="mobile-header">
          <div class="mobile-header__humburger" @click="isOpenMenu = !isOpenMenu">
            <img src="../assets/img/hamburger.svg">
            <span> Меню </span>
          </div>
          <div class="mobile-header__logo">
            <img src="../assets/img/logo-mobile.svg">
          </div>
      </div>

      <div class="menu" :class="{'open' : isOpenMenu}">

        <router-link to="/" class="logo">
          <img src="../assets/img/logo-min.svg" class="logo--1">
          <img src="../assets/img/logo-max.svg" class="logo--2">
        </router-link>

        <div class="nav">
          <router-link :to="{name: 'PageOrganizations'}" class="nav__item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1 4C1 2.34315 2.34315 1 4 1H6C7.65685 1 9 2.34315 9 4V6C9 7.65685 7.65685 9 6 9H4C2.34315 9 1 7.65685 1 6V4ZM4 3C3.44772 3 3 3.44772 3 4V6C3 6.55228 3.44772 7 4 7H6C6.55228 7 7 6.55228 7 6V4C7 3.44772 6.55228 3 6 3H4Z" fill="#AEC1CC"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1 14C1 12.3431 2.34315 11 4 11H6C7.65685 11 9 12.3431 9 14V16C9 17.6569 7.65685 19 6 19H4C2.34315 19 1 17.6569 1 16V14ZM4 13C3.44772 13 3 13.4477 3 14V16C3 16.5523 3.44772 17 4 17H6C6.55228 17 7 16.5523 7 16V14C7 13.4477 6.55228 13 6 13H4Z" fill="#AEC1CC"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 4C11 2.34315 12.3431 1 14 1H16C17.6569 1 19 2.34315 19 4V6C19 7.65685 17.6569 9 16 9H14C12.3431 9 11 7.65685 11 6V4ZM14 3C13.4477 3 13 3.44772 13 4V6C13 6.55228 13.4477 7 14 7H16C16.5523 7 17 6.55228 17 6V4C17 3.44772 16.5523 3 16 3H14Z" fill="#AEC1CC"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 11C15.5523 11 16 11.4477 16 12V14H18C18.5523 14 19 14.4477 19 15C19 15.5523 18.5523 16 18 16H16V18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18V16H12C11.4477 16 11 15.5523 11 15C11 14.4477 11.4477 14 12 14H14V12C14 11.4477 14.4477 11 15 11Z" fill="#AEC1CC"/>
            </svg>
            <div class="nav__name">Управляющие организации</div>
          </router-link>
          <router-link to="/houses" class="nav__item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 3C3 1.34315 4.34315 0 6 0H14C15.6569 0 17 1.34315 17 3V19C17 19.5523 16.5523 20 16 20H4C3.44772 20 3 19.5523 3 19V3ZM6 2C5.44772 2 5 2.44772 5 3V18H15V3C15 2.44772 14.5523 2 14 2H6Z" fill="#AEC1CC"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1 19C1 18.4477 1.44772 18 2 18H4C4.55228 18 5 18.4477 5 19C5 19.5523 4.55228 20 4 20H2C1.44772 20 1 19.5523 1 19ZM15 19C15 18.4477 15.4477 18 16 18H18C18.5523 18 19 18.4477 19 19C19 19.5523 18.5523 20 18 20H16C15.4477 20 15 19.5523 15 19Z" fill="#AEC1CC"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 13C3 12.4477 3.44772 12 4 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H4C3.44772 14 3 13.5523 3 13Z" fill="#AEC1CC"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 4.44772 7.44772 4 8 4H12C12.5523 4 13 4.44772 13 5C13 5.55228 12.5523 6 12 6H8C7.44772 6 7 5.55228 7 5ZM7 9C7 8.44772 7.44772 8 8 8H12C12.5523 8 13 8.44772 13 9C13 9.55228 12.5523 10 12 10H8C7.44772 10 7 9.55228 7 9Z" fill="#AEC1CC"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 12C8.55228 12 9 12.4477 9 13V19C9 19.5523 8.55228 20 8 20C7.44772 20 7 19.5523 7 19V13C7 12.4477 7.44772 12 8 12Z" fill="#AEC1CC"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 12C12.5523 12 13 12.4477 13 13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13C11 12.4477 11.4477 12 12 12Z" fill="#AEC1CC"/>
            </svg>
            <div class="nav__name">Дома</div>
          </router-link>
          <router-link to="/employees" class="nav__item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0025 3C8.34565 3 7.0025 4.34315 7.0025 6C7.0025 7.65685 8.34565 9 10.0025 9C11.6594 9 13.0025 7.65685 13.0025 6C13.0025 4.34315 11.6594 3 10.0025 3ZM5.0025 6C5.0025 3.23858 7.24108 1 10.0025 1C12.7639 1 15.0025 3.23858 15.0025 6C15.0025 8.76142 12.7639 11 10.0025 11C7.24108 11 5.0025 8.76142 5.0025 6Z" fill="#AEC1CC"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.59532 11.0045C9.74489 11.0068 9.88144 11.0089 10.0025 11.0089C10.1235 11.0089 10.2601 11.0068 10.4096 11.0045C11.3775 10.9897 12.8905 10.9666 14.2738 11.447C15.1027 11.7349 15.9234 12.211 16.5954 12.991C17.268 13.7718 17.7439 14.802 17.9686 16.1228C18.2583 17.8262 16.7666 19 15.3374 19H4.66751C3.23835 19 1.74669 17.8262 2.0364 16.1228C2.26103 14.802 2.73696 13.7718 3.40957 12.991C4.08153 12.211 4.90226 11.7349 5.73113 11.447C7.11448 10.9666 8.62749 10.9897 9.59532 11.0045ZM4.92486 14.2964C4.52731 14.7579 4.1821 15.4349 4.00809 16.4581C3.98867 16.5723 4.01969 16.6833 4.12659 16.791C4.24213 16.9074 4.4355 17 4.66751 17H15.3374C15.5694 17 15.7628 16.9074 15.8784 16.791C15.9853 16.6833 16.0163 16.5723 15.9969 16.4581C15.8229 15.4349 15.4776 14.7579 15.0801 14.2964C14.6819 13.8341 14.1835 13.5328 13.6176 13.3363C12.5975 12.982 11.4827 12.9943 10.4921 13.0052C10.325 13.0071 10.1615 13.0089 10.0025 13.0089C9.8435 13.0089 9.67994 13.0071 9.51285 13.0052C8.52227 12.9943 7.40746 12.982 6.3873 13.3363C5.82149 13.5328 5.32305 13.8341 4.92486 14.2964Z" fill="#AEC1CC"/>
            </svg>
            <div class="nav__name">Сотрудники</div>
          </router-link>
          <router-link :to="{name: 'PageReports'}" class="nav__item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3V1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10H17C17 13.866 13.866 17 10 17Z" fill="#AEC1CC"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4852 6.99839C17.9681 6.73042 18.1424 6.12171 17.8744 5.63879C17.0561 4.16404 15.836 2.94394 14.3612 2.1256C13.8783 1.85763 13.2696 2.03188 13.0016 2.5148C12.7336 2.99771 12.9079 3.60643 13.3908 3.8744C14.5384 4.51119 15.4888 5.46161 16.1256 6.6092C16.3936 7.09212 17.0023 7.26637 17.4852 6.99839Z" fill="#AEC1CC"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C10.5523 1 11 1.44772 11 2V9H18C18.5523 9 19 9.44772 19 10C19 10.5523 18.5523 11 18 11H12.135L15.7682 15.3598C16.1218 15.7841 16.0645 16.4147 15.6402 16.7682C15.2159 17.1218 14.5853 17.0645 14.2318 16.6402L9.9328 11.4814L5.20711 16.2071C4.81658 16.5976 4.18342 16.5976 3.79289 16.2071C3.40237 15.8166 3.40237 15.1834 3.79289 14.7929L9 9.58579V2C9 1.44772 9.44772 1 10 1Z" fill="#AEC1CC"/>
            </svg>
            <div class="nav__name">Отчёты</div>
          </router-link>
          <router-link :to="{name: 'PageTracker'}" class="nav__item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3ZM1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10Z" fill="#AEC1CC"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 5C10.5523 5 11 5.44772 11 6V9H14C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H10C9.44772 11 9 10.5523 9 10V6C9 5.44772 9.44772 5 10 5Z" fill="#AEC1CC"/>
            <path d="M11 14C11 14.5523 10.5523 15 10 15C9.44772 15 9 14.5523 9 14C9 13.4477 9.44772 13 10 13C10.5523 13 11 13.4477 11 14Z" fill="#AEC1CC"/>
            <path d="M7 10C7 10.5523 6.55228 11 6 11C5.44772 11 5 10.5523 5 10C5 9.44772 5.44772 9 6 9C6.55228 9 7 9.44772 7 10Z" fill="#AEC1CC"/>
            </svg>
            <div class="nav__name">Трекер заданий</div>
          </router-link>
        </div>
      </div>

    </div>

</template>

<script>
  export default {
    name: 'LeftMenu',
    data: () => ({
      isOpenMenu: false,
    }),
    watch:{
      $route (){
        this.isOpenMenu = false;
        window.scrollTo(0,0);
      }
    },
  }
</script>


<style scoped>

  .menu {
    position: fixed;
    background-color: var(--cozh-white);
    width: 90px;
    min-width: 90px;
    display: flex;
    flex-direction: column;
    height: 100%;
    user-select: none;
    z-index: 5;
    transition: all .2s ease-out;
    overflow-x: hidden;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 30px 30px;
  }
  .logo img {
    height: 28px;
  }
  .logo a {
    display: flex;
  }


  .nav {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    width: 100%;
    border-top: 1px solid var(--cozh-light-grey);

  }
  .nav__item {
    min-width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: left;
    border-radius: 4px;
    padding: 16px;
  }
  .nav .nav__item:not(:last-child) {
    margin-bottom: 5px;
  }
  .nav__item:hover {
    background-color: rgba(var(--cozh-blue-code), .08);
  }
  .nav__item.router-link-active {
    background-color: rgba(var(--cozh-blue-code), .08);
  }
  .nav__item svg path {
    transition: all .2s ease-out;
  }
  .nav__item.router-link-active svg path {
    fill: var(--cozh-blue);
  }
  .nav__name {
    display: none;
    margin-left: 15px;
    font-weight: 600;
    font-size: 12px;
    line-height: 1;
  }


  .logo--2 {
    display: none;
  }


  .menu:hover {
    width: 300px;
    box-shadow: 20px 0px 60px 0px rgba(var(--cozh-black-code), 0.15);
  }
  .menu:hover .logo .logo--1 {
    display: none;
  }
  .menu:hover .logo .logo--2 {
    display: block;
  }
  .menu:hover .nav {
    width: 300px;
  }
  .menu:hover .nav__name {
    display: block;
  }
  .menu:hover .nav__item {
    width: 100%;
  }


  .mobile-header {
    height: 60px;
    background-color: var(--cozh-white);
    width: 100%;
    display: none;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    display: none;

  }

  .mobile-header__logo img {
    display: flex;
  }

  .mobile-header__humburger {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
    margin-left: -20px;
    height: 100%;
  }
  .mobile-header__humburger img {
    margin-right: 10px;
  }

  .mobile-header__humburger span {
    font-size: 11px;
    font-weight: 700;
    line-height: 14px;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }


/*  @media (max-width: 767px) {
    .nav {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .nav__item {
      border-radius: 8px;
      padding: 13px 20px;
    }
    .nav .nav__item:not(:last-child) {
      margin-bottom: 0px;
    }
    .menu, .menu:hover {
      width: 100%;
      box-shadow:  none;
      left: calc(-100%);
      top: 60px;
      height: calc(100% - 60px);
      position: absolute;
    }
    .menu:hover .nav {
      width: 100%;
    }
    .logo {
      display: none;
    }
    .menu .nav__name {
      display: block;
    }
    .menu.open {
      left: 0px;
    }
    .mobile-header {
      display: flex;
    }
    .nav__name {
      font-size: 14px;
    }
  }*/


</style>
