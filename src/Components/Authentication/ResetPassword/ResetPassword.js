import React, {useState, useEffect, useReducer, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import {createBox, createText} from '@shopify/restyle';
import {Button, Input, Header} from '../../ReusableComponents';
import {palette, size, TypographyStyles} from '../../Theme/Index';
import {resetPassword} from '../../Services/AuthService';
import authConstants from '../../../Redux/AuthConstants';

const Box = createBox();
const Text = createText();
const eye = require('../../../assets/eye/eye-icon.png');
const eyeHide = require('../../../assets/eye/password-hide.png');

export default ({navigation, route}) => {
  const progress = useRef(new Animated.Value(0));
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
    },
  );

  /**
   * @function validateFields
   * @returns array of errors.
   * @description it will validate phonenumber and password.
   */
  const validateFields = () => {
    const emptyFields = [];
    var passwordVal = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    if (state.password.trim().length === 0) {
      const obj = {
        name: 'password',
        valid: false,
        message: 'Password is required.',
      };
      emptyFields.push(obj);
    } else if (!passwordVal.test(String(state.password))) {
      const obj = {
        name: 'password',
        valid: false,
        message:
          'Password must have a small letter,special character,capital letter,number',
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
   * @function useEffect
   * @description it will check the phonenumber and password after onchange.
   */
  useEffect(() => {
    const error = validateFields();
    if (error !== null) {
      setState({errors: error});
    } else {
      setState({errors: []});
    }
  }, [state.password, state.confirmPassword]);

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
   * @function UpdatePassword
   * @description it will check phone number and navigate to reset password.
   */
  const UpdatePassword = () => {
    const error = validateFields();
    if (error !== null) {
      setState({errors: error});
    } else {
      setState({errors: []});
      dispatch({
        type: authConstants.LOADING,
        loading: true,
      });
      const {params} = route;
      const {otp} = params;
      const data = {
        otp: otp,
        password: state.password,
      };
      resetPassword(data)
        .then((response) => {
          dispatch({
            type: authConstants.LOADING,
            loading: false,
          });
          dispatch({
            type: authConstants.TOAST,
            toast: {
              title: 'Password Change successfully',
              loading: true,
              status: 'success',
            },
          });
          navigation.navigate('Login');
        })
        .catch((error) => {
          const {message} = error;
          dispatch({
            type: authConstants.LOADING,
            loading: false,
          });
          if (message === "Cannot read property 'data' of null") {
            dispatch({
              type: authConstants.LOADING,
              loading: false,
            });
            dispatch({
              type: authConstants.TOAST,
              toast: {
                title: 'Token has expired',
                loading: true,
                status: 'error',
              },
            });
          }
        });
    }
  };
  console.log({route});

  const objPassword = (element) => element.name === 'password';
  const passwordIndex = state.errors.findIndex(objPassword);
  const objConfirmPassword = (element) => element.name === 'confirmPassword';
  const confirmPasswordIndex = state.errors.findIndex(objConfirmPassword);
  return (
    <Box style={TypographyStyles.container}>
      <Header backgroundColor="primary2" title="" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={TypographyStyles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <Box flex={0.1}></Box>
          <Box mt="xl" justifyContent="center">
            <Text pl="l" variant="support225medium">
              Create Password
            </Text>
            <Text variant="support315medium" mt="l" marginHorizontal="l">
              Your new password must be different from previous used passwords.
            </Text>
          </Box>
          <Box mt="xl" justifyContent="center" alignItems="center">
            <Input
              ref={PasswordRef}
              label="Password"
              value={state.password}
              showErrorField={
                passwordIndex !== -1 && !state.errors[passwordIndex].valid
              }
              errorText={
                passwordIndex !== -1 && state.errors[passwordIndex].message
              }
              // right={() => {
              //   return (
              //     <TouchableOpacity
              //       onPress={() => setState({secure: !state.secure})}>
              //       <Image
              //         style={styles.eye}
              //         source={state.secure ? eye : eyeHide}
              //       />
              //     </TouchableOpacity>
              //   );
              // }}
              secureTextEntry={state.secure}
              onChangeText={(text) => {
                onChangeText('password', text);
              }}
              onSubmitEditing={() => {
                ConfirmPasswordRef.current.focus();
              }}
            />
          </Box>
          <Box mt="l">
            <Input
              ref={ConfirmPasswordRef}
              label="Confirm Password"
              value={state.confirmPassword}
              showErrorField={
                confirmPasswordIndex !== -1 &&
                !state.errors[confirmPasswordIndex].valid
              }
              errorText={
                confirmPasswordIndex !== -1 &&
                state.errors[confirmPasswordIndex].message
              }
              // right={() => {
              //   return (
              //     <TouchableOpacity
              //       onPress={() =>
              //         setState({confirmSecure: !state.confirmSecure})
              //       }>
              //       <Image
              //         style={styles.eye}
              //         source={state.confirmSecure ? eye : eyeHide}
              //       />
              //     </TouchableOpacity>
              //   );
              // }}
              secureTextEntry={state.confirmSecure}
              onChangeText={(text) => {
                onChangeText('confirmPassword', text);
              }}
            />
          </Box>
          <Box flex={1} justifyContent="flex-end" alignItems="center">
            <Box mb="xl" height={43}>
              <Button
                label="Reset Password"
                onPress={() => {
                  UpdatePassword();
                }}
              />
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
};

const styles = StyleSheet.create({
  lottie: {height: 80, width: 80, borderRadius: 40, backgroundColor: 'white'},
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
  scrollContainer: {flexGrow: 1},
});
