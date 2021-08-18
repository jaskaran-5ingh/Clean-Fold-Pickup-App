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
  onFocus = () => {},
  onKeyUp = () => {},
  maxLength,
  leftIcon,
  rightIcon,
  onRightIconPress = () => {},
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
          marginBottom: 3,
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
          height: keyboardType == 'textarea' ? 100 : responsiveWidth(11),
          width: '100%',
          borderBottomWidth: 2,
          borderBottomColor: COLORS.primary,
          color: 'black',
          paddingLeft: 30,
          borderRadius: 2,
        }}
        placeholderTextColor={COLORS.gray}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={showPassword}
        onBlur={onBlur}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        onFocus={onFocus}
      />
      {leftIcon ? (
        <View
          style={{position: 'absolute', top: responsiveWidth(7.9), left: 0}}>
          <Icon
            type="font-awesome"
            name={leftIcon}
            size={20}
            color={COLORS.primary}
          />
        </View>
      ) : null}

      {rightIcon ? (
        <View
          style={{position: 'absolute', top: responsiveWidth(7.9), right: 0}}>
          <TouchableOpacity onPress={onRightIconPress}>
            <Icon
              type="font-awesome"
              name={rightIcon}
              size={20}
              color={COLORS.primary}
            />
          </TouchableOpacity>
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
