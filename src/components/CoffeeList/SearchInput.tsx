import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import SearchIcon from '../../assets/svg_images/search.svg';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';

const SearchInput = () => {
  return (
    <View style={styles.Wrapper}>
      <SearchIcon fill={COLORS.primaryLightGreyHex} />
      <TextInput
        style={styles.TextInput}
        placeholder="Find Your Coffee..."
        placeholderTextColor={COLORS.primaryLightGreyHex}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  Wrapper: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_15,
    height: 45,
    alignItems: 'center',
    gap: 20,
    paddingLeft: 20,
  },
  TextInput: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
  },
});
