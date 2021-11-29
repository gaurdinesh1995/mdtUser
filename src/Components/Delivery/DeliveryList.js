import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {FlatList, Image, TouchableOpacity} from 'react-native';

const Box = createBox();
const Text = createText();
const PokkiPoints = require('../../assets/pokki/pokkipoints.png');
const Location = require('../../assets/Tabs/location.png');
import SwiperFlatList from 'react-native-swiper-flatlist';
import {Button} from '../ReusableComponents';
export default ({navigation, item, index}) => {
  return (
    <Box
      backgroundColor="support1"
      borderRadius={20}
      width={'90%'}
      alignSelf="center"
      elevation={1}
      shadowColor="support2"
      marginVertical="m">
      <Box flexDirection="row" justifyContent="space-between" padding="l">
        <Text variant="support218regular">Order: #1234567</Text>
        <Text variant="support212medium">
          RM <Text variant="support218medium">23.50</Text>
        </Text>
      </Box>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        paddingHorizontal="l">
        <Box flexDirection="row" alignItems="center">
          <Image source={Location} />
          <Text pl="s" variant="support214medium">
            Paradigm Mall
          </Text>
        </Box>
        <Box flexDirection="row" alignItems="center">
          <Image style={{height: 16, width: 16}} source={PokkiPoints} />
          <Text variant="primary18medium" pl="s">
            20
          </Text>
        </Box>
      </Box>
      <Box ml="l" flexDirection="row" alignItems="center">
        <Image
          source={item.image}
          style={{height: 78, width: 78, resizeMode: 'contain'}}
        />
        <Box>
          <Text variant="support214regular">MyeongDong Topokki</Text>
          <Text pt="s" variant="support410regular">
            RM <Text variant="support414regular">10.00</Text>
          </Text>
        </Box>
      </Box>
      <Box ml="l" flexDirection="row" alignItems="center">
        <Image
          source={item.image}
          style={{height: 78, width: 78, resizeMode: 'contain'}}
        />
        <Box>
          <Text variant="support214regular">MyeongDong Topokki</Text>
          <Text pt="s" variant="support410regular">
            RM <Text variant="support414regular">10.00</Text>
          </Text>
        </Box>
      </Box>
      <Box
        flexDirection="row"
        pb="l"
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal="l">
        <Text pl="s" variant="support412regular">
          1 Jun, 12:30PM
        </Text>
        <TouchableOpacity>
          <Button
            onPress={() => navigation.navigate('OrderDeliverySingle')}
            buttonStyle={{height: 28, width: 85, borderRadius: 12}}
            label="Reorder"
          />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
