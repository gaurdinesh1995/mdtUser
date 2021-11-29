import React, {useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {FlatList, Image, Dimensions, StyleSheet} from 'react-native';

const Box = createBox();
const Text = createText();
const Banner = require('../../assets/banner/banner.png');
const ECBanner = require('../../assets/ecommerce/banner.png');
import SwiperFlatList from 'react-native-swiper-flatlist';
let deviceWidth = Dimensions.get('window').width;

export default ({navigation, ECommerce}) => {
  const dispatch = useDispatch();

  return (
    <Box>
      {ECommerce ? (
        <Box height={180}>
          <SwiperFlatList
            maximumZoomScale={20}
            style={styles.listStyle}
            index={1}
            showPagination
            paginationStyle={styles.paginationStyle}
            paginationStyleItemActive={styles.itemActive}
            paginationStyleItemInactive={styles.itemInactive}
            data={[{key: 'android'}, {key: 'android'}, {key: 'android'}]}
            renderItem={({item}) => <Image source={ECBanner} />}
          />
        </Box>
      ) : (
        <Box height={230}>
          <SwiperFlatList
            style={styles.dashListStyles}
            index={2}
            showPagination
            paginationStyle={styles.dashPagination}
            paginationStyleItemActive={styles.dashItemActive}
            paginationStyleItemInactive={styles.dashItemInactive}
            data={[
              {key: 'android'},
              {key: 'android'},
              {key: 'android'},
              {key: 'android'},
              {key: 'android'},
            ]}
            renderItem={({item}) => <Image source={Banner} />}
          />
        </Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    height: 200,
    position: 'absolute',
    width: deviceWidth,
    alignSelf: 'center',
  },
  paginationStyle: {
    position: 'absolute',
    top: 150,
  },
  itemActive: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: 'grey',
  },
  itemInactive: {
    height: 6,
    width: 6,
    borderRadius: 3,
    marginHorizontal: 2,
    backgroundColor: 'grey',
  },
  dashPagination: {
    position: 'absolute',
    top: 200,
  },
  dashItemActive: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'grey',
  },
  dashItemInactive: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: 'grey',
  },
  dashListStyles: {height: 200, position: 'absolute'},
});
