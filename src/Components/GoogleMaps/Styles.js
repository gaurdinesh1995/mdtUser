import {StyleSheet, Platform} from 'react-native';
import {palette} from '../Theme/Index';
// import { BaseColor } from '../ReusableComponents';

const style = StyleSheet.create({
  absoluteStyle: {
    zIndex: Platform === 'ios' ? 1 : 2,
    position: 'absolute',
    left: 0,
    top: 10,
    justifyContent: 'center',
    alignContent: 'center',
    elevation: 10,
  },
  shadow: {
    shadowColor: 'rgb(189, 194, 220)',
    shadowOffset: {
      width: 1,
      height: 10,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 3,
  },
  searchWithText: {
    borderRadius: 8,

    height: 42,
    marginHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  searchIcon: {
    marginLeft: 10,
    height: 16,
    width: 16,
    resizeMode: 'contain',
  },
  mainView: {
    flex: 1,
    // backgroundColor: palette.primary,
    // marginTop: 20,
  },
  placeholderTextColor: {color: '#000'},
  inputcontainer: {
    borderRadius: 8,
    height: 42,
    marginHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: 'grey',
    // alignItems: 'center',
    borderTopColor: 'grey',
    borderBottomColor: 'transparent',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  textinput: {
    alignSelf: 'center',
    paddingLeft: 40,
    backgroundColor: 'white',
    color: '#000',
    fontSize: 14,
    //fontFamily: constants.muli_regular,
    borderWidth: 0,
    height: 42,
    borderBottomColor: 'transparent',
  },
  listView: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  description: {
    alignSelf: 'center',
    color: '#454F63',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heading: {
    flex: 1,
    backgroundColor: '#2A2E43',
  },
  container: {flex: 1},
  headerStyle: Platform === 'ios' ? null : {marginTop: 20},
  headerRightText: {
    color: 'white',
    fontSize: 20,
  },
  headerCenterText: {
    color: 'white',
    fontSize: 20,
  },
});

export default style;
