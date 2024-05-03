import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil';
import {navigationRef} from './lib/navigation';
import MainScreen from './screens/MainScreen';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.flexOne}>
        <RecoilRoot>
          <NavigationContainer ref={navigationRef}>
            <MainScreen />
          </NavigationContainer>
        </RecoilRoot>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
});
