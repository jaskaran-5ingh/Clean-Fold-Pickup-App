import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';

import {
  COLORS,
  FONTS,
  responsiveWidth,
  responsiveHeight,
  icons,
} from '../constants';

const PickerComponent = ({
  isModalVisible = false,
  label = 'label',
  leftIcon = null,
  onRightIconPress = () => {},
  rightLoadingComponent = false,
  rightIcon = null,
  data,
  placeholder,
  selectedItem,
  onSelectItem,
  disable = false,
  disableMessage,
}) => {
  // Component States
  const [showModal, toggleModal] = useState(isModalVisible);
  const [icon, setIcon] = useState(icons.eye);

  //Functions
  const handlePasswordToggle = () => {
    toggleModal(!showModal);
    if (showModal) {
      setIcon(icons.disable_eye);
    } else {
      setIcon(icons.eye);
    }
  };

  // Render component
  return (
    <View
      style={{
        marginVertical: 10,
      }}>
      <Text style={styles.labelText}>
        {label}
        <Text style={styles.required}> *</Text>
      </Text>

      <Pressable
        style={[styles.pickerStyle]}
        onPress={() => {
          if (disable == false) {
            toggleModal(true);
          } else {
            showMessage({
              message: 'Warning !',
              description: disableMessage,
              backgroundColor: COLORS.orange,
              type: 'warning',
              icon: 'warning',
            });
            toggleModal(false);
          }
        }}>
        <Text
          style={[
            styles.selectedItem,
            {
              color: selectedItem?.name ? COLORS.darkTransparent : COLORS.gray,
            },
          ]}>
          {selectedItem?.name ? selectedItem?.name : placeholder}
        </Text>
        <View style={styles.chevronDown}>
          <Icon
            type="font-awesome"
            name="angle-down"
            size={25}
            color={COLORS.darkgray}
          />
        </View>
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

      <Modal visible={showModal} animationType="slide">
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 50,
          }}>
          <TouchableOpacity
            onPress={() => toggleModal(false)}
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              paddingVertical: 10,
              paddingHorizontal: 20,
              width: '100%',
            }}>
            <Icon
              type="font-awesome"
              name="chevron-left"
              size={20}
              color={COLORS.white}
            />
            <Text style={{color: 'white', marginLeft: 10}}>Close</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  toggleModal(false);
                  onSelectItem(item);
                }}>
                <ListItem key={item.id} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </TouchableOpacity>
            );
          }}
        />
      </Modal>
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

export default PickerComponent;
