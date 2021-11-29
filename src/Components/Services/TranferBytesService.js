import {request} from './APICentral';

export const getUserByPhone = (data) => {
  return request(
    {url: '/api/user/byte-transfer/get-user-by-phone', method: 'POST', data},
    true,
    true,
  );
};

// export const getStatusProfile = (data) => {
//     return request({url: '/api/user/profile/get-status',  method: 'GET', data}, true);
//   };

//   export const getAvatarsProfile = (data) => {

//       return request({url: '/api/user/profile/getAvatars',  method: 'GET', data}, true);
//     };
