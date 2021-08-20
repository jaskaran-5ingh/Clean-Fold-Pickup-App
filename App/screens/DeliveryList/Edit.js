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
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {showMessage} from 'react-native-flash-message';
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

export default function index({route, navigation}) {
  const [deliveryData, setDeliveryData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //States For api
  const [address, setAddress] = useState('');
  const [order_categories, setCategory] = useState('');
  const [delv_time, setDelv_time] = useState('');
  const [id, setid] = useState('');
  const [id_location, setId_location] = useState('');
  const [mobile, setMobile] = useState('');
  const [pickup_time, setPickup_time] = useState('');
  const [pickupboy, setPickupboy] = useState('');
  const [remarks, setRemarks] = useState('');
  const [user_id, setUser_id] = useState('');

  useEffect(() => {
    try {
      getOrderDetails();
    } catch (err) {
      console.error(err);
    }
  }, []);

  async function getOrderDetails() {
    try {
      setLoading(true);
      const response = await api.getOrderDetailsById(route.params.orderId);
      if (response.ok !== true) setError(false);
      console.log(response?.data?.orderDetails);

      setRemarks(response?.data?.orderDetails?.remarks);
      setDeliveryData(response?.data?.orderDetails);
      setAddress(response?.data?.orderDetails?.address);
      setCategory(response?.data?.orderDetails?.order_categories);
      setDelv_time(response?.data?.orderDetails?.delv_time);
      setid(response?.data?.orderDetails?.id);
      setId_location(response?.data?.orderDetails?.id_location);
      setMobile(response?.data?.orderDetails?.mobile);
      setPickup_time(response?.data?.orderDetails?.pickup_time);
      setPickupboy(response?.data?.orderDetails?.pickup_emp);
      setUser_id(response?.data?.orderDetails?.user_id);

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function updateDeliveredOrder(jsonData) {
    try {
      setLoading(true);
      const data = {
        address: address,
        category: order_categories,
        delv_time: delv_time,
        id: id,
        id_location: id_location,
        mobile: mobile,
        pickup_time: pickup_time,
        pickupboy: pickupboy,
        remarks: remarks,
        user_id: user_id,
      };

      const response = await api.updateDeliveredOrder(data);
      if (response.ok !== true) setError(false);
      showMessage({
        message:
          response.data?.status == true
            ? response.data?.message
            : 'Order Update Failed !',
        type: response.data?.status == true ? 'success' : 'danger',
        icon: response.data?.status == true ? 'success' : 'danger',
        position: 'right',
      });
      setLoading(false);
      navigation.push('DeliveryList');
    } catch (err) {
      console.error(err);
    }
  }

  function handleFormSubmit() {
    const newObject = {...deliveryData, remarks: remarks};
    updateDeliveredOrder(newObject);
  }

  //Component Renders
  function renderButtons() {
    return (
      <View style={styles.center}>
        {/* button for signIn  */}
        <Button
          height={responsiveHeight(6)}
          width="100%"
          title="Update"
          titleColor="white"
          backgroundColor={COLORS.primary}
          onPress={() => handleFormSubmit()}
        />
      </View>
    );
  }

  function renderInputFields() {
    return (
      <View behavior="position" style={{paddingBottom: SIZES.padding * 2}}>
        {/* mobile */}
        <Input
          placeholder=""
          label="Remarks"
          value={remarks}
          leftIcon="edit"
          onChangeText={value => setRemarks(value)}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
