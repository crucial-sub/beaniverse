import apiClient, {setAuthHeader} from './apiClient';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export const signIn = async (req: LoginRequest): Promise<LoginResponse> => {
  const {data} = await apiClient.post<LoginResponse>('auth/login', req);

  setAuthHeader(data.accessToken);
  return data;
};
