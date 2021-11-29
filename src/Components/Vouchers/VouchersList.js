import React, {useState, useEffect, useRef, useReducer} from 'react';
import {useDispatch} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import AddOnCart from '../AddOnCart/AddOnCart';
const Box = createBox();
const Text = createText();
const Banner = require('../../assets/banner/banner.png');
import SwiperFlatList from 'react-native-swiper-flatlist';
import {palette} from '../Theme/Index';
import {Button} from '../ReusableComponents';
const VouchersBackground = require('../../assets/vouchers/Voucher.png');
const windowHeight = Dimensions.get('window').height;
const Topokki = require('../../assets/pokki/pokkipoints.png');
export default ({navigation, item, index, selectedVoucher}) => {
  const dispatch = useDispatch();

  return (
    <ImageBackground
      resizeMode="contain"
      style={{
        height: 165,
        width: '100%',
        alignSelf: 'center',
        flex: 1,
      }}
      source={VouchersBackground}>
      <Box ml="m" mt="m">
        <Text pl="l" variant="support216Medium">
          {item.name}
        </Text>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          marginHorizontal="l">
          <Box flex={0.8}>
            <Text pt="s" variant="support412regular">
              {item.desc}
            </Text>
          </Box>
          <Box>
            <Text pt="l" pr="l" variant="primary15regular">
              RM <Text variant="primary25medium">{item.RM}.00</Text>
            </Text>
            <Text variant="support412regular">{'voucher Value'}</Text>
          </Box>
        </Box>

        <Box
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          mt="xxl">
          <Box flexDirection="row">
            <Image
              style={{height: 16, width: 16, resizeMode: 'contain'}}
              source={Topokki}
            />
            <Text pl="s">{item.pokki}</Text>
          </Box>
          <Box>
            <Button
              onPress={() => selectedVoucher(item.id)}
              label={'Redeem Now'}
              buttonStyle={{width: 122, height: 28, borderRadius: 15}}
            />
          </Box>
        </Box>
      </Box>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
});
