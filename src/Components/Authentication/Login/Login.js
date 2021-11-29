import React, {useEffect, useReducer, useRef} from 'react';
import {useDispatch} from 'react-redux';
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
import {createBox, createText} from '@shopify/restyle';
import {Button, Input} from '../../ReusableComponents';
import {palette, size, TypographyStyles} from '../../Theme/Index';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import authConstants from '../../../Redux/AuthConstants';
import {loginUser} from '../../Services/AuthService';
import AsyncStorage from '@react-native-community/async-storage';
const Box = createBox();
const Text = createText();
const Logo = require('../../../assets/logo/logo.png');
const eye = require('../../../assets/eye/eye-icon.png');
const eyeHide = require('../../../assets/eye/password-hide.png');

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
      confirmSecure: true,
    },
  );

  /**
   * @function validateFields
   * @returns array of errors.
   * @description it will validate phonenumber and password.
   */
  const validateFields = () => {
    const emptyFields = [];

    if (state.phoneNumber.trim().length === 0) {
      const obj = {
        name: 'phoneNumber',
        valid: false,
        message: 'Phone Number is required.',
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
    dispatch({
      type: authConstants.LOADING,
      loading: false,
    });
    const error = validateFields();
    if (state.phoneNumber !== '' || state.password !== '') {
      if (error !== null) {
        setState({errors: error});
      } else {
        setState({errors: []});
      }
    }
  }, [state.phoneNumber, state.password]);

  /**
   * @function onChangeText
   * @param {*} key
   * @param {*} value
   * @description it will set state for its key
   */
  const onChangeText = (key, value) => {
    setState({[key]: value});
  };
  const toggleSwitch = (previousState) => {
    setState({isEnabled: previousState});
  };
  const toggleModal = (value) => {
    setState({isModalVisible: value});
  };

  let param = '';
  if (route && route.params !== undefined) {
    param = route.params.space;
  }

  const visible = () => {
    setState({isModalVisible: false});
  };

  const objName = (element) => element.name === 'phoneNumber';
  const phoneNumberIndex = state.errors.findIndex(objName);
  const objPassword = (element) => element.name === 'password';
  const passwordIndex = state.errors.findIndex(objPassword);

  const login = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmtoken');
    const error = validateFields();
    if (error !== null) {
      setState({errors: error});
    } else {
      setState({errors: []});
      const data = {
        mobile: state.phoneNumber,
        password: state.password,
        fcm_token: JSON.parse(fcmToken),
      };
      const {isEnabled} = state;
      dispatch({
        type: authConstants.LOADING,
        loading: true,
      });
      loginUser(data)
        .then((response) => {
          dispatch({
            type: authConstants.LOADING,
            loading: false,
          });
          if (response.success) {
            const {data} = response;
            const {token, user} = data;

            dispatch({
              type: authConstants.TOKEN,
              token: token,
            });
            if (!user.isVerified) {
              navigation.navigate('Verify', {
                from: 'login',
                phone: user.mobile,
              });
            } else {
              dispatch({
                type: authConstants.USER_INFO_RECEIVED,
                user: response.data.user,
              });
              dispatch({
                type: authConstants.TOKEN,
                token: token,
              });
            }
          } else {
            // const {data} = response;
            // const {message} = data;
            dispatch({
              type: authConstants.USER_INFO_RECEIVED,
              user: 'user',
            });
            dispatch({
              type: authConstants.TOAST,
              toast: {
                title: 'hello',
                loading: true,
                status: 'error',
              },
            });
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
        });
    }
  };
  const {isEnabled, isModalVisible} = state;
  return (
    <Box flex={1}>
      <KeyboardAvoidingView
        style={TypographyStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.content, {paddingTop: param.bottom}]}>
          <Box justifyContent="center" ml="l" height={200}>
            <Image
              style={{
                height: 97,
                width: 83,
                resizeMode: 'contain',
              }}
              source={Logo}
            />
          </Box>
          <Box flex={2}>
            <Box ml="l">
              <Text variant="primary24bold">Log In</Text>
            </Box>
            <Box>
              <Input
                returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                label="Phone Number"
                value={state.phoneNumber}
                showErrorField={
                  phoneNumberIndex !== -1 &&
                  !state.errors[phoneNumberIndex].valid
                }
                errorText={
                  phoneNumberIndex !== -1 &&
                  state.errors[phoneNumberIndex].message
                }
                onChangeText={(text) => {
                  onChangeText('phoneNumber', text);
                }}
                keyboardType="numeric"
                onSumbitEditing={() => {
                  passwordRef.current?.focus();
                }}
              />
            </Box>
            <Box>
              <Input
                ref={passwordRef}
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
              />
            </Box>
            <Box justifyContent="space-between" flexDirection="row">
              <TouchableOpacity style={styles.switchView}>
                <Switch
                  style={styles.switch}
                  trackColor={{false: '#767577', true: palette.primary1}}
                  thumbColor={isEnabled ? palette.primary : '#f4f3f4'}
                  onValueChange={(value) => toggleSwitch(value)}
                  value={isEnabled}
                />
                <Box mt="l" mb="l">
                  <Text>Remember Me</Text>
                </Box>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  toggleModal(true);
                }}>
                <Box mt="l" mr="l" mb="l">
                  <Text variant="primary14bold">Forgot Password?</Text>
                </Box>
              </TouchableOpacity>
            </Box>
            <Box
              flex={1}
              mt="l"
              alignItems="center"
              marginHorizontal="l"
              mb="l">
              <Box height={48}>
                <Button
                  label="Login"
                  onPress={() => {
                    login();
                  }}
                />
              </Box>
            </Box>
            <Box
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              marginVertical="l">
              <Text>Don't have an Account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text variant="primary15medium"> Sign Up</Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
        swipeDirection="down"
        onBackdropPress={() => setState({isModalVisible: false})}
        onSwipeComplete={() => {
          setState({
            isModalVisible: false,
          });
        }}
        style={styles.modalStyle}
        isVisible={isModalVisible}>
        <Box height={400}>
          <ForgotPassword navigation={navigation} visible={() => visible()} />
        </Box>
      </Modal>
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
  switchView: {flexDirection: 'row', marginLeft: 10},
  switch: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
  },
  text: {fontSize: 16, color: palette.tertiary2},
  eye: {height: 30, width: 30},
  modalStyle: {
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
});
