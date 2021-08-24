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
import {BottomSheet} from 'react-native-elements';

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
import {ErrorScreen, LoadingScreen, TermsAndConditions} from '..';

export default function index({navigation}) {
  //Deceleration Of Context
  const authContext = useContext(AuthContext);

  //Component State Declarations
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [isModelVisible, setModelVisible] = useState(false);

  //Call Api Only Once when components loads
  useEffect(() => {
    return () => {
      setError(false);
      setLoading(false);
      setUserDetails({});
    };
  }, []);

  function validateMobileNumber(mobileNumber) {
    var phoneNumberValidation =
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (mobileNumber.match(phoneNumberValidation)) {
      return true;
    }
    return false;
  }
  // states handling functions

  function handleInputStateChanges({name, value}) {
    let newUserDetails = {};

    if (name == 'email') {
      newUserDetails.email = value;
      newUserDetails.mobile = userDetails.mobile;
      newUserDetails.username = userDetails.username;
      newUserDetails.password = userDetails.password;
    } else if (name == 'username') {
      newUserDetails.username = value;
      newUserDetails.email = userDetails.email;
      newUserDetails.mobile = userDetails.mobile;
      newUserDetails.password = userDetails.password;
    } else if (name == 'mobile') {
      newUserDetails.mobile = value;
      newUserDetails.username = userDetails.username;
      newUserDetails.email = userDetails.email;
      newUserDetails.password = userDetails.password;
    } else {
      newUserDetails.password = value;
      newUserDetails.email = userDetails.email;
      newUserDetails.mobile = userDetails.mobile;
      newUserDetails.username = userDetails.username;
    }
    setUserDetails(newUserDetails);
  }

  async function handleFormSubmit(userDetails) {
    try {
      if (!termsAndConditions) {
        showMessage({
          message: 'Error',
          description: 'Please check terms and conditions before submitting!',
          type: 'danger',
          icon: 'danger',
          floating: true,
        });
        return false;
      }
      if (validateMobileNumber(userDetails.mobile) == false) {
        showMessage({
          message: 'Error',
          description: 'Mobile number not valid!',
          type: 'danger',
          icon: 'danger',
          floating: true,
        });
        return false;
      }

      if (Object.keys(userDetails).length == 0) {
        showMessage({
          message: 'Error',
          description: 'Please fill details !',
          type: 'danger',
          icon: 'danger',
          floating: true,
        });
        setLoading(false);
      } else {
        setLoading(true);
        const response = await api.signUp(userDetails);
        if (response.ok !== true) {
          showMessage({
            message: 'Something went wrong !',
            description: 'Please try again latter',
            type: 'danger',
            icon: 'danger',
            floating: true,
          });
        } else {
          showMessage({
            message: response.data?.message,
            type: response.data?.status,
            icon: response.data?.status,
            floating: true,
          });

          if (response.data?.status == 'success') {
            navigation.push('SignIn');
          }
        }
        setLoading(false);
      }
    } catch (error) {
      //Check logs for error
      console.error(error);
    }
  }

  //Component Renders
  function renderButtons() {
    return (
      <View style={styles.center}>
        {/* button for signIn  */}
        <Button
          height={responsiveHeight(6)}
          width="100%"
          title="Sign Up"
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
          paddingBottom: SIZES.padding * 1.5,
        }}>
        <Text style={styles.welcome}>Sign Up</Text>
        <Text style={styles.loremIpsum}>Hi there! Nice to see you</Text>
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
            height: responsiveWidth(40),
            width: responsiveWidth(40),
          }}
        />
      </View>
    );
  }

  function renderInputFields() {
    return (
      <View behavior="position" style={{paddingBottom: SIZES.padding * 1.5}}>
        {/* userId */}
        <Input
          placeholder="Nick Name"
          label="Nick Name"
          value={userDetails?.username}
          onChangeText={value => {
            handleInputStateChanges({
              name: 'username',
              value: value,
            });
          }}
        />

        {/* Email  */}
        <Input
          placeholder="example@gmail.com"
          label="Email"
          value={userDetails?.email}
          keyboardType="email-address"
          onChangeText={value => {
            handleInputStateChanges({
              name: 'email',
              value: value,
            });
          }}
        />

        {/* Mobile */}
        <Input
          placeholder="Mobile Number"
          label="Mobile Number"
          keyboardType="phone-pad"
          value={userDetails?.mobile}
          maxLength={10}
          onChangeText={value => {
            handleInputStateChanges({
              name: 'mobile',
              value: value,
            });
          }}
        />

        {/* Password */}
        <Input
          placeholder="password"
          label="Password"
          isPassword={true}
          value={userDetails?.password}
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
  function renderBottomSheet() {
    return (
      <BottomSheet
        isVisible={isModelVisible}
        containerStyle={{
          backgroundColor: COLORS.darkTransparent,
        }}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => setModelVisible(false)}
            style={{
              backgroundColor: COLORS.primary,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, color: COLORS.white, marginLeft: 20}}>
              Terms And Conditions
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              padding: SIZES.padding * 3,
            }}>
            {/* <Text
              style={[
                FONTS.h3,
                {color: COLORS.primary, marginVertical: SIZES.padding},
              ]}>
              Disclosure
            </Text> */}
            <ScrollView>
              <Text style={styles.paragraph}>
                We do not receive any consideration by way of remuneration or
                compensation or in any other form whatsoever, by us or any of
                our associates or subsidiaries for any distribution or execution
                services in respect of the products or securities for which the
                investment advice is provided to the client.
              </Text>
              <Text style={styles.paragraph}>
                We do not recommend a STOCK BROKER. If any stock broker is
                recommended by any of our representative, we do not receive any
                consideration by way of remuneration or compensation or in any
                other form whatsoever from stock broker or any other
                intermediary so recommended to client. To ensure compliance with
                the Investment Advisor regulations 2013, we have resolved that
                the company and all its representatives will not make any trades
                in the market.
              </Text>
              <Text style={styles.paragraph}>
                We are not associated in any manner with any issuer of products/
                securities; this ensures that there are no actual or potential
                conflicts of interest. This also ensures that objectivity or
                independence in the carrying on of investment advisory services
                is not compromised.
              </Text>
              <Text style={styles.paragraph}>
                Investment is stock or COMMODITY MARKETS is subject to market
                risk, though best attempts are made for predicting markets, but
                no surety of return or accuracy of any kind is guaranteed, while
                the performance sheet of various products is available but
                should not be considered as a guarantee for future performance
                of the products/services. Clients are advised to consider all
                the advice as just a opinion and make investment decision on
                their own. In case of clients seeking advice on any specific
                positions already made by the client, we will be able to suggest
                best possible action considering our view on the security or
                product. Such suggestion under any circumstances shall be
                considered as an opinion (not advice) from our company and we
                advice client to consider our opinion and not consultancy to
                make his/her final decision. We are not liable for any losses
                whatsoever client may incur in accepting this opinion.
              </Text>
              <Text style={styles.paragraph}>
                Client is also advised to trade only if tips suit his current
                risk appetite and risk bearing capacity, all such tips shall be
                considered as a view or opinion and client shall on his/her
                discretion decide actual trades. We are not associated with any
                intermediaries and do not recommend services of any specific
                intermediaries.
              </Text>
              <Text style={styles.paragraph}>
                No litigations have been filed against the company since the
                incorporation of the company.
              </Text>
              <Text style={styles.paragraph}>
                All the tips which are suggested by our company are communicated
                in written, no verbal communication from any of the executives
                or otherwise under any circumstances shall be considered as
                advice by our company.
              </Text>
            </ScrollView>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                setTermsAndConditions(true);
                setModelVisible(false);
              }}
              style={{
                backgroundColor: COLORS.darkGreen,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 20,
                flex: 1,
              }}>
              <Text style={{fontSize: 15, color: COLORS.white}}>Accept</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setTermsAndConditions(false);
                setModelVisible(false);
              }}
              style={{
                backgroundColor: COLORS.secondary,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 20,
                flex: 1,
              }}>
              <Text style={{fontSize: 15, color: COLORS.white}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Bottom Sheet   */}

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
                  {/* Textg Input */}
                  {renderInputFields()}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingVertical: 10,
                    }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                      onPress={() => setModelVisible(true)}>
                      <Text style={{marginLeft: 20}}>Terms and conditions</Text>
                    </TouchableOpacity>
                  </View>
                  {/* buttons */}
                  {renderButtons()}
                </KeyboardAvoidingView>
              </ScrollView>
              {/* Render Bottom Sheet */}
              {renderBottomSheet()}
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
  paragraph: {
    color: COLORS.darkTransparent,
    textAlign: 'justify',
    fontSize: 13,
    ...FONTS.body4,
    paddingTop: SIZES.padding,
  },
});
