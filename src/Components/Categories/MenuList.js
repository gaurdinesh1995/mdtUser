import React, {useState, useEffect, useRef, useReducer} from 'react';
import {useDispatch} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AddOnCart from '../AddOnCart/AddOnCart';
const Box = createBox();
const Text = createText();
const Banner = require('../../assets/banner/banner.png');
import SwiperFlatList from 'react-native-swiper-flatlist';
const DemoProduct = require('../../assets/menu/demoProduct.png');
const windowHeight = Dimensions.get('window').height;

export default ({
  navigation,
  item,
  index,
  visible,
  Menu,
  addQuantity,
  decreaseQuantity,
  onTapMenu,
}) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        onTapMenu(item);
      }}>
      <Box flexDirection="row" m="s" marginHorizontal="xl">
        <Image
          style={{
            height: 84,
            width: 81,
            resizeMode: 'contain',
          }}
          source={
            // item.image
            //   ? {
            //       uri: `https://segwitz-staging-api.myeongdongtopokki.com/${item.image}`,
            //     }
            // :
            DemoProduct
          }
        />
        <Box flex={1} paddingHorizontal="s">
          <Text variant="support218regular">{item.name}</Text>
          <Box flexDirection="row" justifyContent="space-between">
            <Text pt="xl" variant="support218medium">
              RM {item.basePrice}
            </Text>
            {item.quantity > 0 ? (
              <Box
                width={83}
                height={31}
                backgroundColor="primary"
                borderRadius={15}
                alignItems="center"
                justifyContent="center"
                flexDirection="row"
                alignSelf="flex-end"
                bottom={10}>
                <TouchableOpacity onPress={() => decreaseQuantity(item)}>
                  <Text variant="support116regular">-</Text>
                </TouchableOpacity>
                <Text variant="support116regular" paddingHorizontal="l">
                  {item.quantity}
                </Text>
                <TouchableOpacity onPress={() => addQuantity(item)}>
                  <Text variant="support116regular">+</Text>
                </TouchableOpacity>
              </Box>
            ) : (
              <TouchableOpacity onPress={() => addQuantity(item)}>
                <Box
                  borderColor="primary1"
                  borderWidth={0.8}
                  backgroundColor="primary2"
                  height={31}
                  width={79}
                  borderRadius={12}
                  justifyContent="center"
                  alignItems="center">
                  <Text variant="primary15regular">Add +</Text>
                </Box>
              </TouchableOpacity>
            )}
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
});
