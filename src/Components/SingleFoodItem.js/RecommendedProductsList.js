import React, {useState, useEffect, useRef, useReducer} from 'react';
import {useDispatch} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {FlatList, Image, TouchableOpacity, StyleSheet} from 'react-native';

const Box = createBox();
const Text = createText();
const Banner = require('../../assets/banner/banner.png');
import SwiperFlatList from 'react-native-swiper-flatlist';
export default ({navigation, item, index, visible}) => {
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      count: 1,
    },
  );

  const {count} = state;
  return (
    <Box
      height={300}
      width={206}
      elevation={3}
      alignItems="center"
      justifyContent="center"
      backgroundColor="support1"
      margin="m"
      borderRadius={20}>
      <Box m="s" marginHorizontal="s">
        <TouchableOpacity onPress={() => navigation.navigate('SingleFood')}>
          <Image style={styles.image} source={item.image} />
        </TouchableOpacity>
        <Box alignItems="center" justifyContent="center">
          <Text variant="support218regular">{item.name}</Text>
          <Text variant="support218regular">{item.gm}</Text>

          <Text pt="m" variant="support322medium">
            RM {item.RM}
          </Text>
          <Box
            marginVertical="l"
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
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 165,
    width: 164,
    resizeMode: 'contain',
  },
});
