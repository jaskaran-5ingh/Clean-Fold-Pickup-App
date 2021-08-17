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
  const [remarks, setRemarks] = useState('');

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
      setRemarks(response?.data?.orderDetails?.remarks);
      setDeliveryData(response?.data?.orderDetails);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function updateDeliveredOrder(jsonData) {
    try {
      setLoading(true);
      const response = await api.updateDeliveredOrder(jsonData);
      if (response.ok !== true) setError(false);
      console.log(response);
      setLoading(false);
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
          keyboardType="textarea"
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
