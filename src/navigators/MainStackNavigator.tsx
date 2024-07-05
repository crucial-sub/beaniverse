import {createStackNavigator} from '@react-navigation/stack';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  StyleSheet,
  View,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {setAuthHeader} from '../api/apiClient';
import {getCoffeeAndBeans, getCoffeeCategories} from '../api/apiCoffee';
import {getUser} from '../api/apiUser';
import {navigationRef} from '../lib/navigation';
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
import SignInScreen from '../screens/SignInScreen';
import {COLORS} from '../theme/theme';
import TabNavigator from './TabNavigator';
import {RootStackParamList} from './navigation';

const MainStack = createStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [user, setUser] = useRecoilState<UserType | null>(userState);
  const [coffeeList, setCoffeeList] = useRecoilState(coffeeListState);
  const [coffeeBeans, setCoffeeBeans] = useRecoilState(beansState);
  const [coffeeCategories, setCoffeeCategories] = useRecoilState(
    coffeeCategoriesState,
  );
  const [loading, setLoading] = React.useState(true);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

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
    const initializeLoginState = async () => {
      const storedAccessToken = await getStorageData('accessToken');
      if (storedAccessToken) {
        setAuthHeader(storedAccessToken);
        setIsLogin(true);
      } else {
        setLoading(false);
      }
    };

    initializeLoginState();
  }, []);

  const {
    data: userData,
    error: userError,
    isLoading: userDataLoading,
    isSuccess: userDataSuccess,
  } = useQuery({
    enabled: !!isLogin,
    queryKey: ['getUser'],
    queryFn: getUser,
  });
  const {
    data: coffeeAndBeansData,
    isLoading: coffeeAndBeansDataLoading,
    isSuccess: coffeeAndBeansDataSuccess,
  } = useQuery({
    enabled: !!isLogin,
    queryKey: ['getCoffeeAndBeans'],
    queryFn: getCoffeeAndBeans,
  });
  const {
    data: coffeeCategoriesData,
    isLoading: coffeeCategoriesDataLoading,
    isSuccess: coffeeCategoriesDataSuccess,
  } = useQuery({
    enabled: !!isLogin,
    queryKey: ['getCoffeeCategories'],
    queryFn: getCoffeeCategories,
  });

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
      {!loading && !isLogin ? (
        <>
          <MainStack.Screen name="SignIn" component={SignInScreen} />
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

export default MainStackNavigator;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
});
