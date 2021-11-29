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
  Pressable,
} from 'react-native';
import MenuConstant from '../../Redux/MenuConstant';
import Modal from 'react-native-modal';
import AddOnCart from '../AddOnCart/AddOnCart';
const DemoProduct = require('../../assets/menu/demoProduct.png');
import {Button, Header, Input} from '../ReusableComponents';
import _ from 'lodash';
import AddAndRemove from '../AddAndRemove/AddAndRemove';
import {fonts, palette, size} from '../Theme/Index';
import RecommendedProductsList from './RecommendedProductsList';
import {color} from 'react-native-reanimated';
import {envVars} from '../Helpers/constants';
const Box = createBox();
const Text = createText();
const LeftArrow = require('../../assets/arrow/leftarr.png');
const Bag = require('../../assets/Tabs/bag.png');
const Dislike = require('../../assets/heart/unlike.png');
const PokkiPoints = require('../../assets/menu/pokkipoints.png');
const Product = require('../../assets/product/productimg.png');
const Home = require('../../assets/selectAddress/home.png');

export default ({navigation, route, visible}) => {
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const {Menu} = useSelector((state) => ({
    ...state.menu.menu,
  }));
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      data: true,
      item: {},
      isModalVisible: false,
      quantity: 0,
      total: 0,
    },
  );

  useEffect(() => {
    let tempPrice = [];
    if (Menu.length > 0) {
      Menu.map((e) => {
        if (e.id === state.item.id) {
          let total = 0;
          let totalAddons = 0;
          let totalVariation = 0;
          let basePrice = e.basePrice;
          total = basePrice * e.quantity + total;
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
                e.basePrice = element.price;
              }
            });
          }
          total = total + totalAddons;
          tempPrice.push({total: total});
          setState({
            quantity: e.quantity,
          });
        }
      });
    } else {
      tempPrice = [];
    }
    let finalTotal = 0;
    if (tempPrice.length > 0) {
      tempPrice.map((e) => {
        finalTotal = e.total + finalTotal;
      });
    }
    setState({total: finalTotal});
  }, [Menu]);

  useEffect(() => {
    const {params} = route;
    const {item} = params;
    let tempPrice = [];
    if (item !== undefined && item !== null) {
      Menu.map((e) => {
        if (e.id === item.id) {
          let total = 0;
          let totalAddons = 0;
          let totalVariation = 0;
          let basePrice = e.basePrice;
          total = e.basePrice * e.quantity + total;
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
                e.basePrice = element.price;
              }
            });
          }
          total = total + totalAddons;
          tempPrice.push({total: total});
          setState({
            quantity: e.quantity,
          });
        }
      });
      setState({item: item});
      let finalTotal = 0;
      if (tempPrice.length > 0) {
        tempPrice.map((e) => {
          finalTotal = e.total + finalTotal;
        });
      }
      setState({total: finalTotal});
    }
  }, []);

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
            let q = value.quantity;
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
  };

  const decreaseQuantity = (value) => {
    // check if the selected itm is present in array
    let magenicVendor = Menu.find((vendor) => vendor['id'] === value.id);
    if (!_.isEmpty(magenicVendor)) {
      // if selected item exist then decrease quantity
      let increasedQuantity = Menu.map((element) => {
        const obj = element;
        if (element.id === value.id) {
          let q = value.quantity;

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
    }
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
        {!_.isEmpty(state.item) ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.content}>
            <Box
              alignItems="center"
              height={280}
              backgroundColor="support"
              borderBottomLeftRadius={200}
              borderBottomRightRadius={200}>
              <Image
                source={
                  state.item.image !== null
                    ? {uri: `${envVars.baseUrl}${state.item.image}`}
                    : DemoProduct
                }
                style={styles.product}
              />
              <Box flexDirection="row" position="absolute" bottom={5}>
                {/* <Button buttonStyle={styles.buttonRegular} label="Regular" />
                <Button
                  buttonStyle={styles.buttonLarge}
                  label="Large"
                  textStyle={{color: palette.support2}}
                /> */}
              </Box>
            </Box>
            <Box
              mt="l"
              paddingHorizontal="m"
              backgroundColor="support1"
              borderTopLeftRadius={20}
              borderTopRightRadius={20}
              shadowColor="support2"
              shadowOpacity={0.23}
              shadowRadius={2.62}
              elevation={4}>
              <Box
                mt="l"
                flex={1}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center">
                <Text
                  style={{flex: 0.8}}
                  variant="support322medium"
                  paddingHorizontal="m">
                  {state.item.name}
                </Text>
                {/* <Box flex={0.2}>
                <Image source={Dislike} />
              </Box> */}
              </Box>
              {/* <Text variant="support414regular" padding="m">
                Bulgogi Beef Deopbap from MyeongDong Topokki, takes
              </Text> */}
              <Text variant="support322medium" paddingHorizontal="m">
                RM {state.item.basePrice}.00
              </Text>

              <Box
                flexDirection="row"
                mt="l"
                justifyContent="space-between"
                marginHorizontal="m"
                alignItems="center">
                <Text variant="support318medium">Quantity</Text>
                <AddAndRemove
                  item={state.item}
                  quantity={state.quantity}
                  addQuantity={(value) => {
                    addQuantity(value);
                    setState({isModalVisible: true});
                  }}
                  decreaseQuantity={decreaseQuantity}
                />
              </Box>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('bag');
                }}>
                <Box
                  marginVertical="l"
                  flex={1}
                  height={68}
                  marginHorizontal="l"
                  backgroundColor="primary"
                  borderRadius={40}
                  alignItems="center"
                  justifyContent="space-between"
                  flexDirection="row">
                  <Box ml="l">
                    <Text variant="support114regular">Total Price</Text>
                    <Text variant="support120medium">RM {state.total}</Text>
                  </Box>
                  <Box
                    backgroundColor="support1"
                    height={38}
                    width={size.width / 3.5}
                    borderRadius={20}
                    alignItems="center"
                    justifyContent="center"
                    marginHorizontal="m"
                    flexDirection="row">
                    <Image source={Bag} style={styles.bagImage} />
                    <Text marginHorizontal="m" variant="support214regular">
                      View Cart
                    </Text>
                  </Box>
                </Box>
              </TouchableOpacity>
            </Box>
            <Modal
              swipeDirection="down"
              onBackdropPress={() => {
                setState({isModalVisible: false});
              }}
              style={styles.modalStyle}
              isVisible={state.isModalVisible}>
              <Box style={{height: size.height * 0.8}}>
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
                  selectedObj={state.item}
                />
              </Box>
            </Modal>
          </ScrollView>
        ) : null}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
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
  buttonLarge: {
    height: 40,
    width: 93,
    backgroundColor: palette.support1,
    borderRadius: 15,
  },
  buttonRegular: {
    height: 40,
    width: 93,
    backgroundColor: palette.support5,
    borderRadius: 15,
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
  bagImage: {height: 16.2, width: 14.5, marginLeft: 5},
  bagView: {
    marginHorizontal: 15,
  },
  priceView: {
    flex: 1,
    height: 68,
    marginHorizontal: 20,
    backgroundColor: palette.primary,
    borderRadius: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainerStyle: {
    marginTop: 20,
    paddingTop: 10,
  },
  product: {
    position: 'absolute',
    top: 5,
    resizeMode: 'contain',
    height: 250,
    width: 250,
  },
});

/* <Text pl="m" pt="m" variant="support318medium">
              Recommended Products
            </Text> */

/* <FlatList
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
              keyExtractor={(item, index) => item}
            /> */
