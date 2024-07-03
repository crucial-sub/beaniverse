import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {CoffeeAndBeansType, beansState} from '../../recoil';
import CoffeeBeanCard from './CoffeeBeanCard';

const CoffeeBeans = () => {
  const [coffeeBeans, setCoffeeBeans] = useRecoilState(beansState);

  const renderItem = ({item}: {item: CoffeeAndBeansType}) => (
    <CoffeeBeanCard coffeeBean={item} />
  );
  const keyExtractor = (item: CoffeeAndBeansType) =>
    `coffee-beans-flat-list-item-${item.id}`;

  return (
    <View>
      <FlatList
        data={coffeeBeans}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal={true}
        contentContainerStyle={{gap: 30}}
      />
    </View>
  );
};

export default CoffeeBeans;

const styles = StyleSheet.create({});
