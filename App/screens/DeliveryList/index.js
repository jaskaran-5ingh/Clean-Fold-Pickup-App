import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, FlatList} from 'react-native';
import {Card, Button, Icon} from 'react-native-elements';

import {COLORS, images, FONTS} from '../../constants';
import api from '../../api/services';
import cache from '../../utils/cache';

import {ErrorScreen, LoadingScreen} from '../../screens';

const index = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDeliveryList();
  }, []);

  async function getDeliveryList() {
    try {
      setLoading(true);
      cache.get('user').then(async user => {
        if (user != null) {
          // user.id;
          const response = await api.getDeliveredOrdersList();
          if (response.ok !== true) setError(false);
          setPendingOrders(response?.data?.order_list);
          setLoading(false);
        }
      });
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
            <Text style={styles.cardTitleSmall}>Pickup Time</Text>
            <Text style={styles.cardTitle}>{item.pickup_time}</Text>
          </View>
          <View>
            <Text style={styles.cardTitleSmall}>Order Number</Text>
            <Text style={styles.cardTitle}>{item.number}</Text>
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
            <Text style={{...FONTS.h4, paddingBottom: 5}}>{item.user_id}</Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.darkgray,
                paddingBottom: 5,
              }}>
              {item.address}
            </Text>
          </View>
          <View style={{maxWidth: '50%'}}>
            <Text style={{...FONTS.h4, paddingBottom: 5}}>Remarks</Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.darkgray,
                paddingBottom: 5,
              }}>
              {item.remarks}
            </Text>
          </View>
        </View>
        <Card.Divider />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {}}
            style={[
              styles.cardBottomButton,
              {
                backgroundColor: COLORS.darkTransparent,
              },
            ]}>
            <Text style={{fontSize: 15, color: COLORS.white}}>Done</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
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
    <View style={{flex: 1}}>
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
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardBottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    flex: 1,
  },
  cardTitle: {...FONTS.h4, color: COLORS.primary, fontWeight: 'bold'},
  cardTitleSmall: {
    ...FONTS.body4,
    color: COLORS.darkTransparent,
    paddingBottom: 4,
  },
});

export default index;
