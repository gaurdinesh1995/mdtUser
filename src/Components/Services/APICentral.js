import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {envVars} from '../Helpers/Index';
import {store} from '../../Redux/Store';
import {getToken} from '../Helpers/Index';

/**
 * Request Wrapper with default success/error actions
 */
export const request = async (options, isHeader = true, isForm) => {
  let authHeader = null;
  if (isHeader) {
    const {auth} = store.getState();
    const {user} = auth;
    const {token} = user;
    if (token !== null) {
      authHeader = token;
    }
  }

  const client = axios.create({
    baseURL: envVars.baseUrl,
    headers: {
      'x-token': authHeader,
      'Content-Type': isForm ? 'multipart/form-data' : 'application/json',
    },
  });

  const onSuccess = (response) => {
    console.log('Request Successful!', response);
    const {success, message} = response.data;
    if (!success && message === 'invalid api key') {
      //store.dispatch(logoutUserAction);
      AsyncStorage.removeItem('userInfo');
    }
    return Promise.resolve(response.data);
  };

  const onError = (error) => {
    console.log({error});
    console.debug('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.debug('Status:', error.response.status);
      console.debug('Data:', error.response.data);
      console.debug('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.debug('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};
