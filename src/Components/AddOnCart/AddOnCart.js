import React, {useState, useEffect, useRef, useReducer} from 'react';
import {createBox, createText} from '@shopify/restyle';
import _ from 'lodash';
import {TouchableOpacity, StyleSheet, FlatList, Image} from 'react-native';
import {Button, Header, Input} from '../ReusableComponents';
import {useDispatch, useSelector} from 'react-redux';
import {fonts, palette, TypographyStyles} from '../Theme/Index';
import {MenuConstant} from '../../Redux';
const Box = createBox();
const Text = createText();
const CheckRed = require('../../assets/menu/checkRed.png');
export default ({
  navigation,
  route,
  visible,
  addQuantity,
  decreaseQuantity,
  item,
  selectedObj,
  addOnsSelection,
  variationSelection,
}) => {
  const {Menu} = useSelector((state) => ({
    ...state.menu.menu,
  }));

  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      total: 0,
      quantity: 0,
      ShopMenuVariations: [],
      ShopMenuAddons: [],
      basePrice: [],
      variationPrice: [],
      addOnsPrice: [],
    },
  );

  useEffect(() => {
    let tempPrice = [];
    if (Menu.length > 0) {
      Menu.map((e) => {
        if (e.id === selectedObj.id) {
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
                // totalVariation = element.price + totalVariation;
                e.basePrice = element.price;
              }
            });
          }
          total = total + totalVariation + totalAddons;
          tempPrice.push({total: total});
          setState({
            quantity: e.quantity,
            ShopMenuAddons: e.ShopMenuAddons,
            ShopMenuVariations: e.ShopMenuVariations,
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

  return (
    <>
      {!_.isEmpty(selectedObj) ? (
        <Box
          style={[
            TypographyStyles.container,
            {borderTopLeftRadius: 20, borderTopRightRadius: 20},
          ]}>
          <Box
            height={4}
            mt="s"
            backgroundColor="support4"
            width={60}
            borderRadius={30}
            opacity={0.5}
            alignSelf="center"
          />
          <Box marginHorizontal="l" flex={1}>
            <Text paddingVertical="l" variant="support218regular">
              {selectedObj.name}
            </Text>
            <Text variant="support218medium">Variation</Text>
            <Text pt="m" variant="support414regular">
              Please select any on options
            </Text>
            <Box>
              <FlatList
                data={state.ShopMenuVariations}
                renderItem={({item, index}) => (
                  <Box
                    flexDirection="row"
                    justifyContent="space-between"
                    mt="l">
                    <Text variant="support415regular">
                      {item.variation_name}
                    </Text>
                    <Box flexDirection="row">
                      <Text paddingHorizontal="m" variant="support415regular">
                        RM {item.price}
                      </Text>
                      <TouchableOpacity
                        onPress={() => variationSelection(item, selectedObj)}>
                        <Box
                          height={22}
                          width={22}
                          borderRadius={11}
                          borderWidth={0.5}
                          borderColor="primary"
                          alignItems="center"
                          justifyContent="center">
                          {item.selected && (
                            <Box
                              height={11}
                              width={11}
                              borderRadius={5.5}
                              backgroundColor="primary"
                            />
                          )}
                        </Box>
                      </TouchableOpacity>
                    </Box>
                  </Box>
                )}
                keyExtractor={(item, index) => item.id.toString()}
              />
            </Box>
            {selectedObj.ShopMenuAddons.length > 0 ? (
              <>
                <Text variant="support218medium" pt="l">
                  Add-Ons
                </Text>
                <FlatList
                  data={state.ShopMenuAddons}
                  renderItem={({item, index}) => (
                    <Box
                      flexDirection="row"
                      justifyContent="space-between"
                      mt="l">
                      <Text variant="support415regular">{item.name}</Text>
                      <Box flexDirection="row">
                        <Text paddingHorizontal="m" variant="support415regular">
                          RM +{item.price}
                        </Text>
                        <TouchableOpacity
                          onPress={() => addOnsSelection(item, selectedObj)}>
                          <Box
                            height={22}
                            width={22}
                            borderRadius={5}
                            borderWidth={0.5}
                            borderColor="primary"
                            alignItems="center"
                            justifyContent="center">
                            {item.selected && <Image source={CheckRed} />}
                          </Box>
                        </TouchableOpacity>
                      </Box>
                    </Box>
                  )}
                  keyExtractor={(item, index) => item}
                />
              </>
            ) : null}
          </Box>
          <Box
            marginVertical="m"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginHorizontal="m">
            {state.quantity > 0 ? (
              <Box
                width={97}
                height={37}
                backgroundColor="primary"
                borderRadius={15}
                alignItems="center"
                justifyContent="center"
                flexDirection="row">
                <TouchableOpacity onPress={() => decreaseQuantity(selectedObj)}>
                  <Text variant="support116regular">-</Text>
                </TouchableOpacity>
                <Text variant="support116regular" paddingHorizontal="l">
                  {state.quantity}
                </Text>
                <TouchableOpacity onPress={() => addQuantity(selectedObj)}>
                  <Text variant="support116regular">+</Text>
                </TouchableOpacity>
              </Box>
            ) : (
              <TouchableOpacity onPress={() => addQuantity(selectedObj)}>
                <Box
                  borderColor="primary1"
                  borderWidth={0.8}
                  backgroundColor="primary2"
                  height={31}
                  width={79}
                  borderRadius={12}
                  justifyContent="center"
                  alignItems="center">
                  <Text variant="primary15regular">Add +</Text>
                </Box>
              </TouchableOpacity>
            )}
            <Box
              mr="m"
              height={45}
              width={210}
              borderWidth={0.5}
              borderColor="primary"
              borderRadius={15}
              justifyContent="space-around"
              flexDirection="row"
              alignItems="center">
              <Text>{Menu.length} item</Text>
              <Text>RM {state.total} </Text>
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
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
});
