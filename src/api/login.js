import apiInstance from '@/utils/axios';

/**
 * @description : 로그인 정보
 */
const login = param => {
  return apiInstance.post('/api/ionic/user/login', param);
};

export { login };
