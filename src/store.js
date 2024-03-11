import { createStore } from 'vuex'
import axios from 'axios'

// Create a new store instance.
export default createStore({
  
  // admin
  // AuFsgbk3crq9

  state: {
    // api_endpoint: 'https://staging.цож.рф/api/v1',
    api_endpoint: 'https://dev.навигатор.цож.рф/api/v1',
    auth: {
      token: localStorage.getItem('token') || '',
      user: JSON.parse(localStorage.getItem('user')) || {},
    },
    functions: null,
    roles: null,
    cities: null,
    modules: null,
    location_types: null,
  },
  

  getters : {
    // bool статус авторизации
    isLoggedIn: state => !!state.auth.token,
    // Текущий пользователь
    authUser: state => state.auth.user,
  },

  mutations: {
    // Устанавливаем авторизацию
    setAuth(state, {user, token}) {
      // Устанавливаем access_token
      state.auth.token = token;
      // Устанавливаем пользователя
      state.auth.user = user;
    },
    logout(state) {
      // Сбрасываем access_token
      state.auth.token = '';
    },
    setFunctions(state, { functions }) {
      state.functions = functions;
    },
    setRoles(state, { roles }) {
      state.roles = roles;
    },
    setCities(state, { cities }) {
      state.cities = cities;
    },
    setModules(state, { modules }) {
      state.modules = modules;
    },
    setLocationTypes(state, { location_types }) {
      state.location_types = location_types;
    },
  },

  actions: {

    // Список типов локаций
    async getLocationTypes ({commit, state}) {
      if (state.location_types === null) {
        const r = await axios.get(state.api_endpoint + '/locationType/');
        const location_types = r.data.data;
        commit('setLocationTypes', { location_types });
      }
    },
    // Список ролей системы
    async getRoles ({commit, state}) {
      if (state.roles === null) {
        const r = await axios.get(state.api_endpoint + '/roles/');
        const roles = [];
        r.data.data.forEach((item) => {
          roles.push({ id: item.name, name: item.description });
        });
        commit('setRoles', { roles });
      }
    },
    // Список квалификаций системы
    async getFunctions ({commit, state}) {
      if (state.functions === null) {
        const r = await axios.get(state.api_endpoint + '/functions/');
        const functions = [];
        r.data.data.forEach((item) => {
          functions.push({ id: item.id, name: item.description });
        });
        commit('setFunctions', { functions });
      }
    },
    // Список городов
    async getCities ({commit, state}) {
      if (state.cities === null) {
        const r = await axios.get(state.api_endpoint + '/cities/');
        const cities = r.data.data
        commit('setCities', { cities });
      }
    },
    // Список модулей
    async getModules ({commit, state}) {
      if (state.modules === null) {
        const r = await axios.get(state.api_endpoint + '/technique/module?detailed=true');
        const modules = r.data.module
        commit('setModules', { modules });
      }
    },




    async getTrackerObjects ({state}) {
      const {data} = await axios.get(state.api_endpoint + '/tracker/counter');
      return data;
    },

    async getTrackerTasks ({state}, param) {
      const {data} = await axios.get(state.api_endpoint + '/tracker/' + param.house_id + '/tasks?' + param.data);
      return data;
    },


    async getHouse ({state}, param) {
      const {data} = await axios.get(state.api_endpoint + '/houses/' + param.house_id);
      return data;
    },

    async getReportsCompany ({state}) {
      const {data} = await axios.get(state.api_endpoint + '/dashboard/company');
      return data.companies;
    },
    async getReportsHousePie ({state}, param) {
      const {data} = await axios.get(state.api_endpoint + '/dashboard/tasks/pie/' + param.house_id + '?' + param.data);
      return data;
    },
    async getReportsHouseEmployees ({state}, param) {
      const {data} = await axios.get(state.api_endpoint + '/dashboard/tasks/detailed/' + param.house_id + '?' + param.data);
      return data.employee;
    },
    


    async getAnaliticsSystemModules ({state}, param) {
      const {data} = await axios.get(state.api_endpoint + '/dashboard/module/' + param.house_id + '?' + param.data);
      return data;
    },



    async getAnaliticsSystemModuleReviewResult ({state}, param) {
      const {data} = await axios.get(state.api_endpoint + '/dashboard/module/' + param.house_id + '/review/' + param.module_id + '/results?' + param.data);
      return data;
    },
    async getAnaliticsSystemModuleReviewIssuelist ({state}, param) {
      const {data} = await axios.get(state.api_endpoint + '/dashboard/module/' + param.house_id + '/review/' + param.module_id + '/issueList?' + param.data);
      return data;
    },
    async getAnaliticsSystemModuleReviewIssueNum ({state}, param) {
      const {data} = await axios.get(state.api_endpoint + '/dashboard/module/' + param.house_id + '/review/' + param.module_id + '/issueNum?' + param.data);
      return data;
    },
    async getAnaliticsSystemModuleReviewRaised ({state}, param) {
      const {data} = await axios.get(state.api_endpoint + '/dashboard/module/' + param.house_id + '/review/' + param.module_id + '/issueWorkRaised?' + param.data);
      return data;
    },

    
    async getAnaliticsSystemModuleWorkResult ({state}, param) {
      const {data} = await axios.get(state.api_endpoint + '/dashboard/module/' + param.house_id + '/work/' + param.module_id + '/results?' + param.data);
      return data;
    },
    async getAnaliticsSystemModuleWorkIssuelist ({state}, param) {
      const {data} = await axios.get(state.api_endpoint + '/dashboard/module/' + param.house_id + '/work/' + param.module_id + '/controlIssueList?' + param.data);
      return data;
    },
    async getAnaliticsSystemModuleWorkPassedNum ({state}, param) {
      const {data} = await axios.get(state.api_endpoint + '/dashboard/module/' + param.house_id + '/work/' + param.module_id + '/controlPassedNum?' + param.data);
      return data;
    },
    async getAnaliticsSystemModuleWorkIssueNum ({state}, param) {
      const {data} = await axios.get(state.api_endpoint + '/dashboard/module/' + param.house_id + '/work/' + param.module_id + '/controlIssueNum?' + param.data);
      return data;
    },




    // Выход из системы
    async logout({commit}) {
      commit('logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
      return true;
    },

    // Авторизация
    async login({commit, state}, param ) {
      try {
        // Запрос авторизации
        const tokenResponse = await axios.post(state.api_endpoint + '/token', param, {headers:{'Content-Type': 'application/x-www-form-urlencoded'}});
        // Всё прошло нормально
        if (tokenResponse.status == 200) {
          // Полученный токен
          const token = tokenResponse.data.access_token;
          // В local storage устанавливаем token
          localStorage.setItem('token', token);
          // Axios по умолчанию будет отправлять авторизацию с запросами
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
          // Что за пользователь?
          const meResponse = await axios.get(state.api_endpoint + '/employees/me');
          // Полученный объект пользователя
          const user = meResponse.data;
          // В local storage устанавливаем user
          localStorage.setItem('user', JSON.stringify(user));
          // Авторизация успешна
          commit('setAuth', {user, token});
          return true;
        }
      } catch (e) {e}
      // Авторизация ошибочна
      localStorage.removeItem('token');
      return false;
    },
  },

});
