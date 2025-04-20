<template>
  <div id="app">
    <video ref="streamingvideo" hidden></video>
    <video hidden ref="videoPlayer" @ended="onVideoEnded"></video>
    <button @click="setHls">시작</button>
    <button @click="dummyBrandStart">브랜드음원 순차 시작</button>
    <input type="range" :value="videoVolume * 100" />
    <Modal :visible="modalVisible" @closeModal="onCloseModal"></Modal>
  </div>
</template>

<script>
import _ from 'lodash';
import { taskQueue } from './utils/taskQueue';
import { dummyVideoList } from './api/dummyApi';
import Hls from 'hls.js';
import { fadeOut, fadeIn } from './api/videoControl';
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
      videoVolume: 0,
      isLastVideo: false,
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
  async mounted() {
    this.setHls();
    //1.브랜드 음원 등록
    //2.반복문을 통해 첫번째이면 fadeOut 마지막이면 fadeIn
    //3.fadeOut 도중에 중지하면? fadeOut을 멈추고 중지처리 그리고 브랜드음원은 재생되지 않는다
    //4.fadeIn 도중에 중지하면? 그냥 중지다
    //5.브랜드음원중에 중지를 누르면 muted가 되며, 스트리밍음원은 중지를 시킨다. 브랜드음원 재생을 누르면 브랜드음원 muted가 해제가 된다.

    dummyVideoList().then(res => {
      if (Array.isArray(res)) {
        res.forEach((item, index) => {
          const { id, url } = item;
          this.$crontab.addJob({
            name: id,
            interval: { seconds: '00', minutes: '00', hours: '13', week: '*' },
            job: () => {
              // 실행되야 할 시간에 본인이 첫번째인것은 어떻게 아는것인지
              taskQueue.add(async () => {
                await fadeOut(this.$refs.streamingvideo, 5000);
                await this.playVideo(url);
              });
            },
          });
        });
      }
    });
    await this.$nextTick();
    this.videoVolume = this.$refs.streamingvideo.volume;
  },

  /* ######################################### methods ######################################### */
  methods: {
    dummyBrandStart() {
      dummyVideoList().then(res => {
        if (Array.isArray(res)) {
          res.forEach((item, index) => {
            const { id, url } = item;
            taskQueue.add(async () => {
              await fadeOut(this.$refs.streamingvideo, 5000);
              await this.playVideo(url);
            });
          });
        }
      });
    },
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
        if (taskQueue.isLast()) {
          fadeIn(this.$refs.streamingvideo, 5000, 1);
        }
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
