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
import _ from 'lodash';
// import {getMenuShopId} from '../Services/Profile';
import Modal from 'react-native-modal';
import {Header} from '../ReusableComponents';
import MenuCategories from '../Categories/MenuCategories';
import MenuList from '../Categories/MenuList';
import {palette, size, TypographyStyles} from '../Theme/Index';
import AddOnCart from '../AddOnCart/AddOnCart';
import {getCategory, getMenuShopId, searchList} from '../Services/Menu';
import authConstants from '../../Redux/AuthConstants';
import MenuConstant from '../../Redux/MenuConstant';
const Product = require('../../assets/product/product.png');

const LeftArrow = require('../../assets/arrow/leftarr.png');
const Search = require('../../assets/arrow/search.png');
const Location = require('../../assets/locationred/location.png');
const Cross = require('../../assets/cross/cross.png');
const windowHeight = Dimensions.get('window').height;
const Box = createBox();
const Text = createText();

function usePrevious(data) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = data;
  }, [data]);
  return ref.current;
}

function Menu({navigation, props, route}) {
  const [cartId, setCartId] = useState(0);
  const previousCartId = usePrevious(cartId);
  // console.log({previousCartId});
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      isModalVisible: false,
      category: '',
      menuItem: [],
      selectedObj: {},
      total: 0,
      search: '',
      shopList: [],
    },
  );

  const Address = useSelector((state) => ({
    ...state.address,
  }));
  console.log({Address});

  const {Menu} = useSelector((state) => ({
    ...state.menu.menu,
  }));

  const visible = () => {
    setState({isModalVisible: true});
  };

  useEffect(() => {
    // getCategoriesList();
    // dispatch({
    //   type: MenuConstant.ADD_MENU_ITEMS,
    //   menu: [],
    // });
  }, []);

  useEffect(() => {
    let tempPrice = [];
    if (Menu.length === 0) {
      tempPrice = [];
      setState({isModalVisible: false, selectedObj: {}});
    } else if (Menu.length > 0) {
      Menu.map((e) => {
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
        total = total + totalAddons;
        tempPrice.push({total: total});
      });
      let finalTotal = 0;
      if (tempPrice.length > 0) {
        tempPrice.map((e) => {
          finalTotal = e.total + finalTotal;
        });
      }
      setState({total: finalTotal});
    }
  }, [Menu]);

  useEffect(() => {
    if (!_.isEmpty(state.selectedObj)) {
      setState({isModalVisible: true});
    }
  }, [state.selectedObj]);

  //   useEffect(() => {
  //     getShopList();
  //   }, [cartId]);
  console.log({route});
  const searchMenuList = (text) => {
    setState({search: text});
    const {params} = route;
    const {item} = params;
    const data = {
      term: text,
      page: 1,
      limit: 10,
      shopId: item.id,
    };
    searchList(data)
      .then((response) => {
        console.log({response});
        const {data} = response;
        const {shopMenu} = data;
        if (text.length > 0) {
          setState({
            menuItem: shopMenu,
          });
        } else {
          setState({menuItem: []});
        }
      })
      .catch((error) => {
        console.log({error});
      });
  };

  const getCategoriesList = () => {
    getCategory()
      .then((response) => {
        const {data} = response;
        const {categoryList} = data;
        let tempArr = [];
        if (categoryList.length > 0) {
          tempArr = categoryList.map((element, index) => {
            let obj = element;
            if (index === 0) {
              obj.selected = true;
              setCartId(obj.id);
            } else {
              obj.selected = false;
            }
            return obj;
          });
        }
        setState({
          category: tempArr,
        });
      })
      .catch((error) => {
        console.log({error});
      });
  };

  const selectcategory = (value) => {
    const id = value.id;
    const category = state.category.map((element, index) => {
      let obj = element;
      if (obj.id === id) {
        if (obj.selected) {
          obj.selected = false;
        } else {
          obj.selected = true;
          setCartId(obj.id);
        }
      } else {
        obj.selected = false;
      }
      return obj;
    });
    setState({category});
  };

  //   const getShopList = () => {
  //     const {params} = route;
  //     const {item} = params;
  //     const {id} = item;
  //     const data = {
  //       catId: cartId,
  //       shopId: id,
  //     };
  //     console.log({data});
  //     if (id !== 0 && cartId !== 0) {
  //       getMenuShopId(data)
  //         .then((response) => {
  //           if (response.success) {
  //             const {data} = response;
  //             const {shopMenu} = data;
  //             let tempMenu = [];
  //             let tempMenu1 = shopMenu.filter((e) => {
  //               let obj = e;
  //               if (obj.isActive) {
  //                 return obj;
  //               }
  //             });

  //             if (tempMenu1.length > 0) {
  //               tempMenu = shopMenu.map((e, index) => {
  //                 const addOns = [];
  //                 const variation = [];
  //                 let obj = e;
  //                 obj.quantity = 0;
  //                 if (e.ShopMenuAddons.length > 0) {
  //                   e.ShopMenuAddons.map((e) => {
  //                     let tempObj = e;

  //                     if (tempObj.isDefault) {
  //                       tempObj.selected = true;
  //                     } else {
  //                       tempObj.selected = false;
  //                     }
  //                     addOns.push(tempObj);
  //                   });
  //                 }
  //                 obj.ShopMenuAddons = addOns;
  //                 if (e.ShopMenuVariations.length > 0) {
  //                   e.ShopMenuVariations.map((e) => {
  //                     let tempObj = e;
  //                     if (tempObj.isDefault) {
  //                       tempObj.selected = true;
  //                     } else {
  //                       tempObj.selected = false;
  //                     }
  //                     variation.push(tempObj);
  //                   });
  //                 }
  //                 obj.ShopMenuVariations = variation;
  //                 return obj;
  //               });
  //             }
  //             setState({
  //               menuItem: tempMenu1.length > 0 ? tempMenu : tempMenu1,
  //             });
  //             if (tempMenu.length > 0) {
  //               if (cartId !== previousCartId) {
  //                 if (Menu.length > 0) {
  //                   const newMenu = tempMenu.map((e) => {
  //                     let temp = e;
  //                     Menu.map((element) => {
  //                       if (element.id === e.id) {
  //                         temp.quantity = element.quantity;
  //                       }
  //                     });
  //                     return temp;
  //                   });

  //                   setState({
  //                     menuItem: newMenu,
  //                   });
  //                 }
  //               }
  //             }
  //           } else {
  //             setState({menuItem: []});
  //           }
  //         })
  //         .catch((error) => {
  //           console.log({error});
  //         });
  //     }
  //   };

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

    const selectMenu = state.menuItem.map((element) => {
      const obj = element;
      if (element.id === value.id) {
        obj.quantity = element.quantity + 1;
      }
      return obj;
    });
    setState({menuItem: selectMenu});
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
      setState({menuItem: selected});
    }

    const selectMenu = state.menuItem.map((element) => {
      const obj = element;
      if (element.id === value.id) {
        obj.quantity = element.quantity - 1;
      }
      return obj;
    });
    setState({menuItem: selectMenu});
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

  const onTapMenu = (item) => {
    navigation.navigate('SingleFood', {item});
  };

  const {isModalVisible, search, category} = state;
  console.log('STATE === ===', state.menuItem);

  return (
    <Box flex={1} backgroundColor="primary3">
      <Header
        title={'Menu'}
        renderLeft={() => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={LeftArrow} />
          </TouchableOpacity>
        )}
        renderRight={() => (
          <TouchableOpacity>
            <Image source={Search} />
          </TouchableOpacity>
        )}
      />

      <Box
        marginHorizontal="l"
        borderRadius={20}
        height={50}
        borderWidth={0.8}
        borderColor="support4"
        flexDirection="row"
        alignItems="center"
        paddingHorizontal="m">
        <Image source={Search} />
        <TextInput
          placeholder="Search food"
          placeholderTextColor={palette.support2}
          value={state.search}
          onChangeText={(text) => searchMenuList(text)}
          // style={{
          //   borderBottomColor: palette.support7,
          //   borderBottomWidth: 1,
          //   marginVertical: 5,
          //   width: '90%',
          //   alignSelf: 'center',
          //   fontFamily: 'Ubuntu-Regular',
          //   fontSize: 12,
          // }}
        />
        <TouchableOpacity
          style={{position: 'absolute', right: 10}}
          onPress={() => setState({search: false})}>
          <Image source={Cross} />
        </TouchableOpacity>
      </Box>

      {state.menuItem.length > 0 ? (
        <Box flex={1} style={styles.contentContainerStyle}>
          <FlatList
            contentContainerStyle={{marginTop: 20}}
            data={state.menuItem}
            ItemSeparatorComponent={() => {
              return (
                <Box
                  marginHorizontal="l"
                  height={1}
                  backgroundColor="primary6"
                />
              );
            }}
            renderItem={({item, index}) => (
              <MenuList
                item={item}
                index={index}
                onTapMenu={onTapMenu}
                addQuantity={(value) => {
                  addQuantity(value);
                  if (state.selectedObj.quanity === value.quantity) {
                    setState({isModalVisible: true});
                  } else {
                    setState({selectedObj: value});
                  }
                }}
                decreaseQuantity={(value) => decreaseQuantity(value)}
                visible={() => visible()}
              />
            )}
            keyExtractor={(item, index) => item.id.toString()}
          />
        </Box>
      ) : (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text>No Menu for this Category</Text>
        </Box>
      )}
      {Menu.length > 0 ? (
        <Box
          position="absolute"
          left={0}
          right={0}
          bottom={10}
          marginHorizontal="l"
          marginVertical="m"
          height={55}
          backgroundColor="primary"
          borderRadius={30}
          justifyContent="space-between"
          alignItems="center"
          flexDirection="row"
          paddingHorizontal="l">
          <Box>
            <Text variant="support112medium">{Menu.length} ITEM</Text>
            <Text variant="support114medium">RM {state.total}</Text>
          </Box>
          <TouchableOpacity onPress={() => navigation.navigate('bag')}>
            <Text variant="support118regular">View Cart</Text>
          </TouchableOpacity>
        </Box>
      ) : null}
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
}
export default Menu;
const styles = StyleSheet.create({
  content: {flexGrow: 1},
  buttonStyle: {
    height: 44,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: palette.primary2,
    width: size.width,
    marginHorizontal: 20,
  },
  text: {fontSize: 16, color: palette.tertiary2},
  eye: {height: 30, width: 30},
  modalStyle: {
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  contentContainerStyle: {
    marginTop: 30,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
  },
  MenuCategoriesStyles: {
    marginLeft: 10,
    marginTop: 10,
    height: 70,
  },
});
