import React from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import GlobalCSS from '../Styles/GlobalCSS';
import GlobalStyle from '../Styles/GlobalCSS';

const ButtonComponent = ({
  buttonText = 'button; title',
  press = () => {},
  loading = false,
}) => {
  console.log(loading);
  return (
    <Pressable style={GlobalStyle.buttonPrimary} onPress={press}>
      {loading ? (
        <Text
          style={{
            padding: 11,
            textAlign: 'center',
            fontSize: 20,
            color: 'white',
          }}>
          <ActivityIndicator color="white" size={20} />
        </Text>
      ) : (
        <Text
          style={{
            padding: 8,
            textAlign: 'center',
            fontSize: 20,
            color: 'white',
          }}>
          {buttonText}
        </Text>
      )}
    </Pressable>
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

export default ButtonComponent;
