import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  SignIn: undefined;
  Tab: undefined;
  Details: {id: number} | undefined;
  Payment: undefined;
  OrderHistory: undefined;
  EditProfile: undefined;
};

export type RootNavigationProp = StackNavigationProp<RootStackParamList>;
