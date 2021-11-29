import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  useCallback,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import _ from 'lodash';
// import {getMenuShopId} from '../Services/Profile';
import Modal from 'react-native-modal';
import {Header} from '../ReusableComponents';
import MenuCategories from '../Categories/MenuCategories';
import VouchersList from './RedeemedVouchersList';
import {palette, size, TypographyStyles} from '../Theme/Index';
import AddOnCart from '../AddOnCart/AddOnCart';
import {getCategory, getMenuShopId} from '../Services/Menu';
import authConstants from '../../Redux/AuthConstants';
import MenuConstant from '../../Redux/MenuConstant';
import {getRedeemVouchersList} from '../Services/Vouchers';
const Product = require('../../assets/product/product.png');

const LeftArrow = require('../../assets/arrow/leftarr.png');
const Vouchers = require('../../assets/vouchers/vouchers.png');
const windowHeight = Dimensions.get('window').height;
const Box = createBox();
const Text = createText();
const Topokki = require('../../assets/pokki/pokkipoints.png');

function usePrevious(data) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = data;
  }, [data]);
  return ref.current;
}

function Menu({navigation, props, route}) {
  const [cartId, setCartId] = useState(0);
  const previousCartId = usePrevious(cartId);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      isModalVisible: false,
      search: false,
      category: '',
      menuItem: [],
      selectedObj: {},
      total: 0,
      vouchers: [],
    },
  );
  useEffect(() => {
    getRedeemVouchers();
  }, []);

  const applyVoucher = (id) => {
    console.log({id});
  };

  const getRedeemVouchers = () => {
    getRedeemVouchersList()
      .then((response) => {
        const {data} = response;
        const {vouchersRedeemed} = data;
        setState({vouchers: vouchersRedeemed});
        console.log({response});
      })
      .catch((error) => {
        console.log({error});
      });
  };

  return (
    <Box flex={1}>
      <Header
        title={'Redeemed Voucher'}
        renderLeft={() => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={LeftArrow} />
          </TouchableOpacity>
        )}
      />

      {/* {state.menuItem.length > 0 ? ( */}
      <Box flex={1} style={styles.contentContainerStyle}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginVertical: 10}}
          data={state.vouchers}
          // ItemSeparatorComponent={() => {
          //   return (
          //     <Box marginHorizontal="l" height={1} backgroundColor="primary6" />
          //   );
          // }}
          renderItem={({item, index}) => (
            <VouchersList
              item={item}
              index={index}
              applyVoucher={(id) => applyVoucher(id)}
            />
          )}
          keyExtractor={(item, index) => item.toString()}
        />
      </Box>
      {/* )  */}
      {/* : (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text>No Menu for this Category</Text>
        </Box>
      )} */}
    </Box>
  );
}
export default Menu;
const styles = StyleSheet.create({
  content: {flexGrow: 1},
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
  contentContainerStyle: {
    marginTop: 30,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
  },
  MenuCategoriesStyles: {
    marginLeft: 10,
    marginTop: 10,
    height: 70,
  },
});
