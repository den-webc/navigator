<template>
  <div class="auth">
    <div class="auth__left">
      <img class="auth__logo" src="@/assets/img/logo-fullsize.svg">
      <div class="auth__form">
        <h1 class="auth__title"> Войти в личный кабинет </h1>
        <form @submit.prevent="onSubmit($event)">
          <div class="form-group" :class="{ 'error': form.username.error.status }">
            <div class="form-control">
              <label> {{ form.username.label }} </label>
              <input type="text"  autocomplete="off" v-model="form.username.value">
            </div>
            <div class="form-error"> {{ form.username.error.message }} </div>
          </div>
          <div class="form-group" :class="{ 'error': form.password.error.status }">
            <div class="form-error"> {{ form.password.error.message }} </div>
            <div class="form-control">
              <label> {{ form.password.label }} </label>
              <input type="password"  autocomplete="off" v-model="form.password.value">
            </div>
          </div>
          <transition name="slide-fade">
            <div class="error-text" v-if="errorMessage != ''"> {{ errorMessage }} </div>
          </transition>
          <button type="submit" class="btn btn--lg btn--default btn--inline" style="margin-top: 15px;">
            <div class="btn--text"> Войти </div>
            <div class="btn--loader"></div>
          </button>
        </form>
      </div>
      <div>
      </div>
    </div>
    <div class="auth__right">
      <div class="auth__wrap">
        <img class="img-responsive" src="@/assets/img/logo.svg">
        <img class="img-responsive" src="@/assets/img/logo-text.svg">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'PageLogin',
    data: () => ({
      errorMessage: '',
      form: {
        username: {
          label: 'Логин',
          value: 'admin',
          required: {
            status: true,
            message: 'Заполните поле',
          },
          validate: [
            {regexp: /.{5,}/, msg: 'Минимум 5 символов'}, 
          ],
          error: {
            status: false,
            message: null,
          }
        },
        password: {
          label: 'Пароль',
          value: 'AuFsgbk3crq9',
          required: {
            status: true,
            message: 'Заполните поле',
          },
          validate: [
            {regexp: /.{6,}/, msg: 'Минимум 6 символов'}, 
          ],
          error: {
            status: false,
            message: null,
          }
        },
      }
    }),
    watch: {
      'form.username.value': function () {
        this.form.username.error.status = false;
      },
      'form.password.value': function () {
        this.form.password.error.status = false;
      },
    },

    methods: {
      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
      async onSubmit (e) {
        let btn = e.submitter;
        btn.classList.add('btn--load');
        this.errorMessage = '';
        // Валидация формы, готовность к отправке
        let isReady = this.$helpers.validateFields(this.form);
        if(isReady) {
          const username = this.form.username.value;
          const password = this.form.password.value;
          // await this.sleep(300);
          const isAuth = await this.$store.dispatch('login', { username, password });
          if (isAuth) {
            this.$router.push({ name: 'PageOrganizations' });
          } else {
            this.errorMessage = 'Неверный логин или пароль';
          }
        }
        btn.classList.remove('btn--load');
      },
    },
  }
</script>

<style scoped>

  .auth {
    display: flex;
    flex-direction: row;
    height: 100vh;
  }

  .auth__logo {
    max-width: 268px;
  }

  .auth__title {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 30px;
  }

  .auth__left {
    background-color: var(--cozh-white);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    max-width: 600px;
    padding: 50px 100px;
    transition: .3s ease-in-out;
    width: 100%;
  }

  .auth__right {
    width: 100%;
    background-color: var(--cozh-blue);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .auth__right img:first-child{
    margin-bottom: 60px;
  }
  .auth__right img:last-child{
    max-width: 660px;
  }

  .auth__wrap {
    display: flex;
    flex-direction: column;
    padding: 50px;
    width: 100%;
    max-width: 960px;
  }

  @media (max-width: 767px) {
    
  }
</style>