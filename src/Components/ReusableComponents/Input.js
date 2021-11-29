import React, {useState, forwardRef} from 'react';
import PropTypes from 'prop-types';
import {createBox, createText} from '@shopify/restyle';
import {StyleSheet, Dimensions} from 'react-native';
import {TextInput as RNTextInput} from 'react-native-paper';

import {palette} from '../Theme/Index';
const {width} = Dimensions.get('window');
const Box = createBox();
const Text = createText();
const TextInputBase = createBox(RNTextInput);

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
      focusable,
      mode,
      underlineColor,
      ...props
    },
    ref,
  ) => {
    return (
      <Box>
        <Text style={styles.title}>{title}</Text>

        <TextInputBase
          {...props}
          {...{ref}}
          mode={mode ? mode : 'outlined'}
          underlineColor={underlineColor}
          theme={{
            colors: {
              placeholder: '#000',
              text: '#000',
              primary: showErrorField ? palette.primary : 'grey',
            },
          }}
          // left={() => {
          //   return <Text>+60</Text>;
          // }}
          style={[
            {
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

        {left() ? (
          <Box position="absolute" style={styles.left}>
            {left()}
          </Box>
        ) : null}
        {right() ? (
          <Box position="absolute" style={styles.right}>
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
  left: PropTypes.func,
  right: PropTypes.func,
  renderLeft: PropTypes.func,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  focusable: PropTypes.bool,
  mode: PropTypes.string,
  underlineColor: PropTypes.string,
};

Input.defaultProps = {
  title: '',
  showErrorField: false,
  onChangeText: () => {},
  left: () => {},
  right: () => {},
  value: '',
  style: {},
  focusable: false,
  mode: '',
  underlineColor: '',
};

const styles = StyleSheet.create({
  error: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {right: 35, top: 45, zIndex: 100},
  title: {marginBottom: 10},
  input: {
    paddingLeft: 10,
    marginHorizontal: 10,
    height: 48,
    width: width - 30,
  },
  left: {left: 25, top: 45},
});
