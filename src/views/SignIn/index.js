import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {showMessage} from 'react-native-flash-message';
import AuthContext from '../../auth/Context';
import api from '../../api/auth';
import cache from '../../utils/cache';

import {
  COLORS,
  FONTS,
  images,
  responsiveHeight,
  responsiveWidth,
  SIZES,
} from '../../constants';
import {Button, InputComponent} from '../../components';
import {ErrorScreen, LoadingScreen} from './.';

export default function index({navigation}) {
  //Deceleration Of Context
  const authContext = useContext(AuthContext);

  //Component State Declarations
  const [userDetails, setUserDetails] = useState({
    email: 'testdummy@gmail.com',
    password: 'secret',
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUserValid, setUserValid] = useState(false);

  //Call Api Only Once when components loads
  useEffect(() => {
    return () => {
      setError(false);
      setUserValid(true);
      setLoading(false);
      setUserDetails({
        email: 'testdummy@gmail.com',
        password: 'secret',
      });
    };
  }, []);

  // states handling functions

  function handleInputStateChanges({name, value}) {
    let newUserDetails = {};

    if (name == 'email') {
      newUserDetails.email = value;
      newUserDetails.password = userDetails.password;
    } else {
      newUserDetails.email = userDetails.email;
      newUserDetails.password = value;
    }
    setUserDetails(newUserDetails);
  }

  async function handleFormSubmit(userDetails) {
    try {
      if (Object.keys(userDetails).length == 0) {
        showMessage({
          message: 'Error',
          description: 'Please fill details !',
          backgroundColor: COLORS.red,
          type: 'danger',
          icon: 'danger',
        });
      } else {
        setLoading(true);
        const response = await api.signIn(userDetails);
        console.log(response);
        if (response.ok !== true) {
          showMessage({
            message: 'Something went wrong !',
            description: 'Please try again latter',
            backgroundColor: COLORS.red,
            type: 'danger',
            icon: 'danger',
          });
          setLoading(false);
        } else {
          showMessage({
            message:
              response.data?.status == true
                ? 'Login Success! Welcome ' + response.data?.details.name
                : response.data?.errors,
            type: response.data?.status == true ? 'success' : 'danger',
            icon: response.data?.status == true ? 'success' : 'danger',
            position: 'right',
          });
          // Set User In Auth Context
          if (response?.data != null) {
            if (response.data?.status == true) {
              setUserValid(false);
              cache.store('user', response.data.details);
              authContext.setUser(response.data.details);
              navigation.push('AppStackNavigator');
            }
          }
          setUserDetails({});
          setLoading(false);
        }
      }
    } catch (error) {
      //Check logs for error
      console.error(error);
    }
  }

  //Componenet Renders
  function renderButtons() {
    return (
      <View style={styles.center}>
        {/* button for signIn  */}
        <Button
          height={responsiveHeight(6)}
          width="100%"
          title="Sign In"
          titleColor="white"
          backgroundColor={COLORS.primary}
          onPress={() => {
            handleFormSubmit(userDetails);
          }}
        />
      </View>
    );
  }

  function renderSignText() {
    return (
      <View
        style={{
          paddingBottom: SIZES.padding * 2,
        }}>
        <Text style={styles.welcome}>Sign In</Text>
      </View>
    );
  }

  function renderLogo() {
    return (
      <View style={styles.center}>
        {/* Logo */}
        <Image
          source={images.logo}
          resizeMode="contain"
          style={{
            height: responsiveWidth(50),
            width: responsiveWidth(45),
          }}
        />
      </View>
    );
  }

  function renderInputFields() {
    return (
      <View behavior="position" style={{paddingBottom: SIZES.padding * 2}}>
        {/* Email */}
        <InputComponent
          placeholder="example@email.com"
          label="Email "
          leftIcon="envelope"
          value={userDetails.email}
          onChangeText={value => {
            handleInputStateChanges({
              name: 'email',
              value: value,
            });
          }}
        />

        {/* Password */}
        <InputComponent
          placeholder="password"
          label="Password"
          isPassword={true}
          value={userDetails.password}
          leftIcon="key"
          onChangeText={value => {
            handleInputStateChanges({
              name: 'password',
              value: value,
            });
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {error == true ? (
        <ErrorScreen />
      ) : (
        <>
          {loading == true ? (
            <LoadingScreen />
          ) : (
            <>
              {/* Logo */}
              {renderLogo()}
              <ScrollView>
                {/* Sign Text */}
                {renderSignText()}

                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                  {/* Text InputComponent */}
                  {renderInputFields()}
                  {renderButtons()}
                </KeyboardAvoidingView>
              </ScrollView>
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding * 4,
    paddingTop: SIZES.padding * 5,
  },
  welcome: {
    ...FONTS.h1,
    color: COLORS.primary,
    opacity: 0.85,
    marginVertical: 15,
  },
  loremIpsum: {
    ...FONTS.h5,
    color: COLORS.darkgray,
    opacity: 0.8,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
