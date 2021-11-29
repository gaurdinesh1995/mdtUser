import React, {useState, useEffect, useRef, useReducer} from 'react';
import {useDispatch} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {Image, StyleSheet} from 'react-native';

import {fonts, palette, TypographyStyles} from '../Theme/Index';
const Box = createBox();
const Text = createText();
const Dinein = require('../../assets/dinein/dinein.png');
const PickUp = require('../../assets/pickup/pickup.png');

export default ({navigation, route, visible}) => {
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      phoneNumber: '',
      errors: [],
    },
  );

  return (
    <Box
      style={[
        TypographyStyles.container,
        {borderTopLeftRadius: 20, borderTopRightRadius: 20},
      ]}>
      <Box
        height={4}
        width={60}
        borderRadius={20}
        alignSelf="center"
        backgroundColor="support4"
        opacity={0.5}
        mt="m"
      />
      <Box mt="xl" mr="l" justifyContent="center">
        <Text pl="l" variant="support220regular">
          You have Successfully scanned the QR code
        </Text>
        <Text opacity={0.6} variant="support518regular" mt="l" ml="l" mr="l">
          Please Select
        </Text>
      </Box>
      <Box
        height={98}
        borderWidth={0.4}
        borderColor="support5"
        borderRadius={15}
        mt="l"
        width={'90%'}
        alignSelf="center"
        alignItems="center"
        justifyContent="space-evenly"
        flexDirection="row">
        <Image style={styles.image} source={Dinein} />
        <Text variant="support220regular">Dine-in</Text>
      </Box>
      <Box
        height={98}
        borderWidth={0.4}
        borderColor="support5"
        borderRadius={15}
        mt="l"
        width={'90%'}
        alignSelf="center"
        alignItems="center"
        justifyContent="space-evenly"
        flexDirection="row">
        <Image style={styles.image} source={PickUp} />
        <Text variant="support220regular">Pick up</Text>
      </Box>
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
  image: {height: 60, width: 42, resizeMode: 'contain'},
});
