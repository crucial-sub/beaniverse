import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import CoffeeCard from '../components/CoffeeList/CoffeeCard';
import {CoffeeAndBeansType, coffeeListState, favoritesState} from '../recoil';
import {COLORS, SPACING} from '../theme/theme';

const FavoritesScreen = () => {
  const favorites = useRecoilValue(favoritesState);
  const coffeeList = useRecoilValue(coffeeListState);
  const favoriteCoffees = coffeeList!.filter(coffee =>
    favorites.includes(coffee.id),
  );

  const renderItem = ({item}: {item: CoffeeAndBeansType}) => (
    <View style={styles.itemWrapper}>
      <CoffeeCard coffee={item} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList
        data={favoriteCoffees}
        renderItem={renderItem}
        keyExtractor={item => `favorite-${item.id}`}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  contentContainer: {
    paddingHorizontal: SPACING.space_10,
    paddingBottom: SPACING.space_20,
  },
  itemWrapper: {
    flex: 1,
    padding: SPACING.space_10,
  },
});
