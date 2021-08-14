import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {StyleSheet, View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';
import FlashMessage from 'react-native-flash-message';

import {AuthNavigator, AppStackNavigator, navigationTheme} from './App/routes';

import AuthContext from './App/auth/Context';
import cache from './App/utils/cache';

import api from './App/api/auth';

import {ErrorScreen} from './App/screens';
import {COLORS} from './App/constants';

//Debugger Configuration Start
// To see all the requests in the chrome Dev tools in the network tab.
XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then(response => {
    return response;
  });
};

//Debugger Configuration End

export default function App() {
  //Community Hooks
  const netInfo = useNetInfo();

  //State Declarations
  const [user, setUser] = useState([]);
  const [auth, setAuth] = useState(false);
  const [internetStatus, setInternetStatus] = useState(false);

  //Check For Auth
  const authVerify = () => {
    // cache.store('user', null);
    cache.get('user').then(user => {
      if (user != null) {
        setAuth(true);
      } else {
        setAuth(false);
      }
      setUser(user);
    });
  };
  // Use Effect hooks

  useEffect(() => {
    authVerify();
  }, [user]);

  useEffect(() => {
    authVerify();
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  //Check Internet Connectivity
  useEffect(() => {
    setInternetStatus(netInfo.isConnected);
  }, [netInfo.isConnected]);

  //Render Component
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      {internetStatus == true ? (
        <NavigationContainer theme={navigationTheme}>
          <AuthContext.Provider value={{user, setUser}}>
            {!auth ? <AuthNavigator /> : <AppStackNavigator />}
          </AuthContext.Provider>
        </NavigationContainer>
      ) : (
        <ErrorScreen getAlerts={() => setInternetStatus(internetStatus)} />
      )}
      <FlashMessage position="top" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
