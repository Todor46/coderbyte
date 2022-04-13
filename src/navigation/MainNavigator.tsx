import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../config/colors';
import Profile from '../screens/Profile';

const MainNavigator = () => {
  const Tab = createBottomTabNavigator();

  const options = (iconName: string): BottomTabNavigationOptions => ({
    tabBarIcon: ({ focused }) => (
      <Icon
        name={iconName}
        color={focused ? Colors.primary : Colors.text}
        size={26}
      />
    ),
    tabBarLabel: () => null,
  });

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} options={options('home')} />
      <Tab.Screen
        name="New"
        component={Home}
        options={options('plus-square')}
      />
      <Tab.Screen
        name="Notifications"
        component={Home}
        options={options('bell')}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={options('user')}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
