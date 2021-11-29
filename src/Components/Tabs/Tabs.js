import React, {useRef, useReducer, useEffect} from 'react';
import {View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import style from './style';
import {
  DashboardStack,
  CartStack,
  UserStack,
  ComingSoonStack,
  ScannerStack,
  TopTabsStack,
} from '../../Navigation/DashboardNavigation';
const Tab = createBottomTabNavigator();
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const HomeSelected = require('../../assets/Tabs/HomeSelected.png');
const HomeUnselected = require('../../assets/Tabs/HomeUnselected.png');
const Home = require('../../assets/Tabs/home.png');
const List = require('../../assets/Tabs/list.png');
const Scanner = require('../../assets/Tabs/scanner.png');
const Bag = require('../../assets/Tabs/bag.png');
const Profile = require('../../assets/Tabs/profile.png');

import {createBox, createText} from '@shopify/restyle';
import {palette} from '../Theme/Index';
import ComingSoon from '../ComingSoon/ComingSoon';
const Box = createBox();
const Text = createText();

const tabBarIcon = (focused, name, iconSelected) =>
  focused ? (
    <Box
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: 30,
      }}>
      <Image
        source={iconSelected}
        style={{
          marginTop: 15,
          tintColor: !name === 20 && palette.primary,
        }}
      />
      <Box
        mt="s"
        height={4}
        width={4}
        backgroundColor="primary"
        borderRadius={2}
      />
    </Box>
  ) : (
    <Box style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Image
        source={name}
        style={{
          marginTop: 10,
          tintColor: !name === 20 && palette.support4,
        }}
      />
    </Box>
  );

const TabContainer = (props) => {
  const {route} = props;
  let param = '';
  if (route && route.params !== undefined) {
    param = route.params.space;
  }
  /**
   * @function setTabVisible
   * @param {*} route
   * @returns boolean.
   */
  const setTabVisible = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    //   console.log({routeName});
    switch (routeName) {
      case 'SelectAddress':
        return false;
      case 'GoogleMap':
        return false;
      case 'ChangePassword':
        return false;
      case 'EditProfile':
        return false;
      case 'OrderDeliverySingle':
        return false;
      case 'Menu':
        return false;
      case 'Vouchers':
        return false;
      case 'RedeemedVouchers':
        return false;
      default:
        return true;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        //paddingBottom: param && param !== '' ? param.bottom : 0,
      }}>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: palette.support,
          inactiveTintColor: palette.support1,
          labelStyle: style.tabBarItemLabel,
          tabStyle: style.tabBarStyle,
          style: style.height_55,
        }}>
        <Tab.Screen
          name="Home"
          component={DashboardStack}
          initialParams={{}}
          options={({route}) => ({
            tabBarLabel: 'Home',
            tabBarVisible: setTabVisible(route),
            tabBarIcon: ({focused}) => tabBarIcon(focused, Home, Home),
          })}
        />
        <Tab.Screen
          name="Explore"
          component={ComingSoonStack}
          initialParams={{}}
          options={({route}) => ({
            tabBarLabel: 'Explore',
            tabBarVisible: setTabVisible(route),
            tabBarIcon: ({focused}) => tabBarIcon(focused, List, List),
          })}
        />
        <Tab.Screen
          name="Scanner"
          component={ScannerStack}
          initialParams={{
            space: param,
          }}
          options={({route}) => ({
            tabBarLabel: 'History',
            tabBarVisible: setTabVisible(route),
            tabBarIcon: ({focused}) => tabBarIcon(focused, Scanner, Scanner),
          })}
        />
        <Tab.Screen
          name="bag"
          component={CartStack}
          initialParams={{
            space: param,
          }}
          options={({route}) => ({
            tabBarLabel: 'bag',
            tabBarVisible: setTabVisible(route),
            tabBarIcon: ({focused}) => tabBarIcon(focused, Bag, Bag),
          })}
        />
        <Tab.Screen
          name="User"
          component={UserStack}
          initialParams={{
            space: param,
          }}
          options={({route}) => ({
            tabBarLabel: 'User',
            tabBarVisible: setTabVisible(route),
            tabBarIcon: ({focused}) => tabBarIcon(focused, Profile, Profile),
          })}
        />
      </Tab.Navigator>
    </View>
  );
};
export default TabContainer;
