import React, {useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import authConstants from '../../Redux/AuthConstants';
import {createBox, createText} from '@shopify/restyle';
const Box = createBox();
const Text = createText();
export default ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <TouchableOpacity
        onPress={() => {
          dispatch({
            type: authConstants.RESET_STATE,
            user: 'data',
          });
        }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </Box>
  );
};
