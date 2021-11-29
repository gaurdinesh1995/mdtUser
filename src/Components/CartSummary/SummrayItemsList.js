import React, {useState, useEffect, useRef, useReducer} from 'react';
import {useDispatch} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {FlatList, Image, StyleSheet} from 'react-native';

const Box = createBox();
const Text = createText();
const Banner = require('../../assets/banner/banner.png');
const DemoImage = require('../../assets/menu/demoProduct.png');

import SwiperFlatList from 'react-native-swiper-flatlist';
// var tempPrice = [];
export default ({navigation, item, index, visible}) => {
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      count: 1,
    },
  );

  const count = state.count;

  // useEffect(() => {
  //   console.log({item});

  //   let price = item.basePrice * item.quantity;
  //   let totaladdOns = 0;
  //   let totalVariations = 0;
  //   if (item.ShopMenuAddons.length > 0) {
  //     item.ShopMenuAddons.map((e) => {
  //       if (e.selected) {
  //         totaladdOns = e.price;
  //       }
  //     });
  //   }
  //   if (item.ShopMenuVariations.length > 0) {
  //     item.ShopMenuVariations.map((e) => {
  //       if (e.selected) {
  //         totalVariations = e.price;
  //       }
  //     });

  //     price = price + totalVariations + totaladdOns;
  //     tempPrice.push({price: price});
  //   }

  //   console.log({price});
  // }, [item]);
  // console.log({tempPrice});
  console.log({});
  const {image, basePrice, quantity, name, addOnsPrice, variations} = item;
  const addOns = addOnsPrice ? addOnsPrice : 0;

  const totalPrice = basePrice + addOns + variations;

  return (
    <Box>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        m="s"
        marginHorizontal="s">
        <Image
          style={styles.image}
          source={
            image !== null
              ? {
                  uri: `https://segwitz-staging-api.myeongdongtopokki.com/${item.image}`,
                }
              : DemoImage
          }
        />
        <Box>
          <Text variant="support218regular">{name}</Text>
          <Box
            height={31}
            width={68}
            borderWidth={0.4}
            borderColor="support4"
            borderRadius={15}
            alignItems="center"
            justifyContent="center"
            mt="xl">
            <Text variant="support415regular">Qty: {quantity}</Text>
          </Box>
        </Box>
        <Box
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          alignSelf="flex-end"
          bottom={10}
          right={10}>
          <Text variant="support218medium"> RM {totalPrice}.00</Text>
        </Box>
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

const styles = StyleSheet.create({
  image: {
    height: 84,
    width: 81,
    resizeMode: 'contain',
  },
});
