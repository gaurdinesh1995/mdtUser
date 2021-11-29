import React, {useState, useEffect, useReducer, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Platform,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import {createBox, createText, visible} from '@shopify/restyle';
import {Button, Header, Input} from '../ReusableComponents';
import {fonts, palette, size, TypographyStyles} from '../Theme/Index';
import ImagePicker from 'react-native-image-crop-picker';
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
} from 'react-native-permissions';
import {
  getAvatarsProfile,
  updateAvatarProfile,
  updateProfileImg,
} from '../Services/Profile';
import AuthConstants from '../../Redux/AuthConstants';
const LeftArrow = require('../../assets/arrow/leftarr.png');
const Camera = require('../../assets/camera/camera.png');
const OrderHistory = require('../../assets/profile/orderhistory.png');
const user = require('../../assets/profile/user.png');

const Box = createBox();
const Text = createText();
export default ({navigation, route}) => {
  const emailRef = useRef(null);
  const PhoneNumberRef = useRef(null);
  const PasswordRef = useRef(null);
  const postCodeRef = useRef(null);

  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      email: '',
      phoneNumber: '',
      errors: [],
      secure: true,
      confirmSecure: true,
      firstname: '',
      lastname: '',
      // country: '',
      username: '',
      name: '',
      last: '',
      profileImage: '',
      showImage: false,
      postCode: '',
    },
  );
  const User = useSelector((state) => ({
    ...state.auth.user.user,
  }));
  console.log({User});

  /**
   * @function validateFields
   * @returns array of errors.
   * @description it will validate phonenumber and password.
   */
  const validateFields = () => {
    const emptyFields = [];
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (state.username === '' || null) {
      const obj = {
        name: 'username',
        valid: false,
        message: 'UserName is required.',
      };
      emptyFields.push(obj);
    }

    if (state.email.trim().length === 0) {
      const obj = {
        name: 'email',
        valid: false,
        message: 'Email is required.',
      };
      emptyFields.push(obj);
    }
    if (!re.test(String(state.email).toLowerCase())) {
      const obj = {
        name: 'email',
        valid: false,
        message: 'Valid email is required.',
      };
      emptyFields.push(obj);
    }
    if (state.phoneNumber.length === 0) {
      const obj = {
        name: 'phoneNumber',
        valid: false,
        message: 'Phone Number is required.',
      };
      emptyFields.push(obj);
    }

    if (state.postCode === '' || null) {
      const obj = {
        name: 'postCode',
        valid: false,
        message: 'postCode is required.',
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
    getProfile();
    if (
      state.username !== '' ||
      state.email !== '' ||
      state.phoneNumber !== '' ||
      state.postCode !== ''
      // ||
      // state.country !== ''
    ) {
      const error = validateFields();
      if (error !== null) {
        setState({errors: error});
      } else {
        setState({errors: []});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.email,
    state.phoneNumber,
    state.username,
    state.postCode,

    // state.country,
  ]);
  /**
   * @function profileEmptyImageAlert
   * @description options for profile picture upload
   */
  const profileEmptyImageAlert = () => {
    if (Platform.OS === 'ios') {
      Alert.alert(
        'How would you like to upload your photo..?',
        'please select a medium',
        [
          {
            text: 'Gallery',
            onPress: () => {
              check(PERMISSIONS.IOS.PHOTO_LIBRARY)
                .then((result) => {
                  switch (result) {
                    case RESULTS.UNAVAILABLE:
                      const error = 'Sorry!, This feature is not available.';
                      return showToastMessage('error', error);
                    case RESULTS.DENIED:
                      request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
                        if (result === 'granted') {
                          return getCameraImage();
                        }
                      });
                      break;
                    case RESULTS.GRANTED:
                      getGalleryImage();
                      break;
                    case RESULTS.BLOCKED:
                      const title =
                        'Your photo permission for this app is blocked';
                      const titleOne =
                        'Would you like to open app settings to enable photo settings..?';
                      return openSettingApp(title, titleOne);
                  }
                })
                .catch((error) => {
                  // …
                });
            },
          },
          {
            text: 'Camera',
            onPress: () => {
              check(PERMISSIONS.IOS.CAMERA)
                .then((result) => {
                  switch (result) {
                    case RESULTS.UNAVAILABLE:
                      const error = 'Feature unavailable';
                      return Alert.alert(`${error}`);
                    case RESULTS.DENIED:
                      request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
                        if (result === 'granted') {
                          return getCameraImage();
                        }
                      });
                      break;
                    case RESULTS.GRANTED:
                      getCameraImage();
                      break;
                    case RESULTS.BLOCKED:
                      const title =
                        'Your photo permission for this app is blocked';
                      const titleOne =
                        'Would you like to open app settings to enable photo settings..?';
                      return openSettingApp(title, titleOne);
                  }
                })
                .catch((error) => {
                  console.log({error});
                });
            },
          },

          {
            text: 'Cancel',
            style: 'destructive',
          },
        ],
        {cancelable: true},
      );
    } else {
      Alert.alert(
        'How would you like to upload your photo..?',
        'please select a medium',
        [
          {
            text: 'Gallery',
            onPress: () => {
              getGalleryImage();
            },
          },
          {
            text: 'Camera',
            onPress: () => {
              getCameraImage();
            },
          },

          {
            text: 'Cancel',
            style: 'destructive',
          },
        ],
        {cancelable: true},
      );
    }
  };

  const openSettingApp = (title, title1) => {
    Alert.alert(
      `${title}`,
      `${title1}`,
      [
        {
          text: 'Yes',
          onPress: () => {
            openSettings();
          },
        },
        {
          text: 'No',
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const getGalleryImage = () => {
    ImagePicker.openPicker({
      compressImageQuality: Platform.OS === 'ios' ? 0.3 : 1,
      mediaType: 'photo',
      forceJpg: true,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      multiple: false,
      cropperCircleOverlay: true,
      cropping: true,
    }).then((image) => {
      const photoUrl = image.path;
      setState({
        profileImage: photoUrl,
        showImage: true,
      });
      updateProfileImage(photoUrl);
    });
  };

  const getCameraImage = () => {
    ImagePicker.openCamera({
      compressImageQuality: Platform.OS === 'ios' ? 0.3 : 1,
      mediaType: 'photo',
      forceJpg: true,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      multiple: false,
      cropperCircleOverlay: true,
      cropping: true,
    }).then((image) => {
      const photoUrl = image.path;
      setState({
        profileImage: photoUrl,
        showImage: true,
      });
      updateProfileImage(photoUrl);
    });
  };
  const updateProfileImage = (url) => {
    var data = new FormData();
    // if (state.showImage) {
    data.append('profile', {
      uri: url,
      name: 'photo.jpg',
      type: 'image/jpg',
    });
    // }

    updateProfileImg(data)
      .then((response) => {
        const {data} = response;
        const {user} = data;
        console.log('PROFILE', user.profile);
        console.log({response});
      })
      .catch((error) => {
        console.log({error});
      });
  };

  const getProfile = () => {
    getAvatarsProfile()
      .then((response) => {
        const {data} = response;
        const {user} = data;
        console.log('PROFILE', user.profile);
        setState({
          profileImage: user.profile !== null ? user.profile : '',
          username: user.userName,
          email: user.email,
          phoneNumber: user.mobile.toString(),
          showImage: false,
        });
        console.log({response});
      })
      .catch((error) => {
        console.log({error});
      });
  };

  const updateProfile = () => {
    const validUrl = /(https?:\/\/.*\.(?:png|jpg))/i;
    // var data = new FormData();
    // data.append('userName', state.username);
    // data.append('postalcode', state.postCode);
    // if (state.phoneNumber !== User.mobile) {
    //   data.append('mobile', state.phoneNumber);
    // }
    // // else if (state.email !== User.email) {
    // //   data.append('email', state.email);
    // // }
    // else if (state.showImage) {
    //   data.append('profile', {
    //     uri: state.profileImage,
    //     name: 'photo.jpg',
    //     type: 'image/jpg',
    //   });
    // }

    const data = {
      email: state.email,
      userName: state.username,
      postalcode: state.postCode,
    };

    if (Number(state.phoneNumber) !== User.mobile) {
      data.mobile = JSON.stringify(state.phoneNumber);
    }
    console.log('DATA ====== ======= ========', data);
    dispatch({
      type: AuthConstants.LOADING,
      loading: true,
    });
    updateAvatarProfile(data)
      .then((response) => {
        const {data} = response;
        const {message, token} = data;
        dispatch({
          type: AuthConstants.LOADING,
          loading: false,
        });
        if (token) {
          dispatch({
            type: AuthConstants.TOKEN,
            token: token,
          });
          navigation.navigate('Verify', {
            from: 'profile',
            phone: state.phoneNumber,
          });
        }
        getProfile();
        dispatch({
          type: AuthConstants.TOAST,
          toast: {
            title: message,
            loading: true,
            status: 'success',
          },
        });
        console.log({response});
      })
      .catch((error) => {
        const {data} = error;
        const {errorMessage} = data;
        dispatch({
          type: AuthConstants.TOAST,
          toast: {
            title: errorMessage,
            loading: true,
            status: 'error',
          },
        });
        console.log({error});
        dispatch({
          type: AuthConstants.LOADING,
          loading: false,
        });
        getProfile();
      });
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

  let param = '';
  if (route && route.params !== undefined) {
    param = route.params.space;
  }

  const objUserName = (element) => element.name === 'username';
  const usernameIndex = state.errors.findIndex(objUserName);
  const objName = (element) => element.name === 'phoneNumber';
  const phoneNumberIndex = state.errors.findIndex(objName);
  const objEmail = (element) => element.name === 'email';
  const emailIndex = state.errors.findIndex(objEmail);
  const objPostCode = (element) => element.name === 'postCode';
  const postCodeIndex = state.errors.findIndex(objPostCode);

  return (
    <Box flex={1}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <Header
          title="Edit Profile"
          renderLeft={() => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={LeftArrow} />
            </TouchableOpacity>
          )}
        />
        <Box height={180} alignItems="center">
          <TouchableOpacity onPress={() => profileEmptyImageAlert()}>
            <Box
              style={{
                height: 98,
                width: 98,
                borderRadius: 49,
                marginTop: 30,
              }}>
              <Image
                source={
                  state.profileImage !== ''
                    ? state.showImage
                      ? {uri: state.profileImage}
                      : {
                          uri: `https://segwitz-staging-api.myeongdongtopokki.com${state.profileImage}`,
                        }
                    : state.showImage
                    ? {uri: state.profileImage}
                    : user
                }
                style={[
                  {
                    borderRadius: 98 / 2,
                    height: 98,
                    width: 98,
                    //borderWidth: 5,
                    borderColor: palette.support4,
                    backgroundColor: palette.support1,
                    overflow: 'hidden',
                  },
                ]}
              />
              <Image
                source={Camera}
                style={{
                  position: 'absolute',
                  resizeMode: 'contain',
                  bottom: 0,
                  right: 0,
                }}
              />
            </Box>
          </TouchableOpacity>
        </Box>
        <Box
          backgroundColor="support1"
          borderTopLeftRadius={20}
          borderTopRightRadius={20}>
          <Box>
            <Input
              mode="flat"
              underlineColor="transparent"
              style={styles.textStyle}
              returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
              label="UserName"
              value={state.username}
              showErrorField={
                usernameIndex !== -1 && !state.errors[usernameIndex].valid
              }
              errorText={
                usernameIndex !== -1 && state.errors[usernameIndex].message
              }
              onChangeText={(text) => {
                onChangeText('username', text);
              }}
              onSubmitEditing={() => {
                emailRef.current.focus();
              }}
            />
          </Box>
          <Box>
            <Input
              ref={emailRef}
              mode="flat"
              underlineColor="transparent"
              style={styles.textStyle}
              label="Email"
              value={state.email}
              showErrorField={
                emailIndex !== -1 && !state.errors[emailIndex].valid
              }
              errorText={emailIndex !== -1 && state.errors[emailIndex].message}
              onChangeText={(text) => {
                onChangeText('email', text);
              }}
              onSubmitEditing={() => {
                PhoneNumberRef.current.focus();
              }}
            />
          </Box>
          <Box>
            {/* {} */}
            <Input
              ref={PhoneNumberRef}
              mode="flat"
              underlineColor="transparent"
              style={styles.textStyle}
              returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
              label="Phone Number"
              value={state.phoneNumber}
              showErrorField={
                phoneNumberIndex !== -1 && !state.errors[phoneNumberIndex].valid
              }
              // style={{paddingLeft: state.focus ? 40 : 0}}
              //   left={() =>
              //     state.focus ? (
              //       <Box position="absolute" left={5} top={10}>
              //         <Text pr="l" variant="primary14bold">
              //           {'+ 60'}
              //         </Text>
              //       </Box>
              //     ) : null
              //   }
              errorText={
                phoneNumberIndex !== -1 &&
                state.errors[phoneNumberIndex].message
              }
              onFocus={() => setState({focus: true})}
              onChangeText={(text) => {
                onChangeText('phoneNumber', text);
              }}
              keyboardType="numeric"
              onSumbitEditing={() => {
                postCodeRef.current?.focus();
              }}
            />
          </Box>
          <Box>
            <Input
              ref={postCodeRef}
              mode="flat"
              underlineColor="transparent"
              style={styles.textStyle}
              label="PostCode"
              value={state.postCode}
              showErrorField={
                postCodeIndex !== -1 && !state.errors[postCodeIndex].valid
              }
              errorText={
                postCodeIndex !== -1 && state.errors[postCodeIndex].message
              }
              onChangeText={(text) => {
                onChangeText('postCode', text);
              }}
              onSubmitEditing={() => {
                setState({focus: false});
              }}
            />
          </Box>

          <Box marginVertical="xl" height={48}>
            <Button onPress={() => updateProfile()} label="Save" />
          </Box>
        </Box>
      </ScrollView>
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
  text: {fontSize: 16, color: palette.tertiary2},
  eye: {height: 30, width: 30},
  modalStyle: {
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  content: {flexGrow: 1},
  textStyle: {
    height: 50,
    backgroundColor: palette.support1,
    borderBottomColor: palette.support3,
    borderBottomWidth: 0.4,
    paddingLeft: 0,
    width: '90%',
    alignSelf: 'center',
  },
});
