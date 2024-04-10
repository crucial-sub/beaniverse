import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SPACING} from '../../theme/theme';
import BackButton from './BackButton';
import MenuButton from './MenuButton';
import ProfileImage from './ProfileImage';

interface HeaderBarProps {
  title?: string;
  leftIcon: string;
}

const HeaderBar = ({title, leftIcon}: HeaderBarProps) => {
  return (
    <View style={styles.HeaderContainer}>
      {leftIcon === 'back' ? <BackButton /> : <MenuButton />}
      <Text style={styles.title}>{title}</Text>
      {title === 'Payment' ? <></> : <ProfileImage />}
    </View>
  );
};

export default React.memo(HeaderBar);

const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: 'row',
    height: SPACING.space_36,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_30,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
});
