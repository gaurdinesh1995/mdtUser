import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {createBox, createText} from '@shopify/restyle';
import {TouchableOpacity, Image, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {size} from '../Theme/Index';
const backIcon = require('../../assets/Back/Back.png');
const Box = createBox();
const Text = createText();

const Header = ({renderLeft, renderRight, title, back, varient, color}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <Box
      backgroundColor={color}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width={size.width}
      style={{
        paddingTop: insets.top,
        height: insets.top === 0 ? 70 : 100,
      }}>
      {back ? (
        <Box height={50} width={50} />
      ) : renderLeft() ? (
        renderLeft()
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack(null);
          }}>
          <Image source={backIcon} style={{marginLeft: 25}} />
        </TouchableOpacity>
      )}
      <Text variant={varient !== undefined ? varient : 'black22medium'}>
        {title}
      </Text>
      <Box mr="l">
        {renderRight() ? renderRight() : <Box width={50} height={50} />}
      </Box>
    </Box>
  );
};
export default Header;

Header.propTypes = {
  back: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  title: PropTypes.string,
};

Header.defaultProps = {
  back: false,
  style: {},
  renderLeft: () => {},
  renderRight: () => {},
  title: '',
};
