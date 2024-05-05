import {atom} from 'recoil';

export const accessTokenState = atom({
  key: 'access-token-state',
  default: '',
});

interface userType {
  email: string;
  id: number;
  profileImage: string;
  user_name: string;
}

export const userState = atom<userType | null>({
  key: 'user-state',
  default: null,
});
