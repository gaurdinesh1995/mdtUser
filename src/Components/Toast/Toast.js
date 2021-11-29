import React, {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import {createText} from '@shopify/restyle';
import {size, TypographyStyles} from '../Theme/Index';
import LottieView from 'lottie-react-native';
import {Icon} from 'native-base';
import {useSelector} from 'react-redux';
import AuthConstants from '../../Redux/AuthConstants';
const cross = require('../../assets/toast/greenCheck.json');
const check = require('../../assets/toast/redCross.json');
const Text = createText();
const FRICTION = 8;

export default ({navigation, route}) => {
  const dispatch = useDispatch();
  const Anima = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const {toast} = useSelector((state) => ({
    ...state.auth.user,
  }));

  /**
   * @function useEffect
   * @description this will check the toast redux and animate the toast.
   */
  useEffect(() => {
    if (toast !== undefined && toast.loading) {
      animate({toValue: 1});
      setTimeout(() => {
        hide();
      }, 5000);
    } else {
      animate({toValue: 0});
    }
  }, [toast]);

  /**
   * @function hide
   * @description it will dismiss the toast.
   */
  const hide = () => {
    dispatch({
      type: AuthConstants.TOAST,
      toast: {
        title: '',
        loading: false,
        status: 'error',
      },
    });
  };

  /**
   * @function useEffect
   * @description this is the animation for check or cross.
   */
  useEffect(() => {
    Animated.loop(
      Animated.delay(2000),
      Animated.timing(progress.current, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
      }),
    ).start();
  }, []);

  /**
   * @function useEffect
   * @description this is the animation for toast view.
   */
  const animate = ({toValue}) => {
    Animated.spring(Anima, {
      toValue,
      friction: FRICTION,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.main,
        {
          transform: [
            {
              translateY: Anima.interpolate({
                inputRange: [0, 1],
                outputRange: [-200, 70],
              }),
            },
          ],
        },
        TypographyStyles.cardShadow,
      ]}>
      <View style={styles.row}>
        <View style={styles.image}>
          <LottieView
            progress={progress.current}
            style={{
              height: toast.status === 'error' ? 40 : 90,
              width: toast.status === 'error' ? 40 : 50,
            }}
            source={toast.status === 'error' ? cross : check}
            autoPlay
            loop
          />
        </View>
        <View style={styles.title}>
          <Text variant="support213regular" textAlign="left">
            {toast.title}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.hide}
          onPress={() => {
            hide();
          }}>
          <Icon name="cross" type="Entypo" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    borderRadius: 20,
    alignSelf: 'center',
    minHeight: 80,
    width: size.width / 1.2,
    backgroundColor: 'white',
  },
  row: {flexDirection: 'row', flex: 1},
  image: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {
    flex: 4,
    marginVertical: 20,
    width: size.width / 2,
    justifyContent: 'center',
  },
  hide: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
