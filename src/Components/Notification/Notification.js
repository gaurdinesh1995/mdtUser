import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  useCallback,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';

import {Header} from '../ReusableComponents';

import {palette, size, TypographyStyles} from '../Theme/Index';
const LeftArrow = require('../../assets/arrow/leftarr.png');
const windowHeight = Dimensions.get('window').height;
const Box = createBox();
const Text = createText();

function Notification({navigation, props, route}) {
  const [cartId, setCartId] = useState(0);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      isModalVisible: false,
      search: false,
      category: '',
      menuItem: [],
      selectedObj: {},
      total: 0,
    },
  );
  let data = [
    {
      text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos.',
    },
    {
      text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos.',
    },
  ];
  return (
    <Box flex={1} backgroundColor="primary3">
      <Header
        title={'Notification'}
        renderLeft={() => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={LeftArrow} />
          </TouchableOpacity>
        )}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginVertical: 10}}
        data={data}
        ItemSeparatorComponent={() => {
          return (
            <Box marginHorizontal="l" height={1} backgroundColor="primary6" />
          );
        }}
        renderItem={({item, index}) => (
          <Box m="m" alignSelft="center">
            <Text numberOfLines={2} ellipsizeMode="tail">
              {item.text}
            </Text>
          </Box>
        )}
        keyExtractor={(item, index) => item.toString()}
      />
    </Box>
  );
}
export default Notification;
const styles = StyleSheet.create({});
