import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {COLORS, FONTS, responsiveWidth, icons} from '../constants';

const Input = ({
  placeholder = 'placeholder',
  label = 'label',
  keyboardType = 'default',
  isPassword = false,
  onBlur = Keyboard.dismiss,
  value = null,
  onChangeText = () => {},
  maxLength,
  leftIcon,
}) => {
  const [showPassword, togglePassword] = useState(isPassword);
  const [icon, setIcon] = useState(icons.eye);
  const handlePasswordTogle = () => {
    togglePassword(!showPassword);
    if (showPassword) {
      setIcon(icons.disable_eye);
    } else {
      setIcon(icons.eye);
    }
  };
  return (
    <View
      style={{
        marginVertical: 10,
      }}>
      <Text
        style={{
          ...FONTS.h4,
          color: COLORS.primary,
          fontWeight: 'bold',
        }}>
        {label}
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.red,
            fontWeight: 'bold',
          }}>
          {' '}
          *
        </Text>
      </Text>

      <TextInput
        style={{
          height: responsiveWidth(11),
          width: '100%',
          borderBottomWidth: 2,
          borderBottomColor: COLORS.primary,
          color: 'black',
          paddingLeft: 25,
          height: keyboardType == 'textarea' ? 100 : 'auto',
        }}
        placeholderTextColor={COLORS.gray}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={showPassword}
        onBlur={onBlur}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
      />
      {leftIcon ? (
        <View style={{position: 'absolute', top: responsiveWidth(6), left: 0}}>
          <Icon
            type="font-awesome"
            name={leftIcon}
            size={20}
            color={COLORS.primary}
          />
        </View>
      ) : null}
      {isPassword ? (
        <TouchableOpacity
          onPress={handlePasswordTogle}
          style={{position: 'absolute', top: responsiveWidth(6), right: 0}}>
          <Image
            source={icon}
            resizeMode="contain"
            tintColor={COLORS.primary}
            style={{
              height: responsiveWidth(7),
              width: responsiveWidth(6),
            }}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Input;
