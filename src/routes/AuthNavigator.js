import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
//Constants
import {COLORS} from '../constants';
//Screens
import {SignIn} from '../views';

//Create object for navigation
const Stack = createStackNavigator();

function AuthNavigator() {
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
    </Stack.Navigator>
  );
}
export default React.memo(AuthNavigator);
