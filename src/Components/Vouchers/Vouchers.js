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
import VouchersList from './VouchersList';
import {palette, size, TypographyStyles} from '../Theme/Index';
import AddOnCart from '../AddOnCart/AddOnCart';
import {getCategory, getMenuShopId} from '../Services/Menu';
import authConstants from '../../Redux/AuthConstants';
import MenuConstant from '../../Redux/MenuConstant';
import {getAvailableVouchersList, redeemVoucher} from '../Services/Vouchers';
import {getAvatarsProfile} from '../Services/Profile';
import ProfileConstants from '../../Redux/ProfileConstants';
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
      selectedVoucher: '',
      vouchers: [],
      storeCredits: '',
    },
  );

  const {vouchers} = useSelector((state) => ({
    ...state.offer.offer,
  }));
  console.log({vouchers});

  useEffect(() => {
    getAvailablevouchers();
  }, []);
  const {profile} = useSelector((state) => ({
    ...state.profile.profile,
  }));
  useEffect(() => {
    if (!_.isEmpty(profile)) {
      setState({
        storeCredits: profile.storeCredits,
      });
    }
  }, [profile]);
  console.log({profile});
  const selectedVoucher = (item) => {
    setState({selectedVoucher: item});
  };
  console.log('Selected Voucher', state.selectedVoucher);
  const getAvailablevouchers = () => {
    getAvailableVouchersList()
      .then((response) => {
        const {data} = response;
        const {vouchers} = data;
        setState({vouchers: vouchers});
        console.log({response});
      })
      .catch((error) => {
        console.log({error});
      });
  };
  const voucherRedeemList = (item) => {
    console.log({item});
    dispatch({
      type: authConstants.LOADING,
      loading: true,
    });
    const data = {
      voucherId: item,
    };
    console.log({data});
    redeemVoucher(data)
      .then((response) => {
        const {data, errorMessage} = response;
        dispatch({
          type: authConstants.LOADING,
          loading: false,
        });

        if (data == null) {
          dispatch({
            type: authConstants.TOAST,
            toast: {
              title: errorMessage,
              loading: true,
              status: 'error',
            },
          });
        } else {
          getProfile();
          dispatch({
            type: authConstants.TOAST,
            toast: {
              title: data.message,
              loading: true,
              status: 'success',
            },
          });
        }
        getProfile();
        getAvailablevouchers();
      })
      .catch((error) => {
        dispatch({
          type: authConstants.LOADING,
          loading: false,
        });
        console.log({error});
      });
  };
  const getProfile = () => {
    getAvatarsProfile()
      .then((response) => {
        const {data} = response;
        const {user} = data;
        dispatch({
          type: ProfileConstants.PROFILE,
          profile: user,
        });
        console.log({response});
      })
      .catch((error) => {
        console.log({error});
      });
  };

  return (
    <Box flex={1}>
      <Header
        title={'Vouchers'}
        renderLeft={() => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={LeftArrow} />
          </TouchableOpacity>
        )}
        renderRight={() => (
          <TouchableOpacity
            onPress={() => navigation.navigate('RedeemedVouchers')}>
            <Image source={Vouchers} />
          </TouchableOpacity>
        )}
      />
      <Box
        height={91}
        width={'90%'}
        alignSelf="center"
        borderRadius={15}
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        backgroundColor="support1"
        paddingHorizontal="l">
        <Box>
          <Image
            source={Topokki}
            style={{height: 28, width: 28, resizeMode: 'contain'}}
          />
          <Text pt="s" variant="support412regular">
            Available balance
          </Text>
        </Box>
        <Box>
          <Text variant="support212regular">Pokki Points</Text>
          <Text pt="s" variant="support225medium">
            {profile.storeCredits}{' '}
          </Text>
        </Box>
      </Box>
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
              selectedVoucher={(item) => voucherRedeemList(item)}
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
