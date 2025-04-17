<template>
  <div id="app">
    <router-view></router-view>
    <video hidden ref="videoPlayer" @ended="onVideoEnded"></video>
    <button @click="addVideo">비디오 순차진행</button>
    <Modal :visible="modalVisible" @closeModal="onCloseModal"></Modal>
  </div>
</template>

<script>
import _ from 'lodash';
import { taskQueue } from './utils/taskQueue';
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
      currentResolve: null,
      videoList: ['https://daegeon-everybody.s3.ap-northeast-2.amazonaws.com/video/BigBuckBunny.mp4', 'https://daegeon-everybody.s3.ap-northeast-2.amazonaws.com/video/ElephantsDream.mp4', 'https://daegeon-everybody.s3.ap-northeast-2.amazonaws.com/video/ForBiggerBlazes.mp4'],
    };
  },

  /* ######################################### life cycle ######################################### */
  created() {
    // this.$crontab.addJob({
    //   name: 'counter1',
    //   interval: {
    //     seconds: '/1',
    //   },
    //   job: () => {
    //     taskQueue.add(async () => {
    //       console.log('[작업1] 시작');
    //       await this.simulateAsyncTask(3000);
    //       console.log('[작업1] 완료');
    //     });
    //   },
    // });
    // this.$crontab.addJob({
    //   name: 'counter2',
    //   interval: {
    //     seconds: '/1',
    //   },
    //   job: () => {
    //     taskQueue.add(async () => {
    //       console.log('[작업2] 시작');
    //       await this.simulateAsyncTask(3000);
    //       console.log('[작업2] 완료');
    //     });
    //   },
    // });
    // this.$crontab.addJob({
    //   name: 'counter3',
    //   interval: {
    //     seconds: '/1',
    //   },
    //   job: () => {
    //     taskQueue.add(async () => {
    //       console.log('[작업3] 시작');
    //       await this.simulateAsyncTask(3000);
    //       console.log('[작업3] 완료');
    //     });
    //   },
    // });
  },
  mounted() {},

  /* ######################################### methods ######################################### */
  methods: {
    addVideo() {
      this.videoList.forEach(item => {
        this.enqueueVideo(item);
      });
    },
    enqueueVideo(src) {
      taskQueue.add(() => this.playVideo(src));
    },
    playVideo(src) {
      return new Promise(resolve => {
        const video = this.$refs.videoPlayer;
        this.currentResolve = resolve;

        video.src = src;
        video.load();
        video.play();
      });
    },
    onVideoEnded() {
      if (this.currentResolve) {
        this.currentResolve(); // 현재 비디오 끝나면 큐 다음 작업 실행
        this.currentResolve = null;
      }
    },

    simulateAsyncTask(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
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
      this.modalVisible = value;
    },
  },
};
</script>

<style>
@import './assets/styles/reset.css';
@import './assets/styles/common.css';
@import './assets/styles/styles.css';
</style>
