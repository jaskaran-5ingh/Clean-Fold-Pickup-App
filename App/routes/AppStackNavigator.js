import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {COLORS, icons} from '../constants';

//Screens
import {Dashboard, Pickup, DeliveryList} from '../screens';
//Create object for navigation
const Stack = createStackNavigator();

export default function AppStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      allowFontScaling={false}
      screenOptions={({navigation, route}) => ({
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTitleStyle: {
          color: COLORS.white,
        },
        headerTintColor: COLORS.white,
        headerRight: () => null,
      })}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Pickup"
        component={Pickup}
        options={{headerShown: true, label: 'PICKUPS'}}
      />
      <Stack.Screen
        name="DeliveryList"
        component={DeliveryList}
        options={{headerShown: true, label: 'DELIVERY'}}
      />
    </Stack.Navigator>
  );
}
