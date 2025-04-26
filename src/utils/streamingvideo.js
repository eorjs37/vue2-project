import Hls from 'hls.js';

const streamingVideo = {
  video: null,
  hls: null,
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
  setVideo(videoEle) {
    this.video = videoEle;
  },
  getVideo() {
    return this.video;
  },
  setHls(hlsvideosrc) {
    return new Promise((resolve, reject) => {
      if (this.hls) this.hls.destroy();
      this.hls = new Hls(this.config);
      this.hls.loadSource(hlsvideosrc);
      this.hls.attachMedia(this.video);
      this.video.muted = false;
      this.hls.startLoad(-1);

      this.video
        .play()
        .then(() => {
          resolve('play video');
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getHls() {
    return this.hls;
  },
};

export default streamingVideo;
