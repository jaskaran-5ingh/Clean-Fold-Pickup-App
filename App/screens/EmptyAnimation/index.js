import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FONTS, responsiveWidth, animations, COLORS} from '../../constants';
import LottieView from 'lottie-react-native';
const index = ({message}) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={animations.empty}
        autoPlay
        loop
        style={{width: responsiveWidth(60)}}
      />
      <Text
        style={{
          ...FONTS.h3,
          lineHeight: 30,
          marginTop: 50,
          color: COLORS.darkgray,
          fontWeight: 'bold',
        }}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default index;
