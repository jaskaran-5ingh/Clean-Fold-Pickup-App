import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import {Dashboard} from '../screens';
//Create object for navigation
const Stack = createStackNavigator();

export default function AppStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Dashboard" allowFontScaling={false}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}
