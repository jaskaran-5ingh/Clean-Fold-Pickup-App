import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {COLORS, icons, FONTS} from '../constants';

//Screens
import {
  Dashboard,
  Pickup,
  DeliveryList,
  CreateOrderScreen,
  DeliveryListEdit,
  PickupEdit,
} from '../screens';
import {formatDiagnostics} from 'typescript';
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
          ...FONTS.h4,
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
        label="PICKUPS"
        component={Pickup}
        options={{headerShown: true, title: 'Pickups'}}
      />

      <Stack.Screen
        name="PickupEdit"
        label="PICKUP Edit"
        component={PickupEdit}
        options={{headerShown: true, title: 'Pickup Edit'}}
      />
      <Stack.Screen
        name="DeliveryList"
        component={DeliveryList}
        label="DELIVERY"
        options={{headerShown: true, title: 'Delivery'}}
      />
      <Stack.Screen
        name="CreateOrderScreen"
        component={CreateOrderScreen}
        label="Create Order"
        options={{headerShown: true, title: 'Create Order'}}
      />
      <Stack.Screen
        name="DeliveryListEdit"
        component={DeliveryListEdit}
        label="DeliveryListEdit"
        options={{headerShown: true, title: 'Edit Delivery'}}
      />
    </Stack.Navigator>
  );
}
