import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {coffeeCategoriesState, selectedCoffeeCategoryState} from '../../recoil';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import {capitalize} from '../../utils';

const CoffeeCategories = () => {
  const [coffeeCategories, setCoffeeCategories] = useRecoilState(
    coffeeCategoriesState,
  );
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCoffeeCategoryState,
  );

  const handlePress = (category: string) => {
    setSelectedCategory(category);
  };
  const selectedStyle: TextStyle = {
    color: COLORS.primaryOrangeHex,
  };

  if (!coffeeCategories) return;
  const arr = [{id: 0, name: 'all'}, ...coffeeCategories];
  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.CategoryContentContainerStyle}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {arr.map(el => {
          return (
            <TouchableOpacity key={el.id} onPress={() => handlePress(el.name)}>
              <Text
                style={[
                  styles.CategoryName,
                  el.name === selectedCategory ? selectedStyle : null,
                ]}>
                {capitalize(el.name)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CoffeeCategories;

const styles = StyleSheet.create({
  CategoryContentContainerStyle: {
    gap: 20,
  },
  CategoryName: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryLightGreyHex,
  },
});
