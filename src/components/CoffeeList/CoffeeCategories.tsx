import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {
  coffeeCategoriesState,
  searchTextState,
  selectedCoffeeCategoryState,
} from '../../recoil';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import {capitalize} from '../../utils';

const CoffeeCategories = () => {
  const [coffeeCategories] = useRecoilState(coffeeCategoriesState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCoffeeCategoryState,
  );
  const setSearchText = useSetRecoilState(searchTextState);

  const handlePress = (category: string) => {
    setSelectedCategory(category);
    setSearchText('');
  };

  if (!coffeeCategories) return null;

  const categories = [{id: 0, name: 'all'}, ...coffeeCategories];

  return (
    <ScrollView
      contentContainerStyle={styles.CategoryContentContainerStyle}
      horizontal
      showsHorizontalScrollIndicator={false}>
      {categories.map(el => (
        <TouchableOpacity key={el.id} onPress={() => handlePress(el.name)}>
          <Text
            style={[
              styles.CategoryName,
              el.name === selectedCategory && styles.SelectedStyle,
            ]}>
            {capitalize(el.name)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CoffeeCategories;

const styles = StyleSheet.create({
  CategoryContentContainerStyle: {
    gap: 20,
    marginVertical: 30,
    paddingHorizontal: 30,
  },
  CategoryName: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryLightGreyHex,
  },
  SelectedStyle: {
    color: COLORS.primaryOrangeHex,
  },
});
