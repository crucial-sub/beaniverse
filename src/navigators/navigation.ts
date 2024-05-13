import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Details: {
    id: number | undefined;
  };
};

export type RootNavigationProp = StackNavigationProp<RootStackParamList>;
