import {atom} from 'recoil';

export const accessTokenState = atom({
  key: 'access-token-state',
  default: '',
});

export const authState = atom({
  key: 'auth-state',
  default: {
    isSignIn: false,
    user: null,
  },
});
