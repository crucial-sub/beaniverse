import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useRecoilState} from 'recoil';
import SearchIcon from '../../assets/svg_images/search.svg';
import {searchTextState} from '../../recoil';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';

const SearchInput = () => {
  const [searchText, setSearchText] = useRecoilState(searchTextState);
  const handleChangeValue = (text: string) => {
    setSearchText(text);
  };
  return (
    <View style={styles.Wrapper}>
      <SearchIcon fill={COLORS.primaryLightGreyHex} />
      <TextInput
        style={styles.TextInput}
        placeholder="Find Your Coffee..."
        placeholderTextColor={COLORS.primaryLightGreyHex}
        value={searchText}
        onChangeText={handleChangeValue}
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
