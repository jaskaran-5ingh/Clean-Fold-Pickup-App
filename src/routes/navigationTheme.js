import {DefaultTheme} from '@react-navigation/native';
import {COLORS} from '../constants';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    backgroundColor: COLORS.secondary,
  },
};
