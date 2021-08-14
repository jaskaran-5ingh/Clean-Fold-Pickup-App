import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const ButtonLoaderContainer = ({buttonText}) => {
  return (
    <View
      style={{
        backgroundColor: '#267ab5',
        paddingVertical: 14,
        borderRadius: 10,
      }}>
      <ActivityIndicator color="white" size={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  tinyLogo: {
    width: 100,
    height: 150,
  },
});

export default ButtonLoaderContainer;
