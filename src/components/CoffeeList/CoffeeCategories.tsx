import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {coffeeCategoriesState} from '../../recoil';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import {capitalize} from '../../utils';

const CoffeeCategories = () => {
  const [coffeeCategories, setCoffeeCategories] = useRecoilState(
    coffeeCategoriesState,
  );
  if (!coffeeCategories) return;
  const arr = [{id: 0, name: 'all'}, ...coffeeCategories];
  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.CategoryContentContainerStyle}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {arr.map(el => {
          return <Text style={styles.CategoryName}>{capitalize(el.name)}</Text>;
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
