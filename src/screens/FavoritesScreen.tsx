import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FavoritesType, getFavorites} from '../api/apiUser';
import FavoriteCard from '../components/Favorites/FavoriteCard';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

const FavoritesScreen = () => {
  const {data, isLoading, isSuccess} = useQuery<FavoritesType[], Error>({
    queryKey: ['get-favorites'],
    queryFn: getFavorites,
    staleTime: 5 * 60 * 1000,
  });

  const renderItem = ({item}: {item: FavoritesType}) => (
    // <View style={styles.itemWrapper}>
    <FavoriteCard item={item} />
    // </View>
  );

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

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.Container}>
        <Text style={styles.Title}>Favorites</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => `favorite-${item.id}`}
          numColumns={2}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </SafeAreaView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  Container: {
    flex: 1,
    // width: '100%',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 50,
  },
  Title: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  contentContainer: {
    paddingHorizontal: SPACING.space_10,
    paddingBottom: SPACING.space_20,
  },
  itemWrapper: {
    flex: 1,
    padding: SPACING.space_10,
  },
});
