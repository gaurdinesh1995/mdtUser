import React, {useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {FlatList, Image, TouchableOpacity} from 'react-native';

const Box = createBox();
const Text = createText();
const Banner = require('../../assets/banner/banner.png');
import SwiperFlatList from 'react-native-swiper-flatlist';
export default ({navigation, item, index}) => {
  const dispatch = useDispatch();

  return (
    <Box>
      {index === 0 ? (
        <Box />
      ) : (
        <Box
          height={0.5}
          width={'80%'}
          backgroundColor="support4"
          opacity={0.4}
          alignSelf="center"
          m="s"
        />
      )}
      <Box
        flexDirection="row"
        justifyContent="space-between"
        m="s"
        marginHorizontal="xl">
        <TouchableOpacity onPress={() => navigation.navigate('ECSingleItem')}>
          <Image
            style={{
              height: 84,
              width: 81,
              resizeMode: 'contain',
            }}
            source={item.image}
          />
        </TouchableOpacity>
        <Box>
          <Text variant="support218regular">{item.name}</Text>
          <Text variant="support218medium">RM {item.RM}</Text>
        </Box>
        <Box
          borderColor="primary1"
          borderWidth={0.8}
          backgroundColor="primary2"
          height={31}
          width={79}
          borderRadius={12}
          alignSelf="flex-end"
          justifyContent="center"
          alignItems="center"
          mb="m">
          <Text variant="primary15regular">Add +</Text>
        </Box>
      </Box>
    </Box>
  );
};
