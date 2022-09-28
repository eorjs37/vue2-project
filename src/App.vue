<template>
  <div id="app">
    <div class="container">
      <div>
        <div class="login-form" id="ele">
          <div class="form-control"><label class="label" for="id">ID</label> <input class="input" type="text" v-model="id" /></div>
          <div class="form-control"><label class="label" for="password">PASSWORD</label> <input class="input" type="password" v-model="password" /></div>
          <div class="form-control"><label class="label" for="passwordConfirm">PASSWORD-2</label> <input class="input" type="password" v-model="passwordConfirm" /></div>
          <div>
            <span class="error">{{ errors }}</span>
          </div>
        </div>

        <div class="ov-hidden mt-3">
          <button type="button" class="float-right" @click="openModal">Modal</button>
        </div>
      </div>
    </div>
    <Modal :visible="modalVisible" @closeModal="onCloseModal"></Modal>
  </div>
</template>

<script>
import { list } from '@/api/list';
import _ from 'lodash';
export default {
  name: 'App',
  data() {
    return {
      count: 4,
      id: '',
      password: '',
      passwordConfirm: '',
      errors: '',
      coffeeList: [],
      modalVisible: false,
    };
  },

  /* ######################################### life cycle ######################################### */
  created() {
    console.log('############ created ############');
    console.log('dom api ele : ', document.getElementById('ele'));
    console.log('id : ', this.id);
    console.log('password : ', this.password);
  },
  mounted() {
    console.log('############ mounted ############');
    console.log('dom api ele : ', document.getElementById('ele'));
    console.log('id : ', this.id);
    console.log('password : ', this.password);
    list().then(response => {
      const { data } = response;
      this.coffeeList = data;
    });
  },

  updated() {
    console.log('############ updated ############');
  },

  destroyed() {
    console.log('############ destroyed ############');
  },

  /* ######################################### methods ######################################### */
  methods: {
    diffPassword() {
      if (this.password !== this.passwordConfirm) {
        this.errors = '비밀번호가 다릅니다.';
      } else {
        this.errors = '';
      }
    },
    openModal() {
      this.modalVisible = true;
    },
    onCloseModal(value) {
      console.log('value : ', value);
      this.modalVisible = value;
    },
  },

  /* ######################################### watch ######################################### */
  watch: {
    id(newVal, oldVal) {
      console.log('newVal : ', newVal);
      console.log('oldVal : ', oldVal);
    },
    password() {
      this.diffPassword();
    },
    passwordConfirm() {
      this.diffPassword();
    },
  },

  /* ######################################### computed ######################################### */
  computed: {
    newCoffeeList: {
      get() {
        const copyCoffeeList = _.cloneDeep(this.coffeeList);

        copyCoffeeList.forEach(coffee => {
          coffee['newItem'] = coffee.menuNm + '/' + coffee.price + '원';
        });

        return copyCoffeeList;
      },
    },
  },
};
</script>

<style>
@import './assets/styles/reset.css';
@import './assets/styles/common.css';
@import './assets/styles/styles.css';
</style>
