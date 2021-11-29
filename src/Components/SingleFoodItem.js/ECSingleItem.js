import React, {useState, useEffect, useRef, useReducer} from 'react';
import {useDispatch} from 'react-redux';
import {backgroundColor, createBox, createText} from '@shopify/restyle';
import {
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import {Button, Header, Input} from '../ReusableComponents';

import {fonts, palette, TypographyStyles} from '../Theme/Index';
import RecommendedProductsList from './RecommendedProductsList';
import {color} from 'react-native-reanimated';
const Box = createBox();
const Text = createText();
const LeftArrow = require('../../assets/arrow/leftarr.png');
const Bag = require('../../assets/Tabs/bag.png');
const Dislike = require('../../assets/heart/unlike.png');
const PokkiPoints = require('../../assets/menu/pokkipoints.png');
const Product = require('../../assets/ecommerce/product.png');
const Home = require('../../assets/selectAddress/home.png');

export default ({navigation, route, visible}) => {
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      data: true,
      count: 1,
    },
  );
  const {data, count} = state;
  return (
    <Box flex={1} backgroundColor="support1">
      <Box flex={1}>
        <Header
          color="support"
          renderLeft={() => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={LeftArrow} />
            </TouchableOpacity>
          )}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
          <Box
            alignItems="center"
            height={300}
            backgroundColor="support"
            borderBottomLeftRadius={200}
            borderBottomRightRadius={200}
            mb="xl">
            <Image source={Product} style={styles.product} />
          </Box>
          <Box
            mt="l"
            paddingHorizontal="m"
            backgroundColor="support1"
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
            shadowColor="support2"
            // shadowOffset={((width = 0), (height = 2))}
            shadowOpacity={0.23}
            shadowRadius={2.62}
            elevation={4}>
            <Box
              pt="l"
              flex={1}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center">
              <Text
                style={{flex: 0.8}}
                variant="support322medium"
                paddingHorizontal="m">
                MDT Kimchi
              </Text>
              <Box flex={0.2}>
                <Image source={Dislike} />
              </Box>
            </Box>
            <Text variant="support414regular" padding="m">
              Bulgogi Beef Deopbap from MyeongDong Topokki, takes
              <Text variant="primary14regular"> Read More..</Text>
            </Text>
            <Text pt="m" variant="support322medium" paddingHorizontal="m">
              RM 20.70
            </Text>
            <Box
              mt="m"
              flexDirection="row"
              justifyContent="space-between"
              marginHorizontal="m"
              alignItems="center">
              <Text variant="support318medium">Quantity</Text>
              <Box
                width={83}
                height={31}
                backgroundColor="primary"
                borderRadius={15}
                alignItems="center"
                justifyContent="center"
                flexDirection="row"
                alignSelf="flex-end">
                <TouchableOpacity
                  onPress={() => count > 1 && setState({count: count - 1})}>
                  <Text variant="support116regular">-</Text>
                </TouchableOpacity>
                <Text variant="support116regular" paddingHorizontal="l">
                  {count}
                </Text>
                <TouchableOpacity onPress={() => setState({count: count + 1})}>
                  <Text variant="support116regular">+</Text>
                </TouchableOpacity>
              </Box>
            </Box>
            <Box
              flexDirection="row"
              mt="l"
              justifyContent="space-between"
              marginHorizontal="m"
              alignItems="center">
              <Text variant="support318medium">Add-Ons</Text>
              <Text variant="primary16regular">Add</Text>
            </Box>
            <Text pl="m" pt="m" variant="support318medium">
              Recommended Products
            </Text>

            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={styles.contentContainerStyle}
              data={[
                {name: 'MDT Souce', gm: '500gm', RM: '20', image: Product},
                {name: 'MDT Souce', gm: '500gm', RM: '19.60', image: Product},
                {name: 'MDT Souce', gm: '500gm', RM: '22.50', image: Product},
                {name: 'MDT Souce', gm: '500gm', RM: '21.65', image: Product},
              ]}
              renderItem={({item, index}) => (
                <RecommendedProductsList
                  item={item}
                  index={index}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item, index) => item.id.toString()}
            />
            <TouchableOpacity style={styles.totalPrice}>
              <Box marginHorizontal="l">
                <Text variant="support114regular">Total Price</Text>
                <Text variant="support120medium">RM 41.20</Text>
              </Box>
              <TouchableOpacity style={styles.bagView}>
                <Image source={Bag} style={styles.bagStyle} />
                <Text pl="m" variant="support214regular">
                  Add to cart
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </Box>
        </ScrollView>
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
  content: {flexGrow: 1},
  bagView: {
    backgroundColor: palette.support1,
    height: 38,
    width: 132,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    flexDirection: 'row',
  },
  contentContainerStyle: {
    marginTop: 20,
    paddingTop: 10,
  },
  bagStyle: {height: 16.2, width: 14.5, resizeMode: 'contain'},
  totalPrice: {
    marginVertical: 20,
    height: 68,
    width: '95%',
    backgroundColor: palette.primary,
    borderRadius: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  product: {
    marginTop: 30,
    resizeMode: 'contain',
  },
});
