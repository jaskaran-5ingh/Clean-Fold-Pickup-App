import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {showMessage} from 'react-native-flash-message';
import {LinearProgress} from 'react-native-elements';

import AuthContext from '../../auth/Context';
import api from '../../api/services';
import cache from '../../utils/cache';

import {
  COLORS,
  FONTS,
  responsiveHeight,
  responsiveWidth,
  SIZES,
} from '../../constants';
import {Button, DatePicker, Input, PickupComponent} from '../../components';
import {ErrorScreen, LoadingScreen} from '..';

export default function index({navigation}) {
  //Deceleration Of Context
  const authContext = useContext(AuthContext);
  //Component State Declarations
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUserDetails, setUserDetails] = useState(false);

  const [orderCategories, setOrderCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
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
  };

  //Call Api Only Once when components loads
  useEffect(() => {
    getOrderCategory();
    return () => {
      setError(false);
      setLoading(false);
    };
  }, []);

  // states handling functions

  function handleInputStateChanges({name, value}) {}

  async function getOrderCategory() {
    try {
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
    } catch (error) {
      console.error(error);
    }
  }

  async function handleFormSubmit(userDetails) {}

  async function getUserByMobile(mobile) {
    try {
      setUserDetails(true);
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
      setUserDetails(false);
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
          placeholder="Enter Mobile"
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
          placeholder="Enter Name"
          rightLoadingComponent={loadingUserDetails}
        />

        {/* Category */}
        <PickupComponent
          label="Categories"
          leftIcon="bars"
          data={orderCategories}
          selectedItem={selectedCategory}
          placeholder="Select Category"
          onSelectItem={item => {
            setSelectedCategory(item);
          }}
        />

        {/* Date Picker */}
        <DatePicker
          label="Select Pickup Date"
          leftIcon="calendar"
          selectedItem={pickupDate}
          placeholder="Select Date"
          onSelectDate={item => {
            setPickupDate(item);
          }}
        />

        {/* Delivery Date */}

        <DatePicker
          label="Select Delivery Date"
          leftIcon="calendar"
          selectedItem={deliveryDate}
          placeholder="Select Date"
          onSelectDate={item => {
            setDeliveryDate(item);
          }}
        />

        {/* Remarks */}
        <Input
          placeholder=""
          label="Remarks"
          value=""
          placeholder="Enter Remarks"
          leftIcon="edit"
          onChangeText={value => console.log(value)}
        />
      </View>
    );
  }

  return (
    <>
      {loadingUserDetails ? <LinearProgress color="dodgerblue" /> : null}

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
    </>
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
