<template>
  <div id="app">
    <video ref="streamingvideo" hidden></video>
    <video hidden ref="videoPlayer" @ended="onVideoEnded"></video>
    <button @click="addVideo">비디오 순차진행</button>
    <button @click="setHls">시작</button>
    <Modal :visible="modalVisible" @closeModal="onCloseModal"></Modal>
  </div>
</template>

<script>
import _ from 'lodash';
import { taskQueue } from './utils/taskQueue';
import Hls from 'hls.js';
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
      hls: null,
      hlsvideosrc: `https://daegeon-everybody.s3.ap-northeast-2.amazonaws.com/m3u8/attack_on_titan/attack_on_titan.m3u8`,
      config: {
        debug: false,
        startPosition: -1,
        autoStartLoad: false,
        enableWorker: true,
        lowLatencyMode: true,
        maxBufferLength: 30,
        maxMaxBufferLength: 600,
        backBufferLength: 0,
        manifestLoadPolicy: {
          default: {
            maxTimeToFirstByteMs: Infinity,
            maxLoadTimeMs: 20000,
            timeoutRetry: {
              maxNumRetry: 20,
              retryDelayMs: 4000,
              maxRetryDelayMs: 5000,
            },
            errorRetry: {
              maxNumRetry: 20,
              retryDelayMs: 4000,
              maxRetryDelayMs: 5000,
            },
          },
        },
        fragLoadPolicy: {
          default: {
            maxTimeToFirstByteMs: 1000000,
            maxLoadTimeMs: 120000,
            timeoutRetry: {
              maxNumRetry: 10,
              retryDelayMs: 15000,
              maxRetryDelayMs: 1000 * 120,
            },
            errorRetry: {
              maxNumRetry: 15,
              retryDelayMs: 10000,
              maxRetryDelayMs: 1000 * 180,
            },
          },
        },
        startLevel: undefined,
        nudgeOffset: 0,
        nudgeMaxRetry: 10,
        playlistLoadPolicy: {
          default: {
            maxTimeToFirstByteMs: 10000,
            maxLoadTimeMs: 20000,
            timeoutRetry: {
              maxNumRetry: 2,
              retryDelayMs: 0,
              maxRetryDelayMs: 0,
            },
            errorRetry: {
              maxNumRetry: 10,
              retryDelayMs: 1000,
              maxRetryDelayMs: 2000,
            },
          },
        },
      },
      videoList: ['https://daegeon-everybody.s3.ap-northeast-2.amazonaws.com/video/BigBuckBunny.mp4', 'https://daegeon-everybody.s3.ap-northeast-2.amazonaws.com/video/ElephantsDream.mp4', 'https://daegeon-everybody.s3.ap-northeast-2.amazonaws.com/video/ForBiggerBlazes.mp4'],
    };
  },

  /* ######################################### life cycle ######################################### */
  created() {},
  mounted() {
    this.setHls();
    //1.브랜드 음원 등록
    //2.반복문을 통해 첫번째이면 fadeOut 마지막이면 fadeIn
    //3.fadeOut 도중에 중지하면? fadeOut을 멈추고 중지처리 그리고 브랜드음원은 재생되지 않는다
    //4.fadeIn 도중에 중지하면? 그냥 중지다
    //5.브랜드음원중에 중지를 누르면 muted가 되며, 스트리밍음원은 중지를 시킨다. 브랜드음원 재생을 누르면 브랜드음원 muted가 해제가 된다.
    this.videoList.forEach((item, index) => {
      this.$crontab.addJob({
        name: `brandmusic${index + 1}`,
        interval: { minutes: '/1' },
        job: () => {
          if (index === 0) {
            //
          } else if (index === this.videoList.length - 1) {
            //
          }
        },
      });
    });
  },

  /* ######################################### methods ######################################### */
  methods: {
    setHls() {
      if (this.hls) {
        this.hls.destroy();
      }
      this.hls = new Hls(this.config);
      this.hls.loadSource(this.hlsvideosrc);
      this.hls.attachMedia(this.$refs.streamingvideo);
      this.$refs.streamingvideo.muted = false;
      this.hls.startLoad(-1);

      this.$refs.streamingvideo.play();
    },
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
