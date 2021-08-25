import React, {useContext} from 'react';
import {TouchableOpacity, Image, Text, Alert} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Avatar, Badge, Icon, withBadge} from 'react-native-elements';
import AuthContext from '../auth/Context';

import {COLORS, icons} from '../constants';
import cache from '../utils/cache';
import {Profile, Notifications, Alerts} from '../views';

const Drawer = createDrawerNavigator();

export default function App() {
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
    <Drawer.Navigator
      initialRouteName="Alerts"
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
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
            <Image
              source={icons.bell}
              style={{
                tintColor: COLORS.white,
                height: 25,
                width: 25,
                marginRight: 10,
              }}
            />
            <Badge
              status="error"
              containerStyle={{position: 'absolute', top: -2, right: 6}}
            />
          </TouchableOpacity>
        ),
      })}>
      <Drawer.Screen
        name="Alerts"
        component={Alerts}
        options={{
          title: 'Alerts',
          drawerIcon: ({focused, size, color}) => (
            <Icon name="bar-graph" type="entypo" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          drawerIcon: ({focused, size, color}) => (
            <Icon name="user" type="font-awesome" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: true,
          drawerLabel: 'Notifications',
          drawerIcon: ({focused, size, color}) => (
            <>
              <Icon name="bell" type="font-awesome" size={size} color={color} />
              <Badge
                status="primary"
                containerStyle={{position: 'absolute', top: 8, left: 6}}
              />
            </>
          ),
        }}
      />
      <Drawer.Screen
        name="logOut"
        component={logout}
        options={{
          headerShown: false,
          drawerLabel: 'SignOut',
          drawerIcon: ({focused, size, color}) => (
            <>
              <Icon
                name="back"
                type="entypo"
                size={size}
                color={COLORS.secondary}
              />
            </>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
