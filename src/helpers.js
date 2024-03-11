import moment from 'moment';

export default {

   	num_word: (value, words) => {
      value = Math.abs(value) % 100; 
		  var num = value % 10;
		  if(value > 10 && value < 20) return words[2]; 
		  if(num > 1 && num < 5) return words[1];
		  if(num == 1) return words[0]; 
		  return words[2];
    },

    badgeDateParam: (date) => {
        if (moment().format('YYYY-MM-DD') == moment(date).format('YYYY-MM-DD')) {
          return { class: 'badge--red', text: 'Сегодня' };
        }
        if (moment().add(1,'days').format('YYYY-MM-DD') == moment(date).format('YYYY-MM-DD')) {
          return { class: 'badge--blue', text: 'Завтра' };
        }
        if (moment().add(1,'days') < moment(date)) {
          return { class: 'badge--gray', text: moment(date).format('DD.MM.YYYY') };
        }
    },

    statusWorkParam: (status) => {
    	if(status == 0) {
          return { class: 'status--empty', text: '' };
    	}
    	if(status == 1) {
          return { class: 'status--success', text: 'Выполнено' };
    	}
    	if(status == 2) {
          return { class: 'status--error', text: 'Не выполнено' };
    	}
    },

    toBase64: (file) => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
      });
    }, 

    validateFields: (form) => {
      let isError = false;
      // Проверка на обязательное заполнение
      for (var key in form) {
        // Проверка обязательности ввода
        if(form[key].required.status) {
          // Прроверка заполнения
          if(form[key].value == null || form[key].value.length == 0) {
            form[key].error.status = true;
            form[key].error.message = form[key].required.message;
            isError = true;
          }
        }
      }
      if(isError) return false;
      // Проверка регулярками
      for (key in form) {
        // Цикл по регуляркам
        for (var i = 0; i <= form[key].validate.length - 1; i++) {
          // Валидация регуляркой значения
          if(!form[key].validate[i].regexp.test(form[key].value.toString().trim())) {
            form[key].error.status = true;
            form[key].error.message = form[key].validate[i].msg;
            isError = true;
            break;
          }
        }
      }
      if(isError) return false;
      return true;
    },

    formatBytes(bytes, decimals = 2) {
      if (!+bytes) return '0 Bytes'
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Б', 'Кб', 'Мб', 'Гб', 'Тб', 'Пб', 'EiB', 'ZiB', 'YiB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    },

    _snake2Pascal (str) {
        str +='';
        str = str.split('_');
        for(var i=1;i<str.length;i++){ 
            str[i] = str[i].slice(0,1).toUpperCase() + str[i].slice(1,str[i].length);
        }
        return str.join('');
    },

    buildDefaultStructure (meta) {
      var structure = {
        type: "structure",
        description: 'Дом',
        info: "string",
      };
      meta.forEach((item) => {
        const name = this._snake2Pascal(item.name);
        const block = this.buildDefaultBlock(item);
        structure[name] = [];
        structure[name].push(block);
      });
      return structure;
    },

    buildDefaultBlock (block) {
      var element = {
        type: block.name, 
        description: block.description, 
        info: 'string',
      };
      block.child.forEach((child) => {
        const nameChild = this._snake2Pascal(child.name);
        element[nameChild] = [];
        // Для стандартного блока Секции
        if(block.name == 'section' && child.name == 'level_range') {
          // Пушим 1 level_range по умолчанию
          element[nameChild].push({
            type: child.name, 
            description: child.description, 
            info: 'string',
            min: 0,
            max: 0,
          })
        }
      });
      return element;
    },

    resizeArray(arr, newSize, defaultValue) {
      if (newSize > arr.length) {
        while(newSize > arr.length){
          arr.push(defaultValue);
        }
        // arr.length = newSize;
      } else {
        arr.splice(newSize);
      }
    },


    buildModule (module) {
      const templates = [];
      for (let epicKey in module.epics) {
        for (let topicKey in module.epics[epicKey].topics) {
          let dataTopic = this.buildTopic(module.epics[epicKey].topics[topicKey]);
          templates.push(dataTopic);
        }
      }
      return templates;
    },

    buildTopic(topic) {
      const res = {
        topicNum: topic.num,
        groups: [],
      }
      for (let key_lvl_1 in topic.locations) {
        for (let number_lvl_1 in topic.locations[key_lvl_1]) {
          let loc_lvl_1 = topic.locations[key_lvl_1][number_lvl_1];
          for (let key_lvl_2 in loc_lvl_1.locations) {
            for (let number_lvl_2 in loc_lvl_1.locations[key_lvl_2]) {
              let loc_lvl_2 = loc_lvl_1.locations[key_lvl_2][number_lvl_2];
              for (let groupKey in loc_lvl_2.templateGroups) {
                let group = loc_lvl_2.templateGroups[groupKey];
                let actions = this.buildGroup(group);
                res.groups.push({
                  groupId: group.groupId,
                  actions: actions,
                })
              }
            }
          }
        }
      }
      return res;
    },

    buildGroup (group) {
      let actions = [];
      if(group.activity.review) {
        let review = {
          action_id: group.activity.review.actionId,
          template_id: group.activity.review.templateId,
          function_id: group.activity.review.function.id,
          employee_id: group.activity.review.employee.id,
          ttl: group.activity.review.ttl,
        }
        if(group.activity.review.periodical) {
          review.period = group.activity.review.period;
        }
        actions.push(review);
      }
      if(group.activity.work) {
        let work = {
          action_id: group.activity.work.actionId,
          template_id: group.activity.work.templateId,
          function_id: group.activity.work.function.id,
          employee_id: group.activity.work.employee.id,
          ttl: group.activity.work.ttl,
        }
        if(group.activity.work.periodical) {
          work.period = group.activity.work.period;
        }
        actions.push(work);
      }
      if(group.activity.control) {
        let control = {
          action_id: group.activity.control.actionId,
          template_id: group.activity.control.templateId,
          function_id: group.activity.control.function.id,
          employee_id: group.activity.control.employee.id,
          ttl: group.activity.control.ttl,
        }
        if(group.activity.control.periodical) {
          control.period = group.activity.control.period;
        }
        actions.push(control);
      }
      return actions;
    },

}