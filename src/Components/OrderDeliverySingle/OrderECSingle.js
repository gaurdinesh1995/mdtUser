import React, {useState, useEffect, useRef, useReducer} from 'react';
import {useDispatch} from 'react-redux';
import {backgroundColor, createBox, createText} from '@shopify/restyle';
import {StyleSheet, FlatList, Image, ScrollView} from 'react-native';
import {fonts, palette, TypographyStyles} from '../Theme/Index';
import {Button, Header} from '../ReusableComponents';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DeliveryList from '../Delivery/DeliveryList';
const Box = createBox();
const Text = createText();

const Product = require('../../assets/product/productimg.png');
const LeftArrow = require('../../assets/arrow/leftarr.png');
const HomePlace = require('../../assets/delivery/homeplace.png');
const Location = require('../../assets/locationred/location.png');
const Pokkipoints = require('../../assets/pokki/pokkipoints.png');
export default ({navigation, route, visible}) => {
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      //   status: false,
    },
  );
  return (
    <Box flex={1} backgroundColor="support1">
      <Header
        title="Order Number"
        renderLeft={() => (
          <TouchableOpacity>
            <Image source={LeftArrow} />
          </TouchableOpacity>
        )}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <Text pl="l" variant="support215regular">
          1 Jun, 12:30PM
        </Text>
        <Box ml="l" mt="l">
          <Box flexDirection="row" alignItems="center">
            <Image style={{resizeMode: 'contain'}} source={HomePlace} />

            <Text pl="m" variant="support516Medium">
              Paradigm Mall
            </Text>
          </Box>
          <Box
            width={1}
            height={33}
            backgroundColor="support7"
            marginVertical="m"
            ml="s"
          />
          <Box flexDirection="row" alignItems="center">
            <Image style={{resizeMode: 'contain'}} source={Location} />
            <Box pl="m">
              <Text variant="support516Medium">Home</Text>
              <Text variant="support516Medium">No.2 Jalan Hang Tuah 6/2</Text>
            </Box>
          </Box>
        </Box>
        <Box
          pt="l"
          mt="l"
          elevation={1}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}>
          <Box flexDirection="row" justifyContent="space-between" p="s">
            <Image style={styles.product} source={Product} />
            <Box>
              <Text variant="support218regular">MyeongDong Topokki</Text>
              <Box flexDirection="row" alignItems="center">
                <Box
                  height={31}
                  width={68}
                  borderWidth={0.4}
                  borderColor="support4"
                  borderRadius={15}
                  alignItems="center"
                  justifyContent="center"
                  mt="xl">
                  <Text variant="support415regular">Qty: 1</Text>
                </Box>
                <Text pt="xl" pl="l" variant="primary14regular">
                  Regular
                </Text>
              </Box>
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              flexDirection="row"
              alignSelf="flex-end"
              bottom={10}
              right={10}>
              <Text variant="support218medium"> RM 10</Text>
            </Box>
          </Box>
          <Box
            paddingHorizontal="m"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt="l">
            <Text variant="support215medium">+Add ons </Text>
          </Box>
          <Box
            marginHorizontal="m"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt="l">
            <Text variant="support316regular">Green Capsicum</Text>
            <Text variant="support216Medium">+RM5.00</Text>
          </Box>
          <Box
            marginHorizontal="m"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt="m">
            <Text variant="support316regular">Yellow Capsicum</Text>
            <Text variant="support216Medium">+RM2.50</Text>
          </Box>
          <Box
            height={0.5}
            width={'95%'}
            backgroundColor="support4"
            opacity={0.4}
            alignSelf="center"
            m="s"
            mt="l"
          />

          <Box flexDirection="row" justifyContent="space-between" p="s">
            <Image style={styles.product} source={Product} />
            <Box>
              <Text variant="support218regular">MyeongDong Topokki</Text>
              <Box flexDirection="row" alignItems="center">
                <Box
                  height={31}
                  width={68}
                  borderWidth={0.4}
                  borderColor="support4"
                  borderRadius={15}
                  alignItems="center"
                  justifyContent="center"
                  mt="xl">
                  <Text variant="support415regular">Qty: 1</Text>
                </Box>
                <Text pt="xl" pl="l" variant="primary14regular">
                  Regular
                </Text>
              </Box>
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              flexDirection="row"
              alignSelf="flex-end"
              bottom={10}
              right={10}>
              <Text variant="support218medium"> RM 10</Text>
            </Box>
          </Box>
          <Box
            height={0.5}
            width={'95%'}
            backgroundColor="support4"
            opacity={0.4}
            alignSelf="center"
            m="s"
            mt="l"
          />
          <Box
            marginHorizontal="m"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt="l">
            <Text variant="support218medium">Sub Total</Text>
            <Text variant="support218medium">RM33.00</Text>
          </Box>
          <Box
            marginHorizontal="m"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt="l">
            <Text variant="support218regular">Delivered</Text>
            <Text variant="support216regular">+RM10.00</Text>
          </Box>
          <Box
            marginHorizontal="m"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt="l">
            <Text variant="support218regular">Voucher</Text>
            <Text variant="primary16regular">-RM5.00</Text>
          </Box>
          <Box
            marginHorizontal="m"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt="l">
            <Text variant="support218regular">Coupon Code</Text>
            <Text variant="primary16regular">-RM5.00</Text>
          </Box>
          <Box
            height={0.5}
            width={'95%'}
            backgroundColor="support4"
            opacity={0.4}
            alignSelf="center"
            m="s"
            mt="l"
          />
          <Box
            marginHorizontal="m"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt="l">
            <Text variant="support218regular">Total</Text>
            <Text variant="support218medium">RM33.00</Text>
          </Box>
          <Box
            height={60}
            width={'90%'}
            borderWidth={0.3}
            borderColor="support5"
            alignSelf="center"
            borderRadius={12}
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
            paddingHorizontal="l"
            marginVertical="l">
            <Text variant="support218regular">Loyalty Point earned </Text>
            <Box flexDirection="row" alignItems="center">
              <Image style={styles.PokkiPoints} source={Pokkipoints} />
              <Text pl="s" variant="primary18regular">
                20
              </Text>
            </Box>
          </Box>
          <Box marginVertical="l">
            <Button label="Reorder" />
          </Box>
        </Box>
      </ScrollView>
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
  PokkiPoints: {height: 16, width: 16, resizeMode: 'contain'},
  product: {
    height: 84,
    width: 81,
    resizeMode: 'contain',
  },
});
