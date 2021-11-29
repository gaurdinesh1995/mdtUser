import {StyleSheet, Platform, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  firstStyle: {flex: 1, marginTop: 10},
  mainViewOne: {
    height: 50,
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 5,
  },

  selected: {width: 5, marginRight: 10},
  nameStyle: {
    marginTop: 5,
    alignSelf: 'center',
    color: 'white',

    fontSize: 16,
  },
  welcomeBoxing: {
    height: 61,
    marginHorizontal: 20,
    borderColor: 'lightgray',
    borderWidth: 0.5,
    //borderRadius: 5
  },
  welcomeBoxTexting: {
    marginTop: 10,
    height: 16,
    width: 137,
    marginLeft: 10,
  },
  welcomeTexttwo: {
    marginTop: 10,
    height: 16,
    width: 100,
    marginLeft: 10,
  },

  widthOne: {width: 137},
  widthTwo: {width: 170},
  mainContainer: {paddingTop: 10},
  welcomeBoxTextOne: {
    marginHorizontal: 10,
    height: 15,

    marginLeft: 10,
  },
  welcomeBox: {
    justifyContent: 'center',
    height: 50,
    marginHorizontal: 20,
    borderColor: 'lightgray',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  appLogo: {
    height: 50,
    marginLeft: 20,
    marginTop: 50,
  },
  onlyHeight: {
    height: 30,
  },
  onlyHeightTen: {
    height: 15,
  },
  navHeight: {
    height: 80,
  },
  menuIcon: {
    marginLeft: 15,

    // flex: 0.1,
  },
  dotIcon: {
    flex: 0.1,
    paddingBottom: 5,
    paddingHorizontal: 5,
    paddingTop: 0,
  },
  dotIconView: {
    width: 60,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteTextNav: {
    fontSize: 14,
    paddingLeft: 6,
    textAlign: 'right',
  },
  downIcon: {
    marginLeft: 15,

    fontSize: 20,
  },
  iconStyles: {},
  buttonContainers: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',

    height: 60,
    width: 60,
    borderRadius: 30,
    shadowOpacity: 0.35,
    shadowOffset: {
      width: -1,
      height: 5,
    },
    shadowColor: 'black',
    shadowRadius: 4,
    elevation: 2,
    position: 'absolute',
    right: 15,
    alignItems: 'center',
    bottom: 31,
    alignSelf: 'center',
  },
  buttonLefts: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {fontSize: 20},
  sideSpace: {marginRight: 10},
  smallImage: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    height: 35,
    width: 35,
    borderRadius: 17.5,
  },
  userProfileImage: {
    height: 35,
    width: 35,
    borderRadius: 17.5,
    backgroundColor: '#999ebc',
  },
  drawerStyle: {
    width: '85%',
  },
  icons_wrap: {
    height: 35,
    width: 35,
    borderRadius: 17.5,
    alignSelf: 'center',
  },
  other_icons_wrap: {
    height: 23,
    width: 23,
    borderRadius: 11.5,
    alignSelf: 'center',
  },
  tabLableStyle: {
    fontSize: 12,
  },
  listLabel: {
    width: '85%',
    marginLeft: 10,
    fontSize: 12,
  },
  doctorTitle: {
    marginLeft: 20,
    fontSize: 14,

    marginTop: 8,
  },
  policyLableStyle: {
    fontSize: 10,

    textDecorationLine: 'underline',
  },
  policyLableLineStyle: {
    fontSize: 10,

    marginLeft: 5,
    marginRight: 5,
  },
  termsLableStyle: {
    fontSize: 10,
  },
  activeTabContainer: {
    padding: 2,

    borderRadius: 10,
    alignContent: 'center',
  },
  inactiveTabContainer: {
    padding: 2,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    marginRight: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    height: 35,
    width: 35,
    borderRadius: 17.5,
    flex: 1,
  },
  sideMenuIcon: {
    marginTop: 10,
    marginLeft: 15,
  },
  headerStyle: {
    shadowColor: 'transparent',
    // elevation: 0
    borderBottomWidth: 0,
    // borderBottomColor: constants.secondaryTextColor,
    // backgroundColor: constants.cardBckL
  },
  headerTitleStyle: {
    fontWeight: 'normal',
    fontSize: 17,
    color: 'black',
  },
  cardStyle: {
    backgroundColor: 'white',
  },
  height_55: {
    height: 80,
    elevation: 0,
  },
  tabBarStyle: {
    //backgroundColor:'red',
    //margin:1,
    // borderTopWidth: 0.5,
    //paddingTop: height <= 750 ? 16 : 25,
    //paddingBottom: 3,
    //justifyContent: 'space-between',
    //borderTopColor: '#CBCED1',
  },
  tabBarItemIconActive: {
    alignSelf: 'center',
  },
  tabBarItemIconInactive: {
    alignSelf: 'center',
  },
  tabBarItemLabel: {
    marginTop: Platform.OS === 'ios' ? (height <= 750 ? 10 : 16) : 8,
    fontSize: 0,
    color: 'transparent',
  },
  listItem: {
    backgroundColor: 'white',
  },
  listItemOther: {
    marginLeft: 22,
    alignItems: 'center',
  },
  ml_10: {
    marginLeft: 10,
  },
  ml_20: {
    marginLeft: 20,
  },
  plusIcon: {
    marginRight: 10,
  },
  container: {flex: 1},
  containerFlex: {flex: 1},

  tabContainer: {
    height: 55,

    elevation: 10,
    shadowOffset: {width: 0, height: 1},
    shadowColor: '#d3d3d3',
    shadowOpacity: 0.5,
  },
  rightHeaderView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  policyHeaderWrap: {
    flex: 1,
    flexDirection: 'row',
  },
  serviceWrap: {
    marginLeft: 20,
  },
  rightIcon: {
    fontSize: 20,
    color: 'black',
  },
  deleteIcon: {
    marginRight: 15,
  },
  deleteText: {
    fontSize: 18,
  },
  cancelText: {
    fontSize: 18,
    color: 'black',
  },
  contentText: {
    fontSize: 18,
    color: 'black',
  },
  drawerIcon: {height: 35, width: 60},

  dialogContent: {
    paddingTop: 12,
  },
  tabIcon: {height: 22},
  flatHeaderStyle: {
    borderBottomWidth: 0,
    elevation: 0,
  },
  bottomBorder: {
    backgroundColor: '#d1d6f3',
    height: 1,
  },
  badge: {
    marginLeft: 10,
    borderRadius: 10,
    width: 33,
    height: 20,
    alignSelf: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,

    marginTop: 1,
    alignSelf: 'center',
  },
  profile: {
    marginRight: 15,
  },
  flexRow: {flexDirection: 'row'},
});
export default styles;
