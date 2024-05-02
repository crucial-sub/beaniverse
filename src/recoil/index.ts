import {atom} from 'recoil';

export const authState = atom({
  key: 'auth-state',
  default: {
    isSignIn: false,
    user: null,
  },
});
