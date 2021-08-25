import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Constants
import {COLORS} from '../constants';

//Screens
import {SignIn} from '../views';
import {AppStackNavigator} from '../routes';

//Create object for navigation
const Stack = createStackNavigator();

export default function AuthNavigator() {
  //Deceleration Of Context
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      allowFontScaling={false}
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTitleStyle: {
          color: COLORS.white,
        },
        headerTintColor: COLORS.white,
      }}>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AppStackNavigator"
        component={AppStackNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
