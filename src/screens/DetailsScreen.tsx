import {StackScreenProps} from '@react-navigation/stack';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {DETAIL_SAMPLE} from '../data';
import {RootStackParamList} from '../navigators/navigation';
import {CoffeeAndBeansDetailType} from '../recoil';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

type DetailsScreenProps = StackScreenProps<RootStackParamList, 'Details'>;

const screenHeight = Dimensions.get('window').height;
const IMAGE_BG_HEIGHT = screenHeight * 0.6;
const DESCRIPTION_HEIGHT = screenHeight - IMAGE_BG_HEIGHT;

const DetailsScreen = ({route}: DetailsScreenProps) => {
  const {id} = route.params!;
  const {data, isLoading} = useQuery<CoffeeAndBeansDetailType, Error>({
    queryKey: ['get-coffee-details', id],
    // queryFn: () => getCoffeeDetails(id),
    queryFn: () => DETAIL_SAMPLE[id - 1],
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading)
    return (
      <ActivityIndicator
        size={'large'}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLORS.primaryBlackHex,
        }}
      />
    );

  if (data)
    return (
      <View style={styles.Container}>
        <ImageBackground
          source={{uri: data.imageUrl}}
          style={styles.CoffeeImageBG}
        />
        <View style={styles.DetailInfoWrapper}>
          <View style={styles.DescriptionWrapper}>
            <Text style={styles.DescriptionTitle}>Description</Text>
            <Text style={styles.DescriptionText}>{data.description}</Text>
          </View>
          <View style={styles.SizeWrapper}>
            <Text style={styles.SizeTitle}>Size</Text>
            <View style={styles.SizeTextWrapper}>
              {data.options.map(opt => (
                <View key={opt.id} style={styles.SizeTextBox}>
                  <Text style={styles.SizeText}>{opt.size}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.BottomWrapper}>
          <View style={styles.PriceWrapper}>
            <Text style={styles.PriceTitle}>Price</Text>
            <View style={styles.PriceTextWrapper}>
              <Text style={styles.DollarSign}>$ </Text>
              <Text style={styles.PriceText}>10.50</Text>
            </View>
          </View>
          <View style={styles.AddButton}>
            <Text style={styles.AddButtonText}>Add to Cart</Text>
          </View>
        </View>
      </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: COLORS.primaryBlackHex,
  },
  CoffeeImageBG: {
    height: IMAGE_BG_HEIGHT,
    overflow: 'hidden',
  },
  DetailInfoWrapper: {
    height: DESCRIPTION_HEIGHT,
    backgroundColor: COLORS.primaryBlackHex,
    padding: SPACING.space_20,
    gap: SPACING.space_30,
  },
  DescriptionWrapper: {
    gap: SPACING.space_10,
  },
  DescriptionTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
    lineHeight: SPACING.space_20,
  },
  DescriptionText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
    lineHeight: SPACING.space_20,
  },
  SizeWrapper: {
    gap: SPACING.space_10,
  },
  SizeTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
    lineHeight: SPACING.space_20,
  },
  SizeTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SizeTextBox: {
    width: SPACING.space_100,
    height: SPACING.space_40,
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
    lineHeight: SPACING.space_20,
  },
  BottomWrapper: {
    width: '100%',
    height: SPACING.space_60,
    paddingHorizontal: SPACING.space_20,
    flexDirection: 'row',
    position: 'absolute',
    bottom: SPACING.space_40,
    justifyContent: 'space-between',
  },
  PriceWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  PriceTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
    lineHeight: SPACING.space_20,
  },
  PriceTextWrapper: {
    flexDirection: 'row',
  },
  DollarSign: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryOrangeHex,
  },
  PriceText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  AddButton: {
    width: 240,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    lineHeight: SPACING.space_20,
  },
});
