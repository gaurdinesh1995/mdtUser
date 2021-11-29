import React, {useState, useEffect, useReducer, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Modal from 'react-native-modal';
import {createBox, createText, visible} from '@shopify/restyle';
import {Button, Input} from '../ReusableComponents';
import {fonts, palette, size, TypographyStyles} from '../Theme/Index';
import authConstants from '../../Redux/AuthConstants';
const Box = createBox();
const Text = createText();
export default ({navigation, route}) => {
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      phoneNumber: '',
      password: '',
      errors: [],
      secure: true,
      isEnabled: false,
      isModalVisible: false,
    },
  );

  const {isEnabled, isModalVisible} = state;
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text variant="primary16regular">Coming Soon</Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  content: {flexGrow: 1, flex: 1},
  buttonStyle: {
    height: 44,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: palette.primary2,
    width: size.width,
    marginHorizontal: 20,
  },
  text: {fontSize: 16, color: palette.tertiary2},
  eye: {height: 30, width: 30},
  modalStyle: {
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
});
