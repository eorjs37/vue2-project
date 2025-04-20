function fadeOut(video, duration = 2000) {
  if (video) {
    return new Promise(resolve => {
      const steps = 50;
      const stepTime = duration / steps;
      const volumeStep = video.volume / steps;

      const fade = setInterval(() => {
        if (video.volume > volumeStep) {
          video.volume = Math.max(0, video.volume - volumeStep);
        } else {
          video.volume = 0;
          clearInterval(fade);
          resolve(); // 완료 시 resolve
        }
      }, stepTime);
    });
  } else {
    throw Error('not exists video element');
  }
}

function fadeIn(video, duration = 2000, targetVolume = 1.0) {
  if (video) {
    return new Promise(resolve => {
      video.volume = 0;

      const steps = 50;
      const stepTime = duration / steps;
      const volumeStep = targetVolume / steps;

      const fade = setInterval(() => {
        if (video.volume < targetVolume - volumeStep) {
          video.volume = Math.min(targetVolume, video.volume + volumeStep);
        } else {
          video.volume = targetVolume;
          clearInterval(fade);
          resolve(); // 완료 시 resolve
        }
      }, stepTime);
    });
  } else {
    throw Error('not exists video element');
  }
}

export { fadeOut, fadeIn };
