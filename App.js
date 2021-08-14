import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

import LoginScreen from './view/LoginScreen';
import DashboardScreen from './view/DashboardScreen';
import OrderListScreen from './view/OrderListScreen';
import OrderCreateScreen from './view/OrderCreateScreen';
import CreateBillScreen from './view/CreateBillScreen';

const Stack = createNativeStackNavigator();

const App = () => {

// Use effect hooks
  useState(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

//

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={DashboardScreen}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrderCreate"
          component={OrderCreateScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="createBill"
          component={CreateBillScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ListOrders"
          component={OrderListScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
