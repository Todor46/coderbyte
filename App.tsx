import React from 'react';
import Loading from './src/components/Loading/Loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import StoreProvider from './src/store/StoreContext';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
  return (
    <StoreProvider>
      <NavigationContainer>
        <GestureHandlerRootView style={styles.container}>
          <Loading />
          <RootNavigator />
        </GestureHandlerRootView>
      </NavigationContainer>
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
