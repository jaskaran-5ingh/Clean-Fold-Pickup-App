import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Card } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { EmptyAnimation, LoadingScreen } from '..';
import api from '../../api/services';
import { COLORS, FONTS } from '../../constants';
import cache from '../../utils/cache';

const index = ({navigation}) => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    getDeliveryList();
  }, [isFocused]);

  function displayErrorMessage() {
  showMessage({
    message: 'Server Error!',
    description: 'Something went wrong please try again latter!',
    type: 'danger',
    icon: 'danger',
    position: 'top',
  });
}

  async function getDeliveryList() {
    try {
      setLoading(true);
      cache.get('user').then(async user => {
        if (user != null) {
          const response = await api.getDeliveredOrdersList(user.id);
          if (response.ok != true) {
            displayErrorMessage();
          } else {
            setPendingOrders(response?.data?.order_list);
          }
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
      console.log(response)
      if (response.ok != true) {
        Alert.alert(
          'Failed!',
          'Order delivery done failed \n\ntry again later!',
          [
            {
              text: 'OK', onPress: () => null,
            },
          ],
        );
      } else {
        Alert.alert(
          'Success!',
          'Order delivery done success !',
          [
            {
              text: 'OK', onPress: () => {
                navigation.replace('Dashboard');
              }
            },
          ],
        );
        getDeliveryList();
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  function renderCardItem({item}) {
    let timeSlots = {
      slot1: '08:00 AM - 10:00 PM',
      slot2: '10:00 AM - 12:00 PM',
      slot3: '12:00 PM - 03:00 PM',
      slot4: '03:00 PM - 05:00 PM',
      slot5: '05:00 PM - 08:00 PM',
    };
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
                navigation.replace('OrderPreviewScreen', {orderId: item.id})
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
            {item?.delv_slot != null ? (
              <>
                <Text
                  style={{...FONTS.h4, fontWeight: 'bold', paddingBottom: 8}}>
                  Delivery Time
                </Text>
                <Text
                  style={{
                    ...FONTS.h5,
                    color: COLORS.red,
                    paddingBottom: 20,
                    fontWeight: 'bold',
                  }}>
                  {timeSlots[`${item?.delv_slot}`]}
                </Text>
              </>
            ) : null}
            <Text style={{...FONTS.h4, fontWeight: 'bold', paddingBottom: 8}}>
              {item?.user?.mobile}
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.darkTransparent,
                paddingBottom: 8,
              }}>
              {item?.address}
            </Text>
          </View>

          <View style={{maxWidth: '50%'}}>
            <Text style={{...FONTS.h4, fontWeight: 'bold', paddingBottom: 5}}>
              Category
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.darkTransparent,
                paddingBottom: 20,
              }}>
              {item?.order_category_relation?.name}
            </Text>
            <Text style={{...FONTS.h4, fontWeight: 'bold', paddingBottom: 5}}>
              Remarks
            </Text>
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
                  onPress: () => null,
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
              navigation.replace('DeliveryListEdit', {orderId: item.id})
            }
            style={[
              styles.cardBottomButton,
              {
                backgroundColor: COLORS.primary,
              },
            ]}>
            <Text style={{fontSize: 15, color: COLORS.white}}>Edit</Text>
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
        <View
          style={{
            flex: 1,
            backgroundColor:
              pendingOrders?.length > 0 ? COLORS.primary : COLORS.white,
          }}>
          <FlatList
            ListHeaderComponent={() => {
              return (
                <Text
                  style={[
                    styles.headerTitleStyle,
                    {
                      color:
                        pendingOrders?.length > 0
                          ? COLORS.white
                          : COLORS.darkTransparent,
                    },
                  ]}>
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
                  style={[
                    styles.emptyListTitleStyle,
                    {
                      backgroundColor:
                        pendingOrders.length > 0
                          ? COLORS.primary
                          : COLORS.white,
                    },
                  ]}>
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
  emptyListTitleStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleStyle: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    ...FONTS.body4,
    color: COLORS.light,
    marginTop: 5,
    paddingHorizontal: 10,
  },
});

export default index;
