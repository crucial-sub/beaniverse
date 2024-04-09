import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Alert, BackHandler, StyleSheet} from 'react-native';
import {navigationRef} from '../lib/navigation';
import TabNavigator from './TabNavigator';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  React.useEffect(() => {
    const handleBackPress = () => {
      if (navigationRef.getCurrentRoute()?.name === 'TodoList') {
        Alert.alert('잠깐!!', '정말 앱을 종료하시겠어요?', [
          {
            text: '취소',
            onPress: () => null,
            style: 'cancel',
          },
          {text: '나가기', onPress: () => BackHandler.exitApp()},
        ]);
      } else {
        navigationRef.goBack();
      }

      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', () => handleBackPress());

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () =>
        handleBackPress(),
      );
    };
  }, []);

  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="Tab" component={TabNavigator} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({});
