import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { showMessage } from 'react-native-flash-message';
import OneSignal from 'react-native-onesignal';
import api from '../../api/services';
import AuthContext from '../../auth/Context';
import { COLORS, FONTS, images, responsiveWidth, SIZES } from '../../constants';
import cache from '../../utils/cache';
import Card from './card';

const index = ({ navigation }) => {

  const isFocused = useIsFocused();

  //Use State Hooks
  const defaultDashboardData = {
    status: true,
    pending: 0,
    delivered: 0,
  };

  const [dashboardData, setDashboardData] = useState(defaultDashboardData);

  const [loading, setLoading] = useState(false);

  //Use Effect Hooks
  const authContext = useContext(AuthContext);

  useEffect(() => {
    let unAmounted = false;
    if (!unAmounted) {
      try {
        getDashboardData();
        getEmployeeDetails();
        setTimeout(() => setDeviceNotificationToken(), 2500)
        cache.store('productList', null);
      } catch (err) {
        console.error(err);
      }
    }
    return () => {
      unAmounted = true;
    };
  }, [ authContext?.user?.id]);

  useEffect(() => {
    let unAmounted = false;
    if (!unAmounted) {
      try {
        getDashboardData();
        cache.store('productList', null);
      } catch (err) {
        console.error(err);
      }
    }
    return () => {
      unAmounted = true;
    };
  }, [isFocused]);

  async function setDeviceNotificationToken() {
    try {
      if (authContext?.user?.id != undefined) {
        let deviceState = await OneSignal.getDeviceState();
        const response = await api.setDeviceNotificationToken({
          id: (authContext.user.id),
          notification_token: (deviceState.userId)
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function getEmployeeDetails() {
    try {
      if (authContext?.user?.id != undefined) {
        const response = await api.getEmployeeDetails(authContext.user.id);
        if (response.ok != true) {
          showMessage({
            message: response?.problem + ' !',
            description: 'Please try again latter',
            backgroundColor: COLORS.red,
            type: 'danger',
            icon: 'danger',
          });
        } else {
          if (JSON.stringify(authContext.user.password) != JSON.stringify(response.data.user)) {
            Alert.alert(
              'Warning!',
              'Employee Details Updated ! \n Please login again',
              [
                { text: 'OK', onPress: () => {
                  authContext.setUser(null);
                  cache.store('user', null);
                } },
              ],
            );
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function getDashboardData() {
    setLoading(true);
    try {
      if (authContext?.user?.id != undefined) {
        const response = await api.getDashboardData(authContext?.user?.id);
        if (response.status == 200) {
            setDashboardData(response?.data);
            setLoading(false);
        } else {
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>

    <ScrollView style={{ backgroundColor: 'white' }}>
      <ImageBackground
        source={images.backgroundImage}
        style={{ width: '100%', height: '100%' }}>
        <View style={{ paddingHorizontal: SIZES.padding * 4 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.heading1}>Hi, {authContext?.user?.name}</Text>
              <Text style={styles.heading2}>Welcome Back</Text>
            </View>
            <Image
              source={images.deliveryBoy}
              resizeMode="contain"
              style={{
                marginTop: 30,
                height: responsiveWidth(35),
                width: responsiveWidth(30),
              }}
            />
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.innerMainContainer}>
            <Text
              style={{ color: COLORS.primary, fontSize: 20, fontWeight: 'bold' }}>
              Dashboard
            </Text>
            <Text
              style={{ color: COLORS.primary, fontSize: 20, fontWeight: 'bold' }}>
              <TouchableOpacity onPress={() => getDashboardData()}>
                <Icon
                  type="font-awesome"
                  name="refresh"
                  color={COLORS.primary}
                  size={25}
                />
              </TouchableOpacity>
            </Text>
          </View>

          <View style={styles.cardContainer}>
            <Card
              backgroundColor={COLORS.lightRed}
              icon="truck"
              color={COLORS.red}
              title="PICKUPS"
              qty={dashboardData?.pending}
              onPress={() => (authContext?.user?.id != undefined) ? navigation.navigate('Pickup') : null}
              loading={loading}
              fullWidth={authContext?.user?.role_id == 6}
            />
            {authContext?.user?.role_id != 6 ? (
              <>
                <Card
                  backgroundColor={COLORS.lightGreen}
                  icon="check"
                  color={COLORS.darkGreen}
                  title="DELIVERY"
                  qty={dashboardData?.delivered}
                  onPress={() => (authContext?.user?.id != undefined) ? navigation.navigate('DeliveryList') : null}
                  loading={loading}
                />
                <Card
                  backgroundColor={COLORS.lightSkyblue}
                  icon="rupee"
                  color={COLORS.primary}
                  title="RATE LIST"
                  onPress={() => navigation.navigate('CategoriesList')}
                  qtyAvailable={false}
                />
                <Card
                  backgroundColor={COLORS.lightOrange}
                  icon="plus"
                  color={COLORS.orange}
                  title="CREATE ORDER"
                  onPress={() => navigation.navigate('CreateOrderScreen')}
                  qtyAvailable={false}
                />
              </>
            ) : null}
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
    
    {/* Footer */}
      <View style={{ 
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: COLORS.lightGray,
        height:30
      }}>
        <Text style={{ color:COLORS.darkgray}}>App Version ➡️ 16.12.21</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  heading1: {
    ...FONTS.h2,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  heading2: {
    ...FONTS.h4,
    color: COLORS.black,
    opacity: 0.5,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    opacity: 1,
    height: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 20,
    elevation: 10,
  },
  cardContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.padding * 2,
  },
  innerMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SIZES.padding * 3,
    paddingHorizontal: SIZES.padding * 3,
  }
});

export default index;
