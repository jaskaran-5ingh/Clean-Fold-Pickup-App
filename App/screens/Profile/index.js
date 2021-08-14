import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet, Text, ScrollView, Image} from 'react-native';
import {Button} from '../../components';

import cache from '../../utils/cache';

import AuthContext from '../../auth/Context';
import {
  COLORS,
  FONTS,
  responsiveHeight,
  responsiveWidth,
  SIZES,
} from '../../constants';

const index = ({navigation}) => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState([]);
  useEffect(() => {
    setUser(authContext.user?.appUser);
  }, []);
  async function logout() {
    try {
      authContext.setUser(null);
      await cache.store('user', null);
    } catch (error) {
      console.error(error);
    }
  }

  //Functional Component

  function DetailComponent({label, value}) {
    return (
      <View style={{marginTop: 10}}>
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.primary,
          }}>
          {label}
        </Text>
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.darkTransparent,
            padding: SIZES.padding * 1.2,
            backgroundColor: COLORS.lightGray,
            borderRadius: SIZES.radius / 2,
            marginTop: responsiveHeight(1.5),
            shadowColor: COLORS.primary,
            shadowOffset: {
              width: 2,
              height: 2,
            },
            elevation: 3,
            shadowOpacity: 1,
            shadowRadius: 5,
          }}>
          {value}
        </Text>
      </View>
    );
  }

  function header() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{
              uri: 'https://img.icons8.com/bubbles/2x/user.png',
              width: 150,
              height: 150,
            }}
          />
        </View>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.primary,
            marginTop: responsiveHeight(2),
            fontWeight: 'bold',
          }}>
          {user?.username}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{marginTop: 15}}>{header()}</View>
      {/* Body */}
      <ScrollView>
        <View style={{marginTop: 15}}>
          <DetailComponent label="Email" value={user?.email} />
          <DetailComponent
            label="Mobile"
            value={user?.mobile ?? 'Not available'}
          />
          <DetailComponent
            label="Account Registration Date"
            value={user?.reg_date}
          />
          <DetailComponent
            label="Account Expire Date"
            value={user?.expiry_date}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Button
              height={responsiveHeight(6)}
              width="100%"
              title="Sign Out"
              titleColor="white"
              backgroundColor={COLORS.secondary}
              onPress={() => {
                logout();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding * 4,
    backgroundColor: COLORS.white,
  },
});

export default index;
