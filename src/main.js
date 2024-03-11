import * as Vue from 'vue';

// Основной компонент приложения
import App from './App.vue';

// Библиотеки
import moment from 'moment';
import axios from 'axios';

// Файлы
import helpers from './helpers';
import router from './router';
import store from './store';

// Стили
import './assets/css/main.css';
import './assets/css/grid.css';
import './assets/css/utils.css';
import './assets/css/calendar.css';

// Шаблоны
import MainLayout from "./layouts/Main";
import EmptyLayout from "./layouts/Empty";

// Глобальные настройки moment
moment.locale('ru');

// Глобальные настройки axios
const token = localStorage.getItem('token');
if (token) { axios.defaults.headers.common['Authorization'] = 'Bearer ' + token }
axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch('logout')
      return router.push('/login')
    }
    throw error;
  }
});

// Приложение
const app = Vue.createApp(App);

// Регистрируем глобальные свойства
app.config.globalProperties.$helpers = helpers;
app.config.globalProperties.$moment = moment;
app.config.globalProperties.axios = axios;

// Регистрируем шаблоны
app.component("main-layout", MainLayout);
app.component("empty-layout", EmptyLayout);

// Регистрируем библиотеки
app.use(router);
app.use(store);

app.mount('#app');