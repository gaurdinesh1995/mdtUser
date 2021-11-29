import React, {useRef, useReducer, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Geocoder from 'react-native-geocoding';

import {createBox, createText} from '@shopify/restyle';
import {TypographyStyles, fonts, palette} from '../Theme/Index';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Button, Header} from '../ReusableComponents';
import {
  createAddress,
  getShopLatLong,
  getShopNearMe,
  UpdateAddress,
} from '../Services/Address';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Axios from 'axios';
import authConstants from '../../Redux/AuthConstants';
import AddressConstants from '../../Redux/AddressConstants';
const LeftArrow = require('../../assets/arrow/leftarr.png');
const Location = require('../../assets/selectAddress/location.png');
const Cross = require('../../assets/cross/cross.png');
const Search = require('../../assets/search/search.png');
const MyLocation = require('../../assets/location/mylocation.png');
const Box = createBox();
const Text = createText();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default ({navigation, route}) => {
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  const {params} = route;
  const {address, search} = params;

  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      // addressModal: false,
      addressModal: params !== '' ? address : false,
      searchModal: params !== '' ? search : false,
      latitude: '37.78825',
      longitude: '-122.4324',
      // search: false,
      searchKeyword: '',
      searchResults: [],
      addressAdd: {},
      street: '',
      area: '',
      finalAddress: false,
    },
  );
  const User = useSelector((state) => ({
    ...state.auth.user.location_address,
  }));
  console.log({User});
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition((info) => {
      console.log({info});
      const lat = info.coords.latitude;
      const long = info.coords.longitude;
      mapRef.current.animateToRegion({
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
      setState({
        latitude: lat,
        longitude: long,
      });
    });
  };

  /**
   * @function addLocation
   * @desc
   */
  const addLocation = () => {
    Geocoder.from(state.value)
      .then((json) => {
        var location = json.results[0].geometry.location;
        const address = json.results[0].formatted_address;
        if (location && location.lat !== undefined) {
          // const {route} = props;
          const formated_data = {
            address_line_1: address,
          };
          const latLng = {
            lat: location.lat,
            lng: location.lng,
          };
          navigation.goBack();
          // route.params.address(formated_data, latLng);
        }
      })
      .catch((error) => console.warn(error));
  };
  const onRegionChange = (region) => {
    setState({
      region,
    });
  };
  const onRegionChangeComplete = (region, gesture) => {
    if (Platform.OS === 'android') {
      if (gesture.isGesture) {
        onRegionChange(region);
      }
    } else {
      onRegionChange(region);
    }
  };

  // const getShopLatLongDetail = () => {
  //   let data = `${state.latitude}, ${state.longitude}`;
  //   getShopLatLong(data)
  //     .then((response) => {
  //       console.log({response});
  //     })
  //     .catch((error) => {
  //       console.log({error});
  //     });
  // };

  const getShop = () => {
    let id = '7228';

    getShopNearMe(id)
      .then((response) => {
        console.log({response});
        const {data} = response;
        const {shop} = data;
        navigation.navigate('Menu', {item: shop});
      })
      .catch((error) => {
        console.log({error});
      });
  };
  const addressCreation = () => {
    const {area, street, addressAdd} = state;
    const {structured_formatting, description} = addressAdd;
    const data = {
      street: street,
      city: description,
      province: area,
      country: structured_formatting.secondary_text || '',
      latlong: `${state.latitude},${state.longitude}`,
      type: 'string',
      place: description,
    };
    createAddress(data)
      .then((response) => {
        console.log({response});
        const {data} = response;
        const {address} = data;
        // getShopLatLongDetail();
        getShop();
        dispatch({
          type: AddressConstants.ADDRESS,
          address: address,
        });
        dispatch({
          type: authConstants.CATEGORIES_LIST,
        });
      })
      .catch((error) => {
        console.log({error});
      });
  };
  useEffect(() => {
    dispatch({
      type: authConstants.LOADING,
      loading: false,
    });
  }, []);

  const searchLocation = async (text) => {
    const {searchKeyword} = state;
    setState({searchKeyword: text});
    const API_KEY = 'AIzaSyCrHqjx78Ry4YCz6Xs8ckYEk9PDKa7DhbM';
    Axios.request({
      method: 'post',
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&libraries=places&coordinates&callback=initAutocomplete&types=(cities)&language=en&input=${searchKeyword}`,
    })
      .then((response) => {
        console.log({response});
        setState({
          searchResults: response.data.predictions,
          isShowingResults: true,
        });
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  // const initialize = () => {
  //   var map = new google.maps.Map(document.getElementById('map-canvas'), {
  //     center: new google.maps.LatLng(0, 0),
  //     zoom: 15,
  //   });

  //   var service = new google.maps.places.PlacesService(map);

  //   service.getDetails(
  //     {
  //       placeId: 'ChIJneQ1fBO5t4kRf8mTw4ieb4Q',
  //     },
  //     function (place, status) {
  //       if (status === google.maps.places.PlacesServiceStatus.OK) {
  //         // Create marker
  //         var marker = new google.maps.Marker({
  //           map: map,
  //           position: place.geometry.location,
  //         });

  //         // Center map on place location
  //         map.setCenter(place.geometry.location);
  //       }
  //     },
  //   );
  // };

  // initialize();

  const {
    addressModal,
    searchModal,
    searchKeyword,
    searchResults,
    addressAdd,
    street,
    area,
    finalAddress,
  } = state;

  return (
    <Box flex={1}>
      {/* <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mr="l"
        marginBottom="l">
        <Text pl="l" p="m">
          See Places near you
        </Text>
        <TouchableOpacity onPress={() => getCurrentLocation()}>
          <Image style={styles.image} source={Location} />
        </TouchableOpacity>
      </Box> */}
      <MapView
        ref={mapRef}
        // pitchEnabled={true}
        style={styles.mapview}
        provider="google"
        // onRegionChange={() => onRegionChange()}
        // onRegionChangeComplete={() => onRegionChangeComplete.bind(this)}
        initialRegion={{
          latitude: parseFloat(state.latitude),
          longitude: parseFloat(state.longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          draggable={true}
          onDragEnd={(e) => {}}
          coordinate={{
            latitude: parseFloat(state.latitude),
            longitude: parseFloat(state.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </MapView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          backgroundColor: 'support1',
        }}>
        <Image source={LeftArrow} />
      </TouchableOpacity>
      {finalAddress && (
        <Box
          borderTopRightRadius={15}
          borderTopLeftRadius={15}
          height={250}
          width={'100%'}
          backgroundColor={'support1'}>
          <Box
            opacity={0.5}
            mt="s"
            borderRadius={10}
            height={3}
            width={70}
            alignSelf="center"
            backgroundColor={'support4'}
          />

          <Text p="l" variant="support222medium">
            Add New Address
          </Text>
          <Box
            height={97}
            width={'90%'}
            alignSelf="center"
            m="m"
            borderRadius={15}
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="l"
            pt="l"
            style={[TypographyStyles.cardShadow, {elevation: 1.5}]}>
            <Image source={Location} />
            <Box flex={0.8}>
              <Text>{street}</Text>
              <Text>{area}</Text>
              <Text>{addressAdd.description}</Text>
            </Box>
            <TouchableOpacity
              onPress={() =>
                setState({searchModal: true, finalAddress: false})
              }>
              <Text variant="primary13regular">Change</Text>
            </TouchableOpacity>
          </Box>
          <Box alignItems="flex-end" height={48}>
            <Button
              onPress={() => addressCreation()}
              label="Confirm & Proceed"
            />
          </Box>
        </Box>
      )}

      {searchModal && (
        <Box height={windowHeight * 0.75} backgroundColor="support1">
          <Box
            flexDirection="row"
            justifyContent="space-between"
            m="l"
            alignItems="center">
            <Text variant="support222medium">Search Location</Text>

            <TouchableOpacity onPress={() => setState({searchModal: false})}>
              <Image source={Cross} resizeMode="contain" />
            </TouchableOpacity>
          </Box>

          <Box
            marginHorizontal="l"
            borderRadius={20}
            height={50}
            borderWidth={0.8}
            borderColor="support4"
            flexDirection="row"
            alignItems="center"
            paddingHorizontal="m">
            <Image source={Search} />
            <TextInput
              placeholder="Search for your location"
              placeholderTextColor={palette.support2}
              value={searchKeyword}
              onChangeText={(text) => searchLocation(text)}
              // style={{
              //   borderBottomColor: palette.support7,
              //   borderBottomWidth: 1,
              //   marginVertical: 5,
              //   width: '90%',
              //   alignSelf: 'center',
              //   fontFamily: 'Ubuntu-Regular',
              //   fontSize: 12,
              // }}
            />
          </Box>
          <TouchableOpacity
            onPress={() => getCurrentLocation()}
            style={{margin: 20, flexDirection: 'row'}}>
            <Image source={MyLocation} />
            <Box ml="m">
              <Text variant="primary16regular">Current location</Text>
              <Text pt="s" variant="primary14regular">
                Using GPS
              </Text>
            </Box>
          </TouchableOpacity>
          <Box
            alignSelf="center"
            height={0.6}
            width={'90%'}
            backgroundColor="support2"
            opacity={0.3}
          />
          {searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    dispatch({
                      type: AddressConstants.ADDRESS,
                      address: item,
                    }),
                      setState({
                        addressModal: true,
                        searchModal: false,
                        addressAdd: item,
                      });
                  }}
                  style={{
                    flexDirection: 'row',
                    margin: 20,
                    alignItems: 'center',
                  }}>
                  <Image source={Location} />
                  <Box pl="l">
                    <Text variant="support216regular">{item.description} </Text>
                    <Text variant="support414regular">{item.description} </Text>
                  </Box>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => item}
            />
          ) : (
            <FlatList
              data={[User]}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    dispatch({
                      type: AddressConstants.ADDRESS,
                      address: item,
                    }),
                      setState({
                        addressModal: true,
                        searchModal: false,
                        addressAdd: item,
                      });
                  }}
                  style={{
                    flexDirection: 'row',
                    margin: 20,
                    alignItems: 'center',
                  }}>
                  <Image source={User.length > 0 && Location} />
                  <Box pl="l">
                    <Text variant="support216regular">{item.description} </Text>
                    <Text variant="support414regular">{item.description} </Text>
                  </Box>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => item}
            />
          )}
        </Box>
      )}
      {addressModal && (
        <Box height={windowHeight * 0.65} backgroundColor="support1">
          <Box
            height={97}
            borderRadius={15}
            elevation={2}
            shadowColor="support1"
            shadowOpacity={0.5}
            justifyContent="center"
            width={'90%'}
            marginVertical="l"
            alignSelf="center"
            pl="l">
            <Box
              flexDirection="row"
              alignItems="center"
              position="absolute"
              top={25}
              left={20}>
              <Image source={Location} />
            </Box>
            <Box paddingHorizontal="l">
              <Text variant="support216regular">{addressAdd.description}</Text>
              <Text variant="support313regular">
                {addressAdd.structured_formatting.main_text}
              </Text>
              <Text variant="support313regular">
                {addressAdd.structured_formatting.secondary_text}
              </Text>
            </Box>
          </Box>
          <Box
            marginHorizontal="l"
            borderRadius={20}
            height={69}
            borderWidth={0.8}
            borderColor="primary1"
            flexDirection="row"
            alignItems="center"
            paddingHorizontal="m">
            <Text variant="support414regular" opacity={0.8} pl="l">
              A detailed address will help our Delivery Partner reach your
              doorstep easily
            </Text>
          </Box>
          <TextInput
            placeholder="STREET"
            placeholderTextColor={palette.support2}
            value={street}
            onChangeText={(text) => setState({street: text})}
            style={{
              borderBottomColor: palette.support7,
              borderBottomWidth: 1,
              marginVertical: 15,
              width: '90%',
              alignSelf: 'center',
              fontFamily: 'Ubuntu-Regular',
              fontSize: 12,
            }}
          />
          <TextInput
            placeholder="PROVINCE / AREA"
            placeholderTextColor={palette.support2}
            value={area}
            onChangeText={(text) => setState({area: text})}
            style={{
              borderBottomColor: palette.support7,
              borderBottomWidth: 1,
              marginVertical: 5,
              width: '90%',
              alignSelf: 'center',
              fontFamily: 'Ubuntu-Regular',
              fontSize: 12,
            }}
          />
          <Box height={50} marginVertical="s">
            <Button
              onPress={() =>
                setState({
                  finalAddress: true,
                  addressModal: false,
                  searchModal: false,
                })
              }
              label="Proceed"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  HeaderIcons: {
    resizeMode: 'contain',
    marginLeft: 20,
  },
  mapview: {flex: 1},
  image: {height: 30, width: 30},
  header: {
    fontSize: 24,
    fontFamily: fonts.bold,
    marginLeft: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
