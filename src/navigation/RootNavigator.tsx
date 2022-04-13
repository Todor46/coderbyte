import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './routes';
import MainNavigator from './MainNavigator';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import useStore from '../hooks/useStore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { usersCollection } from '../config/firebase';
import RemoveAccount from '../screens/RemoveAccount';

const RootNavigator = () => {
  const Navigator = createNativeStackNavigator<RootStackParamList>();
  const {
    state: { user },
  } = useStore();

  const { dispatch } = useStore();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(
      async (userState: FirebaseAuthTypes.User | null) => {
        if (userState) {
          const userData = (
            await usersCollection.doc(userState.uid).get()
          ).data();

          dispatch({ type: 'SET_USER', payload: userData });
        } else {
          dispatch({ type: 'SET_USER', payload: undefined });
        }
      },
    );

    return () => {
      subscriber();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Navigator.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Navigator.Screen name="Main" component={MainNavigator} />
          <Navigator.Screen name="RemoveAccount" component={RemoveAccount} />
        </>
      ) : (
        <>
          <Navigator.Screen name="Login" component={Login} />
          <Navigator.Screen name="Signup" component={Signup} />
        </>
      )}
    </Navigator.Navigator>
  );
};

export default RootNavigator;
