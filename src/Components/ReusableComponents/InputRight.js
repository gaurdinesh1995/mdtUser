import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';
import * as Animated from 'react-native-animatable';
const errorI = require('../../assets/InputIcons/error.png');
const check = require('../../assets/InputIcons/check.png');
const fadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};

const Inputleft = ({message, error = false, ...props}) => {
  const ViewElement = useRef(null);

  /**
   * @function useEffect
   * @description it will change the animation of error icon.
   */
  useEffect(() => {
    if (error) {
      ViewElement.current.animate('shake', 500);
    } else {
      ViewElement.current.animate(fadeIn);
    }
  }, [error]);

  return (
    <Animated.View ref={ViewElement}>
      <Image source={error ? errorI : check} />
    </Animated.View>
  );
};
export default Inputleft;

Inputleft.propTypes = {
  title: PropTypes.string,
  right: PropTypes.func,
  left: PropTypes.func,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

Inputleft.defaultProps = {
  title: '',
  showErrorField: false,
  onChangeText: () => {},
  right: () => {},
  left: () => {},
  value: '',
  style: {},
};
