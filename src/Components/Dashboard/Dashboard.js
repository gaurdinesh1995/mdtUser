import React, {useState, useEffect, useRef, useReducer} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import _ from 'lodash';
import Banner from '../Banner/Banner';
import MdtApron from '../ECommerce/MdtApron';
import {getBanner} from '../Services/Menu';
import {getAvatarsProfile} from '../Services/Profile';
import ProfileConstants from '../../Redux/ProfileConstants';
import {getAvailableVouchersList} from '../Services/Vouchers';
import {OfferConstants} from '../../Redux';
const Home = require('../../assets/Tabs/home.png');
const Pokki = require('../../assets/pokki/pokkipoints.png');
const Wallet = require('../../assets/pokki/wallet.png');
const Delivery = require('../../assets/delivery/delivery.png');
const Pickup = require('../../assets/pickup/pickup.png');
const DineIn = require('../../assets/dinein/dinein.png');
const Product = require('../../assets/product/product.png');
const RightArrow = require('../../assets/arrow/rightarr.png');
const Box = createBox();
const Text = createText();
export default ({navigation}) => {
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      mdt: 'MDT Food',
      storeCredits: '',
      walletBalance: '',
      refreshing: true,
    },
  );

  const ECommerce = (name) => {
    setState({mdt: name});
  };

  const {profile} = useSelector((state) => ({
    ...state.profile.profile,
  }));

  console.log({profile});

  useEffect(() => {
    get_Banner();
    getProfile();
  }, []);

  const get_Banner = () => {
    getBanner()
      .then((response) => {
        // const {data} = response;
        // const {user} = data;
        // console.log('Menu', user.profile);
        // setState({
        //   profileImage: user.profile !== null ? user.profile : '',
        //   username: user.userName,
        //   email: user.email,
        //   phoneNumber: user.mobile.toString(),
        //   showImage: false,
        // });
        console.log({response});
      })
      .catch((error) => {
        console.log({error});
      });
  };
  useEffect(() => {
    if (!_.isEmpty(profile)) {
      setState({
        storeCredits: profile.storeCredits,
        walletBalance: profile.walletBalance,
      });
    }
  }, [profile]);
  const getProfile = () => {
    getAvatarsProfile()
      .then((response) => {
        const {data} = response;
        const {user} = data;
        dispatch({
          type: ProfileConstants.PROFILE,
          profile: user,
        });
        setState({refreshing: false});
        console.log({response});
      })
      .catch((error) => {
        console.log({error});
        setState({refreshing: false});
      });
  };

  const {mdt} = state;
  return (
    <Box flex={1} backgroundColor="support1">
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={state.refreshing}
            onRefresh={() => getProfile()}
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.content}>
        <Banner />
        <Box
          height={62}
          borderColor={'support'}
          borderWidth={0.9}
          width={'90%'}
          alignSelf="center"
          borderRadius={12}
          flexDirection="row"
          alignItems="center">
          <Box
            flexDirection="row"
            alignItems="center"
            flex={1}
            justifyContent="space-evenly">
            <Image source={Pokki} />
            <Box ml="m">
              <Text variant="support210regular">Pokki Points</Text>
              <Text variant="support220regular">{state.storeCredits}</Text>
            </Box>
            <Image
              source={RightArrow}
              resizeMode="contain"
              style={{marginTop: 10}}
            />
          </Box>
          <Box height={45} width={0.9} backgroundColor="support" />
          <Box
            flexDirection="row"
            alignItems="center"
            flex={1}
            justifyContent="space-evenly">
            <Image source={Wallet} />
            <Box ml="m">
              <Text variant="support210regular">RM</Text>
              <Text variant="support220regular">{state.walletBalance}</Text>
            </Box>
            <Image
              source={RightArrow}
              resizeMode="contain"
              style={{marginTop: 10}}
            />
          </Box>
        </Box>

        <Box flexDirection="row" justifyContent="space-between" margin="l">
          <TouchableOpacity
            onPress={() => navigation.navigate('SelectAddress')}>
            <Box
              height={82}
              width={82}
              alignItems="center"
              justifyContent="center"
              borderRadius={41}
              backgroundColor="support">
              <Image source={Delivery} />
            </Box>
            <Text variant="support214medium" textAlign="center" pt="m">
              Delivery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SelectAddress')}>
            <Box
              height={82}
              width={82}
              alignItems="center"
              justifyContent="center"
              borderRadius={41}
              backgroundColor="support">
              <Image source={Pickup} />
            </Box>
            <Text variant="support214medium" textAlign="center" pt="m">
              Pick Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Scanner')}>
            <Box
              height={82}
              width={82}
              alignItems="center"
              justifyContent="center"
              borderRadius={41}
              backgroundColor="support">
              <Image source={DineIn} />
            </Box>
            <Text variant="support214medium" textAlign="center" pt="m">
              Dine-in
            </Text>
          </TouchableOpacity>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <Text variant="support318medium" pl="l">
            E-Commerce
          </Text>
          <Text variant="primary14regular" pr="l">
            View more
          </Text>
        </Box>
        <Box
          marginVertical="l"
          flexDirection="row"
          justifyContent="space-between"
          marginHorizontal="xxl">
          <TouchableOpacity onPress={() => ECommerce('MDT Apron')}>
            {mdt === 'MDT Apron' ? (
              <Box alignItems="center">
                <Text variant="primary14medium">MDT Apron</Text>
                <Box
                  mt="s"
                  height={6}
                  width={6}
                  borderRadius={3}
                  backgroundColor="primary"
                />
              </Box>
            ) : (
              <Text variant="support314medium">MDT Apron</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => ECommerce('MDT Food')}>
            {mdt === 'MDT Food' ? (
              <Box alignItems="center">
                <Text variant="primary14medium">MDT Food</Text>
                <Box
                  mt="s"
                  height={6}
                  width={6}
                  borderRadius={3}
                  backgroundColor="primary"
                />
              </Box>
            ) : (
              <Text variant="support314medium">MDT Food</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => ECommerce('MDT Instant')}>
            {mdt === 'MDT Instant' ? (
              <Box alignItems="center">
                <Text variant="primary14medium">MDT Instant</Text>
                <Box
                  mt="s"
                  height={6}
                  width={6}
                  borderRadius={3}
                  backgroundColor="primary"
                />
              </Box>
            ) : (
              <Text variant="support314medium">MDT Instant</Text>
            )}
          </TouchableOpacity>
        </Box>
        <FlatList
          data={[
            {name: 'MDT Kimchi', RM: '20', image: Product},
            {name: 'MDT Kimchi', RM: '20', image: Product},
            {name: 'MDT Kimchi', RM: '20', image: Product},
            {name: 'MDT Kimchi', RM: '20', image: Product},
          ]}
          renderItem={({item, index}) => (
            <MdtApron item={item} index={index} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  content: {flexGrow: 1},
});
