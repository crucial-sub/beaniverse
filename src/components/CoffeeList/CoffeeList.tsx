import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {CoffeeType, coffeeListState} from '../../recoil';
import CoffeeCard from './CoffeeCard';

const CoffeeList = () => {
  const [coffeeList, setCoffeeList] = useRecoilState(coffeeListState);
  if (!coffeeList) return;

  const renderItem = ({item}: {item: CoffeeType}) => (
    <CoffeeCard coffee={item} />
  );
  const keyExtractor = (item: CoffeeType) => `flat-list-item-${item.id}`;

  return (
    <View>
      <FlatList
        data={coffeeList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal={true}
        contentContainerStyle={{gap: 30}}
      />
    </View>
  );
};

export default CoffeeList;

const styles = StyleSheet.create({});
