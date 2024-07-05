import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RootNavigationProp} from '../../navigators/navigation';
import {CoffeeAndBeansType} from '../../recoil';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import {capitalize} from '../../utils';
import HeartButton from '../Header/HeartButton';

interface CoffeeBeanCardProps {
  coffeeBean: CoffeeAndBeansType;
}

const CoffeeBeanCard = ({coffeeBean}: CoffeeBeanCardProps) => {
  const navigation = useNavigation<RootNavigationProp>();
  const handlePress = () => {
    navigation.navigate('Details', {id: coffeeBean.id});
  };

  return (
    <TouchableOpacity style={styles.Container} onPress={handlePress}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.LinearGradientBG}>
        <ImageBackground
          source={{uri: coffeeBean.imageUrl}}
          style={styles.CoffeeImageBG}></ImageBackground>
        <View style={styles.CardInfoWrapper}>
          <Text style={styles.CoffeeName}>{capitalize(coffeeBean.name)}</Text>
          <Text style={styles.CoffeeOrigin}>{`From ${capitalize(
            coffeeBean.origin.country,
          )}`}</Text>
          <View style={styles.CardBottomWrapper}>
            <View style={styles.CoffeePriceWrapper}>
              <Text style={styles.DollarSign}>$ </Text>
              <Text style={styles.CoffeePrice}>
                {coffeeBean.price.toFixed(2)}
              </Text>
            </View>
            <HeartButton id={coffeeBean.id} />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default React.memo(CoffeeBeanCard);

const styles = StyleSheet.create({
  Container: {},
  LinearGradientBG: {
    borderWidth: 1,
    borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_23,
    backgroundColor: COLORS.secondaryDarkGreyHex,
    width: 150,
    height: 250,
    padding: 12,
    gap: SPACING.space_10,
  },
  CoffeeImageBG: {
    width: 126,
    height: 126,
    borderRadius: BORDERRADIUS.radius_16,
    overflow: 'hidden',
  },
  CoffeeRatingWrapper: {
    position: 'absolute',
    width: 53,
    height: 22,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: BORDERRADIUS.radius_16,
    borderTopRightRadius: BORDERRADIUS.radius_16,
    gap: 4,
  },
  CoffeeRating: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  CardInfoWrapper: {
    gap: 5,
  },
  CoffeeName: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_13,
    color: COLORS.primaryWhiteHex,
  },
  CoffeeOrigin: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_9,
    color: COLORS.primaryWhiteHex,
  },
  CardBottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CoffeePriceWrapper: {
    flexDirection: 'row',
  },
  DollarSign: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
  },
  CoffeePrice: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
});
