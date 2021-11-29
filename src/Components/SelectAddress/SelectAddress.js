import React, {useState, useEffect, useRef, useReducer} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';

const Box = createBox();
const Text = createText();
const Bag = require('../../assets/selectAddress/bag.png');
const Home = require('../../assets/selectAddress/home.png');
const EditAddress = require('../../assets/selectAddress/editadd.png');
const DeleteAddress = require('../../assets/selectAddress/deladd.png');
import {Button, Header} from '../ReusableComponents';
import {palette, TypographyStyles} from '../Theme/Index';
import {
  deleteAddress,
  getAddressList,
  getShopLatLong,
  getShopNearMe,
  updateAddress,
} from '../Services/Address';
import AddressConstants from '../../Redux/AddressConstants';
import AuthConstants from '../../Redux/AuthConstants';
export default ({navigation, item, index}) => {
  const dispatch = useDispatch();

  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      address: [],
      selectedAdd: {},
      getShopId: {},
      refreshing: true,
      shopId: '',
    },
  );

  useEffect(() => {
    dispatch({
      type: AuthConstants.LOCATION_ADDRESS,
      loading: false,
    }),
      getAddress();
  }, []);

  const Address = useSelector((state) => ({
    ...state.address.address,
  }));

  const getAddress = () => {
    getAddressList()
      .then((response) => {
        let tempArr = [];
        const {data} = response;
        const {addressList} = data;
        if (addressList.length > 0) {
          tempArr = addressList.map((element, index) => {
            let obj = element;
            if (index === 0) {
              obj.selected = true;
              dispatch({
                type: AddressConstants.ADDRESS,
                address: obj,
              });

              getShopLatLongDetail(obj);
            } else {
              obj.selected = false;
            }
            return obj;
          });
        }

        setState({
          address: addressList,
          selectedAdd: addressList,
          refreshing: false,
        });
      })
      .catch((error) => {
        setState({refreshing: false});
        console.log({error});
      });
  };

  const getShopLatLongDetail = (item) => {
    console.log({item});
    getShopLatLong(item.latlong)
      .then((response) => {
        const {data} = response;
        const {shopNearest} = data;
        setState({shopId: shopNearest.id.toString()});
        console.log(shopNearest.id);
        console.log({response});
        getShop(shopNearest.id);
      })
      .catch((error) => {
        console.log({error});
      });
  };

  const getShop = (shopId) => {
    // data = {
    let id = shopId;
    // };
    getShopNearMe(id)
      .then((response) => {
        console.log({response});
        setState({
          getShopId: response.data.shop,
        });
      })
      .catch((error) => {
        console.log({error});
      });
  };

  const AddressDeletion = (id) => {
    const data = {
      id: id,
    };
    deleteAddress(data)
      .then((response) => {
        console.log({response});
        dispatch({
          type: AddressConstants.ADDRESS,
          address: [],
        });
        getAddress();
      })
      .catch((error) => {
        console.log({error});
      });
  };

  const addressUpdate = (item) => {
    const data = {
      id: item.id,
      city: item.city,
    };
    updateAddress(data)
      .then((response) => {
        console.log({response});
        navigation.navigate('GoogleMap', {item: item, address: true});
      })
      .catch((error) => {
        console.log({error});
      });
  };

  const selectAddress = (value) => {
    const id = value.id;

    const selectAdd = state.address.map((element, index) => {
      let obj = element;
      if (obj.id === id) {
        if (obj.selected) {
          obj.selected = false;
        } else {
          obj.selected = true;
          dispatch({
            type: AddressConstants.ADDRESS,
            address: obj,
          });
          // getShopLatLongDetail();
        }
      } else {
        obj.selected = false;
      }
      return obj;
    });
    setState({selectAdd});
  };

  // const selectAddress = (item) => {
  //   const {address} = state;
  //   if (item.length > 0) {
  //     setState({selectedAdd: item});
  //   }
  //   {
  //     setState({selectedAdd: address});
  //   }
  // };

  const {address, selectedAdd} = state;

  return (
    <Box flex={1}>
      <Header title="Select Address" />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={state.refreshing}
            onRefresh={() => getAddress()}
          />
        }
        showsVerticalScrollIndicator={false}
        style={TypographyStyles.flexGrow}>
        <Box>
          <FlatList
            data={address}
            renderItem={({item, index}) => (
              <Box
                height={117}
                width={'90%'}
                borderColor={item.selected ? 'primary' : 'support1'}
                borderWidth={item.selected ? 0.5 : 0}
                alignSelf="center"
                m="m"
                p="m"
                borderRadius={15}
                flexDirection="row"
                justifyContent="space-between"
                paddingHorizontal="l"
                backgroundColor="support1"
                style={[TypographyStyles.cardShadow, {elevation: 1.5}]}>
                <Box m="s" flex={0.1}>
                  <Image source={Home} />
                </Box>
                <TouchableOpacity
                  onPress={() => selectAddress(item)}
                  style={{flex: 1}}>
                  <Text variant="support216regular">{item.place}</Text>
                  <Text variant="support216regular">{item.city}</Text>
                  <Text variant="support313regular">{item.country}</Text>
                  <Text variant="support313regular">{`${item.street}${item.province}`}</Text>
                </TouchableOpacity>
                <Box flex={0.1} justifyContent="space-between">
                  <TouchableOpacity onPress={() => addressUpdate(item)}>
                    <Image source={EditAddress} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => AddressDeletion(item.id)}>
                    <Image source={DeleteAddress} />
                  </TouchableOpacity>
                </Box>
              </Box>
            )}
            keyExtractor={(item, index) => item.id.toString()}
          />
        </Box>
      </ScrollView>
      <Box height={110}>
        <TouchableOpacity
          onPress={() => navigation.navigate('GoogleMap', {search: true})}
          style={styles.addressText}>
          <Text variant="primary13regular">Add New Address</Text>
        </TouchableOpacity>
      </Box>
      <Box
        height={50}
        marginVertical="m"
        position="absolute"
        bottom={0}
        alignSelf="center">
        <Button
          label="Confirm & Proceed"
          onPress={() =>
            Address.address !== null
              ? navigation.navigate('Menu', {item: state.getShopId})
              : null
          }
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  addressText: {
    height: 30,
    width: 190,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: palette.primary,
    marginVertical: 10,
  },
});
