import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card} from 'react-native-elements';
import {useIsFocused} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';

import {COLORS, FONTS} from '../../constants';
import api from '../../api/services';
import cache from '../../utils/cache';

import {EmptyAnimation, LoadingScreen} from '..';

const index = ({navigation}) => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    getDeliveryList();
  }, [isFocused]);

  async function getDeliveryList() {
    try {
      setLoading(true);
      cache.get('user').then(async user => {
        if (user != null) {
          const response = await api.getDeliveredOrdersList(user.id);
          if (response.ok !== true) setError(false);
          setPendingOrders(response?.data?.order_list);
          setLoading(false);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function doneDeliveryOrder(orderId) {
    try {
      setLoading(true);
      const response = await api.doneDeliveryOrder(orderId);
      console.log(response);
      if (response.ok !== true) {
        setError(false);
        showMessage({
          message: 'Something went wrong please try again',
          type: 'danger',
          icon: 'danger',
          position: 'top',
        });
      } else {
        getDeliveryList();
        showMessage({
          message:
            response.data?.status == true
              ? response.data?.message
              : 'Order Pickup Failed !',
          type: response.data?.status == true ? 'success' : 'danger',
          icon: response.data?.status == true ? 'success' : 'danger',
          position: 'right',
        });
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  function renderCardItem({item}) {
    return (
      <Card style={{position: 'relative', width: '100%', height: 'auto'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <View>
            <Text style={styles.cardTitleSmall}>Delivery Date</Text>
            <Text style={styles.cardTitle}>{item?.delv_time}</Text>
          </View>
          <View>
            <Text style={styles.cardTitleSmall}>Order Number</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.push('OrderPreviewScreen', {orderId: item.id})
              }
              style={[
                {
                  backgroundColor: COLORS.darkGreen,
                  padding: 2,
                  borderRadius: 4,
                },
                styles.cardBottomButton,
              ]}>
              <Text style={{fontSize: 15, color: COLORS.white}}>{item.id}</Text>
            </TouchableOpacity>
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
                color: COLORS.darkgray,
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
              {item.remarks}
            </Text>
          </View>
        </View>
        <Card.Divider />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Alert!', 'Are you want to change status to Done ?', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => doneDeliveryOrder(item.id)},
              ]);
            }}
            style={[
              styles.cardBottomButton,
              {
                backgroundColor: COLORS.darkTransparent,
              },
            ]}>
            <Text style={{fontSize: 15, color: COLORS.white}}>Done</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.push('DeliveryListEdit', {orderId: item.id})
            }
            style={[
              styles.cardBottomButton,
              {
                backgroundColor: COLORS.primary,
              },
            ]}>
            <Text style={{fontSize: 15, color: COLORS.white}}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            style={[
              styles.cardBottomButton,
              {
                backgroundColor: COLORS.orange,
              },
            ]}>
            <Text style={{fontSize: 15, color: COLORS.white}}>Bill</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loading == true ? (
        <LoadingScreen />
      ) : (
        <FlatList
          ListHeaderComponent={() => {
            return (
              <Text
                style={{
                  alignSelf: 'flex-end',
                  justifyContent: 'center',
                  ...FONTS.body4,
                  color: COLORS.darkgray,
                  marginTop: 5,
                  paddingHorizontal: 10,
                }}>
                Pull down to refresh list
              </Text>
            );
          }}
          data={pendingOrders}
          renderItem={item => renderCardItem(item)}
          keyExtractor={item => `${item.id}`}
          refreshing={loading}
          onRefresh={() => getDeliveryList()}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <EmptyAnimation message="Empty Order List !" />
              </View>
            );
          }}
        />
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
});

export default index;
