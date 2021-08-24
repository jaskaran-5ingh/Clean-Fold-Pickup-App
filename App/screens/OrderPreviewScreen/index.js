import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Tab, TabView, Badge} from 'react-native-elements';
import api from '../../api/services';
import {Card} from 'react-native-elements';
import {COLORS, FONTS} from '../../constants';
import OrderDetails from './OrderDetails';
import OrderItems from './OrderItems';
const index = ({route, navigation}) => {
  const [loading, setLoading] = useState();
  const [orderDetails, setOrderDetails] = useState();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    try {
      getOrderDetails();
    } catch (err) {
      console.error(err);
    }
  }, []);

  async function getOrderDetails() {
    try {
      setLoading(true);
      const response = await api.getOrderDetailsByOrderId(
        route?.params?.orderId,
      );
      console.log(response);
      setOrderDetails(response?.data?.orderDetails);
      setLoading(true);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          margin: 15,
          marginBottom: 0,
        }}>
        <Tab
          value={index}
          onChange={index => setIndex(index)}
          indicatorStyle={styles.tabIndicator}
          variant="primary">
          <Tab.Item
            title="order details"
            buttonStyle={[
              styles.tabButtonStyle,
              index == 0
                ? {
                    backgroundColor: COLORS.primary,
                    color: COLORS.white,
                  }
                : null,
            ]}
            titleStyle={[
              styles.tabTitleStyle,
              index == 0
                ? {
                    color: 'white',
                  }
                : null,
            ]}
          />
          <Tab.Item
            title="order items"
            buttonStyle={[
              styles.tabButtonStyle,
              index == 1
                ? {
                    backgroundColor: COLORS.primary,
                    color: COLORS.white,
                  }
                : null,
            ]}
            titleStyle={[
              styles.tabTitleStyle,
              index == 1
                ? {
                    color: 'white',
                  }
                : null,
            ]}
          />
          <Badge
            status="error"
            value="10"
            containerStyle={{
              position: 'absolute',
              top: -8,
              right: -8,
            }}
            badgeStyle={{
              height: 30,
              width: 30,
              borderRadius: 10,
              elevation: 6,
            }}
          />
        </Tab>
      </View>

      <TabView value={index} onChange={setIndex}>
        <TabView.Item style={{width: '100%', flex: 1}}>
          <OrderDetails />
        </TabView.Item>
        <TabView.Item style={{width: '100%', flex: 1}}>
          <OrderItems />
        </TabView.Item>
      </TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  tabTitleStyle: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
  },
  tabButtonStyle: {
    backgroundColor: COLORS.white,
    borderWidth: 0.6,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
  },
  tabIndicator: {
    backgroundColor: COLORS.transparent,
    height: 3,
  },
});

export default index;
