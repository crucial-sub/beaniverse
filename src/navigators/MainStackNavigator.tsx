import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Alert, BackHandler, StyleSheet} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {getCoffeeAndBeans, getCoffeeCategories} from '../api/apiCoffee';
import {getUser} from '../api/apiUser';
import {navigationRef} from '../lib/navigation';
import {
  CoffeeAndBeansType,
  accessTokenState,
  beansState,
  coffeeCategoriesState,
  coffeeListState,
  userState,
} from '../recoil';
import DetailsScreen from '../screens/DetailsScreen';
import SignInScreen from '../screens/SignInScreen';
import TabNavigator from './TabNavigator';
import {RootStackParamList} from './navigation';

const MainStack = createStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  const accessToken = useRecoilValue(accessTokenState);
  const [user, setUser] = useRecoilState(userState);
  const [coffeeList, setCoffeeList] = useRecoilState(coffeeListState);
  const [coffeeBeans, setCoffeeBeans] = useRecoilState(beansState);
  const [coffeeCategories, setCoffeeCategories] = useRecoilState(
    coffeeCategoriesState,
  );

  React.useEffect(() => {
    const handleBackPress = () => {
      if (
        navigationRef.getCurrentRoute()?.name === 'SignIn' ||
        navigationRef.getCurrentRoute()?.name === 'Home'
      ) {
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
    const setCoffeeAndBeansData = async () => {
      const coffeeAndBeans: CoffeeAndBeansType[] = await getCoffeeAndBeans();
      const coffeeList = [] as CoffeeAndBeansType[];
      const beans = [] as CoffeeAndBeansType[];
      coffeeAndBeans.forEach(item => {
        if (item.type === 'COFFEE') coffeeList.push(item);
        else if (item.type === 'COFFEE_BEAN') beans.push(item);
      });
      setCoffeeList(coffeeList);
      setCoffeeBeans(beans);
    };
    const setCoffeeCategoriesData = async () => {
      const coffeeCategoriesData = await getCoffeeCategories();
      setCoffeeCategories(coffeeCategoriesData);
    };
    setCurrentUser();
    setCoffeeAndBeansData();
    setCoffeeCategoriesData();
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
          <MainStack.Screen name="Details" component={DetailsScreen} />
        </>
      )}
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({});
