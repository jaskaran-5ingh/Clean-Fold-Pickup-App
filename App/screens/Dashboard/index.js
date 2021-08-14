import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
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

const index = () => {
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
          width: fullWidth ? '100%' : 152,
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
            borderRadius: 100,
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
            <Text style={styles.heading1}>Hi, Jaskaran</Text>
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
      <View
        style={{
          backgroundColor: COLORS.white,
          opacity: 1,
          height: '100%',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          marginTop: 20,
          elevation: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: SIZES.padding * 3,
            paddingLeft: SIZES.padding * 3,
          }}>
          <Text
            style={{color: COLORS.primary, fontSize: 20, fontWeight: 'bold'}}>
            Dashboard
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: SIZES.padding * 3,
          }}>
          <Card
            backgroundColor={COLORS.lightRed}
            icon="truck"
            color={COLORS.red}
            title="PENDING"
            qty={50}
          />
          <Card
            backgroundColor={COLORS.lightGreen}
            icon="check"
            color={COLORS.darkGreen}
            title="DELIVERED"
            qty={40}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.padding * 3,
          }}>
          <Card
            backgroundColor={COLORS.primary}
            icon="file"
            color={COLORS.white}
            title="VIEW"
            qty="View Document"
            fullWidth={true}
          />
        </View>
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
});

export default index;
