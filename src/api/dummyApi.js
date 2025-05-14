const dummyVideoList = () => {
  return new Promise(resolve => {
    resolve([
      // { id: 'brandid1', url: 'https://daegeon-everybody.s3.ap-northeast-2.amazonaws.com/video/BigBuckBunny.mp4' },
      // { id: 'brandid2', url: 'https://daegeon-everybody.s3.ap-northeast-2.amazonaws.com/video/ElephantsDream.mp4' },
      { id: 'brandid3', url: 'https://daegeon-everybody.s3.ap-northeast-2.amazonaws.com/video/ForBiggerBlazes.mp4' },
    ]);
  });
};

export { dummyVideoList };
