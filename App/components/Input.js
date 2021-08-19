import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {COLORS, FONTS, responsiveWidth, icons} from '../constants';

const Input = ({
  isPassword = false,
  label = 'label',
  leftIcon = null,
  onBlur = Keyboard.dismiss,
  onRightIconPress = () => {},
  rightLoadingComponent = null,
  rightIcon = null,
  ...otherProps
}) => {
  // Component States
  const [showPassword, togglePassword] = useState(isPassword);
  const [icon, setIcon] = useState(icons.eye);
  const handlePasswordToggle = () => {
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
      <Text style={styles.labelText}>
        {label}
        <Text style={styles.required}> *</Text>
      </Text>

      <TextInput
        style={[styles.textInputStyle]}
        secureTextEntry={showPassword}
        placeholderTextColor={COLORS.gray}
        onBlur={onBlur}
        {...otherProps}
      />

      {leftIcon ? (
        <View style={styles.leftIconContainer}>
          <Icon
            type="font-awesome"
            name={leftIcon}
            size={20}
            color={COLORS.primary}
          />
        </View>
      ) : null}

      {rightIcon ? (
        <View style={styles.rightIconContainer}>
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
          onPress={handlePasswordToggle}
          style={styles.passwordImageContainer}>
          <Image
            source={icon}
            resizeMode="contain"
            tintColor={COLORS.primary}
            style={styles.passwordImage}
          />
        </TouchableOpacity>
      ) : null}

      {rightLoadingComponent ? (
        <View style={styles.rightIconContainer}>
          <ActivityIndicator color={COLORS.gray} size={20} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    borderRadius: 2,
    color: COLORS.darkTransparent,
    paddingLeft: 30,
    width: '100%',
  },
  passwordImage: {
    height: responsiveWidth(7),
    width: responsiveWidth(6),
  },
  passwordImageContainer: {
    position: 'absolute',
    top: responsiveWidth(6),
    right: 0,
  },
  rightIconContainer: {
    position: 'absolute',
    top: responsiveWidth(7.9),
    right: 0,
  },
  leftIconContainer: {position: 'absolute', top: responsiveWidth(7.9), left: 0},
  labelText: {
    ...FONTS.h4,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  required: {
    ...FONTS.h4,
    color: COLORS.red,
    fontWeight: 'bold',
  },
});

export default Input;
