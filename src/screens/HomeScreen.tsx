import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import HeaderBar from '../components/Header/HeaderBar';
import BeansData from '../data/BeansData';
import CoffeeData from '../data/CoffeeData';

const HomeScreen = () => {
  const coffeeList = CoffeeData;
  const beanList = BeansData;

  return (
    <SafeAreaView>
      <HeaderBar leftIcon="menu" />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
