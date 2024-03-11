import { h } from 'vue'
import { RouterView } from 'vue-router'
import { createWebHistory, createRouter } from 'vue-router';
import store from './store';

import PageLogin from './pages/PageLogin.vue';
import PageNotFound from './pages/PageNotFound.vue';
import PageHouses from './pages/PageHouses.vue';
import PageEmployees from './pages/PageEmployees.vue';

import PageOrganizations from './pages/PageOrganizations.vue';
import PageOrganization from './pages/PageOrganization.vue';

import PageHouseMain from './pages/house/Main.vue';
import PageHouseCreate from './pages/house/Create.vue';
import PageHouseEdit from './pages/house/Edit.vue';
import PageHouseEditParam from './pages/house/EditParam.vue';
import PageHouseEditStructure from './pages/house/EditStructure.vue';
import PageHouseEditDocuments from './pages/house/EditDocuments.vue';

import PageEmployeeMain from './pages/employee/Main.vue';
import PageEmployeeCreate from './pages/employee/Create.vue';
import PageEmployeeEdit from './pages/employee/Edit.vue';

import PageOrganizationHouseTechMap from './pages/PageOrganizationHouseTechMap.vue';
import PageOrganizationHouseTechMapModule from './pages/PageOrganizationHouseTechMapModule.vue';

import PageOrganizationHouseTemplate from './pages/PageOrganizationHouseTemplate.vue';
import PageOrganizationHouseTemplateModule from './pages/PageOrganizationHouseTemplateModule.vue';

import PageTracker from './pages/tracker/PageTracker.vue';
import PageTrackerHouse from './pages/tracker/PageTrackerHouse.vue';
import PageTrackerHouseTask from './pages/tracker/PageTrackerHouseTask.vue';

import PageReports from './pages/reports/PageReports.vue';
import PageReportEmployeessHouse from './pages/reports/PageReportEmployeessHouse.vue';

import PageReportsSystemHouse from './pages/reports/PageReportsSystemHouse.vue';
import PageReportsCompleteHouse from './pages/reports/PageReportsCompleteHouse.vue';


const routes = [
  
  // Страница 404
  {
    path: '/:catchAll(.*)',
    component: PageNotFound,
    meta: {
      title: 'Ошибка 404',
      name: 'Ошибка 404',
      ico: '3.svg',
      layout: 'main-layout',
      requiresAuth: false,
    }
  },

  // Страница авторизации
  {
    path: '/login',
    component: { render: () => h(RouterView) },
    meta: {
      title: 'Логин',
      layout: 'empty-layout',
      requiresAuth: false,
    },
    children: [
      { 
        path: '',
        name: 'PageLogin',
        component: PageLogin,
      },
    ]
  },


  // Дома
  {
    path: '/houses',
    component: { render: () => h(RouterView) },
    meta: {
      title: 'Дома',
      name: 'Дома',
      ico: '3.svg',
      layout: 'main-layout',
      requiresAuth: true,
    },
    children: [
      { 
        path: '',
        name: 'PageHouses',
        component: PageHouses,
      },
    ]
  },

  // Сотрудники
  {
    path: '/employees',
    component: { render: () => h(RouterView) },
    meta: {
      title: 'Сотрудники',
      name: 'Сотрудники',
      ico: '8.svg',
      layout: 'main-layout',
      requiresAuth: true,
    },
    children: [
      { 
        path: '',
        name: 'PageEmployees',
        component: PageEmployees,
      },
    ]
  },



  // Трекер заданий
  {
    path: '/tracker',
    component: { render: () => h(RouterView) },
    meta: {
      title: 'Трекер заданий',
      name: 'Трекер заданий',
      ico: '19.svg',
      layout: 'main-layout',
      requiresAuth: true,
    },
    children: [
      { 
        path: '',
        name: 'PageTracker',
        component: PageTracker,
      },
      { 
        path: 'organization/:organization_id/house/:house_id',
        name: 'PageTrackerHouse',
        component: PageTrackerHouse,
      },
      { 
        path: 'organization/:organization_id/house/:house_id/task/:task_id',
        name: 'PageTrackerHouseTask',
        component: PageTrackerHouseTask,
      },
    ]
  },


  // Отчёты
  {
    path: '/reports',
    component: { render: () => h(RouterView) },
    meta: {
      title: 'Отчёты',
      name: 'Отчёты',
      ico: '20.svg',
      layout: 'main-layout',
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'PageReports',
        component: PageReports,
      },
      {
        path: ':house_id/employees',
        component: PageReportEmployeessHouse,
        name: 'PageReportEmployeessHouse',
      },
      { 
        path: ':house_id/system',
        name: 'PageReportsSystemHouse',
        component: PageReportsSystemHouse,
      },
      { 
        path: ':house_id/complete',
        name: 'PageReportsCompleteHouse',
        component: PageReportsCompleteHouse,
      },
    ]
  },


  // Управляющие организации
  {
    path: '/',
    component: { render: () => h(RouterView) },
    meta: {
      title: 'Управляющие организации',
      name: 'Управляющие организации',
      ico: '18.svg',
      layout: 'main-layout',
      requiresAuth: true,
    },
    children: [
      { 
        path: '',
        name: 'PageOrganizations',
        component: PageOrganizations,
      },
      {
        path: 'organization/:organization_id',
        name: 'PageOrganization',
        component: PageOrganization,
      },


      // Техкарта
      {
        path: 'organization/:organization_id/house/:house_id/tech-map',
        name: 'PageOrganizationHouseTechMap',
        component: PageOrganizationHouseTechMap,
      },
      {
        path: 'organization/:organization_id/house/:house_id/tech-map/:module_id',
        name: 'PageOrganizationHouseTechMapModule',
        component: PageOrganizationHouseTechMapModule,
      },


      // Шаблон
      {
        path: 'organization/:organization_id/house/:house_id/template',
        name: 'PageOrganizationHouseTemplate',
        component: PageOrganizationHouseTemplate,
      },
      {
        path: 'organization/:organization_id/house/:house_id/template/:module_id',
        name: 'PageOrganizationHouseTemplateModule',
        component: PageOrganizationHouseTemplateModule,
      },
   
   
      // Сотрудник
      {
        path: 'organization/:organization_id/employee/:employee_id',
        name: 'PageEmployeeMain',
        component: PageEmployeeMain,
      },
      {
        path: 'organization/:organization_id/create-employee',
        name: 'PageEmployeeCreate',
        component: PageEmployeeCreate,
      },
      {
        path: 'organization/:organization_id/employee/:employee_id/edit',
        name: 'PageEmployeeEdit',
        component: PageEmployeeEdit,
      },

    
    
      // Дом
      {
        path: 'organization/:organization_id/house/:house_id',
        name: 'PageHouseMain',
        component: PageHouseMain,
      },
      {
        path: 'organization/:organization_id/create-house',
        name: 'PageHouseCreate',
        component: PageHouseCreate,
      },
      {
        path: 'organization/:organization_id/house/:house_id/edit',
        name: 'PageHouseEdit',
        component: PageHouseEdit,
      },
      {
        path: 'organization/:organization_id/house/:house_id/edit-param',
        name: 'PageHouseEditParam',
        component: PageHouseEditParam,
      },
      {
        path: 'organization/:organization_id/house/:house_id/edit-structure',
        name: 'PageHouseEditStructure',
        component: PageHouseEditStructure,
      },
      {
        path: 'organization/:organization_id/house/:house_id/edit-documents',
        name: 'PageHouseEditDocuments',
        component: PageHouseEditDocuments,
      },
      

    ],
  },

];


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
});

router.beforeEach((to, from, next) => {
  // Устанавливаем title страницы
  document.title = 'Навигатор - ' + to.meta.title;
  // Если страница закрыта авторизацией
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // Убеждаемся что авторизация есть
    if (store.getters.isLoggedIn) {
      // Пропускаем
      next();
      return;
    }
    // Редиректим на авторизацию
    next('/login');
  } else {
    // Страница без авторизации, пропускаем
    next();
  }
});

export default router;