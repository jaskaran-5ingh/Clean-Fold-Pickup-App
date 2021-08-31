/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import api from '../../api/services';
import AuthContext from '../../auth/Context';
import {COLORS, FONTS} from '../../constants';
import {EmptyAnimation, LoadingScreen} from '../index';

function CardButton({onPress, containerStyle, title, titleStyle}) {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const index = ({navigation}) => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  useEffect(() => {
    try {
      authContext?.user?.role_id === 6 ? getSofaBoyPickups() : getPickups();
    } catch (err) {
      console.error(err);
    }
  }, []);

  async function getSofaBoyPickups() {
    try {
      setLoading(true);
      const response = await api.getSofaBoyPickups(authContext?.user?.id);
      if (response.ok !== true) {
        setError(false);
      }
      setPendingOrders(response?.data?.order_list);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function getPickups() {
    try {
      setLoading(true);
      const response = await api.getPendingOrdersList(authContext?.user?.id);
      if (response.ok !== true) {
        setError(false);
      }
      setPendingOrders(response?.data?.order_list);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function donePickupOrder(orderId) {
    try {
      let newOrders = pendingOrders.filter(item => item.id !== orderId);
      setPendingOrders(newOrders);
      showMessage({
        message: 'Success !',
        description: 'Order Pickup Success !',
        type: 'success',
        icon: 'success',
        position: 'top',
      });
      const response =
        authContext?.user?.role_id !== 6
          ? await api.donePendingOrder(orderId)
          : await api.doneDeliveryOrder(orderId);

      if (response.ok !== true) {
        showMessage({
          message: 'Failed !',
          description: 'Order Pickup Failed !',
          type: 'error',
          icon: 'error',
          position: 'top',
        });
        authContext?.user?.role_id === 6 ? getSofaBoyPickups() : getPickups();
      }
    } catch (err) {
      console.error(err);
    }
  }

  function renderCardItem({item}) {
    return (
      <View>
        <Card containerStyle={styles.cardContainerStyle}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            {authContext?.user?.role_id !== 6 ? (
              <View>
                <Text style={styles.cardTitleSmall}>Pickup Date</Text>
                <Text style={styles.cardTitle}>{item?.pickup_time}</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.cardTitleSmall}>Delivery Date</Text>
                <Text style={styles.cardTitle}>{item?.delv_time}</Text>
              </View>
            )}
            <View>
              <Text style={styles.cardTitleSmall}>Order Number</Text>
              <CardButton
                onPress={() =>
                  navigation.push('OrderPreviewScreen', {orderId: item.id})
                }
                containerStyle={[
                  {
                    backgroundColor: COLORS.darkGreen,
                    padding: 2,
                    borderRadius: 4,
                  },
                  styles.cardBottomButton,
                ]}
                title={item.id}
                titleStyle={{fontSize: 15, color: COLORS.white}}
              />
            </View>
          </View>
          <Card.Divider />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              padding: 5,
            }}>
            <View style={{maxWidth: '50%'}}>
              <Text style={{...FONTS.h4, fontWeight: 'bold', paddingBottom: 5}}>
                {item?.user?.mobile}
              </Text>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.darkTransparent,
                  paddingBottom: 5,
                }}>
                {item?.location?.area_name}
              </Text>
            </View>
            <View style={{maxWidth: '50%'}}>
              <Text style={{...FONTS.h4, paddingBottom: 5}}>Remarks</Text>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.red,
                  paddingBottom: 5,
                }}>
                {item?.remarks}
              </Text>
            </View>
          </View>
          <Card.Divider />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Alert!',
                  'Are you want to change status to Done ?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => null,
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => donePickupOrder(item.id)},
                  ],
                );
              }}
              style={[
                styles.cardBottomButton,
                {
                  backgroundColor:
                    authContext?.user?.role_id === 6
                      ? 'green'
                      : COLORS.darkTransparent,
                },
              ]}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
            {authContext?.user?.role_id !== 6 ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('PickupEdit', {orderId: item.id});
                  }}
                  style={[
                    styles.cardBottomButton,
                    {
                      backgroundColor: COLORS.primary,
                    },
                  ]}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('CreateBill')}
                  style={[
                    styles.cardBottomButton,
                    {
                      backgroundColor: COLORS.orange,
                    },
                  ]}>
                  <Text style={styles.buttonText}>Bill</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </Card>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {loading === true ? (
        <LoadingScreen />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor:
              pendingOrders?.length > 0 ? COLORS.primary : COLORS.white,
          }}>
          <FlatList
            ListHeaderComponent={() => {
              return (
                <Text style={styles.flatListHeader}>
                  Pull down to refresh list
                </Text>
              );
            }}
            data={pendingOrders}
            renderItem={item => renderCardItem(item)}
            keyExtractor={item => `${item.id}`}
            refreshing={loading}
            onRefresh={() => {
              authContext?.user?.role_id !== 6
                ? getPickups()
                : getSofaBoyPickups();
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    backgroundColor: COLORS.white,
                  }}>
                  <EmptyAnimation message="Empty Order List !" />
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardBottomButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    elevation: 5,
  },
  cardTitle: {...FONTS.h4, color: COLORS.primary, fontWeight: 'bold'},
  cardTitleSmall: {
    ...FONTS.body4,
    color: COLORS.darkTransparent,
    paddingBottom: 4,
  },
  flatListHeader: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    ...FONTS.body4,
    color: COLORS.white,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  cardContainerStyle: {
    backgroundColor: COLORS.white,
  },
  buttonText: {fontSize: 15, color: COLORS.white},
});

export default index;
