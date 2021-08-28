import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';
import FlashMessage from 'react-native-flash-message';

import {AppStackNavigator, AuthNavigator, navigationTheme} from './src/routes';

import AuthContext from './src/auth/Context';
import cache from './src/utils/cache';

import {ErrorScreen} from './src/views';
import {COLORS} from './src/constants';

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
  const [internetStatus, setInternetStatus] = useState(false);

  // Use Effect hooks

  useEffect(() => {
    setTimeout(() => {
      try {
        cache.get('user').then(res => setUser(res));
        SplashScreen.hide();
      } catch (err) {
        console.error(err);
      }
    }, 2000);
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
            {user ? <AppStackNavigator /> : <AuthNavigator />}
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
