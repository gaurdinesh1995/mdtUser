import React, {useState, useEffect, useRef, useReducer} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {backgroundColor, createBox, createText} from '@shopify/restyle';
import {
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import {size} from '../Theme/Index';
import _ from 'lodash';
import Modal from 'react-native-modal';
import {Button, Header, Input} from '../ReusableComponents';
import AddOnCart from '../AddOnCart/AddOnCart';
import {fonts, palette, TypographyStyles} from '../Theme/Index';
import CartItemsList from './CartItemsList';
import MenuConstant from '../../Redux/MenuConstant';
import {addCart, addCoupons} from '../Services/Cart';
import AuthConstants from '../../Redux/AuthConstants';
import RedeemedVouchersList from '../RedeemedVouchers/RedeemedVouchersList';
import {getRedeemVouchersList, voucherApply} from '../Services/Vouchers';
const Box = createBox();
const Text = createText();
const LeftArrow = require('../../assets/arrow/leftarr.png');
const EmptyCart = require('../../assets/cart/cartempty.png');
const Dots = require('../../assets/menu/dots.png');
const PokkiPoints = require('../../assets/menu/pokkipoints.png');
const Product = require('../../assets/product/product.png');
const Home = require('../../assets/selectAddress/home.png');
const windowHeight = Dimensions.get('window').height;

export default ({navigation, route, visible}) => {
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      data: false,
      isModalVisible: false,
      selectedObj: {},
      menuItem: [],
      total: 0,
      list: [],
      couponInput: false,
      voucherModal: false,
      redeemedVouchers: [],
      voucherValue: '',
      code: '',
    },
  );
  const {address} = useSelector((state) => ({
    ...state.address.address,
  }));

  const {Menu} = useSelector((state) => ({
    ...state.menu.menu,
  }));
  const {vouchers} = useSelector((state) => ({
    ...state.offer.offer,
  }));
  console.log({vouchers});

  useEffect(() => {
    getRedeemVouchers();
  }, []);

  const getRedeemVouchers = () => {
    getRedeemVouchersList()
      .then((response) => {
        const {data} = response;
        const {vouchersRedeemed} = data;
        setState({redeemedVouchers: vouchersRedeemed});
        console.log(response);
      })
      .catch((error) => {
        console.log({error});
      });
  };

  useEffect(() => {
    setState({list: Menu});
  }, []);

  useEffect(() => {
    let tempPrice = [];
    if (Menu.length === 0) {
      tempPrice = [];
      setState({isModalVisible: false, selectedObj: {}, list: []});
    } else if (Menu.length > 0) {
      Menu.map((e) => {
        let total = 0;
        let totalAddons = 0;
        let totalVariation = 0;
        let basePrice = e.basePrice;
        total = basePrice;
        if (e.ShopMenuAddons.length > 0) {
          e.ShopMenuAddons.map((element) => {
            if (element.selected) {
              totalAddons = element.price + totalAddons;
              e.addOnsPrice = totalAddons;
            }
          });
        }
        if (e.ShopMenuVariations.length > 0) {
          e.ShopMenuVariations.map((element) => {
            if (element.selected) {
              totalVariation = element.price + totalVariation;
              e.variations = totalVariation;
              e.basePrice = element.price;
            }
          });
        }
        const addOns = e.addOnsPrice ? e.addOnsPrice : 0;
        const final = total + addOns;
        total = final * e.quantity;

        tempPrice.push({total: total});
      });
      let finalTotal = 0;
      if (tempPrice.length > 0) {
        tempPrice.map((e) => {
          finalTotal = e.total + finalTotal - state.voucherValue;
        });
      }
      setState({total: finalTotal, list: Menu});
    }
  }, [Menu]);

  useEffect(() => {
    if (!_.isEmpty(state.selectedObj)) {
      setState({isModalVisible: true});
    }
  }, [state.selectedObj]);

  const addQuantity = (value) => {
    //check if quantity not exist
    if (Menu.length === 0) {
      const arr = [];
      arr.push(value);
      dispatch({
        type: MenuConstant.ADD_MENU_ITEMS,
        menu: arr,
      });
    } else {
      // check if the selected itm is present in array
      let magenicVendor = Menu.find((vendor) => vendor['id'] === value.id);
      if (magenicVendor !== undefined && !_.isEmpty(magenicVendor)) {
        // if selected item exist then increase quantity
        const increasedQuantity = Menu.map((element) => {
          const obj = element;
          if (element.id === value.id) {
            let q = 0;
            if (element.quantity > 0) {
              q = element.quantity - 1;
            }
            obj.quantity = q + 1;
          }
          return obj;
        });
        dispatch({
          type: MenuConstant.ADD_MENU_ITEMS,
          menu: increasedQuantity,
        });
      } else {
        const arrr = [...Menu];
        arrr.push(value);
        dispatch({
          type: MenuConstant.ADD_MENU_ITEMS,
          menu: arrr,
        });
      }
    }
    const selectMenu = state.list.map((element) => {
      const obj = element;
      if (element.id === value.id) {
        obj.quantity = element.quantity + 1;
      }
      return obj;
    });
    setState({list: selectMenu});
  };

  const decreaseQuantity = (value) => {
    // check if the selected itm is present in array
    let magenicVendor = Menu.find((vendor) => vendor['id'] === value.id);
    if (!_.isEmpty(magenicVendor)) {
      // if selected item exist then decrease quantity
      let increasedQuantity = Menu.map((element) => {
        const obj = element;
        if (element.id === value.id) {
          let q = 0;
          if (element.quantity > 0) {
            q = element.quantity + 1;
          }
          obj.quantity = q - 1;
        }
        return obj;
      });
      const selected = [];
      increasedQuantity.map((element) => {
        if (element.id === value.id) {
          if (element.quantity !== 1 && element.quantity !== 0) {
            selected.push(element);
          }
        } else {
          selected.push(element);
        }
      });

      dispatch({
        type: MenuConstant.ADD_MENU_ITEMS,
        menu: selected,
      });
      setState({list: selected});
    }
    const selectMenu = state.list.map((element) => {
      const obj = element;
      if (element.id === value.id) {
        obj.quantity = element.quantity - 1;
      }
      return obj;
    });
    setState({list: selectMenu});
  };

  const getData = () => {
    const tempMenu = Menu.map((e) => {
      const variation = [];
      const addOn = [];
      let data = {
        shopId: e.shop_id,
        itemId: e.item_id,
        variationId: variation,
        addonIds: addOn,
        orderType: 'Delivery',
        quantity: e.quantity,
        address_id: address.id,
      };
      e.ShopMenuVariations.map((e) => {
        if (e.selected) {
          variation.push(e.variation_id);
        }
      });
      e.ShopMenuAddons.map((e) => {
        if (e.selected) {
          addOn.push(e.addon_id);
        }
      });
      return data;
    });
    if (tempMenu.length > 0) {
      addCartList(tempMenu);
    }
  };

  const applyCoupons = () => {
    const code = state.code;
    dispatch({
      type: AuthConstants.LOADING,
      loading: true,
    });
    const coupon = {
      couponCode: code,
    };
    console.log({coupon});
    addCoupons(coupon)
      .then((response) => {
        const {data, errorMessage} = response;
        dispatch({
          type: AuthConstants.LOADING,
          loading: false,
        });
        if (data == null) {
          dispatch({
            type: AuthConstants.TOAST,
            toast: {
              title: errorMessage,
              loading: true,
              status: 'error',
            },
          });
        } else {
          dispatch({
            type: AuthConstants.TOAST,
            toast: {
              title: data.message,
              loading: true,
              status: 'success',
            },
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: AuthConstants.LOADING,
          loading: false,
        });
        console.log({error});
      });
  };
  const applyVoucher = (item) => {
    console.log({item});
    const id = {
      voucherId: item.id,
    };
    dispatch({
      type: AuthConstants.LOADING,
      loading: true,
    });
    voucherApply(id)
      .then((response) => {
        const {data, errorMessage} = response;
        dispatch({
          type: AuthConstants.LOADING,
          loading: false,
        });

        if (data == null) {
          setState({voucherModal: false, voucherValue: item.RM});
          dispatch({
            type: AuthConstants.TOAST,
            toast: {
              title: errorMessage,
              loading: true,
              status: 'error',
            },
          });
        } else {
          setState({voucherModal: false, voucherValue: item.RM});
          dispatch({
            type: AuthConstants.TOAST,
            toast: {
              title: data.message,
              loading: true,
              status: 'success',
            },
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: AuthConstants.LOADING,
          loading: false,
        });
        console.log({error});
      });
  };

  const addCartList = (data) => {
    dispatch({
      type: AuthConstants.LOADING,
      loading: true,
    });
    console.log({data});
    addCart(data)
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
      })
      .catch((error) => {
        dispatch({
          type: AuthConstants.LOADING,
          loading: false,
        });
        console.log({error});
      });
  };

  const variationSelection = (value, obj) => {
    const newMenu = Menu.map((element) => {
      let e = element;
      if (obj.id === e.id) {
        e.ShopMenuVariations = element.ShopMenuVariations.map((element) => {
          let tempE = element;
          if (element.id === value.id) {
            if (element.selected) {
              tempE.selected = false;
            } else {
              tempE.selected = true;
            }
          } else {
            tempE.selected = false;
          }
          return tempE;
        });
      }
      return e;
    });
    dispatch({
      type: MenuConstant.ADD_MENU_ITEMS,
      menu: newMenu,
    });
  };

  const addOnsSelection = (value, obj) => {
    const newMenu = Menu.map((element) => {
      let e = element;
      if (obj.id === e.id) {
        e.ShopMenuAddons = element.ShopMenuAddons.map((element) => {
          let tempE = element;
          if (element.id === value.id) {
            if (element.selected) {
              tempE.selected = false;
            } else {
              tempE.selected = true;
            }
          }
          return tempE;
        });
      }
      return e;
    });
    dispatch({
      type: MenuConstant.ADD_MENU_ITEMS,
      menu: newMenu,
    });
  };

  console.log({Menu});
  console.log('VOUCHER VALUE =====', state.voucherValue);
  return (
    <Box flex={1} backgroundColor="support1">
      {Menu.length > 0 ? (
        <Box flex={1}>
          <Header
            varient="support220regular"
            title={'My Cart'}
            renderLeft={() => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={LeftArrow} />
              </TouchableOpacity>
            )}
            renderRight={() => <Image source={Dots} />}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.content}>
            <Text variant="support213regular">{`Your Items (${Menu.length})`}</Text>
            <FlatList
              contentContainerStyle={styles.flatListContainer}
              data={state.list}
              renderItem={({item, index}) => (
                <CartItemsList
                  item={item}
                  index={index}
                  navigation={navigation}
                  addQuantity={(value) => {
                    addQuantity(value);
                    if (state.selectedObj.quanity === value.quantity) {
                      setState({isModalVisible: true});
                    } else {
                      setState({selectedObj: value});
                    }
                  }}
                  decreaseQuantity={(value) => decreaseQuantity(value)}
                />
              )}
              keyExtractor={(item, index) => item.id.toString()}
            />
            <Box
              marginHorizontal="m"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center">
              <Text variant="support518regular">Sub Total</Text>
              <Text opacity={0.6} variant="support518medium">
                RM {state.total}.00
              </Text>
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
            <Text pl="s" mb="l" variant="support412regular">
              ADDRESS
            </Text>
            <Box
              flex={1}
              height={97}
              borderRadius={15}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              marginHorizontal="m"
              backgroundColor="white"
              style={[TypographyStyles.cardShadow]}>
              <Box flexDirection="row">
                <Box height={97}>
                  <Box mt="l" ml="l">
                    <Image source={Home} resizeMode="contain" />
                  </Box>
                </Box>
                <Box justifyContent="center" ml="m">
                  <Text numberOfLines={1} width={size.width / 2}>
                    {address.city}
                  </Text>
                  <Text numberOfLines={1} width={size.width / 2}>
                    {address.country}
                  </Text>
                  <Text
                    numberOfLines={1}
                    width={
                      size.width / 2
                    }>{`${address.place},${address.street},${address.province}`}</Text>
                </Box>
              </Box>
              {/* <TouchableOpacity>
                <Box height={96}>
                  <Text mt="l" variant="primary13regular" mr="l">
                    Change
                  </Text>
                </Box>
              </TouchableOpacity> */}
            </Box>
            <Box
              flexDirection="row"
              mt="l"
              justifyContent="space-between"
              marginHorizontal="m"
              alignItems="center">
              <Text variant="support218regular">Voucher</Text>
              <TouchableOpacity
                onPress={() => {
                  setState({voucherModal: true}), getData();
                }}>
                {state.voucherValue == '' ? (
                  <Text variant="primary16regular">Apply</Text>
                ) : (
                  <Text variant="primary16regular">
                    -RM{state.voucherValue}.00
                  </Text>
                )}
              </TouchableOpacity>
            </Box>
            <Box
              flexDirection="row"
              mt="l"
              justifyContent="space-between"
              marginHorizontal="m"
              alignItems="center">
              <Text variant="support218regular">Coupon Code</Text>
            </Box>
            <Box
              flexDirection="row"
              style={[
                styles.textInputStyle,
                {alignItems: 'center', height: 52},
              ]}>
              <TextInput
                value={state.code}
                placeholder="Enter your coupon code here..."
                onChangeText={(text) => setState({code: text})}
              />
              <TouchableOpacity
                style={{position: 'absolute', right: 10}}
                onPress={() => applyCoupons()}>
                <Text variant="primary16regular">Apply</Text>
              </TouchableOpacity>
            </Box>

            <Text pl="s" pt="l" variant="support412regular">
              Order remark
            </Text>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Type your order remark here..."
            />
            <TouchableOpacity style={styles.buttonView}>
              <Button
                onPress={() => navigation.navigate('CartSummary')}
                label={`RM ${state.total}.00 Checkout`}
              />
            </TouchableOpacity>
          </ScrollView>
        </Box>
      ) : (
        <Box
          style={[
            TypographyStyles.container,
            {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              alignItems: 'center',
              justifyContent: 'space-around',
            },
          ]}>
          <Text mt="l" variant="primary25regular">
            Cart Empty
          </Text>
          <Image source={EmptyCart} />
          <Text variant="support415regular" textAlign="center">
            {`Good food is always cooking! \n Add something from \nmenu`}
          </Text>
          <Box height={40}>
            <Button
              onPress={() => navigation.navigate('Dashboard')}
              label="Home"
              buttonStyle={styles.homeButton}
            />
          </Box>
        </Box>
      )}
      <Modal
        swipeDirection="down"
        onBackdropPress={() => {
          setState({voucherModal: false});
        }}
        style={styles.modalStyle}
        isVisible={state.voucherModal}>
        <Box
          style={{
            backgroundColor: palette.support1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: windowHeight * 0.7,
          }}>
          <Box
            height={4}
            mt="s"
            backgroundColor="support4"
            width={60}
            borderRadius={30}
            opacity={0.5}
            alignSelf="center"
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginVertical: 10}}
            data={state.redeemedVouchers}
            // ItemSeparatorComponent={() => {
            //   return (
            //     <Box marginHorizontal="l" height={1} backgroundColor="primary6" />
            //   );
            // }}
            renderItem={({item, index}) => (
              <RedeemedVouchersList
                item={item}
                index={index}
                applyVoucher={(id) => applyVoucher(id)}
              />
            )}
            keyExtractor={(item, index) => item.toString()}
          />
        </Box>
      </Modal>

      <Modal
        swipeDirection="down"
        onBackdropPress={() => {
          setState({isModalVisible: false, selectedObj: {}});
        }}
        style={styles.modalStyle}
        isVisible={state.isModalVisible}>
        <Box style={{height: windowHeight * 0.8}}>
          <AddOnCart
            variationSelection={(value, obj) => {
              variationSelection(value, obj);
            }}
            addOnsSelection={(value, obj) => {
              addOnsSelection(value, obj);
            }}
            navigation={navigation}
            addQuantity={(value) => addQuantity(value)}
            decreaseQuantity={(value) => decreaseQuantity(value)}
            selectedObj={state.selectedObj}
          />
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
  homeButton: {width: 102, borderRadius: 15, height: 36},
  text: {
    fontSize: 16,
    color: palette.support3,
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
  textInputStyle: {
    height: 52,
    borderWidth: 0.4,
    borderColor: palette.support6,
    marginTop: 10,
    borderRadius: 15,
    paddingLeft: 10,
    fontFamily: fonts.regular,
    fontSize: 15,
  },
  buttonView: {
    marginVertical: 20,
    height: 40,
    width: '95%',
    alignSelf: 'center',
  },
  modalStyle: {
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
});
