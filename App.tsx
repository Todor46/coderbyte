import React from 'react';
import Loading from './src/components/Loading/Loading';
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import StoreProvider from './src/store/StoreContext';
import Checkout from './src/screens/Checkout';
import { StyleSheet } from 'react-native';

const App = () => {
  return (
    <StoreProvider>
      <GestureHandlerRootView style={styles.container}>
        <Loading />
        <ScrollView style={styles.scrollContainer}>
          <Checkout />
        </ScrollView>
      </GestureHandlerRootView>
    </StoreProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
});
