import {useNetInfo} from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import AuthContext from './src/auth/Context';
import {COLORS} from './src/constants';
import {
  AppStackNavigator,
  AuthNavigator,
  navigationRef,
  navigationTheme,
} from './src/routes';
import cache from './src/utils/cache';
import {ErrorScreen} from './src/views';

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

  const [internetStatus, setInternetStatus] = useState(false);
  const [user, setUser] = useState([]);

  // Use Effect hooks

  useEffect(() => {
    let unAmounted = false;

    setTimeout(() => {
      try {
        if (!unAmounted) {
          cache.get('user').then(res => setUser(res));
        }
        SplashScreen.hide();
      } catch (err) {
        console.error(err);
      }
    }, 2000);
    return () => {
      unAmounted = false;
    };
  }, []);

  //Check Internet Connectivity
  useEffect(() => {
    let unAmounted = false;
    if (!unAmounted) {
      setInternetStatus(netInfo.isConnected);
    }
    return () => {
      unAmounted = true;
    };
  }, [netInfo.isConnected]);

  //Render Component
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      {internetStatus == true ? (
        <NavigationContainer theme={navigationTheme} ref={navigationRef}>
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
