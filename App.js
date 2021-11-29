/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import Routes from './src/Navigation/Routes';
import theme from './src/Components/Theme/Index';
import {ThemeProvider} from '@shopify/restyle';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/Redux/Store';
import {LogBox} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  useEffect(() => {
    registerAppWithFCM();
    //backgroundNotification();
  }, []);

  const registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      const granted = await messaging().requestPermission();
      if (granted) {
        const fcmToken = await messaging().getToken();
        await AsyncStorage.setItem('fcmtoken', JSON.stringify(fcmToken));
        console.log(fcmToken, 'FCM Token');
        messaging().onMessage(async (remoteMessage) => {
          // if (
          //   remoteMessage.data.type === 'BYTES_REDEEM_REQUESTED' ||
          //   remoteMessage.data.type === 'BYTES_REQUESTED'
          // ) {
          //   const currentRoute = navigationRef.current.getCurrentRoute();
          //   if (
          //     currentRoute.name === 'Dashboard' ||
          //     currentRoute.name === 'Notification'
          //   ) {
          //     const refreshFunction = currentRoute.params.refresh;
          //     if (refreshFunction) refreshFunction();
          //   }
          // }
        });
      } else {
        console.log('User declined messaging permissions :(');
      }
    } else {
      const granted = messaging().requestPermission();
      const fcmToken = await messaging().getToken();

      await AsyncStorage.setItem('fcmtoken', JSON.stringify(fcmToken));
      console.log(fcmToken, 'FCM Token');
      // messaging().onMessage(async (remoteMessage) => {
      //   if (
      //     remoteMessage.data.type === 'BYTES_REDEEM_REQUESTED' ||
      //     remoteMessage.data.type === 'BYTES_REQUESTED'
      //   ) {
      //     const currentRoute = navigationRef.current.getCurrentRoute();
      //     if (
      //       currentRoute.name === 'Dashboard' ||
      //       currentRoute.name === 'Notification'
      //     ) {
      //       const refreshFunction = currentRoute.params.refresh;
      //       if (refreshFunction) refreshFunction();
      //     }
      //   }
      // });
    }
  };

  const backgroundNotification = () => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      // if (remoteMessage.data.type === 'BYTES_REDEEM_REQUESTED') {
      //   const currentRoute = navigationRef.current.getCurrentRoute();
      //   if (
      //     currentRoute.name === 'Dashboard' ||
      //     currentRoute.name === 'Notification'
      //   ) {
      //     const refreshFunction = currentRoute.params.refresh;
      //     if (refreshFunction) refreshFunction();
      //   }
      // }
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
