import {request} from './APICentral';

// export const getCart = (data) => {
//   return request({url: '/cart/add', method: 'GET', data}, true);
// };

export const addCart = (data) => {
  return request({url: '/cart/add/bulk', method: 'POST', data}, true);
};

export const addCoupons = (data) => {
  return request({url: '/coupon/apply', method: 'POST', data}, true);
};

export const checkoutCart = (data) => {
  return request({url: '/checkout/create', method: 'POST', data}, true);
};

export const getCart = (data) => {
  return request({url: '/cart/list', method: 'GET', data}, true);
};

export const clearCart = (data) => {
  return request({url: '/cart/clear', method: 'PUT', data}, true);
};
