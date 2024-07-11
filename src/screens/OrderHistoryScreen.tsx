import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  CoffeeOrderType,
  OrderHistoryType,
  getOrderHistory,
} from '../api/apiUser';
import HeaderWithoutBottomTab from '../components/Header/HeaderWithoutBottomTab';
import OrderItem from '../components/OrderHistory/OrderItem';
import {COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}th ${date.toLocaleString('default', {
    month: 'long',
  })} ${date.getHours()}:${date.getMinutes()}`;
};

export interface SectionDataType extends CoffeeOrderType {
  orderId: number;
  itemId: string;
}

const createSections = (data: OrderHistoryType[]) => {
  const sections = data
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .map(order => ({
      title: formatDate(order.createdAt),
      totalPrice: order.totalPrice,
      data: Object.keys(order.orderGroupByCoffeeId).map(key => ({
        orderId: order.id,
        itemId: key,
        ...order.orderGroupByCoffeeId[key],
      })),
    }));
  return sections;
};

const OrderHistoryScreen = () => {
  const {data, isLoading, isSuccess} = useQuery<OrderHistoryType[]>({
    queryKey: ['get-order-history'],
    queryFn: getOrderHistory,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
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
  }

  const renderItem = ({item}: {item: SectionDataType}) => {
    return <OrderItem item={item} />;
  };
  const keyExtractor = (item: SectionDataType) => {
    return `order-section-list-item-${item.orderId}-${item.itemId}`;
  };

  const sections = createSections(data || []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HeaderWithoutBottomTab title="Order History" />
      {isSuccess && data && data.length > 0 ? (
        <SectionList
          contentContainerStyle={styles.SectionListContent}
          style={styles.SectionList}
          sections={sections}
          stickySectionHeadersEnabled={false}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          renderSectionHeader={({section}) => (
            <View style={styles.SectionHeader}>
              <View>
                <Text style={styles.OrderDateLabel}>Order Date</Text>
                <Text style={styles.OrderDate}>{section.title}</Text>
              </View>
              <View>
                <Text style={styles.TotalAmountLabel}>Total Amount</Text>
                <Text style={styles.TotalAmount}>
                  {`$ ${section.totalPrice.toFixed(2)}`}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.EmptyContainer}>
          <Text style={styles.EmptyText}>No History</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  SectionList: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  SectionListContent: {
    paddingBottom: 50,
    gap: 20,
  },
  SectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: COLORS.primaryBlackHex,
  },
  OrderDateLabel: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  OrderDate: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_light,
  },
  TotalAmountLabel: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  TotalAmount: {
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_semibold,
    alignSelf: 'flex-end',
  },
  EmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  EmptyText: {
    color: COLORS.primaryWhiteHex,
    fontSize: 16,
    textAlign: 'center',
  },
});
