import React, {useState, useEffect, useRef, useReducer} from 'react';
import {useDispatch} from 'react-redux';
import {backgroundColor, createBox, createText} from '@shopify/restyle';
import {
  StyleSheet,
  Animated,
  Dimensions,
  FlatList,
  Vibration,
} from 'react-native';
import {Button, Header, Input} from '../ReusableComponents';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Modal from 'react-native-modal';
import {fonts, palette, TypographyStyles} from '../Theme/Index';
import ScanSuccessModal from './ScanSuccessModal';
const Box = createBox();
const Text = createText();
const {height, width} = Dimensions.get('window');

export default ({navigation, route}) => {
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const moveY = useRef(new Animated.Value(-height * 0.2)).current;
  const cameraRef = useRef(RNCamera.Constants.CameraStatus);
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      data: true,
      count: 1,
      isBarcodeRead: false,
      isModalVisible: false,
    },
  );
  useEffect(() => {
    const listenNavigation = navigation.addListener('focus', () => {
      setState({
        isBarcodeRead: false,
      });
    });

    return () => listenNavigation();
  }, [navigation]);

  useEffect(() => {
    moving();
    // setState({isModalVisible: true});
  }, []);

  const moving = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveY, {
          toValue: height * 0.2,
          duration: 5000,
        }),
        Animated.timing(moveY, {
          toValue: -height * 0.2,
          duration: 5000,
        }),
      ]),
    ).start(() => moving());
  };
  const onBarCodeRead = (event) => {
    const {isBarcodeRead} = state;
    if (!isBarcodeRead) {
      setState({setIsBarcodeRead: true});
      Vibration.vibrate();
      // dispatch(scanBillQR({code: event.data}));
    }
  };

  const visible = () => {
    setState({isModalVisible: false});
  };

  const {data, count, isModalVisible} = state;
  return (
    <Box flex={1} backgroundColor="support1">
      <QRCodeScanner
        reactivate={true}
        vibrate={false}
        showMarker={true}
        customMarker={
          <Animated.View
            style={{
              height: 2,
              width: '100%',
              backgroundColor: 'red',
              transform: [{translateY: moveY}],
            }}
          />
        }
        cameraProps={{
          ratio: '3:3',
        }}
        onRead={onBarCodeRead}
        cameraStyle={styles.cameraStyle}
      />
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
          <ScanSuccessModal navigation={navigation} visible={() => visible()} />
        </Box>
      </Modal>
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
  content: {flexGrow: 1},
  modalStyle: {
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  cameraStyle: {
    height: 200,
    width: width - 40,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
