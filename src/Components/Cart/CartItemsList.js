import React, {useState, useEffect, useRef, useReducer} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import AddAndRemove from '../AddAndRemove/AddAndRemove';
import {FlatList, Image, TouchableOpacity, StyleSheet} from 'react-native';
const Box = createBox();
const Text = createText();
const Banner = require('../../assets/banner/banner.png');
import SwiperFlatList from 'react-native-swiper-flatlist';
const DemoImage = require('../../assets/menu/demoProduct.png');
export default ({
  navigation,
  route,
  visible,
  addQuantity,
  decreaseQuantity,
  item,
  selectedObj,
  addOnsSelection,
  variationSelection,
}) => {
  const {image, basePrice, name, addOnsPrice, variations} = item;
  const dispatch = useDispatch();
  const addOns = addOnsPrice ? addOnsPrice : 0;
  const totalPrice = basePrice + addOns;

  return (
    <Box>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        m="s"
        marginHorizontal="s">
        <TouchableOpacity onPress={() => navigation.navigate('SingleFood')}>
          <Image
            style={{
              height: 84,
              width: 81,
              resizeMode: 'contain',
            }}
            source={
              image !== null
                ? {
                    uri: `https://segwitz-staging-api.myeongdongtopokki.com/${item.image}`,
                  }
                : DemoImage
            }
          />
        </TouchableOpacity>
        <Box>
          <Text variant="support218regular">{name}</Text>
          <Text pt="xl" variant="support218medium">
            RM {totalPrice}
          </Text>
        </Box>
        <AddAndRemove
          item={item}
          quantity={item.quantity}
          addQuantity={(value) => {
            addQuantity(value);
          }}
          decreaseQuantity={decreaseQuantity}
        />
      </Box>
      <Box
        height={0.5}
        width={'95%'}
        backgroundColor="support4"
        opacity={0.4}
        alignSelf="center"
        m="s"
      />
    </Box>
  );
};
