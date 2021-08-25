import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppStackNavigator from './AppStackNavigator';
import {
  COLORS,
  SIZES,
  FONTS,
  icons,
  images,
  appImages,
  responsiveFontSize,
  responsiveHeight,
} from '../constants';

// App Screens
import {
  MemberShipScreen,
  MyBuyScreen,
  ProfileScreen,
  DealScreen,
} from '../views';

export default function AppTabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      allowFontScaling={false}
      animationEnabled
      tabBarOptions={{
        allowFontScaling: false,
        style: {
          height: responsiveHeight(8),
          backgroundColor: COLORS.primaryFont,
          elevation: 0,
        },
        activeBackgroundColor: COLORS.red,
        activeTintColor: COLORS.primaryFont,
        inactiveTintColor: '#bababa',
        showLabel: false,
      }}>
      <Tab.Screen
        name="MyBuy"
        component={MyBuyScreen}
        options={{
          tabBarIcon: function ({size, color}) {
            return <Icon name="heart" size={size * 1.2} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="DealScreen"
        component={DealScreen}
        options={{
          tabBarIcon: function ({size, color}) {
            return <Icon name="history" size={size * 1.2} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={AppStackNavigator}
        options={{
          tabBarIcon: function ({size, color}) {
            return <Icon name="home" size={size * 1.2} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="MemberShip"
        component={MemberShipScreen}
        options={{
          tabBarIcon: function ({size, color}) {
            return <Icon name="book" size={size * 1.2} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: function ({size, color}) {
            return <Icon name="user" size={size * 1.3} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
