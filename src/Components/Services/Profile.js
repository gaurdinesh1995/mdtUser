import {request} from './APICentral';

export const updateAvatarProfile = (data) => {
  return request(
    {url: '/user​/update​/profile', method: 'PUT', data},
    true,
    false,
  );
};

// export const updateProfileImg = (data) => {
//   return request(
//     {url: '​user/update/profile/image', method: 'PUT', data},
//     true,
//     true,
//   );
// };

export const updateProfileImg = (data) => {
  return request(
    {
      url: 'user/update/profile/image',
      method: 'PUT',
      data,
    },
    true,
    true,
  );
};

export const getStatusProfile = (data) => {
  return request(
    {url: '/api/user/profile/get-status', method: 'GET', data},
    true,
  );
};

export const getAvatarsProfile = (data) => {
  return request({url: '/user/me', method: 'GET', data}, true);
};
