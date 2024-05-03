import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://tplfxj7hk5.execute-api.ap-northeast-2.amazonaws.com/dev/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
