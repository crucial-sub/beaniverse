import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CoffeeType} from '../../recoil';
import {COLORS, SPACING} from '../../theme/theme';

interface CoffeeCardProps {
  coffee: CoffeeType;
}

const CoffeeCard = ({coffee}: CoffeeCardProps) => {
  return (
    <TouchableOpacity style={styles.Container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.LinearGradientBG}>
        <ImageBackground
          source={{uri: coffee.imageUrl}}
          style={styles.CardImageBG}></ImageBackground>
        <Text>{coffee.name}</Text>
        <Text>{`From ${coffee.origin.country}`}</Text>
        <View>
          <View>
            <Text>$</Text>
            <Text>{coffee.price}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CoffeeCard;

const styles = StyleSheet.create({
  Container: {
    borderWidth: 1,
    borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryDarkGreyHex,
    overflow: 'hidden',
    width: 150,
    height: 250,
  },
  LinearGradientBG: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  CardImageBG: {
    width: 126,
    height: 126,
    borderRadius: SPACING.space_16,
  },
  CardName: {},
});
