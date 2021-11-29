import {Icon} from 'native-base';
import React, {useEffect, useReducer} from 'react';
import {
  Platform,
  SafeAreaView,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Linking,
  Image,
} from 'react-native';
import {Header} from '../ReusableComponents';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import style from './Styles';
import {palette} from '../Theme/Index';
const Search = require('../../assets/search/search.png');
export default (props) => {
  const {navigation} = props;
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      type: 'sd',
    },
  );
  useEffect(() => {
    const {route} = props;
  }, []);

  /**
   * @function onLocationClick
   * @param place - ocation name serach by user.
   * @desc gets the location to the container which asked for it.
   */
  const onLocationClick = (place) => {
    const {route} = props;
    const data = parsePlace(place.address_components);
    const formated_data = {
      address_line_1: place.formatted_address,
      ...data,
    };
    const latLng = {
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
    };

    navigation.goBack();
    route.params.address(formated_data, latLng);
  };

  /**
   * @function parsePlace
   * @param addressComponents
   * @desc This function handles fetching state and city from
   * location selected from the google place dropdown
   */
  //eslint-disable-next-line react/sort-comp
  const parsePlace = (addressComponents) => {
    const parsedResult = {};
    for (let i = 0; i < addressComponents.length; i++) {
      for (let b = 0; b < addressComponents[i].types.length; b++) {
        if (addressComponents[i].types[b] === 'locality') {
          // this is the object you are looking for city
          parsedResult.city = addressComponents[i].long_name;
          break;
        } else if (
          addressComponents[i].types[b] === 'administrative_area_level_1'
        ) {
          // this is the object you are looking for state
          parsedResult.state = addressComponents[i].long_name;
          break;
        } else if (addressComponents[i].types[b] === 'postal_code') {
          // this is the object you are looking for state
          parsedResult.zipcode = addressComponents[i].long_name;
          break;
        }
      }
    }
    return parsedResult;
  };

  return (
    <>
      <Header title="Search" />
      <KeyboardAvoidingView
        style={style.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View style={style.mainView}>
          <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder="Search"
            minLength={2}
            autoFocus={true}
            onPress={(data, details = null) => {
              onLocationClick(details);
            }}
            getDefaultValue={() => {
              return ''; // text input default value
            }}
            query={{
              key: 'AIzaSyCrHqjx78Ry4YCz6Xs8ckYEk9PDKa7DhbM',
              language: 'en',
              components: 'country:my',
            }}
            currentLocationLabel="Current location"
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'distance',
              types: 'establishment',
            }}
            debounce={200}
            renderLeftButton={() => (
              <View style={style.absoluteStyle}>
                <Image
                  source={Search}
                  style={[style.searchIcon, {tintColor: palette.support2}]}
                />
              </View>
            )}
            styles={{
              placeholderTextColor: style.placeholderTextColor,
              container: style.searchWithText,
              textInputContainer: [style.inputcontainer],
              textInput: [style.textinput, style.shadow],
              listView: style.listView,
              description: style.description,
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            filterReverseGeocodingByTypes={[
              'zipcode',
              'neighborhood',
              'postal_code',
              'administrative_area_level_2',
              'administrative_area_level_1',
              'locality',
              'coordinates',
              'administrative_area_level_3',
            ]}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
