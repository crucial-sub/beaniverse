import {UserType} from '../recoil';
import apiClient from './apiClient';

export const getUser = async (): Promise<UserType | null> => {
  try {
    const {data} = await apiClient.get('user/me');
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
