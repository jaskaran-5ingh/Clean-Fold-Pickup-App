import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import Button from '../../components/Button';
import {
  COLORS,
  FONTS,
  images,
  responsiveHeight,
  responsiveWidth,
  SIZES,
} from '../../constants';

export default function index({navigation}) {
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
            navigation.navigate('SignIn');
          }}
        />
        {/* button for alerts */}
        <Button
          height={responsiveHeight(6)}
          width="100%"
          title="Sign Up"
          titleColor="white"
          backgroundColor={COLORS.secondary}
          onPress={() => {
            navigation.push('SignUp');
          }}
        />
      </View>
    );
  }

  function renderWelcomeText() {
    return (
      <>
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.loremIpsum}>Hi there! Nice to see you</Text>
      </>
    );
  }

  function renderLogo() {
    return (
      <View style={styles.center}>
        <Image
          source={images.logo}
          resizeMode="contain"
          style={{
            height: responsiveWidth(60),
            width: responsiveWidth(60),
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Welcome Text */}

      {renderWelcomeText()}

      {/* Logo */}
      {renderLogo()}

      {/* buttons */}
      {renderButtons()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding * 4,
    justifyContent: 'center',
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
});
