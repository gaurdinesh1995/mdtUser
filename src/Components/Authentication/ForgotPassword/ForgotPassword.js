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
import {Button, Header, Input} from '../../ReusableComponents';

import {fonts, palette, TypographyStyles} from '../../Theme/Index';
import {forgotPassword} from '../../Services/AuthService';
import authConstants from '../../../Redux/AuthConstants';
const Box = createBox();
const Text = createText();

export default ({navigation, route, visible}) => {
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      phoneNumber: '',
      errors: [],
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
    if (error !== null) {
      setState({errors: error});
    } else {
      setState({errors: []});
    }
  }, [state.phoneNumber]);

  /**
   * @function PasswordRecovery
   * @description it will check phone number and navigate to reset password.
   */
  const PasswordRecovery = () => {
    const error = validateFields();
    if (error !== null) {
      setState({errors: error});
    } else {
      setState({errors: []});
      dispatch({
        type: authConstants.LOADING,
        loading: true,
      });
      const data = {
        mobile: state.phoneNumber,
      };

      forgotPassword(data)
        .then((response) => {
          const {data} = response;
          const {token} = data;
          dispatch({
            type: authConstants.LOADING,
            loading: false,
          });
          dispatch({
            type: authConstants.TOKEN,
            token: token,
          });
          visible();
          navigation.navigate('Verify', {
            from: 'forgot',
            phone: state.phoneNumber,
          });
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

  /**
   * @function onChangeText
   * @param {*} key
   * @param {*} value
   * @description it will set state for its key
   */
  const onChangeText = (key, value) => {
    setState({[key]: value});
  };

  const objName = (element) => element.name === 'phoneNumber';
  const phoneNumberIndex = state.errors.findIndex(objName);
  return (
    <Box
      style={[
        TypographyStyles.container,
        {borderTopLeftRadius: 20, borderTopRightRadius: 20},
      ]}>
      <Box
        height={4}
        width={60}
        borderRadius={20}
        alignSelf="center"
        backgroundColor="support4"
        opacity={0.5}
        mt="m"
      />
      <Box mt="xl" justifyContent="center">
        <Text pl="l" variant="support225medium">
          Forgot Password
        </Text>
        <Text opacity={0.6} variant="support315medium" mt="l" ml="l" mr="l">
          Enter your PhoneNumber for the verification process, we will send
          4digits code to your PhoneNumber
        </Text>
      </Box>
      <Box mt="xl" justifyContent="center" alignItems="center">
        <Input
          returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          label="PhoneNumber"
          value={state.phoneNumber}
          showErrorField={
            phoneNumberIndex !== -1 && !state.errors[phoneNumberIndex].valid
          }
          errorText={
            phoneNumberIndex !== -1 && state.errors[phoneNumberIndex].message
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
      <Box flex={1} justifyContent="flex-end" alignItems="center">
        <Box mb="xl" height={43}>
          <Button
            label="Continue"
            onPress={() => {
              PasswordRecovery();
            }}
          />
        </Box>
      </Box>
    </Box>
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
