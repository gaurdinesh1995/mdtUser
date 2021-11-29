import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useSelector} from 'react-redux';
import OnboardingNavigation from './OnboardingNavigation';
import Dashboardnavigation from './DashboardNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from '../Components/Toast/Toast';
export default () => {
  let onboardCompleted = false;
  const {user} = useSelector((state) => ({
    ...state.auth.user,
  }));
  if (user !== undefined) {
    onboardCompleted = true;
  }
  return (
    <>
      {onboardCompleted ? (
        <Dashboardnavigation />
      ) : (
        <SafeAreaProvider>
          <OnboardingNavigation />
        </SafeAreaProvider>
      )}
      <Toast />
    </>
  );
};
