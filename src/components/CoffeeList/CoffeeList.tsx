import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {
  CoffeeAndBeansType,
  coffeeListState,
  searchTextState,
  selectedCoffeeCategoryState,
} from '../../recoil';
import {COLORS} from '../../theme/theme';
import CoffeeCard from './CoffeeCard';

const CoffeeList = () => {
  const coffeeList = useRecoilValue(coffeeListState);
  const searchText = useRecoilValue(searchTextState);
  const selectedCategory = useRecoilValue(selectedCoffeeCategoryState);
  const [renderData, setRenderData] = React.useState<CoffeeAndBeansType[]>([]);

  const renderItem = ({item}: {item: CoffeeAndBeansType}) => (
    <CoffeeCard coffee={item} />
  );
  const keyExtractor = (item: CoffeeAndBeansType) =>
    `coffee-flat-list-item-${item.id}`;

  React.useEffect(() => {
    if (!coffeeList) return;
    let filteredData = coffeeList;

    if (selectedCategory !== 'all') {
      filteredData = filteredData.filter(
        el => el.category?.name === selectedCategory,
      );
    }

    if (searchText) {
      filteredData = filteredData.filter(el =>
        el.name.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    setRenderData(filteredData);
  }, [coffeeList, selectedCategory, searchText]);

  return (
    <View>
      {renderData.length > 0 ? (
        <FlatList
          data={renderData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          horizontal
          contentContainerStyle={{gap: 30}}
        />
      ) : (
        <View style={styles.NoResultWrapper}>
          <Text style={styles.NoResultsText}>No results found.</Text>
        </View>
      )}
    </View>
  );
};
export default CoffeeList;

const styles = StyleSheet.create({
  NoResultWrapper: {
    height: 250,
    justifyContent: 'center',
  },
  NoResultsText: {
    color: COLORS.primaryWhiteHex,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
});
