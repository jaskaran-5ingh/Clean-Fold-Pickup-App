import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {COLORS, FONTS, images, responsiveWidth, SIZES} from '../../constants';

import api from '../../api/services';
import AuthContext from '../../auth/Context';
import cache from '../../utils/cache';

// Components
function Card({
  backgroundColor = 'white',
  icon = 'user',
  color = 'red',
  title = 'title',
  qty = 0,
  fullWidth = false,
  onPress = () => console.log('clicked'),
  qtyAvailable = true,
  loading = false,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          height: fullWidth ? 200 : 160,
          width: fullWidth ? '100%' : '48%',
          padding: 5,
          marginTop: 15,
          backgroundColor: backgroundColor,
          borderRadius: 10,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        },
      ]}>
      <View
        style={{
          height: fullWidth ? 80 : 50,
          width: fullWidth ? 80 : 50,
          borderRadius: 0.4 * (fullWidth ? 80 : 50),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color,
        }}>
        <Icon type="font-awesome" color={COLORS.white} name={icon} size={30} />
      </View>
      <View style={{paddingHorizontal: 20}}>
        <Text style={[styles.heading5, {color: color}]}>{title}</Text>
      </View>
      {qtyAvailable == true ? (
        <View
          style={{
            backgroundColor: color,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: 5,
          }}>
          <Text style={[styles.heading5, {color: COLORS.white}]}>
            {loading ? <ActivityIndicator color="white" /> : <>{qty}</>}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const index = ({navigation}) => {
  const isFocused = useIsFocused();

  //Use State Hooks

  const defaultDashboardData = {
    status: true,
    pending: 0,
    delivered: 0,
  };

  const [dashboardData, setDashboardData] = useState(defaultDashboardData);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //Use Effect Hooks
  const authContext = useContext(AuthContext);

  useEffect(() => {
    try {
      getDashboardData();
    } catch (err) {
      console.error(err);
    }
  }, [isFocused, authContext?.user?.id]);

  // Call Api After 2 Minutes
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        getDashboardData();
      } catch (error) {
        console.error(error);
      }
    }, 20000);
    return () => {
      {
        clearInterval(interval);
      }
    };
  }, []);

  async function getDashboardData() {
    setLoading(true);
    try {
      console.log();
      if (authContext?.user?.id != undefined) {
        const response = await api.getDashboardData(authContext?.user?.id);
        if (response.ok !== true) {
          showMessage({
            message: response?.problem + ' !',
            description: 'Please try again latter',
            backgroundColor: COLORS.red,
            type: 'danger',
            icon: 'danger',
          });
        } else {
          setDashboardData(response?.data);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <ImageBackground
        source={images.backgroundImage}
        style={{width: '100%', height: '100%'}}>
        <View style={{paddingHorizontal: SIZES.padding * 4}}>
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
              style={{color: COLORS.primary, fontSize: 20, fontWeight: 'bold'}}>
              Dashboard
            </Text>
            <Text
              style={{color: COLORS.primary, fontSize: 20, fontWeight: 'bold'}}>
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
              onPress={() => navigation.navigate('Pickup')}
              loading={loading}
              fullWidth={authContext?.user?.role_id == 6}
            />
            {authContext?.user?.role_id !== 6 ? (
              <>
                <Card
                  backgroundColor={COLORS.lightGreen}
                  icon="check"
                  color={COLORS.darkGreen}
                  title="DELIVERY"
                  qty={dashboardData?.delivered}
                  onPress={() => navigation.navigate('DeliveryList')}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
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
  heading5: {
    ...FONTS.h4,
    fontWeight: 'bold',
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
  },
  largeCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding * 3,
  },
});

export default index;
