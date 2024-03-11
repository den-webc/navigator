<template>
  <MessageDialogue ref="messageDialogue" />
  <ConfirmDialogue ref="confirmDialogue" />
	<div class="content">
		<form @submit.prevent="onSubmit($event)">
			<div class="row">
				<div class="col-xs-6 col-sm-6 col-md-6">
					<div class="form-group disabled">
          	<div class="form-control">
              <label> Управляющая организация </label>
              <input type="text" autocomplete="off" :value="organization.name">
            </div>
        	</div>
       		<div class="form-group" :class="{ 'error': form.city.error.status }">
            <SelectPicker v-model="form.city.value" :list="form.city.list" :label="form.city.label" />
            <div class="form-error"> {{ form.city.error.message }} </div>
        	</div>
        	<div class="form-group" :class="{ 'error': form.address.error.status }">
            <div class="form-control">
              <label> {{ form.address.label }} </label>
              <input type="text"  autocomplete="off" v-model="form.address.value">
            </div>
            <div class="form-error"> {{ form.address.error.message }} </div>
        	</div>
        	<div class="form-group" :class="{ 'error': form.district.error.status }">
            <div class="form-control">
              <label> {{ form.district.label }} </label>
              <input type="text"  autocomplete="off" v-model="form.district.value">
            </div>
            <div class="form-error"> {{ form.district.error.message }} </div>
        	</div>
        	<div class="form-group" :class="{ 'error': form.commissioningYear.error.status }">
            <div class="form-control">
              <label> {{ form.commissioningYear.label }} </label>
              <input type="text"  autocomplete="off" v-model="form.commissioningYear.value">
            </div>
            <div class="form-error"> {{ form.commissioningYear.error.message }} </div>
        	</div>

        	<div class="form-group" :class="{ 'error': form.modules.error.status, 'disabled': user.roleId !== 'admin' }">
        		<CheckboxesPicker v-model="form.modules.value" :list="form.modules.list" :label="form.modules.label" />
            <div class="form-error"> {{ form.modules.error.message }} </div>
        	</div>
  
        	<div class="btn-group">
        		<router-link 
        			v-if="house !== null"
        			:to="{name: 'PageHouseMain', params: {organization_id: organization.id, house_id: house.id} }" 
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
            	<div class="btn--text"> Продолжить </div>
            	<img class="btn--ico btn--ico--right" src="@/assets/img/next-arrow-white.svg">
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
  import SelectPicker from '@/components/ux/SelectPicker.vue'
  import CheckboxesPicker from '@/components/ux/CheckboxesPicker.vue'
  import ImagePicker from '@/components/ux/ImagePicker.vue'
  import MessageDialogue from '@/components/modals/MessageDialogue.vue';
  import ConfirmDialogue from '@/components/modals/ConfirmDialogue.vue';
</script>

<script>
  export default {
    name: 'EditForm',
    props: ['organization', 'house', 'cities', 'modules'],
  	data: () => ({
      image: null,
      form: {
        city: {
          label: 'Город',
          value: null,
          list: [],
          required: {
            status: true,
            message: 'Выберите город',
          },
          validate: [],
          error: {
            status: false,
            message: null,
          }
        },
        address: {
          label: 'Адрес',
          value: '',
          required: {
            status: true,
            message: 'Укажите адрес',
          },
          validate: [
            { regexp: /.{3,}/, msg: 'Минимум 3 символа' }, 
          ],
          error: {
            status: false,
            message: null,
          }
        },
        district: {
          label: 'Название жк',
          value: '',
          required: {
            status: true,
            message: 'Укажите название ЖК',
          },
          validate: [
            { regexp: /.{3,}/, msg: 'Минимум 3 символа' }, 
          ],
          error: {
            status: false,
            message: null,
          }
        },
        commissioningYear: {
          label: 'год ввода в эксплуатацию',
          value: '',
          required: {
            status: true,
            message: 'Укажите год',
          },
          validate: [
            { regexp: /^[12][0-9]{3}$/, msg: 'Некорректный год' }, 
          ],
          error: {
            status: false,
            message: null,
          }
        },
        modules: {
          label: 'Модули',
          value: [],
          list: [],
          required: {
            status: true,
            message: 'Выберите модули',
          },
          validate: [],
          error: {
            status: false,
            message: null,
          }
        },
      }
    }),

    computed: {
      user () {
        return this.$store.state.auth.user;
      },
      mkdImage () {
        return this.house.imgLinks !== null && this.house.imgLinks.length > 0 ? this.house.imgLinks[0] : null;
      },
    },

    watch: {
      'form.city.value': function () {
        this.form.city.error.status = false;
      },
      'form.address.value': function () {
        this.form.address.error.status = false;
      },
      'form.district.value': function () {
        this.form.district.error.status = false;
      },
      'form.commissioningYear.value': function () {
        this.form.commissioningYear.error.status = false;
      },
      'form.modules.value': function () {
        this.form.modules.error.status = false;
      },
    },

    async created () {

    	// Ставим список городов
    	this.form.city.list = this.cities;

	    // Ставим список модулей
	    let modules = [];
    	for (var key in this.modules) {
    		modules.push({id: key, name: this.modules[key].name });
    	}
    	this.form.modules.list = modules;

    	// Форма работает в режиме редактирования дома
    	if(this.house !== null) {

    		// Сразу наполняем данными
    		this.form.city.value = this.house.city.id;
    		this.form.address.value = this.house.address;
    		this.form.district.value = this.house.district;
    		this.form.commissioningYear.value = this.house.commissioningYear;
        this.image = this.mkdImage;

    		// Собираем нужный массив
    		let modules = [];
    		this.house.module.forEach((module) => {
    			modules.push(module.num);
    		});

    		this.form.modules.value = modules;

    	} else {
    	// Форма работает в режиме создания дома
    	}
    },
    methods: {

      	// Создать новый дом
      	async createHouse (param) {
    			const r = await this.axios.post(this.$store.state.api_endpoint + '/houses', param);
        	if(r.status == 200) {
  					return r.data.id;
        	} else {
        	throw new Error('Не удалось создать дом, укажите корректные данные');
        	}
      	},

      	// Обновить информацию о доме
      	async updateHouse (param) {
      		const r = await this.axios.patch(this.$store.state.api_endpoint + '/houses/' + this.house.id, param);
  				if(r.status == 200) {
  					return r.data.id;
        	} else {
        		throw new Error('Не удалось обновить информацию о доме, укажите корректные данные');
        	}
      	},

        // Обновить информацию о подключенных модулях
      	async updateModules (id) {
      		var param = { module: {} };
      		this.form.modules.value.forEach((item) => {
      			param.module[item] = { dateStart: '2023-09-28T11:17:39.717Z', dateEnd: '2024-09-28T11:17:39.717Z' };
      		});
      		const r = await this.axios.patch(this.$store.state.api_endpoint + '/houses/' + id + '/modules', param);
  				if(r.status !== 200) {
	        	throw new Error('Не удалось обновить информацию о модулях');
          }
      	},

        // Пересобрать меташаблон
      	async updateMetaTemplate (id) {
      		const r = await this.axios.post(this.$store.state.api_endpoint + '/houses/' + id + '/metaTemplate');
  				if(r.status !== 200) {
	        	throw new Error('Не удалось обновить мета шаблон');
          }
      	},

      	async onSubmit (e) {
        	let btn = e.submitter;
        	btn.classList.add('btn--load');
        	
        	// Если прошла валидация полей
        	if(this.$helpers.validateFields(this.form)) {

	        	// Параметры для отправки
	        	const param = {
		    			active: true,
		    			address: this.form.address.value,
		    			cityId: this.form.city.value,
		    			commissioningYear: this.form.commissioningYear.value,
		    			companyId: this.organization.id,
		    			district: this.form.district.value,
		    			structure: null,
              images: this.image !== null ? [ this.image ] : null,
		    		}

		        try {

		    			const id = this.house == null ? await this.createHouse(param) : await this.updateHouse(param);

              // Модули + меташаблон обновляет только админ
              
              if(this.user.roleId == 'admin') {
        			  await this.updateModules(id);
        			  await this.updateMetaTemplate(id);
              }

							this.$router.push({name: 'PageHouseEditParam', params: {organization_id: this.organization.id, house_id: id}})

		        } catch (e) {
		        	// На форму падает ошибка
	        		this.$refs.messageDialogue.show({message: e.message, okButton: 'Подтвердить'});
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
		margin-top: 20px;
	}
</style>