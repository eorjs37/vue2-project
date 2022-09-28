# vue2 교육

## 실행순서

### npm install

```
npm install
```

### npm run serve

```
npm run serve
```

## lifeCycle

### created

> 인스턴스 생성되고 data접근은 가능하나 dom api 사용은 불가능하다

### mounted

> 인스턴스 생성되고 data접근은 가능하고 dom api 사용 가능

### updated

> data 변경될때 마다 동작하지만, watch나 computed 사용하는게 낫다.

### destroyed

> 인스턴스 소멸될때 사용된다.

## Computed 속성과 Watch 속성

### computed

> 계산된 속성을 사용하기 위해 사용된다.

### watch

> data 변경될때 사용된다.

## 부모컴퍼넌트와 자식컴퍼넌트 통신

### props

> 부모에서 자식한테 데이터를 넘겨주고 싶을때 사용된다.(App.vue, Modal.vue 참조)

```html javascript
//부모컴퍼넌트(App.vue)
<template>
  <div id="app">
    <div class="container">
      <div class="ov-hidden mt-3">
        <button type="button" class="float-right" @click="openModal">Modal</button>
      </div>
    </div>
    <Modal :visible="modalVisible" @closeModal="onCloseModal"></Modal>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        modalVisible: true,
      };
    },
    created() {},
    updated() {
      console.log('############ updated ############');
    },

    destroyed() {
      console.log('############ destroyed ############');
    },

    methods: {
      onCloseModal(value) {
        console.log('value : ', value);
        this.modalVisible = value;
      },
    },
  };
</script>
```

```html javascript
//자식컴퍼넌트(Modal.vue)
<template>
  <transition name="fade">
    <div class="modal" v-if="visible">
      <div class="wrap">
        <div class="modal-header">
          <div class="title">
            <h1>모달 제목</h1>
          </div>
          <div class="close" @click="closeModal()">X</div>
        </div>

        <div class="modal-body">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta culpa alias saepe fugiat amet blanditiis dolorum officia pariatur hic, laboriosam, illum repudiandae ab illo eius laborum labore temporibus reprehenderit incidunt.</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    //props 통해 부모데이터 받기
    props: {
      visible: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    methods: {
      closeModal() {
        this.$emit('closeModal', false);
      },
    },
  };
</script>
```

### emit

> 자식에서 부모한테 데이터를 전달할때 사용된다.(App.vue, Modal.vue 참조)
> 부모에서 자식한테 데이터를 넘겨주고 싶을때 사용된다.(App.vue, Modal.vue 참조)

```html javascript
//자식컴퍼넌트(Modal.vue)
<template>
  <transition name="fade">
    <div class="modal" v-if="visible">
      <div class="wrap">
        <div class="modal-header">
          <div class="title">
            <h1>모달 제목</h1>
          </div>
          <div class="close" @click="closeModal()">X</div>
        </div>

        <div class="modal-body">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta culpa alias saepe fugiat amet blanditiis dolorum officia pariatur hic, laboriosam, illum repudiandae ab illo eius laborum labore temporibus reprehenderit incidunt.</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    methods: {
      //1.emit 통해 부모한테 false라는 데이터 전달
      closeModal() {
        this.$emit('closeModal', false);
      },
    },
  };
</script>
```

```html javascript
//부모컴퍼넌트(App.vue)
<template>
  <div id="app">
    <div class="container">
      <div class="ov-hidden mt-3">
        <button type="button" class="float-right" @click="openModal">Modal</button>
      </div>
    </div>
    <!-- 2. @자식메소드(emit에서 선언한 메소드)="부모메소드" -->
    <Modal :visible="modalVisible" @closeModal="onCloseModal"></Modal>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        modalVisible: true,
      };
    },
    created() {},
    updated() {
      console.log('############ updated ############');
    },

    destroyed() {
      console.log('############ destroyed ############');
    },

    methods: {
      //3. 자식에서 던진 데이터를 value에서 확인 가능
      onCloseModal(value) {
        console.log('value : ', value);
        this.modalVisible = value;
      },
    },
  };
</script>
```

## vue-router

> 화면이동시에 사용된다.(router>index.js, main.js, App.vue, Test.vue 참조)

### 라우터 세팅

```javascript
//router > index.js
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history', //해쉬값 제거 방식
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home', //설정 경로
      component: () => import('@/pages/Home.vue'), // 컴퍼넌트 import
    },
    {
      path: '/test',
      component: () => import('@/pages/Test.vue'),
    },
  ],
});
```

```javascript
//main.js
import Vue from 'vue';
import App from './App.vue';
import Modal from '@/components/Modal';

//router
import router from '@/router/index';

Vue.config.productionTip = false;

Vue.component('Modal', Modal);

new Vue({
  router, //router추가
  render: h => h(App),
}).$mount('#app');
```

```html javascript
<!-- App.vue -->
<template>
  <div id="app">
    <!-- 라우터뷰 추가 -->
    <router-view></router-view>
  </div>
</template>

<script></script>

<style></style>
```

#### 경로에 파라미터가 있을 경우

```javascript
// router > index.js

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history', //해쉬값 제거 방식
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('@/pages/Home.vue'),
    },
    {
      //파라임터가 필요한 경우 아래처럼 :파라미터명(ex. :id 으로 작성한다.)
      path: '/example1/:id',
      component: () => import('@/pages/Example1.vue'),
    },
    {
      path: '/test',
      component: () => import('@/pages/Test.vue'),
    },
  ],
});
```

```html javascript
<!-- Example1.vue -->
<template>
  <div class="container example">
    <h1>Example.vue</h1>
  </div>
</template>

<script>
  export default {
    mounted() {
      //this.$route를 통해 params추출
      const { params } = this.$route;
      //params를 통해 id 추출
      const { id } = params;
      console.log('id : ', id);
    },
  };
</script>

<style>
  .example {
    background-color: cadetblue;
  }
</style>
```
