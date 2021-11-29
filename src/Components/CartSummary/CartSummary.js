import React, {useState, useEffect, useRef, useReducer} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import {Button, Header, Input} from '../ReusableComponents';
import Modal from 'react-native-modal';
import {fonts, palette, TypographyStyles} from '../Theme/Index';
import SummrayItemsList from './SummrayItemsList';
import {checkoutCart, clearCart, getCart} from '../Services/Cart';
import MenuConstant from '../../Redux/MenuConstant';
import AuthConstants from '../../Redux/AuthConstants';
const Box = createBox();
const Text = createText();
const LeftArrow = require('../../assets/arrow/leftarr.png');
const EmptyCart = require('../../assets/cart/cartempty.png');
const Wallet = require('../../assets/payment/wallet.png');
const PokkiPoints = require('../../assets/menu/pokkipoints.png');
const Product = require('../../assets/product/product.png');
const Check = require('../../assets/check/check.png');
const Uncheck = require('../../assets/check/uncheck.png');
const windowHeight = Dimensions.get('window').height;

let priceQuantity = [];
export default ({navigation, route, visible}) => {
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      data: false,
      total: 0,
      list: [],
      selectedObj: {},
      isModalVisible: false,
    },
  );
  const {Menu} = useSelector((state) => ({
    ...state.menu.menu,
  }));
  useEffect(() => {
    getCartList();
  }, []);
  useEffect(() => {
    let tempPrice = [];
    if (Menu.length === 0) {
      tempPrice = [];
      setState({selectedObj: {}, list: []});
    } else if (Menu.length > 0) {
      Menu.map((e) => {
        let total = 0;
        let totalAddons = 0;
        let totalVariation = 0;
        total = e.basePrice;
        if (e.ShopMenuAddons.length > 0) {
          e.ShopMenuAddons.map((element) => {
            if (element.selected) {
              totalAddons = element.price + totalAddons;
            }
          });
        }
        if (e.ShopMenuVariations.length > 0) {
          e.ShopMenuVariations.map((element) => {
            if (element.selected) {
              totalVariation = element.price + totalVariation;
            }
          });
        }
        const addOns = e.addOnsPrice ? e.addOnsPrice : 0;
        const final = total + e.variations + addOns;
        total = final * e.quantity;
        tempPrice.push({total: total});
        priceQuantity.push({total: total});
      });
      let finalTotal = 0;
      if (tempPrice.length > 0) {
        tempPrice.map((e) => {
          finalTotal = e.total + finalTotal;
        });
      }
      setState({total: finalTotal, list: Menu});
    }
  }, [Menu]);
  console.log({Menu});
  const list = state.list;
  const total = state.total;
  console.log({list, total});
  const data = state.data;
  console.log({priceQuantity});

  const checkout = () => {
    dispatch({
      type: AuthConstants.LOADING,
      loading: true,
    });
    const data = {};
    checkoutCart(data)
      .then((response) => {
        const {data} = response;
        const {message} = data;
        dispatch({
          type: AuthConstants.LOADING,
          loading: false,
        });
        dispatch({
          type: AuthConstants.TOAST,
          toast: {
            title: message,
            loading: true,
            status: 'success',
          },
        });
        navigation.navigate('OrderSuccess');
        console.log({response});
      })
      .catch((error) => {
        dispatch({
          type: AuthConstants.LOADING,
          loading: false,
        });
        console.log({error});
      });
  };

  const getCartList = (data) => {
    getCart(data)
      .then((response) => {
        console.log({response});
      })
      .catch((error) => {
        console.log({error});
      });
  };

  const clearCartItems = () => {
    const data = undefined;
    clearCart(data)
      .then((response) => {
        console.log({response});
      })
      .catch((error) => {
        console.log({error});
      });
  };

  const Identity = () => {
    navigation.navigate('Cart');
  };

  return (
    <Box flex={1} backgroundColor="support1">
      {Menu.length > 0 ? (
        <Box flex={1}>
          <Header
            varient="support220regular"
            title={'Summary'}
            renderLeft={() => (
              <TouchableOpacity
                onPress={() => setState({isModalVisible: true})}>
                <Image source={LeftArrow} />
              </TouchableOpacity>
            )}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.content}>
            <FlatList
              contentContainerStyle={styles.flatListContainer}
              data={Menu}
              renderItem={({item, index}) => (
                <SummrayItemsList item={item} index={index} />
              )}
              keyExtractor={(item, index) => item.id.toString()}
            />
            <Box
              marginHorizontal="m"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mt="l">
              <Text variant="support518medium">Sub Total</Text>
              <Text variant="support518medium">RM {state.total} .00</Text>
            </Box>
            <Box
              marginHorizontal="m"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mt="l">
              <Text variant="support518regular">Shipping</Text>
              <Text opacity={0.6} variant="support518regular">
                RM10.00
              </Text>
            </Box>
            <Box
              flexDirection="row"
              mt="l"
              justifyContent="space-between"
              marginHorizontal="m"
              alignItems="center">
              <Text variant="support218regular">Voucher</Text>
              <Text variant="primary16regular">Apply</Text>
            </Box>
            {/* <Box
            marginHorizontal="m"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt="l">
            <Text variant="support518regular">Coupon Code</Text>
            <Text opacity={0.6} variant="support518regular">
              -RM5.00
            </Text>
          </Box> */}
            <Box flexDirection="row" style={styles.textInputView}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter the coupon code..."
              />
              <Box style={styles.applyText}>
                <Text textAlign="center" variant="primary16regular">
                  Apply
                </Text>
              </Box>
            </Box>
            <Box
              marginHorizontal="m"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mt="l">
              <Text variant="support518medium">Total</Text>
              <Text variant="support518medium">RM {state.total + 10}.00</Text>
            </Box>
            <Box
              height={66}
              marginHorizontal="m"
              borderWidth={0.4}
              borderRadius={15}
              borderColor="primary"
              marginVertical="l"
              justifyContent="center">
              <Text variant="support414regular" paddingHorizontal="l">
                By completing this purchase, you will earn
              </Text>
              <Box paddingHorizontal="l" pt="s" flexDirection="row">
                <Image source={PokkiPoints} />
                <Text variant="primary14regular" pl="s">
                  20
                </Text>
                <Text variant="support414regular"> Points</Text>
              </Box>
            </Box>

            <Box
              flexDirection="row"
              mt="s"
              justifyContent="space-between"
              marginHorizontal="m"
              alignItems="center">
              <Text variant="support218regular">Payment Method</Text>
            </Box>
            <Box
              height={53}
              marginHorizontal="m"
              borderWidth={0.4}
              borderRadius={10}
              borderColor="primary"
              marginVertical="l"
              justifyContent="space-between"
              alignItems="center"
              flexDirection="row">
              <Image style={{left: 20}} source={Wallet} />
              <Text variant="support218regular">Wallet</Text>
              <Image style={{right: 20}} source={Check} />
            </Box>
            <Box
              height={53}
              marginHorizontal="m"
              borderWidth={0.4}
              borderRadius={10}
              borderColor="primary"
              marginVertical="l"
              justifyContent="center"
              alignItems="center"
              flexDirection="row">
              <Text variant="support218regular">Payment Gateway</Text>
              <Image style={styles.image} source={Uncheck} />
            </Box>

            <TouchableOpacity
              style={{
                marginVertical: 20,
                alignSelf: 'center',
                height: 40,
                width: '95%',
              }}>
              <Button
                onPress={() => checkout()}
                label={`RM ${state.total + 10}.00 Pay Now`}
              />
            </TouchableOpacity>
          </ScrollView>
        </Box>
      ) : (
        Identity()
      )}
      <Modal
        swipeDirection="down"
        onBackdropPress={() => {
          setState({isModalVisible: false});
        }}
        style={styles.modalStyle}
        isVisible={state.isModalVisible}>
        <Box
          height={200}
          width={'90%'}
          backgroundColor="support1"
          alignSelf="center"
          alignItems="center"
          justifyContent="center">
          <Text variant="primary18medium">ALERT!</Text>
          <Text
            variant="support216regular"
            textAlign="center"
            paddingVertical="l">
            {'Are you sure You wana Go back? \n Your Cart will Clear'}
          </Text>
          <Box flexDirection="row" justifyContent="space-between">
            <Button
              buttonStyle={{height: 40, width: 100, borderRadius: 15}}
              label="No"
              onPress={() => setState({isModalVisible: false})}
            />
            <Button
              buttonStyle={{height: 40, width: 100, borderRadius: 15}}
              label="Yes"
              onPress={() => {
                setState({isModalVisible: false}), clearCartItems();
                dispatch({
                  type: MenuConstant.ADD_MENU_ITEMS,
                  menu: [],
                }),
                  navigation.navigate('Dashboard');
              }}
            />
          </Box>
        </Box>
      </Modal>
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
  textInput: {
    paddingLeft: 10,
    fontFamily: fonts.regular,
    fontSize: 15,
    width: '75%',
  },
  textInputView: {
    borderWidth: 0.4,
    borderColor: palette.support6,
    marginTop: 10,
    borderRadius: 15,
    width: '95%',
    alignItems: 'center',
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
  content: {flexGrow: 1, marginHorizontal: 10},
  flatListContainer: {
    marginTop: 20,
    paddingTop: 10,
  },
  applyText: {
    position: 'absolute',
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {right: 20, position: 'absolute'},
  modalStyle: {
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
});
