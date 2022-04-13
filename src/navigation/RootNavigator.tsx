import React from 'react';
import { RootStackParamList } from './routes';
import Checkout from '../screens/Checkout';
import Completed from '../screens/Completed';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootNavigator = () => {
  const Navigator = createNativeStackNavigator<RootStackParamList>();

  return (
    <Navigator.Navigator screenOptions={{ headerShown: false }}>
      <Navigator.Screen name="Checkout" component={Checkout} />
      <Navigator.Screen name="Completed" component={Completed} />
    </Navigator.Navigator>
  );
};

export default RootNavigator;
