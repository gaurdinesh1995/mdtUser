import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {createText} from '@shopify/restyle';
import {StyleSheet, Dimensions} from 'react-native';
import {fonts, palette} from '../Theme/Index';
import * as Animated from 'react-native-animatable';
const {width} = Dimensions.get('window');
const Text = createText();

const InputError = ({message, error = false}) => {
  const ViewElement = useRef(null);

  /**
   * @function useEffect
   * @description it will change the animation of error icon.
   */
  useEffect(() => {
    if (error) {
      ViewElement.current.animate('bounceIn', 1000);
    } else {
      ViewElement.current.animate('bounceOut', 500);
    }
  }, [error]);

  return (
    <Animated.View ref={ViewElement}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};
export default InputError;

InputError.propTypes = {
  title: PropTypes.string,
  right: PropTypes.func,
  left: PropTypes.func,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

InputError.defaultProps = {
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
    alignItems: 'flex-end',
  },
  right: {right: 35, top: 38},
  left: {left: 35, top: 38, backgroundColor: 'red'},
  title: {marginBottom: 10},
  input: {
    paddingLeft: 10,
    marginHorizontal: 20,
    height: 48,
    width: width - 40,
    borderRadius: 10,
  },
  text: {
    color: palette.support3,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
});
