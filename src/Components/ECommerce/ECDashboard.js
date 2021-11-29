import React, {useState, useEffect, useRef, useReducer} from 'react';
import {useDispatch} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Banner from '../Banner/Banner';
import MdtApron from '../ECommerce/MdtApron';
import {Header} from '../ReusableComponents';
import {palette} from '../Theme/Index';
import ECMdt from './ECMdt';
const Home = require('../../assets/Tabs/home.png');

const Apron = require('../../assets/ecommerce/apron.png');
const Food = require('../../assets/ecommerce/food.png');
const Instant = require('../../assets/ecommerce/instant.png');
const Product = require('../../assets/product/product.png');
const Search = require('../../assets/search/search.png');
const LeftArrow = require('../../assets/arrow/leftarr.png');
const Box = createBox();
const Text = createText();
export default ({navigation}) => {
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      mdt: 'MDT Food',
    },
  );

  const ECommerce = (name) => {
    setState({mdt: name});
  };
  const {mdt} = state;
  return (
    <Box flex={1} backgroundColor="support1">
      <Header
        title="E-Commerce"
        renderLeft={() => <Image source={LeftArrow} />}
        renderRight={() => <Image source={Search} />}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <Banner ECommerce={true} />
        <Text variant="support318medium" pl="l">
          Categories
        </Text>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          margin="l"
          alignItems="center">
          <TouchableOpacity
            onPress={() => navigation.navigate('SelectAddress')}>
            <Box>
              <Image source={Apron} resizeMode="contain" />
            </Box>
            <Text variant="support414regular" textAlign="center">
              MDT Apron
            </Text>
          </TouchableOpacity>
          <Box>
            <Box>
              <Image source={Food} />
            </Box>
            <Text variant="support414regular" textAlign="center">
              MDT Food
            </Text>
          </Box>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <Box>
              <Image source={Instant} />
            </Box>
            <Text variant="support414regular" textAlign="center">
              MDT Instant
            </Text>
          </TouchableOpacity>
        </Box>
        <Box
          pt="l"
          borderTopLeftRadius={30}
          borderTopRightRadius={30}
          elevation={1}
          shadowColor="support3">
          <FlatList
            data={[
              {name: 'MDT Kimchi', RM: '20', image: Product},
              {name: 'MDT Kimchi', RM: '20', image: Product},
              {name: 'MDT Kimchi', RM: '20', image: Product},
              {name: 'MDT Kimchi', RM: '20', image: Product},
            ]}
            renderItem={({item, index}) => (
              <ECMdt item={item} index={index} navigation={navigation} />
            )}
            keyExtractor={(item, index) => item.id.toString()}
          />
          <TouchableOpacity
            style={{
              marginVertical: 20,
              height: 55,
              width: '95%',
              backgroundColor: palette.primary,
              borderRadius: 40,
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Box marginHorizontal="l">
              <Text variant="support112medium">1 ITEM</Text>
              <Text variant="support114medium">RM 10.00</Text>
            </Box>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text pr="xl" variant="support118regular">
                View cart
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  content: {flexGrow: 1},
});
