import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ErrorScreen, LoadingScreen} from '..';
import api from '../../api/services';
import {Button, InputComponent} from '../../components';
import {COLORS, FONTS, responsiveHeight, SIZES} from '../../constants';

export default function index({route, navigation}) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [orderCategories, setOrderCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [pickupDate, setPickupDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [isCategoryDisabled, setCategoryDisabled] = useState(false);

  //States For api

  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [id, setid] = useState('');
  const [id_location, setId_location] = useState('');
  const [mobile, setMobile] = useState('');
  const [pickupBoy, setPickUpBoy] = useState('');
  const [remarks, setRemarks] = useState('');
  const [user_id, setUser_id] = useState('');

  useEffect(() => {
    let unAmounted = false;
    try {
      if (!unAmounted) {
        getOrderDetails();
      }
    } catch (err) {
      console.error(err);
    }
    return () => {
      unAmounted = true;
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

  async function getOrderCategory(functionVarCategory) {
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
        const selectedNewCategory = response?.data?.categories.filter(
          item => item.id == functionVarCategory,
        );
        setSelectedCategory(selectedNewCategory[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getOrderDetails() {
    try {
      setLoading(true);
      const response = await api.getOrderDetailsById(route.params.orderId);
      if (response.ok !== true) setError(false);

      setRemarks(response?.data?.orderDetails?.remarks || '');
      setAddress(response?.data?.orderDetails?.address || '');
      setCategory(response?.data?.orderDetails?.order_categories || '');
      setDeliveryDate(response?.data?.orderDetails?.delv_time || '');
      setid(response?.data?.orderDetails?.id || '');
      setId_location(response?.data?.orderDetails?.id_location || '');
      setMobile(response?.data?.orderDetails?.mobile || '');
      setPickupDate(response?.data?.orderDetails?.pickup_time || '');
      setPickUpBoy(response?.data?.orderDetails?.pickup_emp || '');
      setUser_id(response?.data?.orderDetails?.user_id) || '';

      if (response?.data?.orderDetails?.order_item_count > 0) {
        setCategoryDisabled(true);
      }

      //CalL Api function to get categories
      getOrderCategory(response?.data?.orderDetails?.order_categories);

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function updateDeliveredOrder() {
    try {
      setLoading(true);
      const data = {
        address: address,
        category: category,
        delv_time: deliveryDate,
        id: id,
        id_location: id_location,
        mobile: mobile,
        pickup_time: pickupDate,
        pickupboy: pickupBoy,
        remarks: remarks,
        user_id: user_id,
      };
      const response = await api.updateDeliveredOrder(data);
      if (response.ok !== true) setError(false);
      showMessage({
        message: response.data?.status == true ? 'Success !' : 'Failed !',
        description:
          response.data?.status == true
            ? response.data?.message
            : 'Order Update Failed !',
        type: response.data?.status == true ? 'success' : 'danger',
        icon: response.data?.status == true ? 'success' : 'danger',
        position: 'right',
      });
      setLoading(false);
      navigation.replace('Pickup');
    } catch (err) {
      console.error(err);
    }
  }

  function handleFormSubmit() {
    updateDeliveredOrder();
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

        {/* Category */}
        {/*<PickupComponent*/}
        {/*    label="Categories"*/}
        {/*    leftIcon="bars"*/}
        {/*    data={orderCategories}*/}
        {/*    selectedItem={selectedCategory}*/}
        {/*    placeholder="Select Category"*/}
        {/*    onSelectItem={item => {*/}
        {/*        setSelectedCategory(item);*/}
        {/*        setCategory(item.id);*/}
        {/*        var date = new Date();*/}
        {/*        setPickupDate(dateFormatter(date));*/}
        {/*        var hoursToAdd = parseInt(item?.hours) || 0;*/}
        {/*        setDeliveryDate(dateFormatter(addHoursToDate(date, hoursToAdd)));*/}
        {/*    }}*/}
        {/*    disable={true}*/}
        {/*    disableMessage="Order already generated, Category Can not be changed!"*/}
        {/*/>*/}

        {/* Picker Date */}
        {/*<DatePicker*/}
        {/*    label="Select Pickup Date"*/}
        {/*    leftIcon="calendar"*/}
        {/*    selectedItem={pickupDate}*/}
        {/*    placeholder="Select Date"*/}
        {/*    onSelectDate={date => {*/}
        {/*        setPickupDate(dateFormatter(date));*/}
        {/*        var hoursToAdd = parseInt(selectedCategory?.hours) || 0;*/}
        {/*        setDeliveryDate(dateFormatter(addHoursToDate(date, hoursToAdd)));*/}
        {/*    }}*/}
        {/*    disable={true}*/}
        {/*/>*/}

        {/* Delivery Date */}
        {/*<DatePicker*/}
        {/*    label="Select Delivery Date"*/}
        {/*    leftIcon="calendar"*/}
        {/*    selectedItem={deliveryDate}*/}
        {/*    placeholder="Select Date"*/}
        {/*    onSelectDate={date => {*/}
        {/*        setDeliveryDate(dateFormatter(date));*/}
        {/*    }}*/}
        {/*    disable={true}*/}
        {/*/>*/}

        {/* Remarks */}
        <InputComponent
          placeholder=""
          label="Remarks"
          value={remarks}
          leftIcon="edit"
          onChangeText={value => setRemarks(value)}
          multiline={true}
          inputStyle={{lineHeight: 30, fontSize: 17}}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {error === true ? (
        <ErrorScreen />
      ) : (
        <>
          {loading === true ? (
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
