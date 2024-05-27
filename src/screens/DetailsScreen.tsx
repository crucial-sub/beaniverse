import {StackScreenProps} from '@react-navigation/stack';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {getCoffeeDetails} from '../api/apiCoffee';
import {RootStackParamList} from '../navigators/navigation';
import {CoffeeAndBeansType} from '../recoil';
import {COLORS} from '../theme/theme';

type DetailsScreenProps = StackScreenProps<RootStackParamList, 'Details'>;

const screenHeight = Dimensions.get('window').height;
const IMAGE_BG_HEIGHT = screenHeight * 0.6;

const DetailsScreen = ({route}: DetailsScreenProps) => {
  const {id} = route.params!;
  const {data, isLoading} = useQuery<CoffeeAndBeansType, Error>({
    queryKey: ['get-coffee-details', id],
    queryFn: () => getCoffeeDetails(id),
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

  return (
    <View>
      <ImageBackground
        source={{uri: data!.imageUrl}}
        style={styles.CoffeeImageBG}></ImageBackground>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  CoffeeImageBG: {
    height: IMAGE_BG_HEIGHT,
    overflow: 'hidden',
  },
});
