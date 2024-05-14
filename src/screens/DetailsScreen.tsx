import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../navigators/navigation';

type DetailsScreenProps = StackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen = ({route}: DetailsScreenProps) => {
  return (
    <View>
      <Text>DetailsScreen</Text>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
