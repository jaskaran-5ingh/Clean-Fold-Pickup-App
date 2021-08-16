import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {
  COLORS,
  FONTS,
  images,
  responsiveHeight,
  responsiveWidth,
  SIZES,
} from '../../constants';

import api from '../../api/services';
import AuthContext from '../../auth/Context';
import cache from '../../utils/cache';
import {ErrorScreen, LoadingScreen} from '../../screens';

const index = () => {
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
  }, []);

  async function getDashboardData() {
    setLoading(true);
    cache.get('user').then(async user => {
      if (user != null) {
        const response = await api.getDashboardData(user.id);
        if (response.ok !== true) setError(false);
        setDashboardData(response?.data);
        setLoading(false);
      }
    });
  }

  // Components
  function Card({
    backgroundColor = 'white',
    icon = 'user',
    color = 'red',
    title = 'title',
    qty = 0,
    fullWidth = false,
    onPress = () => {},
  }) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          height: fullWidth ? 200 : 180,
          width: fullWidth ? '100%' : responsiveWidth(37),
          padding: 5,
          backgroundColor: backgroundColor,
          borderRadius: 10,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: fullWidth ? 80 : 50,
            width: fullWidth ? 80 : 50,
            borderRadius: 0.4 * (fullWidth ? 80 : 50),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: color,
          }}>
          <Icon
            type="font-awesome"
            color={fullWidth ? COLORS.primary : COLORS.white}
            name={icon}
            size={30}
          />
        </View>
        <View style={{paddingHorizontal: 20}}>
          {fullWidth != true ? (
            <Text style={[styles.heading5, {color: color}]}>{title}</Text>
          ) : null}
        </View>
        <View
          style={{
            backgroundColor: color,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: 5,
          }}>
          <Text
            style={[
              styles.heading5,
              {color: fullWidth ? COLORS.primary : COLORS.white},
            ]}>
            {qty}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
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
        <ScrollView>
          <View style={styles.cardContainer}>
            <Card
              backgroundColor={COLORS.lightRed}
              icon="truck"
              color={COLORS.red}
              title="PICKUPS"
              qty={dashboardData?.pending}
            />
            <Card
              backgroundColor={COLORS.lightGreen}
              icon="check"
              color={COLORS.darkGreen}
              title="DELIVERY"
              qty={dashboardData?.delivered}
            />
          </View>
          <View style={styles.largeCardContainer}>
            <Card
              backgroundColor={COLORS.primary}
              icon="file"
              color={COLORS.white}
              title="VIEW"
              qty="View Document"
              fullWidth={true}
            />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.padding * 3,
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