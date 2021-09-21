import React, { useContext, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { LinearProgress } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { ErrorScreen, LoadingScreen } from '..';
import api from '../../api/services';
import AuthContext from '../../auth/Context';
import {
  Button,
  DatePicker,
  InputComponent,
  PickupComponent
} from '../../components';
import { COLORS, FONTS, responsiveHeight, SIZES } from '../../constants';
import cache from '../../utils/cache';

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
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [category, setCategory] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [address, setAddress] = useState('');
  const [idLocation, setIdLocation] = useState('');
  const [pickupBoy, setPickupBoy] = useState('');

  //Call Api Only Once when components loads
  useEffect(() => {
    getOrderCategory();

    var date = new Date();
    setPickupDate(dateFormatter(date));
    setDeliveryDate(dateFormatter(date));

    cache.get('user').then(user => {
      if (user != null) {
        setPickupBoy(user.id);
      }
    });

    return () => {
      setError(false);
      setLoading(false);
    };
  }, []);

  const dateFormatter = currentDate => {
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
      return `${yyyy}-${mm}-${dd}`;
    } catch (error) {
      console.error(error);
    }
  };

  function addHoursToDate(date, hours) {
    return new Date(new Date(date).setHours(date.getHours() + hours));
  }

  // states handling functions

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

  async function handleFormSubmit() {
    setLoading(true);
    let saveOrderObject = {
      category: category,
      pickup_time: pickupDate,
      delv_time: deliveryDate,
      pickupboy: pickupBoy,
      address: address,
      mobile: mobile,
      remarks: remarks,
      user_id: userId,
      id_location: idLocation,
    };
    if (
      idLocation == '' ||
      userId == '' ||
      mobile == '' ||
      address == '' ||
      pickupBoy == '' ||
      deliveryDate == '' ||
      category == '' ||
      pickupDate == ''
    ) {
      showMessage({
        message: 'Required fields are missing!',
        description: 'Please fill details',
        backgroundColor: COLORS.red,
        type: 'danger',
        icon: 'danger',
      });
    } else {
      try {
        let response = await api.createOrder(saveOrderObject);
        if (response.ok !== true) {
          showMessage({
            message: 'Something went wrong !',
            description: 'Please try again latter',
            backgroundColor: COLORS.red,
            type: 'danger',
            icon: 'danger',
          });
        } else {
          showMessage({
            message:
              response.data?.status == true
                ? response.data?.message
                : 'Order Saved Failed !',
            type: response.data?.status == true ? 'success' : 'danger',
            icon: response.data?.status == true ? 'success' : 'danger',
            position: 'right',
          });
          navigation.push('Dashboard');
        }
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
  }

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
          setUserId(response?.data?.user_detail[0]?.id);
          setAddress(response?.data?.user_detail[0]?.address);
          setIdLocation(response?.data?.user_detail[0]?.id_location);
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

  //Component Renders
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
            handleFormSubmit();
          }}
        />
      </View>
    );
  }

  function renderInputFields() {
    return (
      <View behavior="position" style={{paddingBottom: SIZES.padding * 2}}>
        {/* Mobile */}
        <InputComponent
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
          required={true}
        />

        {/* Name */}
        <InputComponent
          placeholder=""
          label="Name "
          value={name}
          leftIcon="user"
          onChangeText={name => {
            setName(name);
          }}
          placeholder="Enter Name"
          rightLoadingComponent={loadingUserDetails}
          required={true}
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
            setCategory(item.id);
            var date = new Date();
            setPickupDate(dateFormatter(date));
            var hoursToAdd = parseInt(item?.hours) || 0;
            setDeliveryDate(dateFormatter(addHoursToDate(date, hoursToAdd)));
          }}
          required={true}
        />

        {/* Picker Date */}
        <DatePicker
          label="Select Pickup Date"
          leftIcon="calendar"
          selectedItem={pickupDate}
          placeholder="Select Date"
          onSelectDate={date => {
            setPickupDate(dateFormatter(date));
            var hoursToAdd = parseInt(selectedCategory?.hours) || 0;
            setDeliveryDate(dateFormatter(addHoursToDate(date, hoursToAdd)));
          }}
          required={true}
        />

        {/* Delivery Date */}

        <DatePicker
          label="Select Delivery Date"
          leftIcon="calendar"
          selectedItem={deliveryDate}
          placeholder="Select Date"
          onSelectDate={date => {
            setDeliveryDate(dateFormatter(date));
          }}
          required={true}
        />

        {/* Remarks */}
        <InputComponent
          placeholder=""
          label="Remarks"
          value={remarks}
          placeholder="Enter Remarks"
          leftIcon="edit"
          onChangeText={value => setRemarks(value)}
        />
      </View>
    );
  }

  return (
    <>
      {loadingUserDetails ? <LinearProgress color="dodgerblue" /> : null}

      <SafeAreaView style={styles.container}>
        {error ? (
          <ErrorScreen />
        ) : (
          <>
            {loading ? (
              <LoadingScreen />
            ) : (
              <>
                <ScrollView>
                  <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    {/* Text InputComponent */}
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
