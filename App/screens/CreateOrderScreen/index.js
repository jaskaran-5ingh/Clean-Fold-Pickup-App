import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {showMessage} from 'react-native-flash-message';
import PickerModal from 'react-native-picker-modal-view';

import AuthContext from '../../auth/Context';
import api from '../../api/services';
import cache from '../../utils/cache';

import {
  COLORS,
  FONTS,
  images,
  responsiveHeight,
  responsiveWidth,
  SIZES,
} from '../../constants';
import {Button, Input} from '../../components';
import {ErrorScreen, LoadingScreen} from '..';

export default function index({navigation}) {
  //Deceleration Of Context
  const authContext = useContext(AuthContext);
  //Component State Declarations
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [orderCategories, setOrderCategories] = useState([]);
  //Form States
  const [pickupDate, setPickupDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate == undefined ? date : selectedDate;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    try {
      let dd = currentDate.getDate();
      let mm = currentDate.getMonth() + 1;
      const yyyy = currentDate.getFullYear();

      if (dd < 10) {
        dd = `0${dd}`;
      }

      if (mm < 10) {
        mm = `0${mm}`;
      }
      dateFormat = `${yyyy}-${mm}-${dd}`;

      setPickupDate(dateFormat);
    } catch (error) {
      console.error(error);
    }
  };

  //Call Api Only Once when components loads
  useEffect(() => {
    getOrderCategory();
    return () => {
      setError(false);
      setUserValid(true);
      setLoading(false);
      setUserDetails({
        email: 'testdummy@gmail.com',
        password: 'secret',
      });
    };
  }, []);

  // states handling functions

  function handleInputStateChanges({name, value}) {
    let newUserDetails = {};

    if (name == 'email') {
      newUserDetails.email = value;
      newUserDetails.password = userDetails.password;
    } else {
      newUserDetails.email = userDetails.email;
      newUserDetails.password = value;
    }
    setUserDetails(newUserDetails);
  }

  async function getOrderCategory() {
    try {
      setLoading(true);
      const response = await api.getOrderCategory();
      if (response.ok !== true) {
        showMessage({
          message: 'Something went wrong !',
          description: 'Please try again latter',
          backgroundColor: COLORS.red,
          type: 'danger',
          icon: 'danger',
        });
      } else {
        setOrderCategories(response?.data?.categories);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleFormSubmit(userDetails) {}

  async function getUserByMobile(mobile) {
    try {
      setLoading(true);
      const response = await api.getUserByMobile(mobile);
      if (response.ok !== true) {
        showMessage({
          message: 'Something went wrong !',
          description: 'Please try again latter',
          backgroundColor: COLORS.red,
          type: 'danger',
          icon: 'danger',
        });
      } else {
        if (response?.data?.user_detail.length > 0) {
          setName(response?.data?.user_detail[0]?.name);
          setId(response?.data?.user_detail[0]?.id);
        } else {
          showMessage({
            message: 'Failed !',
            description: 'User not available !',
            backgroundColor: COLORS.red,
            type: 'danger',
            icon: 'danger',
          });
        }
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  //Componenet Renders
  function renderButtons() {
    return (
      <View style={styles.center}>
        {/* button for signIn  */}
        <Button
          height={responsiveHeight(6)}
          width="100%"
          title="Create Order"
          titleColor="white"
          backgroundColor={COLORS.primary}
          onPress={() => {
            handleFormSubmit(userDetails);
          }}
        />
      </View>
    );
  }

  function renderInputFields() {
    return (
      <View behavior="position" style={{paddingBottom: SIZES.padding * 2}}>
        {/* Mobile */}
        <Input
          placeholder=""
          label="Mobile"
          value={mobile}
          leftIcon="phone"
          keyboardType="phone-pad"
          onChangeText={mobile => {
            setMobile(mobile);
            if (mobile.length > 9) {
              getUserByMobile(mobile);
            }
          }}
          maxLength={10}
        />

        {/* Name */}
        <Input
          placeholder=""
          label="Name "
          value={name}
          leftIcon="user"
          onChangeText={name => {
            setName(name);
          }}
        />

        {/* Category */}
        <PickerModal
          renderSelectView={(disabled, selected, showModal) => (
            <Input
              placeholder=""
              label="Category"
              value=""
              leftIcon="bars"
              onFocus={showModal}
            />
          )}
          onSelected={selected => console.log(selected)}
          onRequestClosed={() => console.warn('closed...')}
          onBackRequest={() => console.warn('back key pressed')}
          items={[
            {Id: 1, Name: 'Test1 Name', Value: 'Test1 Value'},
            {Id: 2, Name: 'Test2 Name', Value: 'Test2 Value'},
            {Id: 3, Name: 'Test3 Name', Value: 'Test3 Value'},
            {Id: 4, Name: 'Test4 Name', Value: 'Test4 Value'},
          ]}
          showToTopButton={true}
          autoCorrect={false}
          autoGenerateAlphabet={true}
          chooseText={'Choose one'}
          searchText={'Search...'}
          forceSelect={false}
          autoSort={true}
        />

        {/* Date Picker */}
        <Input
          placeholder=""
          label="Pickup Date"
          value={pickupDate}
          leftIcon="calendar"
          onFocus={() => setShow(true)}
        />

        {/* Delivery Date */}
        <Input
          placeholder=""
          label="Delivery Date"
          value={deliveryDate}
          leftIcon="calendar"
        />

        {/* Remarks */}
        <Input
          placeholder=""
          label="Remarks"
          value=""
          leftIcon="edit"
          onChangeText={value => console.log(value)}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {show && (
        <DateTimePicker
          mode="date"
          value={date}
          display="default"
          testID="dateTimePicker"
          onChange={onChangeDate}
        />
      )}
      {error == true ? (
        <ErrorScreen />
      ) : (
        <>
          {loading == true ? (
            <LoadingScreen />
          ) : (
            <>
              <ScrollView>
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                  {/* Text Input */}
                  {renderInputFields()}
                  {renderButtons()}
                </KeyboardAvoidingView>
              </ScrollView>
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding * 3,
    paddingTop: SIZES.padding * 2,
  },
  welcome: {
    ...FONTS.h1,
    color: COLORS.primary,
    opacity: 0.85,
    marginVertical: 15,
  },
  loremIpsum: {
    ...FONTS.h5,
    color: COLORS.darkgray,
    opacity: 0.8,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
