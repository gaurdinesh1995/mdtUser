import {request} from './APICentral';

export const updateAvatarProfile = (data) => {
  return request(
    {url: '/user​/update​/profile', method: 'PUT', data},
    true,
    false,
  );
};

export const updateProfileImg = (data) => {
  return request(
    {url: '​/user​/update​/profile​/image', method: 'PUT', data},
    true,
    true,
  );
};

// export const getMenuShopId = (data) => {

//   return request({url: `/shop/menu/${data}/list`, method: 'GET', data}, true);
// };

export const getMenuShopId = (data) => {
  return request(
    {
      url: `/shop/menu/${data.shopId}/${data.categoryId}/${1}/${10}/list`,
      method: 'GET',
      params: data,
    },
    true,
  );
};
export const getCategory = (data) => {
  return request({url: 'food/category/list', method: 'GET', data}, true);
};

export const searchList = (data) => {
  return request({url: '/shop/menu/search', method: 'POST', data}, true, false);
};

export const getBanner = (data) => {
  return request({url: '/', method: 'GET', data}, true);
};
