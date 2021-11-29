import AsyncStorage from '@react-native-community/async-storage';

/**
 * @function getProp
 * @param {*} p
 * @desc it will get the data string from the repsonse
 */
export const getProp = (p) => (o) =>
  p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);

/**
 * @function setUserInfo
 * @param info
 * @returns Promise
 * @description Save user info into async storage
 */
export const setAuthToken = (info) => {
  AsyncStorage.setItem('Auth_token', JSON.stringify(info));
};

/**
 * @function removeAuthInfo
 * @description remove user info from async storage
 */
export const removeAuthToken = () => {
  AsyncStorage.removeItem('Auth_token');
};

/**
 * @function getToken
 * @returns userInfo
 * @description Returns user info if saved in async storage else null
 */
export const getToken = async () => {
  const token = await AsyncStorage.getItem('Auth_token').then((data) => {
    try {
      const info = JSON.parse(data);
      return info;
    } catch (e) {
      return null;
    }
  });
  return token;
};
