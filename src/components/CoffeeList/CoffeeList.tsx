import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  CoffeeType,
  coffeeListState,
  selectedCoffeeCategoryState,
} from '../../recoil';
import CoffeeCard from './CoffeeCard';

const CoffeeList = () => {
  const [coffeeList, setCoffeeList] = useRecoilState(coffeeListState);
  if (!coffeeList) return;
  const [renderData, setRenderData] = React.useState(coffeeList);
  const selectedCategory = useRecoilValue(selectedCoffeeCategoryState);

  useEffect(() => {
    if (!coffeeList) return;
    if (selectedCategory === 'all') return;
    const filteredData = coffeeList.filter(
      el => el.category.name === selectedCategory,
    );

    setRenderData(filteredData);
  }, [selectedCategory]);

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
