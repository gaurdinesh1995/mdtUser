import {createTheme} from '@shopify/restyle';
import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const size = {
  //Primary
  width: width,
  height: height,
};
export const palette = {
  //Primary
  primary: '#ED1E24',
  primary1: '#F8A4A2',
  primary2: '#FFF5F5',
  primary3: '#FFF8F8',
  primary4: 'rgba(rgba 237 30 36, 0.26)',
  primary5: '#FFF9F9',
  primary6: '#E8E8E8',
  // Secondary
  secondary: '#CED4FD',
  secondary1: '#F5F6FF',
  secondary2: '#E0E0FD',

  //Tertiary
  tertiary: '#F4F5F7',
  tertiary1: '#CCCCD5',

  //Supporting colos
  support: '#F3F3F3',
  support1: '#FFFFFF',
  support2: '#000000',
  support3: '#757575',
  support4: '#707070',
  support5: '#3F444C',
  support6: '#C4C4C4',
  support7: '#E5E5E5',
  // Transparent
  transparent: 'transparent',
};

export const TypographyStyles = StyleSheet.create({
  flexGrow: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  card: {
    minHeight: 175,
    backgroundColor: 'white',
    borderRadius: 25,
    marginHorizontal: 30,
  },
});
export const fonts = {
  bold: 'Ubuntu-Bold',
  medium: 'Ubuntu-Medium',
  thin: 'Roboto-Thin',
  thinitalic: 'Roboto-ThinItalic',
  mediumItalic: 'Roboto-MediumItalic',
  regular: 'Ubuntu-Regular',
  italicLight: 'Roboto-LightItalic',
  italicBlack: 'Roboto-BlackItalic',
  boldItalic: 'Roboto-BoldItalic',
  italic: 'Roboto-Italic',
  black: 'Roboto-Black',
  condensedBold: 'RobotoCondensed-Bold',
};

const theme = createTheme({
  colors: {
    white: 'white',
    black: 'black',
    //Primary
    primary: palette.primary,
    primary1: palette.primary1,
    primary2: palette.primary2,
    primary3: palette.primary3,
    primary4: palette.primary4,
    primary5: palette.primary5,
    primary6: palette.primary6,
    // Secondary
    secondary: 'secondary',
    secondary1: 'secondary1',
    secondary2: 'secondary2',

    //Tertiary
    tertiary: 'tertiary',
    tertiary1: 'tertiary1',

    //Supporting colos
    support: palette.support,
    support1: palette.support1,
    support2: palette.support2,
    support3: palette.support3,
    support4: palette.support4,
    support5: palette.support5,
    support6: palette.support6,
    support7: palette.support7,
    // Transparent
    transparent: palette.transparent,
  },
  spacing: {
    s: 5,
    m: 10,
    l: 20,
    xl: 25,
    xxl: 30,
    xxxl: 35,
    xxxxl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    // 20
    primary20bold: {
      color: 'primary',
      fontFamily: fonts.bold,
      fontSize: 20,
    },
    primary24bold: {
      color: 'primary',
      fontFamily: fonts.bold,
      fontSize: 24,
    },
    primary25regular: {
      color: 'primary',
      fontFamily: fonts.regular,
      fontSize: 25,
    },
    primary14bold: {
      color: 'primary',
      fontFamily: fonts.regular,
      fontSize: 14,
    },

    // 16
    white16Medium: {
      color: 'white',
      fontFamily: fonts.medium,
      fontSize: 16,
    },
    support516Medium: {
      color: 'support5',
      fontFamily: fonts.medium,
      fontSize: 16,
    },
    support216Medium: {
      color: 'support2',
      fontFamily: fonts.medium,
      fontSize: 16,
    },

    primary15regular: {
      color: 'primary',
      fontFamily: fonts.regular,
      fontSize: 15,
    },
    support218regular: {
      color: 'support2',
      fontFamily: fonts.regular,
      fontSize: 18,
    },
    support118regular: {
      color: 'support1',
      fontFamily: fonts.regular,
      fontSize: 18,
    },
    support218medium: {
      color: 'support2',
      fontFamily: fonts.medium,
      fontSize: 18,
    },
    primary18medium: {
      color: 'primary',
      fontFamily: fonts.medium,
      fontSize: 18,
    },
    primary14medium: {
      color: 'primary',
      fontFamily: fonts.medium,
      fontSize: 14,
    },
    support114medium: {
      color: 'support1',
      fontFamily: fonts.medium,
      fontSize: 14,
    },
    support112medium: {
      color: 'support1',
      fontFamily: fonts.medium,
      fontSize: 12,
    },
    support212medium: {
      color: 'support2',
      fontFamily: fonts.medium,
      fontSize: 12,
    },
    support314medium: {
      color: 'support3',
      fontFamily: fonts.medium,
      fontSize: 14,
    },
    support214medium: {
      color: 'support2',
      fontFamily: fonts.medium,
      fontSize: 14,
    },
    support214regular: {
      color: 'support2',
      fontFamily: fonts.regular,
      fontSize: 14,
    },
    support210regular: {
      color: 'support2',
      fontFamily: fonts.regular,
      fontSize: 10,
    },
    support410regular: {
      color: 'support4',
      fontFamily: fonts.regular,
      fontSize: 10,
    },

    support222medium: {
      color: 'support2',
      fontFamily: fonts.medium,
      fontSize: 22,
    },
    black22medium: {
      color: 'black',
      fontFamily: fonts.medium,
      fontSize: 22,
    },
    primary25medium: {
      color: 'primary',
      fontFamily: fonts.medium,
      fontSize: 25,
    },
    primary13regular: {
      color: 'primary',
      fontFamily: fonts.regular,
      fontSize: 13,
    },
    support216regular: {
      color: 'support2',
      fontFamily: fonts.regular,
      fontSize: 16,
    },
    support316regular: {
      color: 'support3',
      fontFamily: fonts.regular,
      fontSize: 16,
    },

    support116regular: {
      color: 'support1',
      fontFamily: fonts.regular,
      fontSize: 16,
    },
    primary16regular: {
      color: 'primary',
      fontFamily: fonts.regular,
      fontSize: 16,
    },
    primary14regular: {
      color: 'primary',
      fontFamily: fonts.regular,
      fontSize: 14,
    },
    support220regular: {
      color: 'support2',
      fontFamily: fonts.regular,
      fontSize: 20,
    },
    primary20regular: {
      color: 'primary',
      fontFamily: fonts.regular,
      fontSize: 20,
    },
    support412regular: {
      color: 'support4',
      fontFamily: fonts.regular,
      fontSize: 12,
    },
    support212regular: {
      color: 'support2',
      fontFamily: fonts.regular,
      fontSize: 12,
    },
    support414regular: {
      color: 'support4',
      fontFamily: fonts.regular,
      fontSize: 14,
    },
    support415regular: {
      color: 'support4',
      fontFamily: fonts.regular,
      fontSize: 15,
    },
    support215regular: {
      color: 'support2',
      fontFamily: fonts.regular,
      fontSize: 15,
    },
    support114regular: {
      color: 'support1',
      fontFamily: fonts.regular,
      fontSize: 14,
    },
    support112regular: {
      color: 'support1',
      fontFamily: fonts.regular,
      fontSize: 12,
    },
    support213regular: {
      color: 'support2',
      fontFamily: fonts.regular,
      fontSize: 13,
    },
    support518regular: {
      color: 'support5',
      fontFamily: fonts.regular,
      fontSize: 18,
    },
    support318regular: {
      color: 'support3',
      fontFamily: fonts.regular,
      fontSize: 18,
    },
    primary18regular: {
      color: 'primary',
      fontFamily: fonts.regular,
      fontSize: 18,
    },
    support318medium: {
      color: 'support3',
      fontFamily: fonts.medium,
      fontSize: 18,
    },
    support518medium: {
      color: 'support5',
      fontFamily: fonts.medium,
      fontSize: 18,
    },
    support225medium: {
      color: 'support2',
      fontFamily: fonts.medium,
      fontSize: 25,
    },
    support15medium: {
      color: 'support',
      fontFamily: fonts.medium,
      fontSize: 15,
    },
    support215medium: {
      color: 'support2',
      fontFamily: fonts.medium,
      fontSize: 15,
    },
    support120medium: {
      color: 'support1',
      fontFamily: fonts.medium,
      fontSize: 20,
    },
    support315medium: {
      color: 'support3',
      fontFamily: fonts.medium,
      fontSize: 15,
    },
    primary15medium: {
      color: 'primary',
      fontFamily: fonts.medium,
      fontSize: 15,
    },
    support322medium: {
      color: 'support3',
      fontFamily: fonts.medium,
      fontSize: 22,
    },
    support313regular: {
      color: 'support3',
      fontFamily: fonts.regular,
      fontSize: 13,
    },
  },
});

export type Theme = typeof theme;
export default theme;
