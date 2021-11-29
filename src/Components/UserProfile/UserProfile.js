import React, {useState, useEffect, useReducer, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Modal from 'react-native-modal';
import {createBox, createText, visible} from '@shopify/restyle';
import {Button, Header, Input} from '../ReusableComponents';
import {fonts, palette, size, TypographyStyles} from '../Theme/Index';
import authConstants from '../../Redux/AuthConstants';
import AsyncStorage from '@react-native-community/async-storage';
const Bell = require('../../assets/profile/bell.png');
const Wallet = require('../../assets/pokki/wallet.png');
const OrderHistory = require('../../assets/profile/orderhistory.png');
const Box = createBox();
const Text = createText();
export default ({navigation, route}) => {
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      phoneNumber: '',
      password: '',
      errors: [],
      secure: true,
      isEnabled: false,
      isModalVisible: false,
    },
  );
  const user = useSelector((state) => ({
    ...state.auth.user.user,
  }));

  console.log({user});
  const {profile} = useSelector((state) => ({
    ...state.profile.profile,
  }));
  console.log({profile});
  const saveData = async () => {
    // if (user.remeber === true) {
    //   await AsyncStorage.setItem('phone', JSON.stringify(user.mobile));
    //   await AsyncStorage.setItem('password', user.password);

    //   dispatch({
    //     type: authConstants.RESET_STATE,
    //     user: '',
    //   });
    // } else if (user.remeber === false) {
    //   await AsyncStorage.removeItem('phone');
    //   await AsyncStorage.removeItem('password');
    //   dispatch({
    //     type: authConstants.RESET_STATE,
    //     user: '',
    //   });
    // }
    dispatch({
      type: authConstants.RESET_STATE,
      user: '',
    });
  };

  const {isEnabled, isModalVisible} = state;
  return (
    <Box flex={1}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <Header
          color={'support1'}
          title="Profile"
          renderLeft={() => <Image source={Bell} />}
          renderRight={() => (
            <TouchableOpacity onPress={() => saveData()}>
              <Text variant="primary18medium">Logout</Text>
            </TouchableOpacity>
          )}
        />
        <Box
          height={250}
          backgroundColor="support1"
          borderBottomLeftRadius={150}
          borderBottomRightRadius={150}
          alignItems="center">
          <Image style={styles.image} />
          <Box
            height={86}
            width={'90%'}
            backgroundColor="support1"
            borderRadius={20}
            elevation={1}
            shadowColor="support3"
            justifyContent="space-between"
            flexDirection="row"
            alignItems="center"
            paddingHorizontal="l"
            position="absolute"
            bottom={-5}>
            <Box>
              <Image source={Wallet} />
              <Text variant="support215regular" pt="s">
                Wallet
              </Text>
            </Box>
            <Box>
              <Text variant="support212regular">RM</Text>
              <Text variant="support225medium" pt="s">
                {profile.walletBalance}
              </Text>
            </Box>
          </Box>
        </Box>

        <Box mt="s" marginHorizontal="l">
          <Text paddingVertical="l" variant="support212regular">
            ACCOUNT
          </Text>

          <Box
            height={268}
            backgroundColor="support1"
            borderRadius={20}
            flex={5}>
            <Box
              flexDirection="row"
              flex={1}
              alignItems="center"
              paddingHorizontal="l">
              <Image source={OrderHistory} />
              <Text pl="xl" variant="support314medium">
                Order History
              </Text>
            </Box>
            <TouchableOpacity
              onPress={() => navigation.navigate('Vouchers')}
              style={styles.orderView}>
              <Image source={OrderHistory} />
              <Text pl="xl" variant="support314medium">
                My Voucher
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
              style={styles.orderView}>
              <Image source={OrderHistory} />
              <Text pl="xl" variant="support314medium">
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChangePassword')}
              style={styles.orderView}>
              <Image source={OrderHistory} />
              <Text pl="xl" variant="support314medium">
                Change Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}
              style={styles.orderView}>
              <Image source={OrderHistory} />
              <Text pl="xl" variant="support314medium">
                Notification
              </Text>
            </TouchableOpacity>
          </Box>

          <Text paddingVertical="l" variant="support212regular">
            OTHER
          </Text>

          <Box
            height={375}
            backgroundColor="support1"
            borderRadius={20}
            flex={7}
            mb="xl">
            <Box flex={1} justifyContent="center" paddingHorizontal="l">
              <Text variant="support314medium">Cutomer Services</Text>
            </Box>
            <Box
              flex={1}
              borderColor="support7"
              borderTopWidth={0.3}
              justifyContent="center"
              paddingHorizontal="l">
              <Text variant="support314medium">
                Become Our Franchise Partner
              </Text>
            </Box>
            <Box
              flex={1}
              borderColor="support7"
              borderTopWidth={0.3}
              justifyContent="center"
              paddingHorizontal="l">
              <Text variant="support314medium">Rate the App </Text>
            </Box>
            <Box
              flex={1}
              borderColor="support7"
              borderTopWidth={0.3}
              justifyContent="center"
              paddingHorizontal="l">
              <Text variant="support314medium">FAQ's </Text>
            </Box>
            <Box
              flex={1}
              borderColor="support7"
              borderTopWidth={0.3}
              justifyContent="center"
              paddingHorizontal="l">
              <Text variant="support314medium">Contact Us </Text>
            </Box>
            <Box
              flex={1}
              borderColor="support7"
              borderTopWidth={0.3}
              justifyContent="center"
              paddingHorizontal="l">
              <Text variant="support314medium">Privacy Policy </Text>
            </Box>
            <Box
              flex={1}
              borderColor="support7"
              borderTopWidth={0.3}
              justifyContent="center"
              paddingHorizontal="l">
              <Text variant="support314medium">Terms of Use </Text>
            </Box>
          </Box>
        </Box>
        {/* <Box height={48}>
        <Button label="Logout" />
      </Box> */}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  content: {flexGrow: 1, flex: 1},
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
  content: {flexGrow: 1},
  orderView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: palette.support7,
    borderTopWidth: 0.3,
  },
  image: {
    height: 98,
    width: 98,
    backgroundColor: palette.support3,
    borderRadius: 49,
    opacity: 0.5,
    marginTop: 30,
  },
});
