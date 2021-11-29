import React, {useState, useEffect, useRef, useReducer} from 'react';
import {useDispatch} from 'react-redux';
import {backgroundColor, createBox, createText} from '@shopify/restyle';
import {
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {Button, Header, Input} from '../ReusableComponents';

import {fonts, palette, TypographyStyles} from '../Theme/Index';
import MenuConstant from '../../Redux/MenuConstant';
const Box = createBox();
const Text = createText();
const Cross = require('../../assets/cross/crossSq.png');
const EmptyCart = require('../../assets/cart/cartempty.png');
const OrderSuccess = require('../../assets/order/ordersuccess.png');
const OrderFail = require('../../assets/order/orderfail.png');

export default ({navigation, route, visible}) => {
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      status: true,
    },
  );
  // const {data} = state;
  const CText = (props) => (
    <Text style={{color: props.color}}>{'50 Points'}</Text>
  );

  const TextPoints = CText;
  const {status} = state;
  return (
    <Box flex={1} backgroundColor="support1">
      <Header
        renderLeft={() => (
          <TouchableOpacity
            onPress={() => {
              dispatch({
                type: MenuConstant.ADD_MENU_ITEMS,
                menu: [],
              }),
                navigation.navigate('Dashboard');
            }}>
            <Image source={Cross} />
          </TouchableOpacity>
        )}
      />
      {status ? (
        <Box
          style={[
            TypographyStyles.container,
            {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              alignItems: 'center',
              justifyContent: 'space-around',
            },
          ]}>
          <Text variant="primary25regular">Hoorayy!</Text>
          <Text variant="support318regular" textAlign="center">
            {`Your food will be delivered \n to you soon.`}
          </Text>
          <Image source={OrderSuccess} />

          <Box alignItems="center" justifyContent="center">
            <Text variant="support216regular" textAlign="center">
              You have earned <TextPoints color={palette.primary} /> by
            </Text>
            <Text variant="support216regular">this Purchase</Text>
          </Box>

          <Text mt="l" variant="primary25regular">
            Track Your Order
          </Text>
        </Box>
      ) : (
        <Box
          style={[
            TypographyStyles.container,
            {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              alignItems: 'center',
              justifyContent: 'space-around',
            },
          ]}>
          <Text variant="primary25regular">Oops!</Text>
          <Text variant="support318regular" textAlign="center">
            {`something has gone wrong. \nPlease try again.`}
          </Text>
          <Image source={OrderFail} />

          <Text mt="l" variant="primary25regular">
            Try Again
          </Text>
        </Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: 44,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: palette.primary2,
    width: '80%',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 16,
    color: palette.tertiary2,
  },
  eye: {
    height: 30,
    width: 30,
  },
  headerLeft: {
    marginLeft: 10,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {flexGrow: 1, marginHorizontal: 10},
});
