import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://tplfxj7hk5.execute-api.ap-northeast-2.amazonaws.com/dev/',
  headers: {
    'Content-Type': 'application/json',
  },
});

let onUnauthorized: (() => void) | null = null;

apiClient.interceptors.response.use(
  response => response,
  error => {
    const {response} = error;
    if (response && response.status === 401 && onUnauthorized) {
      onUnauthorized();
    }
    return Promise.reject(error);
  },
);

export const setAuthHeader = (token: string) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const setOnUnauthorized = (callback: () => void) => {
  onUnauthorized = callback;
};

export default apiClient;
