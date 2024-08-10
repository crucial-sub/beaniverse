import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {memo} from 'react';
import SignInScreen from '../screens/SignInScreen';

export type AuthStackParamList = {
  SignInScreen: undefined;
};

export type AISearchNavigationProp = StackNavigationProp<AuthStackParamList>;

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SignInScreen">
      <AuthStack.Screen name="SignInScreen" component={SignInScreen} />
    </AuthStack.Navigator>
  );
};

export default memo(AuthStackNavigator);
