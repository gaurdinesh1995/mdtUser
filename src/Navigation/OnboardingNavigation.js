import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './RootNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Login from '../Components/Authentication/Login/Login';
import Signup from '../Components/Authentication/Signup/Signup';
import VerifyPhoneNumber from '../Components/Authentication/VerifyPhoneNumber/VerifyPhoneNumber';
import ResetPassword from '../Components/Authentication/ResetPassword/ResetPassword';
import Dashboard from '../Components/Dashboard/Dashboard';
const Stack = createStackNavigator();

export default () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator headerMode="none" initialRouteName={'Welcome'}>
          <>
            <Stack.Screen
              name="Login"
              initialParams={{space: insets}}
              component={Login}
            />
            <Stack.Screen
              name="Signup"
              initialParams={{space: insets}}
              component={Signup}
            />
            <Stack.Screen
              name="Verify"
              initialParams={{space: insets}}
              component={VerifyPhoneNumber}
            />
            <Stack.Screen
              name="ResetPassword"
              initialParams={{space: insets}}
              component={ResetPassword}
            />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
