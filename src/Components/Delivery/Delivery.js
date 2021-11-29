import React, {useState, useEffect, useRef, useReducer} from 'react';
import {useDispatch} from 'react-redux';
import {backgroundColor, createBox, createText} from '@shopify/restyle';
import {StyleSheet, FlatList, Image} from 'react-native';
import {Button, Header, Input} from '../ReusableComponents';

import {fonts, palette, TypographyStyles} from '../Theme/Index';
import DeliveryList from './DeliveryList';
const Box = createBox();
const Text = createText();
const Cross = require('../../assets/cross/crossSq.png');
const EmptyCart = require('../../assets/cart/cartempty.png');
const OrderSuccess = require('../../assets/pokki/orderpokki.png');
const Product = require('../../assets/product/productimg.png');

export default ({navigation, route, visible}) => {
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      status: false,
    },
  );
  const {data} = state;
  const CText = (props) => (
    <Text style={{color: props.color}}>{'50 Points'}</Text>
  );

  const TextPoints = CText;
  const {status} = state;
  return (
    <Box flex={1} backgroundColor="support1">
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
          <Text variant="primary20regular">No Order history</Text>

          <Image source={OrderSuccess} />

          <Box alignItems="center" justifyContent="center">
            <Text variant="support518regular" opacity={0.6} textAlign="center">
              {`Look like You haven't made \n order yet`}
            </Text>
          </Box>

          <Text mt="l" variant="primary18regular">
            Order now
          </Text>
        </Box>
      ) : (
        <Box>
          <FlatList
            data={[
              {name: 'MDT Kimchi', RM: '20', image: Product},
              {name: 'MDT Kimchi', RM: '20', image: Product},
              {name: 'MDT Kimchi', RM: '20', image: Product},
              {name: 'MDT Kimchi', RM: '20', image: Product},
            ]}
            renderItem={({item, index}) => (
              <DeliveryList item={item} index={index} navigation={navigation} />
            )}
            keyExtractor={(item, index) => item.id.toString()}
          />
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
