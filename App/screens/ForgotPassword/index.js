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
import {Button, Input} from '../../components';
import {ErrorScreen, LoadingScreen} from '../../screens';

export default function index({navigation}) {
  //Deceleration Of Context
  const authContext = useContext(AuthContext);

  //Component State Declarations
  const [userDetails, setUserDetails] = useState({});

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUserValid, setUserValid] = useState(false);

  //Call Api Only Once when components loads
  useEffect(() => {
    return () => {
      setError(false);
      setUserValid(true);
      setLoading(false);
      setUserDetails({});
    };
  }, []);

  // states handling functions

  function handleInputStateChanges({name, value}) {
    let newUserDetails = {};

    if (name == 'email') {
      newUserDetails.email = value;
    }
    setUserDetails(newUserDetails);
  }

  async function handleFormSubmit(userDetails) {
    console.log(userDetails);
    try {
      if (Object.keys(userDetails).length == 0) {
        showMessage({
          message: 'Error',
          description: 'Please fill registered email !',
          type: 'danger',
          icon: 'danger',
          floating: true,
        });
      } else {
        setLoading(true);
        const response = await api.forgotPassword(userDetails);
        console.log(response);
        if (response.ok !== true) {
          showMessage({
            message: 'Something went wrong !',
            description: 'Please try again latter',
            type: 'danger',
            icon: 'danger',
            floating: true,
          });
          setLoading(false);
        } else {
          showMessage({
            message: response.data?.message,
            type: response.data?.status,
            icon: response.data?.status,
            floating: true,
          });
          // Set User In Auth Context
          console.log(response);
          if (response.data != null) {
            if (response.data.status == 'success') {
              setUserValid(false);
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
          title="Recover Password"
          titleColor="white"
          backgroundColor={COLORS.primary}
          onPress={() => {
            handleFormSubmit(userDetails);
          }}
        />
      </View>
    );
  }

  function renderForgotPasswordHeading() {
    return (
      <View
        style={{
          paddingBottom: SIZES.padding * 2,
        }}>
        <Text style={styles.welcome}>Forgot Password</Text>
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
        {/* email */}
        <Input
          placeholder="example@email.com"
          label="Email"
          value={userDetails.email}
          onChangeText={value => {
            handleInputStateChanges({
              name: 'email',
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
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                  {/* Text Input */}
                  {renderInputFields()}

                  {/* buttons */}
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
    ...FONTS.h4,
    color: COLORS.primary,
    opacity: 0.85,
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
