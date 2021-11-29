import React, {useRef, useReducer, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  DashboardStack,
  CartStack,
  UserStack,
  ComingSoonStack,
  ScannerStack,
  TopTabsStack,
} from '../../Navigation/DashboardNavigation';
const Tab = createMaterialTopTabNavigator();
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
const {height} = Dimensions.get('window');

import {createBox, createText} from '@shopify/restyle';
import {palette} from '../Theme/Index';
import ComingSoon from '../ComingSoon/ComingSoon';
import Delivery from '../Delivery/Delivery';
import {Header} from '../ReusableComponents';
import {navigationRef} from '../../Navigation/RootNavigation';
const Box = createBox();
const Text = createText();
const Search = require('../../assets/search/search.png');
const Cross = require('../../assets/cross/cross.png');
const tabBarLabel = (focused, name, selectedName) =>
  focused ? (
    <Box alignItems="center" justifyContent="center" flex={1}>
      <Text variant="primary15regular">{selectedName}</Text>

      {/* <Box
        mt="s"
        height={4}
        width={4}
        backgroundColor="primary"
        borderRadius={2}
      /> */}
    </Box>
  ) : (
    <Box alignItems="center" justifyContent="center" flex={1}>
      <Text variant="support415regular">{name}</Text>
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
    switch (routeName) {
      case 'OrderDeliverySingle':
        return false;
      case 'GoogleMap':
        return false;
      case 'ChangePassword':
        return false;
      case 'EditProfile':
        return false;
      default:
        return true;
    }
  };
  // const HomeImage = (props) => (
  //   <Image source={Home} style={{tintColor: palette.support3}} />
  // );
  // const ImageTint = HomeImage;
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      search: false,
    },
  );
  const {search} = state;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: param && param !== '' ? param.bottom : 0,
      }}>
      <Box height={50}>
        {search ? (
          <Box justifyContent="center">
            <TextInput
              placeholder="Search"
              style={{
                borderBottomWidth: 0.5,
                borderColor: palette.support5,
                width: '90%',
                alignSelf: 'center',
              }}
            />
            <TouchableOpacity
              hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
              onPress={() => setState({search: false})}
              style={{position: 'absolute', right: 20}}>
              <Image source={Cross} />
            </TouchableOpacity>
          </Box>
        ) : (
          <Box height={50} alignItems="center" justifyContent="center">
            <Text variant="support222medium">Order History</Text>
            <TouchableOpacity
              onPress={() => setState({search: true})}
              style={{position: 'absolute', right: 15}}>
              <Image source={Search} />
            </TouchableOpacity>
          </Box>
        )}
      </Box>
      {/* {search ? (
       
        
      ) :  
      (
     
          </Box>
      )
} */}
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: palette.support,
          inactiveTintColor: palette.support1,
          labelStyle: styles.tabBarItemLabel,
          tabStyle: styles.tabBarStyle,
          style: styles.height_55,
          indicatorStyle: {
            marginLeft: 40,
            backgroundColor: 'red',
            width: 40,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}>
        <Tab.Screen
          name="Delivery"
          component={Delivery}
          initialParams={{}}
          options={({route}) => ({
            tabBarLabel: ({focused}) =>
              tabBarLabel(focused, 'Delivery', 'Delivery'),
            tabBarVisible: setTabVisible(route),
            // tabBarIcon: ({focused}) => tabBarIcon(focused, Home, Home),
          })}
        />
        <Tab.Screen
          name="Pickup"
          component={CartStack}
          initialParams={{
            space: param,
          }}
          options={({route}) => ({
            tabBarLabel: ({focused}) =>
              tabBarLabel(focused, 'Pickup', 'Pickup'),
            tabBarVisible: setTabVisible(route),
            // tabBarIcon: ({focused}) => tabBarIcon(focused, Bag, Bag),
          })}
        />
        <Tab.Screen
          name="E-Commerce"
          component={Delivery}
          initialParams={{
            space: param,
          }}
          options={({route}) => ({
            tabBarLabel: ({focused}) =>
              tabBarLabel(focused, 'E-Commerce', 'E-Commerce'),
            tabBarVisible: setTabVisible(route),
            // tabBarIcon: ({focused}) => tabBarIcon(focused, Profile, Profile),
          })}
        />
      </Tab.Navigator>
    </View>
  );
};
const styles = StyleSheet.create({
  firstStyle: {flex: 1, marginTop: 10},
  mainViewOne: {
    height: 50,
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 5,
  },

  selected: {width: 5, marginRight: 10},
  nameStyle: {
    marginTop: 5,
    alignSelf: 'center',
    color: 'white',

    fontSize: 16,
  },
  welcomeBoxing: {
    height: 61,
    marginHorizontal: 20,
    borderColor: 'lightgray',
    borderWidth: 0.5,
    //borderRadius: 5
  },
  welcomeBoxTexting: {
    marginTop: 10,
    height: 16,
    width: 137,
    marginLeft: 10,
  },
  welcomeTexttwo: {
    marginTop: 10,
    height: 16,
    width: 100,
    marginLeft: 10,
  },
  height_55: {
    height: 60,
    elevation: 1,
  },
  tabBarStyle: {
    // backgroundColor: 'red',
    // margin: 1,
    // borderTopWidth: 0.5,
    // paddingTop: height <= 750 ? 16 : 25,
    // paddingBottom: 3,
    // justifyContent: 'space-between',
    // borderTopColor: '#CBCED1',
  },
  tabBarItemIconActive: {
    alignSelf: 'center',
  },

  tabBarItemIconInactive: {
    alignSelf: 'center',
  },

  tabBarItemLabel: {
    marginTop: Platform.OS === 'ios' ? (height <= 750 ? 10 : 16) : 8,
    fontSize: 14,
    color: palette.support3,
    fontFamily: 'Ubuntu-Regular',
  },
});
export default TabContainer;
