import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const index = () => {
  return (
    <View styles={styles.container}>
      <Text>Dashboard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default index;
