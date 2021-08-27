import React, {useContext} from 'react';
import {TouchableOpacity, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {COLORS, FONTS} from '../constants';
import AuthContext from '../auth/Context';
import cache from '../utils/cache';
//Screens
import {
  CategoriesList,
  CreateOrderScreen,
  Dashboard,
  DeliveryList,
  DeliveryListEdit,
  OrderPreviewScreen,
  Pickup,
  PickupEdit,
  RateListScreen,
} from '../views';
import {Icon} from 'react-native-elements/dist/icons/Icon';

//Create object for navigation
const Stack = createStackNavigator();

export default function AppStackNavigator() {
  const authContext = useContext(AuthContext);

  function logout() {
    try {
      authContext.setUser(null);
      cache.store('user', null);
    } catch (error) {
      console.error(error);
    }
    return null;
  }

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
          ...FONTS.h4,
          color: COLORS.white,
        },
        headerTintColor: COLORS.white,
      })}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: true,
          headerRight: ({color, size}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('Are you want to logout ❓', '', [
                    {
                      text: 'NO',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'YES', onPress: () => logout()},
                  ]);
                }}
                style={{
                  padding: 5,
                  borderRadius: 10,
                  marginRight: 10,
                  backgroundColor: COLORS.red,
                }}>
                <Icon
                  name="sign-out"
                  type="font-awesome"
                  size={size}
                  color="white"
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="Pickup"
        label="PICKUPS"
        component={Pickup}
        options={{headerShown: true, title: 'Pickups'}}
      />

      <Stack.Screen
        name="CategoriesList"
        component={CategoriesList}
        label="CategoriesList"
        options={{headerShown: true, title: 'Category List'}}
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

      <Stack.Screen
        name="OrderPreviewScreen"
        component={OrderPreviewScreen}
        label="OrderPreviewScreen"
        options={{headerShown: true, title: 'Order Details'}}
      />

      <Stack.Screen
        name="RateListScreen"
        component={RateListScreen}
        label="RateListScreen"
        options={{headerShown: true, title: 'Rate List'}}
      />
    </Stack.Navigator>
  );
}
