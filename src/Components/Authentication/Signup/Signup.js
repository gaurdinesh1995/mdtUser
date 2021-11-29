import React, {useState, useEffect, useReducer, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Keyboard,
} from 'react-native';
import authConstants from '../../../Redux/AuthConstants';
import {createBox, createText} from '@shopify/restyle';
import {Button, Input} from '../../ReusableComponents';
import {palette, size, TypographyStyles} from '../../Theme/Index';
import {registerUser} from '../../Services/AuthService';
const Box = createBox();
const Text = createText();
const eye = require('../../../assets/eye/eye-icon.png');
const eyeHide = require('../../../assets/eye/password-hide.png');
export default ({navigation, route}) => {
  const emailRef = useRef(null);
  const PhoneNumberRef = useRef(null);
  const PasswordRef = useRef(null);
  const ConfirmPasswordRef = useRef(null);

  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      username: '',
      email: '',
      confirmPassword: '',
      phoneNumber: '',
      password: '',
      errors: [],
      secure: true,
      confirmSecure: true,
      isKeyboardVisible: false,
      focus: false,
    },
  );
  // console.log('STATE', state);

  /**
   * @function validateFields
   * @returns array of errors.
   * @description it will validate phonenumber and password.
   */
  const validateFields = () => {
    const emptyFields = [];
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var passwordVal = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );

    if (state.username.trim().length === 0) {
      const obj = {
        name: 'username',
        valid: false,
        message: 'User Name is required.',
      };
      emptyFields.push(obj);
    }
    if (state.email.trim().length === 0) {
      const obj = {
        name: 'email',
        valid: false,
        message: 'Email is required.',
      };
      emptyFields.push(obj);
    }
    if (!re.test(String(state.email).toLowerCase())) {
      const obj = {
        name: 'email',
        valid: false,
        message: 'Valid email is required.',
      };
      emptyFields.push(obj);
    }
    if (state.phoneNumber.trim().length === 0) {
      const obj = {
        name: 'phoneNumber',
        valid: false,
        message: 'Phone Number is required.',
      };
      emptyFields.push(obj);
    } else if (state.phoneNumber.trim().length < 10) {
      const obj = {
        name: 'phoneNumber',
        valid: false,
        message: 'Phone Number length should be 10.',
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
    if (
      state.username !== '' ||
      state.email !== '' ||
      state.phoneNumber !== '' ||
      state.password !== '' ||
      state.confirmPassword !== ''
    ) {
      const error = validateFields();
      if (error !== null) {
        setState({errors: error});
      } else {
        setState({errors: []});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.username,
    state.email,
    state.phoneNumber,
    state.password,
    state.confirmPassword,
  ]);
  /**
   * @function onChangeText
   * @param {*} key
   * @param {*} value
   * @description it will set state for its key
   */
  const onChangeText = (key, value) => {
    setState({[key]: value});
  };

  let param = '';
  if (route && route.params !== undefined) {
    param = route.params.space;
  }

  const objUserName = (element) => element.name === 'username';
  const usernameIndex = state.errors.findIndex(objUserName);
  const objName = (element) => element.name === 'phoneNumber';

  const phoneNumberIndex = state.errors.findIndex(objName);
  const objEmail = (element) => element.name === 'email';
  const emailIndex = state.errors.findIndex(objEmail);
  const objPassword = (element) => element.name === 'password';
  const passwordIndex = state.errors.findIndex(objPassword);
  const objConfirmPassword = (element) => element.name === 'confirmPassword';
  const confirmPasswordIndex = state.errors.findIndex(objConfirmPassword);

  /**
   * @function signupAPI
   * @description it will use to regiater the user after checking validations.
   */

  const signup = () => {
    dispatch({
      type: authConstants.LOADING,
      loading: true,
    });
    const error = validateFields();
    if (error !== null) {
      setState({errors: error});
      dispatch({
        type: authConstants.LOADING,
        loading: false,
      });
    } else {
      setState({errors: []});
      const data = {
        userName: state.username,
        email: state.email,
        mobile: state.phoneNumber,
        password: state.password,
      };

      registerUser(data)
        .then((response) => {
          console.log({response});
          if (response.data) {
            const {data} = response;
            const {token, user, message} = data;
            dispatch({
              type: authConstants.LOADING,
              loading: false,
            });
            dispatch({
              type: authConstants.TOKEN,
              token: token,
            });
            dispatch({
              type: authConstants.TOAST,
              toast: {
                title: 'User Register Successfully',
                loading: true,
                status: 'success',
              },
            });
            navigation.navigate('Verify', {from: 'signup', data: user});
          } else {
          }
        })
        .catch((error) => {
          const {data} = error;
          const {errorMessage} = data;

          dispatch({
            type: authConstants.LOADING,
            loading: false,
          });
          dispatch({
            type: authConstants.TOAST,
            toast: {
              title: errorMessage,
              loading: true,
              status: 'error',
            },
          });
          console.log({error});
        });
      //navigation.navigate('Verify');
    }
  };
  const CText = (props) => <Text variant="primary14bold">{'+ 60'}</Text>;

  const Code = CText;
  return (
    <KeyboardAvoidingView
      style={TypographyStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.content, {paddingTop: param.bottom}]}>
        <Box mt="xl" flex={2}>
          <Box ml="l">
            <Text variant="primary24bold">Sign Up</Text>
          </Box>
          <Box>
            <Input
              returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
              label="UserName"
              value={state.username}
              showErrorField={
                usernameIndex !== -1 && !state.errors[usernameIndex].valid
              }
              errorText={
                usernameIndex !== -1 && state.errors[usernameIndex].message
              }
              onChangeText={(text) => {
                onChangeText('username', text);
              }}
              onSubmitEditing={() => {
                emailRef.current.focus();
              }}
            />
          </Box>
          <Box>
            <Input
              ref={emailRef}
              label="Email"
              value={state.email}
              showErrorField={
                emailIndex !== -1 && !state.errors[emailIndex].valid
              }
              errorText={emailIndex !== -1 && state.errors[emailIndex].message}
              onChangeText={(text) => {
                onChangeText('email', text);
              }}
              onSubmitEditing={() => {
                PhoneNumberRef.current.focus();
              }}
            />
          </Box>
          <Box>
            <Input
              ref={PhoneNumberRef}
              returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
              label="Phone Number"
              value={state.phoneNumber}
              maxLength={12}
              minLength={10}
              showErrorField={
                phoneNumberIndex !== -1 && !state.errors[phoneNumberIndex].valid
              }
              // left={() =>
              //   state.focus == true ? (
              //     <Box position="absolute" left={5} top={10}>
              //       <Text pr="l" variant="primary14bold">
              //         {'+ 60'}
              //       </Text>
              //     </Box>
              //   ) : null
              // }
              errorText={
                phoneNumberIndex !== -1 &&
                state.errors[phoneNumberIndex].message
              }
              onFocus={() => setState({focus: true})}
              onChangeText={(text) => {
                onChangeText('phoneNumber', text);
              }}
              keyboardType="numeric"
              onSumbitEditing={() => {
                setState({focus: false});
                // PasswordRef.current?.focus();
              }}
            />
          </Box>
          <Box>
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
              right={() => {
                return (
                  <TouchableOpacity
                    style={{zIndex: 100}}
                    onPress={() =>
                      setState({confirmSecure: !state.confirmSecure})
                    }>
                    <Image
                      style={styles.eye}
                      source={state.confirmSecure ? eye : eyeHide}
                    />
                  </TouchableOpacity>
                );
              }}
              secureTextEntry={state.confirmSecure}
              onChangeText={(text) => {
                onChangeText('password', text);
              }}
              onSubmitEditing={() => {
                ConfirmPasswordRef.current.focus();
              }}
            />
          </Box>
          <Box>
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
              right={() => {
                return (
                  <TouchableOpacity
                    style={{zIndex: 100}}
                    onPress={() => setState({secure: !state.secure})}>
                    <Image
                      style={styles.eye}
                      source={state.secure ? eye : eyeHide}
                    />
                  </TouchableOpacity>
                );
              }}
              secureTextEntry={state.secure}
              onChangeText={(text) => {
                onChangeText('confirmPassword', text);
              }}
            />
          </Box>

          <Box flex={1} mt="xl" alignItems="center" marginHorizontal="l" mb="l">
            <Box height={48}>
              <Button
                label="Sign Up"
                onPress={() => {
                  // navigation.navigate('Verify');
                  signup();
                }}
              />
            </Box>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            marginVertical="l">
            <Text>Already have an Account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text variant="primary15medium"> Sign In</Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
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
});
