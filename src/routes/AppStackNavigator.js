/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Alert, AppState, TouchableOpacity} from 'react-native';
import {Badge, Icon} from 'react-native-elements';
import OneSignal from 'react-native-onesignal';
import AuthContext from '../auth/Context';
import {COLORS, FONTS} from '../constants';
import cache from '../utils/cache';
import {CartItemsContext} from '../utils/CartContext';
//Screens
import {
  CategoriesList,
  CheckOut,
  CreateBill,
  CreateOrderScreen,
  Dashboard,
  DeliveryList,
  DeliveryListEdit,
  OrderPreviewScreen,
  Pickup,
  PickupEdit,
  RateListScreen,
} from '../views';
import navigation from './rootNavigator';

//Create object for navigation
const Stack = createStackNavigator();

function AppStackNavigator() {
  const authContext = useContext(AuthContext);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const cartContext = useContext(CartItemsContext);

  function logoutButton(color, size) {
    return (
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Are you want to logout ?', '', [
            {
              text: 'NO',
              onPress: () => {},
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
        <Icon name="sign-out" type="font-awesome" size={size} color="white" />
      </TouchableOpacity>
    );
  }

  function cartButton(color, size) {
    return (
      <TouchableOpacity
        onPress={() => {}}
        style={{
          padding: 5,
          borderRadius: 10,
          marginRight: 10,
        }}>
        <Icon
          name="shopping-cart"
          type="font-awesome"
          size={size}
          color={COLORS.white}
        />
        <Badge
          value={cartContext?.state?.selectedItems?.length || 0}
          containerStyle={{
            position: 'absolute',
            top: -7,
            right: -7,
          }}
          badgeStyle={{
            elevation: 6,
            backgroundColor: COLORS.red,
          }}
        />
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    let unAmounted = false;

    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      if (!unAmounted) {
        setAppStateVisible(appState.current);
      }
      navigation.navigate('Dashboard', {});
    });

    return () => {
      unAmounted = true;
      subscription?.remove();
    };
  }, []);

  function logout() {
    try {
      authContext.setUser(null);
      cache.store('user', null);
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  //OneSignal Init Code
  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId('41432c5a-1e80-4eab-8180-16fedfdb1a3e');
  //END OneSignal Init Code

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      let notification = notificationReceivedEvent.getNotification();
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    },
  );

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(notification => {
    const data = notification.notification.additionalData;
    if (data.type === 'pickup') {
      navigation.navigate('Pickup');
    }
    if (data.type === 'delivery') {
      navigation.navigate('DeliveryList');
    }
  });

  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      allowFontScaling={false}
      screenOptions={() => {
        return {
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
        };
      }}>
      {/* List of screen components */}

      <Stack.Screen
        name="CategoriesList"
        component={CategoriesList}
        label="CategoriesList"
        options={{headerShown: true}}
      />

      <Stack.Screen
        name="CheckOut"
        component={CheckOut}
        label="CheckOut"
        options={{headerShown: true}}
      />

      <Stack.Screen
        name="CreateBill"
        component={CreateBill}
        label="Create Bill"
        options={{
          headerShown: true,
          // headerRight: ({color, size}) => {
          //   return cartButton(color, size);
          // },
        }}
      />

      <Stack.Screen
        name="CreateOrderScreen"
        component={CreateOrderScreen}
        label="Create Order"
        options={{headerShown: true}}
      />

      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: true,
          headerRight: ({color, size}) => {
            return logoutButton(color, size);
          },
        }}
      />

      <Stack.Screen
        name="DeliveryList"
        component={DeliveryList}
        label="DELIVERY"
        options={{headerShown: true}}
      />

      <Stack.Screen
        name="DeliveryListEdit"
        component={DeliveryListEdit}
        label="DeliveryListEdit"
        options={{headerShown: true}}
      />

      <Stack.Screen
        name="OrderPreviewScreen"
        component={OrderPreviewScreen}
        label="OrderPreviewScreen"
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Pickup"
        label="PICKUPS"
        component={Pickup}
        options={{headerShown: true}}
      />

      <Stack.Screen
        name="PickupEdit"
        label="PICKUP Edit"
        component={PickupEdit}
        options={{headerShown: true}}
      />

      <Stack.Screen
        name="RateListScreen"
        component={RateListScreen}
        label="RateListScreen"
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}

export default React.memo(AppStackNavigator);
