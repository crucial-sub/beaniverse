import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Alert, BackHandler, StyleSheet} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {getCoffee} from '../api/apiCoffee';
import {getUser} from '../api/apiUser';
import {navigationRef} from '../lib/navigation';
import {accessTokenState, coffeeListState, userState} from '../recoil';
import SignInScreen from '../screens/SignInScreen';
import TabNavigator from './TabNavigator';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  const accessToken = useRecoilValue(accessTokenState);
  const [user, setUser] = useRecoilState(userState);
  const [coffeeList, setCoffeeList] = useRecoilState(coffeeListState);

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

  React.useEffect(() => {
    if (!accessToken) return;
    const setCurrentUser = async () => {
      const currentUser = await getUser(accessToken);
      setUser(currentUser);
    };
    const setCoffeeData = async () => {
      const coffeeData = await getCoffee(accessToken);
      setCoffeeList(coffeeData);
    };
    setCurrentUser();
    setCoffeeData();
  }, [accessToken]);

  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      {!accessToken ? (
        <>
          <MainStack.Screen name="SignIn" component={SignInScreen} />
        </>
      ) : (
        <>
          <MainStack.Screen name="Tab" component={TabNavigator} />
        </>
      )}
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({});
