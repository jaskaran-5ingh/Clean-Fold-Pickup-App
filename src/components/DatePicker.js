import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {COLORS, FONTS, responsiveHeight, responsiveWidth} from '../constants';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const index = ({
  isModalVisible = false,
  label = 'label',
  leftIcon = null,
  onRightIconPress = () => {},
  rightLoadingComponent = false,
  rightIcon = null,
  placeholder,
  selectedItem,
  onSelectDate,
  disabled,
  required = false,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    if (disabled != true) {
      setDatePickerVisibility(true);
    }
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    onSelectDate(date);
    hideDatePicker();
  };

  return (
    <View
      style={{
        marginVertical: 10,
      }}>
      <Text style={styles.labelText}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>

      <Pressable style={[styles.pickerStyle]} onPress={() => showDatePicker()}>
        <Text
          style={[
            styles.selectedItem,
            {
              color: selectedItem ? COLORS.darkTransparent : COLORS.gray,
            },
          ]}>
          {selectedItem ? selectedItem : placeholder}
        </Text>
      </Pressable>

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

      {isModalVisible ? (
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

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pickerStyle: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    borderRadius: 2,
    color: COLORS.darkTransparent,
    paddingLeft: 30,
    width: '100%',
    height: responsiveHeight(6.5),
  },
  passwordImage: {
    height: responsiveHeight(7),
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
  chevronDown: {
    position: 'absolute',
    top: 10,
    right: 5,
  },
  selectedItem: {
    position: 'absolute',
    top: 10,
    left: 30,
    color: COLORS.darkTransparent,
  },
});
export default index;
