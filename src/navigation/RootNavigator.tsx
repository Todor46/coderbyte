import React from 'react';
import { RootStackParamList } from './routes';
import Checkout from '../screens/Checkout';
import Completed from '../screens/Completed';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootNavigator = () => {
  const Navigator = createNativeStackNavigator<RootStackParamList>();

  return (
    <Navigator.Navigator>
      <Navigator.Screen
        name="Checkout"
        component={Checkout}
        options={{ headerShown: false }}
      />
      <Navigator.Screen
        name="Completed"
        component={Completed}
        options={{ headerBackButtonMenuEnabled: true }}
      />
    </Navigator.Navigator>
  );
};

export default RootNavigator;
