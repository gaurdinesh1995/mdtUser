import React, {useState, useEffect, useRef, useReducer} from 'react';
import {useDispatch} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {
  View,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import {Button, Header} from '../../ReusableComponents';
import CodeInput from 'react-native-confirmation-code-input';
import AsyncStorage from '@react-native-community/async-storage';
import {fonts, palette, TypographyStyles} from '../../Theme/Index';
import authConstants from '../../../Redux/AuthConstants';
import {getVerifyCode, requestResendOtp} from '../../Services/AuthService';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
const Box = createBox();
const Text = createText();

export default ({navigation, route}) => {
  const progress = useRef(new Animated.Value(0));
  const inputEl = useRef(null);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      errors: '',
      otp: '',
      postData: {},
      screenError: '',
      from: '',
      code: '',
      isModalVisible: false,
    },
  );
  useEffect(() => {
    if (route && route.params) {
      if (route.params.from) {
        setState({from: route.params.from});
      }

      if (route.params.postData) {
        setState({postData: route.params.postData});
      }
    }
  }, []);
  const checkCode = () => {
    const {code} = state;
    if (state.from === 'forgot') {
      verifyForgot(code);
    } else {
      verify(code);
    }
  };

  const verifyForgot = (code) => {
    const data = {
      otp: code,
      otpType: 'FORGOT',
    };
    getVerifyCode(data)
      .then((response) => {
        navigation.navigate('ResetPassword', {otp: code});
      })
      .catch((error) => {
        const {data} = error;
        const {errorMessage} = data;
        dispatch({
          type: authConstants.TOAST,
          toast: {
            title: errorMessage,
            loading: true,
            status: 'error',
          },
        });
      });
  };

  const verify = async (code) => {
    const fcmToken = await AsyncStorage.getItem('fcmtoken');
    const TypeOTP =
      state.from === 'login'
        ? 'SIGNUP'
        : state.from === 'profile'
        ? 'SIGNUP'
        : 'SIGNUP';
    const data = {
      otp: code || state.code,
      otpType: TypeOTP,
      fcm_token: JSON.parse(fcmToken),
    };
    getVerifyCode(data)
      .then((response) => {
        const {data} = response;
        const {token, user} = data;
        dispatch({
          type: authConstants.TOKEN,
          token: token,
        });
        dispatch({
          type: authConstants.TOAST,
          toast: {
            title: 'Verified Successfully',
            loading: true,
            status: 'success',
          },
        });
        dispatch({
          type: authConstants.USER_INFO_RECEIVED,
          user: user,
        });
        // navigation.navigate('AuthSuccess', {from: state.from, data: data});
      })
      .catch((error) => {
        const {data} = error;
        const {errorMessage} = data;
        dispatch({
          type: authConstants.TOAST,
          toast: {
            title: errorMessage,
            loading: true,
            status: 'error',
          },
        });
      });
  };
  const resendOtp = (code) => {
    // const TypeOTP =
    //   state.from === 'forgot'
    //     ? 'FORGOT'
    //     : state.from === 'user_verification'
    //     ? 'UPDATE'
    //     : 'SIGNUP';

    const data = {
      otpType: 'SIGNUP',
    };
    requestResendOtp(data)
      .then((response) => {
        console.log({response});
        const {data} = response;
        const {message} = data;
        dispatch({
          type: authConstants.TOAST,
          toast: {
            title: message,
            loading: true,
            status: 'success',
          },
        });
      })
      .catch((error) => {
        console.log({error});
        dispatch({
          type: authConstants.TOAST,
          toast: {
            title: 'Internal Server Error',
            loading: true,
            status: 'error',
          },
        });
      });
  };
  const visible = () => {
    setState({isModalVisible: false});
  };

  const {params} = route;
  const {from} = params;
  const {isModalVisible} = state;
  console.log({from});
  // console.log({from});
  return (
    <Box style={TypographyStyles.container}>
      <Header backgroundColor="primary2" title="" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={TypographyStyles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          keyboardShouldPersistTaps="handled">
          <Box flex={0.1}></Box>
          <Box mt="xl" justifyContent="center">
            <Text pl="xl" variant="support225medium">
              Enter 4 Digit Code
            </Text>
            <Text variant="support315medium" mt="l" marginHorizontal="xl">
              Enter the 4 digit code that you recieved on your email
            </Text>
          </Box>
          <Box mt="xl" justifyContent="center" alignItems="center">
            <CodeInput
              ref={inputEl}
              codeInputStyle={styles.box}
              activeColor={palette.primary}
              inactiveColor={
                state.screenError === '' ? palette.primary : palette.primary1
              }
              keyboardType="number-pad"
              selectionColor="black"
              containerStyle={styles.codeInputContainer}
              value={`${state.otp}`}
              codeLength={4}
              className={'border-b'}
              space={15}
              size={60}
              inputPosition="left"
              onFulfill={(code) => {
                setState({code: code});
              }}
            />
          </Box>
          {from === 'forgot' ? (
            <Box>
              <Text variant="support314medium" mt="xl" textAlign="center">
                Want to change Phone Number?
              </Text>
              <TouchableOpacity
                onPress={() => setState({isModalVisible: true})}>
                <Text variant="primary15medium" mt="s" textAlign="center">
                  change Phone Number
                </Text>
              </TouchableOpacity>
            </Box>
          ) : null}
          <Box mb="l" flex={1} justifyContent="flex-end" alignItems="center">
            <TouchableOpacity onPress={() => resendOtp()}>
              <Text variant="primary15medium" pb="l" textAlign="center">
                Resend OTP
              </Text>
            </TouchableOpacity>
            <Box height={43}>
              <Button
                label="Verify"
                onPress={() => {
                  // from === 'forgot'
                  //   ? navigation.navigate('ResetPassword')
                  //   : dispatch({
                  //       type: authConstants.USER_INFO_RECEIVED,
                  //       user: 'user',
                  //     });
                  checkCode();
                }}
              />
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
        <Box style={{height: 400}}>
          <ForgotPassword navigation={navigation} visible={() => visible()} />
        </Box>
      </Modal>
    </Box>
  );
};
const styles = StyleSheet.create({
  box: {
    borderRadius: 10,
    borderBottomWidth: 3,
    color: '#000',
    fontFamily: fonts.regular,
    fontSize: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
  },
  codeInputContainer: {
    marginLeft: 20,
  },
  scrollViewContainer: {flexGrow: 1},
  center: {alignSelf: 'center'},
  mainImage: {alignSelf: 'center', marginTop: 40},
  titleText: {alignSelf: 'center', marginTop: 30},
  subTitle: {alignSelf: 'center', marginTop: 20},
  subTitleOne: {alignSelf: 'center', marginTop: 5},
  margin30: {marginTop: 30},
  card: {
    marginHorizontal: 30,
    justifyContent: 'center',
    flex: 1,
    marginTop: 15,
  },
  row: {flexDirection: 'row'},
  paddingleft50: {left: 50},
  leftImage: {alignSelf: 'center', marginRight: 3},
  sideNumber: {
    width: 0.5,
    backgroundColor: '#979DA3',
    marginLeft: 5,
  },
  margin15: {marginTop: 15},
  flexEnd: {alignSelf: 'flex-end'},
  bottomButton: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
  },
  bottomtext: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signuptext: {
    textAlign: 'center',
    lineHeight: 30,
  },
  modalStyle: {
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
});
