import debounce from 'lodash/debounce';
import React from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {searchTextState, selectedCoffeeCategoryState} from '../../recoil';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';

const SearchInput = () => {
  const [searchText, setSearchText] = useRecoilState(searchTextState);
  const setSelectedCategory = useSetRecoilState(selectedCoffeeCategoryState);

  const debouncedSearch = React.useCallback(
    debounce(text => {
      setSearchText(text);
    }, 300),
    [],
  );

  React.useEffect(() => {
    debouncedSearch(searchText);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchText]);

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleInputChange = (text: string) => {
    setSearchText(text);
    if (text.length > 0) {
      setSelectedCategory('all');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <View style={styles.Wrapper}>
        <TextInput
          style={styles.TextInput}
          placeholder="Search..."
          placeholderTextColor={COLORS.tertiaryLightGreyHex}
          value={searchText}
          onChangeText={handleInputChange}
        />
      </View>
    </TouchableWithoutFeedback>
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
    width: '100%',
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
  },
});
