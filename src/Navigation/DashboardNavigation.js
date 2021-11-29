import React from 'react';
import {Platform, BackHandler, useWindowDimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Drawerr from '../Components/Drawer/Drawer';
import {navigationRef} from './RootNavigation';
import Dashboard from '../Components/Dashboard/Dashboard';
import Tabs from '../Components/Tabs/Tabs';
import TopTabs from '../Components/Tabs/TopTabs';
import SelectAddress from '../Components/SelectAddress/SelectAddress';
import GoogleMaps from '../Components/GoogleMaps/GoogleMaps';
import Menu from '../Components/Menu/Menu';
import MenuSearch from '../Components/Menu/MenuSearch';
import Cart from '../Components/Cart/Cart';
import CartSummary from '../Components/CartSummary/CartSummary';
import OrderSuccess from '../Components/Order/OrderSuccess';
import UserProfile from '../Components/UserProfile/UserProfile';
import ComingSoon from '../Components/ComingSoon/ComingSoon';
import SingleFoodItem from '../Components/SingleFoodItem.js/SingleFoodItem';
import Scanner from '../Components/Scanner/Scanner';
import ECDashboard from '../Components/ECommerce/ECDashboard';
import ECSingleItem from '../Components/SingleFoodItem.js/ECSingleItem';
import EditProfile from '../Components/EditProfile/EditProfile';
import ChangePassword from '../Components/ChangePassword/ChangePassword';
import OrderDeliverySingle from '../Components/OrderDeliverySingle/OrderDeliverySingle';
import VerifyPhoneNumber from '../Components/Authentication/VerifyPhoneNumber/VerifyPhoneNumber';
import Vouchers from '../Components/Vouchers/Vouchers';
import RedeemedVouchers from '../Components/RedeemedVouchers/RedeemedVouchers';
import NotificationScreen from '../Components/Notification/Notification';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function backButtonHandler() {
  return true;
}
BackHandler.addEventListener('hardwareBackPress', backButtonHandler);

function TabsStack() {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName="tab"
      headerMode={'none'}
      screenOptions={
        Platform.OS === 'ios'
          ? {headerShown: false, gestureEnabled: false}
          : {headerShown: false}
      }>
      <Stack.Screen
        name="tab"
        component={Tabs}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
    </Stack.Navigator>
  );
}

export const UserStack = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName="UserProfile"
      headerMode={'none'}
      screenOptions={
        Platform.OS === 'ios'
          ? {headerShown: false, gestureEnabled: false}
          : {headerShown: false}
      }>
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
      <Stack.Screen
        name="Vouchers"
        component={Vouchers}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
      <Stack.Screen
        name="RedeemedVouchers"
        component={RedeemedVouchers}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />

      {/* <Stack.Screen
        name="Verify"
        component={VerifyPhoneNumber}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      /> */}
    </Stack.Navigator>
  );
};
export const ComingSoonStack = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName="ComingSoon"
      headerMode={'none'}
      screenOptions={
        Platform.OS === 'ios'
          ? {headerShown: false, gestureEnabled: false}
          : {headerShown: false}
      }>
      <Stack.Screen
        name="ComingSoon"
        component={ComingSoon}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
    </Stack.Navigator>
  );
};
export const TopTabsStack = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      headerMode={'none'}
      screenOptions={
        Platform.OS === 'ios'
          ? {headerShown: false, gestureEnabled: false}
          : {headerShown: false}
      }>
      <Stack.Screen
        name="Tabs"
        component={TopTabs}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
      <Stack.Screen
        name="OrderDeliverySingle"
        component={OrderDeliverySingle}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
    </Stack.Navigator>
  );
};

export const ScannerStack = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName="Scanner"
      headerMode={'none'}
      screenOptions={
        Platform.OS === 'ios'
          ? {headerShown: false, gestureEnabled: false}
          : {headerShown: false}
      }>
      <Stack.Screen
        name="Scanner"
        component={Scanner}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
    </Stack.Navigator>
  );
};

export const DashboardStack = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      headerMode={'none'}
      screenOptions={
        Platform.OS === 'ios'
          ? {headerShown: false, gestureEnabled: false}
          : {headerShown: false}
      }>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
      <Stack.Screen
        name="SelectAddress"
        component={SelectAddress}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
      <Stack.Screen
        name="GoogleMap"
        component={GoogleMaps}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
      <Stack.Screen
        name="MenuSearch"
        component={MenuSearch}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
      <Stack.Screen
        name="ECDashboard"
        component={ECDashboard}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
      <Stack.Screen
        name="ECSingleItem"
        component={ECSingleItem}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
      <Stack.Screen
        name="SingleFood"
        component={SingleFoodItem}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
    </Stack.Navigator>
  );
};

export const CartStack = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName="Cart"
      headerMode={'none'}
      screenOptions={
        Platform.OS === 'ios'
          ? {headerShown: false, gestureEnabled: false}
          : {headerShown: false}
      }>
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
      <Stack.Screen
        name="CartSummary"
        component={CartSummary}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccess}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
      <Stack.Screen
        name="SingleFood"
        component={SingleFoodItem}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
    </Stack.Navigator>
  );
};

export default () => {
  const dimensions = useWindowDimensions();
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <TabsStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
