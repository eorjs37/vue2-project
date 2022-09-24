<template>
  <div id="app">
    <div class="container">
      <div class="login-form">
        <div class="form-control"><label class="label" for="id">ID</label> <input class="input" type="text" /></div>
        <div class="form-control"><label class="label" for="password">PASSWORD</label> <input class="input" type="password" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login';

export default {
  name: 'App',
  data() {
    return {
      count: 4,
    };
  },
  created() {
    console.log('############ created ############');
    console.log('dom api ele : ', document.getElementById('ele'));
  },
  methods: {},
  mounted() {
    console.log('############ mounted ############');
    console.log('dom api ele : ', document.getElementById('ele'));
  },
  destroyed() {
    console.log('############ destroyed ############');
  },
};
</script>

<style>
@import './assets/styles/reset.css';
@import './assets/styles/common.css';
@import './assets/styles/styles.css';
</style>
