import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const navigateToSignIn = () => {
  if (navigationRef.isReady()) {
    navigationRef.navigate('SignIn' as never);
  }
};
