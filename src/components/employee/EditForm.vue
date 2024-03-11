<template>
  <MessageDialogue ref="messageDialogue" />
  <ConfirmDialogue ref="confirmDialogue" />
	<div class="content">
		<form @submit.prevent="onSubmit($event)">
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-6">
          <div class="form-group disabled">
            <div class="form-control">
              <label> Управляющая организация </label>
              <input type="text" autocomplete="off" :value="organization.name">
            </div>
          </div>
          <div class="form-group" :class="{ 'error': form.login.error.status, 'disabled' : employee !== null }">
            <div class="form-control">
              <label> {{ form.login.label }} </label>
              <input type="text"  autocomplete="off" v-model="form.login.value">
            </div>
            <div class="form-error"> {{ form.login.error.message }} </div>
          </div>
          <div class="form-group" :class="{ 'error': form.password.error.status }" v-if="employee == null">
            <div class="form-control">
              <label> {{ form.password.label }} </label>
              <input type="password" autocomplete="off" v-model="form.password.value">
            </div>
            <div class="form-error"> {{ form.password.error.message }} </div>
          </div>
          <div class="form-group" :class="{ 'error': form.active.error.status}">
            <SelectPicker v-model="form.active.value" :list="form.active.list" :label="form.active.label" />
            <div class="form-error"> {{ form.active.error.message }} </div>
          </div>
          <div class="form-group" :class="{ 'error': form.lastname.error.status }">
            <div class="form-control">
              <label> {{ form.lastname.label }} </label>
              <input type="text"  autocomplete="off" v-model="form.lastname.value">
            </div>
            <div class="form-error"> {{ form.lastname.error.message }} </div>
          </div>
          <div class="form-group" :class="{ 'error': form.firstname.error.status }">
            <div class="form-control">
              <label> {{ form.firstname.label }} </label>
              <input type="text"  autocomplete="off" v-model="form.firstname.value">
            </div>
            <div class="form-error"> {{ form.firstname.error.message }} </div>
          </div>
          <div class="form-group" :class="{ 'error': form.middlename.error.status }">
            <div class="form-control">
              <label> {{ form.middlename.label }} </label>
              <input type="text"  autocomplete="off" v-model="form.middlename.value">
            </div>
            <div class="form-error"> {{ form.middlename.error.message }} </div>
          </div>
          <div class="form-group" :class="{ 'error': form.role.error.status }">
            <SelectPicker v-model="form.role.value" :list="form.role.list" :label="form.role.label" />
            <div class="form-error"> {{ form.role.error.message }} </div>
          </div>
          <div class="form-group" :class="{ 'error': form.function.error.status }">
            <CheckboxesPicker v-model="form.function.value" :list="form.function.list" :label="form.function.label" :max="7"/>
            <div class="form-error"> {{ form.function.error.message }} </div>
          </div>
          <div class="btn-group">
            <router-link 
              v-if="employee !== null"
              :to="{name: 'PageEmployeeMain', params: {organization_id: organization.id, employee_id: employee.id} }" 
              class="btn btn--lg btn--outline">
              <div class="btn--text"> Отменить </div>
            </router-link>
            <router-link 
              v-else
              :to="{name: 'PageOrganization', params: {organization_id: organization.id} }" 
              class="btn btn--lg btn--outline">
              <div class="btn--text"> Отменить </div>
            </router-link>
            <button class="btn btn--lg btn--default" type="submit">
              <img class="btn--ico btn--ico--left" src="../../assets/img/check-white.svg">
              <div class="btn--text"> Сохранить </div>
              <div class="btn--loader"></div>
            </button>
          </div>
				</div>
        <div class="col-xs-6 col-sm-6 col-md-6">
          <ImagePicker v-model="image" />
        </div>
			</div>
    </form>
	</div>
</template>

<script setup>
  import SelectPicker from '../ux/SelectPicker.vue';
  import CheckboxesPicker from '../ux/CheckboxesPicker.vue';
  import ImagePicker from '../ux/ImagePicker.vue';
  import MessageDialogue from '../modals/MessageDialogue.vue';
  import ConfirmDialogue from '../modals/ConfirmDialogue.vue';
</script>

<script>
  export default {
    name: 'EditForm',
  	props: ['organization', 'employee', 'functions', 'roles'],
  	data: () => ({
      image: null,
      form: {
        login: {
          label: 'Логин',
          value: '',
          required: {
            status: true,
            message: 'Укажите логин',
          },
          validate: [
            { regexp: /^[a-z0-9]+$/, msg: 'Только из буквы и цифры' }, 
            { regexp: /^[a-z].*/, msg: 'Логин должен начинаться с буквы' }, 
            { regexp: /.{8,}/, msg: 'Минимум 8 символов' }, 
          ],
          error: {
            status: false,
            message: null,
          }
        },
        password: {
          label: 'Пароль',
          value: '',
          required: {
            status: true,
            message: 'Укажите пароль',
          },
          validate: [
            { regexp: /.{8,}/, msg: 'Минимум 8 символов' }, 
          ],
          error: {
            status: false,
            message: null,
          }
        },
        lastname: {
          label: 'Фамилия',
          value: '',
          required: {
            status: true,
            message: 'Укажите фамилию',
          },
          validate: [
            { regexp: /.{3,}/, msg: 'Минимум 3 символа' }, 
          ],
          error: {
            status: false,
            message: null,
          }
        },
        firstname: {
          label: 'Имя',
          value: '',
          required: {
            status: true,
            message: 'Укажите имя',
          },
          validate: [
            { regexp: /.{3,}/, msg: 'Минимум 3 символа' }, 
          ],
          error: {
            status: false,
            message: null,
          }
        },
        middlename: {
          label: 'Отчество',
          value: '',
          required: {
            status: true,
            message: 'Укажите отчество',
          },
          validate: [
            { regexp: /.{3,}/, msg: 'Минимум 3 символа' }, 
          ],
          error: {
            status: false,
            message: null,
          }
        },
        active: {
          label: 'Статус',
          value: null,
          list: [{id: true, name: 'Активен'}, {id: false, name: 'Не активен'}],
          required: {
            status: true,
            message: 'Выберите статус',
          },
          validate: [],
          error: {
            status: false,
            message: null,
          }
        },
        role: {
          label: 'Роль',
          value: null,
          list: [],
          required: {
            status: true,
            message: 'Выберите роль',
          },
          validate: [],
          error: {
            status: false,
            message: null,
          }
        },
        function: {
          label: 'Квалификация',
          value: [],
          list: [],
          required: {
            status: true,
            message: 'Выберите квалификацию',
          },
          validate: [],
          error: {
            status: false,
            message: null,
          }
        },
      },
    }),
    watch: {
      'form.login.value': function () {
        this.form.login.error.status = false;
      },
      'form.password.value': function () {
        this.form.password.error.status = false;
      },
      'form.lastname.value': function () {
        this.form.lastname.error.status = false;
      },
      'form.firstname.value': function () {
        this.form.firstname.error.status = false;
      },
      'form.middlename.value': function () {
        this.form.middlename.error.status = false;
      },
      'form.active.value': function () {
        this.form.active.error.status = false;
      },
      'form.role.value': function () {
        this.form.role.error.status = false;
      },
      'form.function.value': function () {
        this.form.function.error.status = false;
      },
    },
    async created () {

      this.form.role.list = this.roles;
      this.form.function.list = this.functions;

      // Форма работает в режиме редактирования дома
      if(this.employee !== null) {

        // Сразу наполняем данными
        this.form.login.value = this.employee.login;
        this.form.password.value = '12345678';
        this.form.lastname.value = this.employee.lastName;
        this.form.firstname.value = this.employee.firstName;
        this.form.middlename.value = this.employee.middleName;
        this.form.role.value = this.employee.roleId;
        this.form.active.value = this.employee.active;
        this.image = this.userImage;

        // Собираем нужный массив
        const functions = [];

        this.employee.functions.forEach((func) => {
          functions.push(func.id);
        });

        this.form.function.value = functions;

      }

    },
    computed: {
      userImage () {
        return this.employee.imgLinks !== null && this.employee.imgLinks.length > 0 ? this.employee.imgLinks[0] : null;
      },
    },

    methods: {

      // Создать сотрудника
      async createEmployee () {
        const param = {
          firstName: this.form.firstname.value,
          lastName: this.form.lastname.value,
          middleName: this.form.middlename.value,
          active: this.form.active.value,
          companyId: this.organization.id,
          contractorId: 0,
          functions: this.form.function.value,
          role: this.form.role.value,
          login: this.form.login.value,
          password: this.form.password.value,
          images: this.image !== null ? [ this.image ] : null,
        }
        const r = await this.axios.post(this.$store.state.api_endpoint + '/employees/', param);
        return r.data.id;
      },

      // Обновить информацию о сотруднике
      async updateEmployee () {
        const param = {
          firstName: this.form.firstname.value,
          lastName: this.form.lastname.value,
          middleName: this.form.middlename.value,
          active: this.form.active.value,
          companyId: this.organization.id,
          contractorId: 0,
          functions: this.form.function.value,
          role: this.form.role.value,
          images: this.image !== null ? [ this.image ] : null,
        }
        const r = await this.axios.patch(this.$store.state.api_endpoint + '/employees/' + this.employee.id, param);
        return r.data.id;
      },

      async onSubmit (e) {
        let btn = e.submitter;
        btn.classList.add('btn--load');
        // Если прошла валидация полей
        if(this.$helpers.validateFields(this.form)) {
          try {
            const id = this.employee == null ? await this.createEmployee() : await this.updateEmployee();
            this.$router.push({name: 'PageEmployeeMain', params: {organization_id: this.organization.id, employee_id: id}});
          } catch (e) {
            this.$refs.messageDialogue.show({ message: e.message, okButton: 'Подтвердить' });
          }
        }
        // Выключается волчок
        btn.classList.remove('btn--load');
      },
    },
  }
</script>

<style scoped>
	.content {
		padding: 25px;
	}
	.btn-group {
		justify-content: space-between;
		margin-top: 30px;
	}
</style>