import React, {useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {createBox, createText} from '@shopify/restyle';
import {palette} from '../Theme/Index';
const Box = createBox();
const Text = createText();
const Banner = require('../../assets/banner/banner.png');
export default ({navigation, item, index, selectcategory}) => {
  const dispatch = useDispatch();
  const {id, selected} = item;

  return (
    <TouchableOpacity
      onPress={() => selectcategory(item)}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: selected ? palette.primary : palette.support1,
        height: 41,
        borderRadius: 15,
        margin: 5,
        elevation: 2,
      }}>
      <Text
        variant={selected ? 'support114regular' : 'support214regular'}
        p="m">
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};
