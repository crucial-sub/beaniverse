import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {useQuery} from '@tanstack/react-query';
import React, {memo, useCallback} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {setAuthHeader, setOnUnauthorized} from '../api/apiClient';
import {getCoffeeAndBeans, getCoffeeCategories} from '../api/apiCoffee';
import {getUser} from '../api/apiUser';
import useBackPressHandler from '../hooks/useBackPressHandler';
import {navigateToSignIn} from '../lib/navigation';
import {getStorageData} from '../lib/storage-helper';
import {
  UserType,
  beansState,
  coffeeCategoriesState,
  coffeeListState,
  isLoginState,
  userState,
} from '../recoil';
import DetailsScreen from '../screens/DetailsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import PaymentScreen from '../screens/PaymentScreen';
import {COLORS} from '../theme/theme';
import AuthStackNavigator from './AuthStackNavigator';
import TabNavigator, {BottomTabParamList} from './TabNavigator';

export type MainStackParamList = {
  Tab: {
    screen: keyof BottomTabParamList;
    params?: BottomTabParamList[keyof BottomTabParamList];
  };
  Details: {id: number} | undefined;
  Payment: undefined;
  OrderHistory: undefined;
  EditProfile: undefined;
};

export type MainStackNavigationProp = StackNavigationProp<MainStackParamList>;

const MainStack = createStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
  useBackPressHandler();

  const setUser = useSetRecoilState<UserType | null>(userState);
  const setCoffeeList = useSetRecoilState(coffeeListState);
  const setCoffeeBeans = useSetRecoilState(beansState);
  const setCoffeeCategories = useSetRecoilState(coffeeCategoriesState);

  const [loading, setLoading] = React.useState(true);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const initializeLoginState = useCallback(async () => {
    const storedAccessToken = await getStorageData('accessToken');

    if (storedAccessToken) {
      setAuthHeader(storedAccessToken);
      setIsLogin(true);
    } else {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    initializeLoginState();
  }, [initializeLoginState]);

  const {
    data: userData,
    error: userError,
    isLoading: userDataLoading,
    isSuccess: userDataSuccess,
  } = useQuery({
    enabled: !!isLogin,
    queryKey: ['get-user'],
    queryFn: getUser,
  });

  const {
    data: coffeeAndBeansData,
    isLoading: coffeeAndBeansDataLoading,
    isSuccess: coffeeAndBeansDataSuccess,
  } = useQuery({
    enabled: !!isLogin,
    queryKey: ['get-coffee-and-beans'],
    queryFn: getCoffeeAndBeans,
  });

  const {
    data: coffeeCategoriesData,
    isLoading: coffeeCategoriesDataLoading,
    isSuccess: coffeeCategoriesDataSuccess,
  } = useQuery({
    enabled: !!isLogin,
    queryKey: ['get-coffee-categories'],
    queryFn: getCoffeeCategories,
  });

  React.useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
      setIsLogin(false);
      navigateToSignIn();
    };

    setOnUnauthorized(handleUnauthorized);
  }, [setUser, setIsLogin]);

  React.useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  React.useEffect(() => {
    if (coffeeAndBeansData) {
      const coffeeList = coffeeAndBeansData.filter(
        item => item.type === 'COFFEE',
      );
      const beans = coffeeAndBeansData.filter(
        item => item.type === 'COFFEE_BEAN',
      );
      setCoffeeList(coffeeList);
      setCoffeeBeans(beans);
    }
  }, [coffeeAndBeansData]);

  React.useEffect(() => {
    if (coffeeCategoriesData) {
      setCoffeeCategories(coffeeCategoriesData);
    }
  }, [coffeeCategoriesData]);

  React.useEffect(() => {
    if (
      userDataLoading ||
      coffeeAndBeansDataLoading ||
      coffeeCategoriesDataLoading
    )
      setLoading(true);
    else if (
      userDataSuccess &&
      coffeeAndBeansDataSuccess &&
      coffeeCategoriesDataSuccess
    )
      setLoading(false);
  }, [userDataLoading, coffeeAndBeansDataLoading, coffeeCategoriesDataLoading]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryWhiteHex} />
      </View>
    );
  }

  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      {!isLogin ? (
        <>
          <AuthStackNavigator />
        </>
      ) : (
        <>
          <MainStack.Screen name="Tab" component={TabNavigator} />
          <MainStack.Screen name="Details" component={DetailsScreen} />
          <MainStack.Screen name="Payment" component={PaymentScreen} />
          <MainStack.Screen
            name="OrderHistory"
            component={OrderHistoryScreen}
          />
          <MainStack.Screen name="EditProfile" component={EditProfileScreen} />
        </>
      )}
    </MainStack.Navigator>
  );
};

export default memo(MainStackNavigator);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
});
