import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import ButtonComponent from '../components/ButtonComponent';
import ButtonLoaderContainer from '../components/ButtonLoaderContainer';
import InputComponent from '../components/InputComponent';
import GlobalStyle from '../Styles/GlobalCSS';

const LoginScreen = ({navigation}) => {
  // App State Variables
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Use Effect hooks
  useEffect(() => {
    return setLoader(false);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, paddingHorizontal: 20}}>
        {/* Logo */}
        <View style={style.logoContainer}>
          <Image
            source={require('../assets/images/photo.png')}
            style={{width: 180, height: 180}}
          />
        </View>

        <View
          style={{
            marginTop: 40,
            paddingHorizontal: 15,
            paddingVertical: 0,
          }}>
          <Text style={GlobalStyle.blueHeading}>Sign In</Text>
        </View>

        {/* Input fields */}
        <View style={GlobalStyle.mainContainer}>
          <InputComponent
            inputType="text"
            onChangeText={emailValue => {
              setEmail(emailValue.nativeEvent.text);
            }}
            defaultValue={email}
            iconType="user"
            placeholder="Email or Mobile"
            // errorMessage="Required"
          />
          <InputComponent
            inputType="password"
            onChangeText={passwordValue => {
              setPassword(passwordValue.nativeEvent.text);
            }}
            defaultValue={password}
            iconType="key"
            placeholder="Password"
            // errorMessage="Required"
          />

          {/* Login Button */}
          <View style={{marginTop: 15}} />
          <ButtonComponent
            press={() => {
              setLoader(true), console.log(email, password);
              setTimeout(() => {
                navigation.push('Dashboard');
              }, 2000);
            }}
            buttonText="Login"
            loading={loader}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  tinyLogo: {},
});

export default LoginScreen;
