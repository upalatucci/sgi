import {Platform} from 'react-native';

export const Colors = {
  blue: '#4479A2',
  lightBlue: '#00A2C3',
  darkBlue: '#004664',
  indigo: '#6610f2',
  purple: '#6f42c1',
  pink: '#e83e8c',
  red: '#E02122',
  orange: '#DD9A18',
  yellow: '#F7DE34',
  green: '#28a745',
  teal: '#20c997',
  cyan: '#17a2b8',
  white: '#fff',
  gray: '#6c757d',
  grayDark: '#343a40',
  primary: '#4479A2',
  secondary: '#C6B696',
  success: '#28a745',
  info: '#17a2b8',
  warning: '#F7DE34',
  danger: '#E02122',
  light: '#f8f9fa',
  dark: '#696969',
  error: '#dc3545',
  voloContinuo: '#4a8eff',
  riviste: '#b8d6e0',
  background: '#F8F8F8',
  textGray: '#777777',
};

export const FontFamilies = {
  primary: Platform.OS === 'ios' ? 'Roboto-Medium' : 'Roboto-Medium',
};

export const TitleStyle = {
  color: Colors.primary,
  fontSize: 20,
  fontWeight: 'bold',
};

export const IconColors = {
  focused: Colors.primary,
  notFocused: '#f4f4f4',
};

export const DefaultShadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

export const DefaultBorderRadius = 10;

export const PrimaryButtonStyle = {
  marginBottom: 60,
  width: 100,
  height: 50,
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: Colors.orange,
};

export const PrimaryButtonTitleStyle = {
  color: Colors.orange,
  fontSize: 20,
};
