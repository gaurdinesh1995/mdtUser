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
const LeftArrow = require('../../assets/arrow/leftarr.png');
const Camera = require('../../assets/camera/camera.png');
const OrderHistory = require('../../assets/profile/orderhistory.png');
const Box = createBox();
const Text = createText();
export default ({navigation, route}) => {
  const CurrentPasswordRef = useRef(null);
  const PasswordRef = useRef(null);
  const ConfirmPasswordRef = useRef(null);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      confirmPassword: '',
      password: '',
      errors: [],
      secure: true,
      confirmSecure: true,
      code: '',
      currentPassword: '',
    },
  );

  /**
   * @function validateFields
   * @returns array of errors.
   * @description it will validate phonenumber and password.
   */
  const validateFields = () => {
    const emptyFields = [];
    if (state.currentPassword.trim().length === 0) {
      const obj = {
        name: 'currentPassword',
        valid: false,
        message: 'Current Password is required.',
      };
      emptyFields.push(obj);
    }
    if (state.password.trim().length === 0) {
      const obj = {
        name: 'password',
        valid: false,
        message: 'Password is required.',
      };
      emptyFields.push(obj);
    }
    if (state.confirmPassword.trim().length === 0) {
      const obj = {
        name: 'confirmPassword',
        valid: false,
        message: 'Confirm Password is required.',
      };
      emptyFields.push(obj);
    }
    if (
      state.confirmPassword.trim().length !== 0 &&
      state.password.trim().length !== 0 &&
      state.confirmPassword.trim() !== state.password.trim()
    ) {
      const obj = {
        name: 'confirmPassword',
        valid: false,
        message: 'Confirm Password should match password.',
      };
      emptyFields.push(obj);
    }
    if (emptyFields.length) {
      return emptyFields;
    }

    return null;
  };

  /**
   * @function onChangeText
   * @param {*} key
   * @param {*} value
   * @description it will set state for its key
   */
  const onChangeText = (key, value) => {
    setState({[key]: value});
  };

  /**
   * @function useEffect
   * @description it will check the phonenumber and password after onchange.
   */
  useEffect(() => {
    if (
      state.currentPassword !== '' ||
      state.password !== '' ||
      state.confirmPassword !== ''
      // ||
      // state.country !== ''
    ) {
      const error = validateFields();
      if (error !== null) {
        setState({errors: error});
      } else {
        setState({errors: []});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentPassword, state.password, state.confirmPassword]);

  let param = '';
  if (route && route.params !== undefined) {
    param = route.params.space;
  }
  const objCurrentPassword = (element) => element.name === 'currentPassword';
  const currentPasswordIndex = state.errors.findIndex(objCurrentPassword);
  const objPassword = (element) => element.name === 'password';
  const passwordIndex = state.errors.findIndex(objPassword);
  const objConfirmPassword = (element) => element.name === 'confirmPassword';
  const confirmPasswordIndex = state.errors.findIndex(objConfirmPassword);
  return (
    <Box flex={1}>
      <Header
        title="Change Password "
        renderLeft={() => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={LeftArrow} />
          </TouchableOpacity>
        )}
      />
      {/* <Box height={100} alignItems="center"></Box> */}
      <Box
        backgroundColor="support1"
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        flex={1}
        mt="xxxl">
        <Box>
          <Input
            mode="flat"
            underlineColor="transparent"
            style={styles.textStyle}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            label="Current Password"
            value={state.currentPassword}
            showErrorField={
              currentPasswordIndex !== -1 &&
              !state.errors[currentPasswordIndex].valid
            }
            errorText={
              currentPasswordIndex !== -1 &&
              state.errors[currentPasswordIndex].message
            }
            onChangeText={(text) => {
              onChangeText('currentPassword', text);
            }}
            onSubmitEditing={() => {
              PasswordRef.current.focus();
            }}
          />
        </Box>
        <Box>
          <Input
            ref={PasswordRef}
            mode="flat"
            underlineColor="transparent"
            style={styles.textStyle}
            label="New Password"
            value={state.password}
            showErrorField={
              passwordIndex !== -1 && !state.errors[passwordIndex].valid
            }
            errorText={
              passwordIndex !== -1 && state.errors[passwordIndex].message
            }
            onChangeText={(text) => {
              onChangeText('password', text);
            }}
            onSubmitEditing={() => {
              ConfirmPasswordRef.current.focus();
            }}
          />
        </Box>
        <Box>
          {/* {} */}
          <Input
            ref={ConfirmPasswordRef}
            mode="flat"
            underlineColor="transparent"
            style={styles.textStyle}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            label="Confirm New Password"
            value={state.confirmPassword}
            showErrorField={
              confirmPasswordIndex !== -1 &&
              !state.errors[confirmPasswordIndex].valid
            }
            // style={{paddingLeft: state.focus ? 40 : 0}}
            //   left={() =>
            //     state.focus ? (
            //       <Box position="absolute" left={5} top={10}>
            //         <Text pr="l" variant="primary14bold">
            //           {'+ 60'}
            //         </Text>
            //       </Box>
            //     ) : null
            //   }
            errorText={
              confirmPasswordIndex !== -1 &&
              state.errors[confirmPasswordIndex].message
            }
            onFocus={() => setState({focus: true})}
            onChangeText={(text) => {
              onChangeText('confirmPassword', text);
            }}
            keyboardType="numeric"
            //   onSumbitEditing={() => {
            //     postCodeRef.current?.focus();
            //   }}
          />
        </Box>

        <Box height={48} position="absolute" bottom={0}>
          <Button label="Save" />
        </Box>
      </Box>
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
  textStyle: {
    height: 50,
    backgroundColor: palette.support1,
    borderBottomColor: palette.support3,
    borderBottomWidth: 0.4,
    paddingLeft: 0,
    width: '90%',
    alignSelf: 'center',
  },
});
