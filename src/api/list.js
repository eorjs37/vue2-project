import apiInstance from '@/utils/axios';

/**
 * @description : 리스트 정보
 */
const list = () => {
  return apiInstance.get('/api/coffees/all');
};

export { list };
