import {request} from './APICentral';

export const createAddress = (data) => {
  return request({url: '/address/create', method: 'POST', data}, true, false);
};

export const updateAddress = (data) => {
  return request({url: '/address/', method: 'PUT', data}, true, false);
};

export const deleteAddress = (data) => {
  return request({url: `/address/${data.id}`, method: 'DELETE'}, true, false);
};

export const getMenuShopId = (shopId) => {
  return request(
    {url: `/shop/menu/${shopId}/list`, method: 'GET', shopId},
    true,
  );
};

export const getAddressList = (data) => {
  return request({url: '/address/list', method: 'GET', data}, true);
};

export const getShopNearMe = (data) => {
  return request({url: `/shop/get/${data}`, method: 'GET'}, true);
};

export const getShopLatLong = (data) => {
  return request({url: `/shop/nearest/${data}`, method: 'GET'}, true);
};
