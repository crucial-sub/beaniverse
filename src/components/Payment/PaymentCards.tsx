import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {PaymentCardType} from '../../api/apiPayment';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import PaymentCardItem from './PaymentCardItem';

type PaymentCardsPropsType = {
  cards: PaymentCardType[];
};

const PaymentCards = ({cards}: PaymentCardsPropsType) => {
  const renderItem = React.useCallback(({item}: {item: PaymentCardType}) => {
    return <PaymentCardItem item={item} />;
  }, []);

  const keyExtractor = (item: PaymentCardType) => `payment-card-${item.id}`;

  return (
    <View style={styles.CardsWrapper}>
      <Text style={styles.Title}>Credit Card</Text>
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{gap: 30}}
      />
    </View>
  );
};

export default PaymentCards;

const styles = StyleSheet.create({
  CardsWrapper: {
    width: 350,
    minHeight: 241,
    borderRadius: BORDERRADIUS.radius_25,
    borderWidth: 2,
    borderColor: COLORS.tertiaryGreyHex,
    paddingHorizontal: 13,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 10,
  },
  Title: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
  },
});
