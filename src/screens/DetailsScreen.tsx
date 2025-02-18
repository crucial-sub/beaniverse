import {RouteProp, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useRecoilState} from 'recoil';
import {CoffeeAndBeansDetailType, getCoffeeDetails} from '../api/apiCoffee';
import BeanIcon from '../assets/svg_images/bean.svg';
import CoffeeIcon from '../assets/svg_images/coffee.svg';
import LocationIcon from '../assets/svg_images/location.svg';
import StarIcon from '../assets/svg_images/star.svg';
import HeartButton from '../components/Favorites/HeartButton';
import BackButton from '../components/Header/BackButton';
import {MainStackParamList} from '../navigators/MainStackNavigator';
import {PaymentCartStateType, paymentCartListState} from '../recoil';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {capitalize} from '../utils';

const {height: screenHeight} = Dimensions.get('window');
const IMAGE_BG_HEIGHT = screenHeight * 0.6;
const DETAILINFO_HEIGHT = 148.2;
const DESCRIPTION_HEIGHT = screenHeight - IMAGE_BG_HEIGHT;
const MAX_HEIGHT = screenHeight * 0.675;

type RouteProps = RouteProp<MainStackParamList, 'Details'>;

const DetailsScreen = () => {
  const route = useRoute<RouteProps>();
  const {params} = route;

  const height = useSharedValue(DESCRIPTION_HEIGHT);
  const startY = useSharedValue(0);
  const headerHeight = useSharedValue(32);

  const {data, isLoading} = useQuery<CoffeeAndBeansDetailType, Error>({
    queryKey: ['get-coffee-details', params?.id],
    queryFn: () => getCoffeeDetails(params?.id ?? 0),
    staleTime: 5 * 60 * 1000,
    enabled: Boolean(params?.id !== undefined),
  });
  const [selectedOptionIndex, setSelectedOptionIndex] = React.useState(0);
  const [paymentCartList, setPaymentCartList] =
    useRecoilState<PaymentCartStateType[]>(paymentCartListState);

  const handleSelectOption = (idx: number) => {
    setSelectedOptionIndex(idx);
  };

  const handleAddToCart = () => {
    if (!data) return;
    const selectedOptionId = data.options[selectedOptionIndex].id;
    const selectedCartItem = paymentCartList.find(
      item => item.coffeeId === data.id && item.optionId === selectedOptionId,
    );
    const newPaymentCartList = selectedCartItem
      ? paymentCartList.map(item =>
          item.coffeeId === data.id && item.optionId === selectedOptionId
            ? {...item, quantity: item.quantity + 1}
            : item,
        )
      : [
          ...paymentCartList,
          ...data.options.map(opt => ({
            coffeeId: data.id,
            optionId: opt.id,
            quantity: opt.id === selectedOptionId ? 1 : 0,
            price: opt.price,
          })),
        ];

    setPaymentCartList(newPaymentCartList);
  };

  const [numberOfLines, setNumberOfLines] = React.useState(3);

  const panGestureEvent = Gesture.Pan()
    .onStart(() => {
      startY.value = height.value;
    })
    .onUpdate(event => {
      height.value = startY.value - event.translationY;
      headerHeight.value = withTiming(
        height.value > DESCRIPTION_HEIGHT + 100 ? 0 : 32,
        {duration: 300},
      );

      if (height.value > DESCRIPTION_HEIGHT + 100) {
        runOnJS(setNumberOfLines)(0);
      } else {
        runOnJS(setNumberOfLines)(3);
      }
    })
    .onEnd(() => {
      height.value = withTiming(
        height.value > DESCRIPTION_HEIGHT + 100
          ? MAX_HEIGHT
          : DESCRIPTION_HEIGHT,
      );
    });

  const descriptionAnimatedStyle = useAnimatedStyle(() => {
    return {
      minHeight: DESCRIPTION_HEIGHT,
      height: height.value,
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: headerHeight.value,
    };
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

  return data ? (
    <View style={styles.Container}>
      <Animated.View style={[styles.DetailHeader, headerAnimatedStyle]}>
        <BackButton />
        <HeartButton id={data.id} isFavorite={data.isFavorite} />
      </Animated.View>
      <ImageBackground
        source={{uri: data.imageUrl}}
        style={styles.CoffeeImageBG}
      />
      <GestureDetector gesture={panGestureEvent}>
        <Animated.View
          style={[styles.DetailOptionWrapper, descriptionAnimatedStyle]}>
          <View style={styles.DetailInfoWrapper}>
            <View style={styles.DetailInfoLeft}>
              <View style={styles.ItemNameWrapper}>
                <Text style={styles.ItemName}>{capitalize(data.name)}</Text>
                {data.category && (
                  <Text style={styles.ItemCategoryName}>
                    {capitalize(data.category.name)}
                  </Text>
                )}
              </View>
              <View style={styles.ItemRatingWrapper}>
                <StarIcon
                  width={18.57}
                  height={18.42}
                  fill={COLORS.primaryOrangeHex}
                />
                <Text style={styles.ItemRating}>
                  {data.rating.average.toFixed(1)}
                </Text>
                <Text
                  style={
                    styles.ItemRatingCount
                  }>{`(${data.rating.total})`}</Text>
              </View>
            </View>
            <View style={styles.DetailInfoRight}>
              <View style={styles.DetailInfoRightTop}>
                <View style={styles.DetailInfoRightTopBox}>
                  {data.type === 'COFFEE' && (
                    <CoffeeIcon
                      width={24}
                      height={24}
                      fill={COLORS.primaryOrangeHex}
                      stroke={COLORS.primaryOrangeHex}
                      strokeWidth={0.407643}
                    />
                  )}
                  {data.type === 'COFFEE_BEAN' && (
                    <BeanIcon
                      width={24}
                      height={24}
                      fill={COLORS.primaryOrangeHex}
                    />
                  )}
                  <Text style={styles.DetailInfoRightText}>
                    {data.type === 'COFFEE' ? 'Coffee' : 'Bean'}
                  </Text>
                </View>
                <View style={styles.DetailInfoRightTopBox}>
                  <LocationIcon
                    width={24}
                    height={24}
                    fill={COLORS.primaryOrangeHex}
                  />
                  <Text style={styles.DetailInfoRightText}>
                    {capitalize(data.origin.country)}
                  </Text>
                </View>
              </View>
              <View style={styles.DetailInfoRightBottom}>
                <View style={styles.DetailInfoRightBottomBox}>
                  <Text style={styles.DetailInfoRightText}>
                    {`${capitalize(data.roastType.name)} Roasted`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.DescriptionWrapper}>
            <Text style={styles.DescriptionTitle}>Description</Text>
            <Text style={styles.DescriptionText} numberOfLines={numberOfLines}>
              {data.description}
            </Text>
          </View>
          <View style={styles.SizeWrapper}>
            <Text style={styles.SizeTitle}>Size</Text>
            <View style={styles.SizeTextWrapper}>
              {data.options.map((opt, idx) => (
                <TouchableOpacity
                  key={opt.id}
                  style={[
                    styles.SizeTextBox,
                    idx === selectedOptionIndex && styles.SelectedBox,
                  ]}
                  onPress={() => handleSelectOption(idx)}>
                  <Text
                    style={[
                      styles.SizeText,
                      idx === selectedOptionIndex && styles.SelectedText,
                    ]}>
                    {data.type === 'COFFEE'
                      ? opt.option.toUpperCase()
                      : `${opt.option}gm`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
      <View style={styles.BottomWrapper}>
        <View style={styles.PriceWrapper}>
          <Text style={styles.PriceTitle}>Price</Text>
          <View style={styles.PriceTextWrapper}>
            <Text style={styles.DollarSign}>$ </Text>
            <Text style={styles.PriceText}>
              {data.options[selectedOptionIndex].price.toFixed(2)}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.AddButton} onPress={handleAddToCart}>
          <Text style={styles.AddButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : null;
};

export default DetailsScreen;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: COLORS.primaryBlackHex,
    height: '100%',
  },
  DetailHeader: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: SPACING.space_20,
    overflow: 'hidden',
  },
  CoffeeImageBG: {
    height: IMAGE_BG_HEIGHT,
    overflow: 'hidden',
  },
  DetailOptionWrapper: {
    position: 'absolute',
    bottom: 0,
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
    minWidth: 55.71,
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
  SelectedBox: {borderColor: COLORS.primaryOrangeHex, borderWidth: 2},
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
  },
  SelectedText: {color: COLORS.primaryOrangeHex},
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
