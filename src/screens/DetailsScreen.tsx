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
import BeanIcon from '../assets/svg_images/bean.svg';
import CoffeeIcon from '../assets/svg_images/coffee.svg';
import LocationIcon from '../assets/svg_images/location.svg';
import StarIcon from '../assets/svg_images/star.svg';
import BackButton from '../components/Header/BackButton';
import HeartButton from '../components/Header/HeartButton';
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
const DETAILINFO_HEIGHT = 148.2;
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
        <View style={styles.DetailHeader}>
          <BackButton />
          <HeartButton />
        </View>
        <ImageBackground
          source={{uri: data.imageUrl}}
          style={styles.CoffeeImageBG}
        />
        <View style={styles.DetailOptionWrapper}>
          <View style={styles.DetailInfoWrapper}>
            <View style={styles.DetailInfoLeft}>
              <View style={styles.ItemNameWrapper}>
                <Text style={styles.ItemName}>{data.name}</Text>
                {data.category && (
                  <Text style={styles.ItemCategoryName}>
                    {data.category.name}
                  </Text>
                )}
              </View>
              <View style={styles.ItemRatingWrapper}>
                <StarIcon
                  width={18.57}
                  height={18.42}
                  fill={COLORS.primaryOrangeHex}
                />
                <Text style={styles.ItemRating}>{data.rating}</Text>
                <Text
                  style={
                    styles.ItemRatingCount
                  }>{`(${data.ratingCount})`}</Text>
              </View>
            </View>
            <View style={styles.DetailInfoRight}>
              <View style={styles.DetailInfoRightTop}>
                <View style={styles.DetailInfoRightTopBox}>
                  {data.type === 'COFFEE' ? (
                    <CoffeeIcon
                      width={24}
                      height={24}
                      fill={COLORS.primaryOrangeHex}
                      stroke={COLORS.primaryOrangeHex}
                      strokeWidth={0.407643}
                    />
                  ) : data.type === 'COFFEE_BEAN' ? (
                    <BeanIcon
                      width={24}
                      height={24}
                      fill={COLORS.primaryOrangeHex}
                      // stroke={COLORS.primaryOrangeHex}
                    />
                  ) : null}
                  <Text style={styles.DetailInfoRightText}>
                    {data.type === 'COFFEE'
                      ? 'Coffee'
                      : data.type === 'COFFEE_BEAN'
                      ? 'Bean'
                      : null}
                  </Text>
                </View>
                <View style={styles.DetailInfoRightTopBox}>
                  <LocationIcon
                    width={24}
                    height={24}
                    fill={COLORS.primaryOrangeHex}
                  />
                  <Text style={styles.DetailInfoRightText}>
                    {data.origin.country}
                  </Text>
                </View>
              </View>
              <View style={styles.DetailInfoRightBottom}>
                <View style={styles.DetailInfoRightBottomBox}>
                  <Text style={styles.DetailInfoRightText}>
                    {data.roastType.name}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.DescriptionWrapper}>
            <Text style={styles.DescriptionTitle}>Description</Text>
            <Text style={styles.DescriptionText} numberOfLines={3}>
              {data.description}
            </Text>
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
  DetailHeader: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: SPACING.space_20,
  },
  CoffeeImageBG: {
    height: IMAGE_BG_HEIGHT,
    overflow: 'hidden',
  },
  DetailOptionWrapper: {
    height: DESCRIPTION_HEIGHT,
    backgroundColor: COLORS.primaryBlackHex,
    padding: SPACING.space_20,
    gap: SPACING.space_30,
  },
  DetailInfoWrapper: {
    position: 'absolute',
    top: -DETAILINFO_HEIGHT,
    left: 0,
    right: 0,
    height: DETAILINFO_HEIGHT,
    backgroundColor: COLORS.tertiaryBlackRGBA,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingTop: 24,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  DetailInfoLeft: {
    justifyContent: 'space-between',
  },
  ItemNameWrapper: {
    gap: 5,
  },
  ItemName: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  ItemCategoryName: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
  },
  ItemRatingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ItemRating: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  ItemRatingCount: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.secondaryLightGreyHex,
  },
  DetailInfoRight: {
    justifyContent: 'space-between',
  },
  DetailInfoRightTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  DetailInfoRightTopBox: {
    width: 55.71,
    height: 55.71,
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  DetailInfoRightText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.secondaryLightGreyHex,
  },
  DetailInfoRightBottom: {},
  DetailInfoRightBottomBox: {
    width: 131.49,
    height: 44.57,
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  DescriptionWrapper: {
    gap: SPACING.space_10,
  },
  DescriptionTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
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
  },
});
