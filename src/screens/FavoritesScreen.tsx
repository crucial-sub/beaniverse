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
    <FavoriteCard item={item} />
  );
  const keyExtractor = (item: FavoritesType) => `favorite-${item.id}`;

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
        {isSuccess && data && data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.contentContainer}
          />
        ) : (
          <View style={styles.EmptyContainer}>
            <Text style={styles.EmptyText}>No favorites yet</Text>
          </View>
        )}
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
    alignItems: 'center',
    gap: 30,
    paddingBottom: 50,
  },
  Title: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_medium,
    height: 36,
    lineHeight: 36,
  },
  columnWrapper: {
    gap: 30,
  },
  contentContainer: {
    paddingHorizontal: SPACING.space_10,
    gap: 24,
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
