import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Input} from 'react-native-elements/dist/input/Input';
import GlobalStyle from '../Styles/GlobalCSS';

const InputComponent = ({
  inputType,
  onChangeText,
  defaultValue,
  placeholder = 'Enter',
  iconType,
  errorMessage = '',
}) => {
  return (
    <View>
      <Input
        style={{
          color: 'black',
        }}
        onChange={(onChangeText = () => {})}
        secureTextEntry={inputType == 'password' ? true : false}
        placeholder={placeholder}
        defaultValue={defaultValue == null ? '' : defaultValue}
        placeholderTextColor="gray"
        errorStyle={{color: 'red'}}
        errorMessage={errorMessage}
        leftIcon={
          <Icon
            name={iconType}
            type="font-awesome"
            size={24}
            color={GlobalStyle.colors.primaryColor}
            onChangeText={() => {}}
          />
        }
      />
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

export default InputComponent;
