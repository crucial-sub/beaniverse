import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import {capitalize} from '../../utils';
import BackButton from './BackButton';

type HeaderWithoutBottomTabPropsType = {
  title: string;
};

const HeaderWithoutBottomTab = ({title}: HeaderWithoutBottomTabPropsType) => {
  return (
    <View style={style.Header}>
      <BackButton />
      <Text style={style.Title}>{capitalize(title)}</Text>
    </View>
  );
};

export default HeaderWithoutBottomTab;

const style = StyleSheet.create({
  Header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Title: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    height: 36,
    lineHeight: 36,
  },
});
