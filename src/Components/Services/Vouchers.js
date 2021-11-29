import {request} from './APICentral';

export const getRedeemVouchersList = (data) => {
  return request({url: '/voucher/redeem/list', method: 'GET', data}, true);
};
export const getAvailableVouchersList = (data) => {
  return request({url: '/voucher/list', method: 'GET', data}, true);
};
export const redeemVoucher = (data) => {
  return request({url: '/voucher/redeem', method: 'POST', data}, true, false);
};

export const voucherApply = (data) => {
  return request({url: '/voucher/apply', method: 'POST', data}, true);
};
