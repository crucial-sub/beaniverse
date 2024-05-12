import React from 'react';
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
  const [renderData, setRenderData] = React.useState(coffeeList);

  const selectedCategory = useRecoilValue(selectedCoffeeCategoryState);

  const renderItem = ({item}: {item: CoffeeType}) => (
    <CoffeeCard coffee={item} />
  );
  const keyExtractor = (item: CoffeeType) => `flat-list-item-${item.id}`;

  React.useEffect(() => {
    if (!coffeeList) return;
    if (selectedCategory === 'all') {
      setRenderData(coffeeList);
    } else {
      const filteredData = coffeeList.filter(el => {
        if (!el.category) return false;
        else return el.category.name === selectedCategory;
      });

      setRenderData(filteredData);
    }
  }, [coffeeList, selectedCategory]);

  return (
    <View>
      <FlatList
        data={renderData}
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
