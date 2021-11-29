import React, {forwardRef, useEffect, useRef} from 'react';

import PropTypes from 'prop-types';
import {createBox, createText} from '@shopify/restyle';

import {
  TextInput as RNTextInput,
  StyleSheet,
  Dimensions,
  View,
  Text as RNText,
  Animated,
  Platform,
} from 'react-native';

import {palette} from '../Theme/Index';

const {width} = Dimensions.get('window');
const Box = createBox();
const Text = createText();
const TextInputBase = createBox(RNTextInput);
const CustomTextInput = Animated.createAnimatedComponent(TextInputBase);

const Input = forwardRef(
  (
    {
      onChangeText,
      value,
      title,
      showErrorField,
      errorText,
      right,
      left,
      style,
      ...props
    },
    ref,
  ) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    /**
     * @function useEffect
     * @description it will change the animation of error icon.
     */
    useEffect(() => {
      if (showErrorField) {
        fadeIn();
      } else {
        fadeOut();
      }
    }, [showErrorField]);

    /**
     * @function fadeIn
     * @description Will change fadeAnim value to 1 in 5 seconds
     */
    const fadeIn = () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    };

    /**
     * @function fadeIn
     * @description Will change fadeAnim value to 0 in 3 seconds
     */
    const fadeOut = () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    };

    return (
      <Box>
        <Text ml="l" variant="support414regular" style={styles.title}>
          {title}
        </Text>
        {left() ? (
          <Box position="absolute" style={styles.left}>
            {left()}
          </Box>
        ) : null}

        <CustomTextInput
          {...{ref}}
          {...props}
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            {
              paddingLeft: left() ? 40 : 10,
              borderWidth: fadeAnim,
              backgroundColor: showErrorField ? 'white' : palette.tertiary,
            },
            styles.input,
            style,
          ]}
          value={value}
          onChangeText={(text) => {
            onChangeText(text);
          }}
        />

        {right() ? (
          <Box
            position="absolute"
            style={[
              styles.right,
              {
                top: Platform.OS === 'android' ? 38 : 36,
                right: right() ? 70 : 35,
              },
            ]}>
            {right()}
          </Box>
        ) : null}

        {showErrorField ? (
          <Box ml="l" style={styles.error}>
            <Box
              height={15}
              width={15}
              borderRadius={7.5}
              backgroundColor="primary"
              alignItems="center"
              justifyContent="center">
              <Text variant="support114regular">!</Text>
            </Box>
            <Text pl="s" style={{color: palette.primary}}>
              {errorText}
            </Text>
          </Box>
        ) : null}
      </Box>
    );
  },
);

export default Input;

Input.propTypes = {
  title: PropTypes.string,
  right: PropTypes.func,
  left: PropTypes.func,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

Input.defaultProps = {
  title: '',
  showErrorField: false,
  onChangeText: () => {},
  right: () => {},
  left: () => {},
  value: '',
  style: {},
};

const styles = StyleSheet.create({
  error: {
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: 20,
    alignItems: 'flex-start',
  },
  right: {right: 35, top: Platform.OS === 'android' ? 40 : 38, zIndex: 99},
  left: {left: 25, top: 35, zIndex: 99},
  title: {marginBottom: 10},
  input: {
    borderRadius: 15,
    marginHorizontal: 20,
    borderColor: palette.support3,
    height: 48,
    width: width - 40,
  },
});
