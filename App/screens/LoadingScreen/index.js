import React from 'react';
import {View, StyleSheet} from 'react-native';
import {responsiveWidth, animations} from '../../constants';
import LottieView from 'lottie-react-native';
const index = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={animations.loading}
        autoPlay
        loop
        style={{width: responsiveWidth(100)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default index;
