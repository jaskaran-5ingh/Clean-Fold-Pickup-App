import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { Badge } from 'react-native-elements';
import api from '../../api/services';
import {
  COLORS
} from '../../constants';
import OrderDetails from './OrderDetails';
import OrderItems from './OrderItems';

const Tab = createMaterialTopTabNavigator();

const index = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState();
  const [orderItemsCount, setOrderItemsCount] = useState(0);
  const [orderItems, setOrderItems] = useState([]);
  const [orderCategory, setOrderCategory] = useState('');
  const [index, setIndex] = useState(0);
  useEffect(() => {
    let unAmounted = false;
    try {
      if (!unAmounted) {
        getOrderDetails();
      }
    } catch (err) {
      console.error(err);
    }
    return () => {
      unAmounted = true;
    };
  }, []);

  async function getOrderDetails() {
    try {
      setLoading(true);
      const response = await api.getOrderDetailsByOrderId(
        route?.params?.orderId,
      );
      setOrderDetails(response?.data?.data);
      setOrderItemsCount(response?.data?.data?.order_item.length);
      setOrderItems(response?.data?.data?.order_item);
      setOrderCategory(response?.data?.order_categories[0]);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  function renderOrderDetails() {
    return (
      <OrderDetails
        orderData={orderDetails}
        orderCategory={orderCategory}
      />
    );
  }

  function renderOrderItems() {
    return (
      <OrderItems
        orderItems={orderItems}
        orderCategory={orderCategory}
        orderId={orderDetails?.id}
        orderDetails={orderDetails}
      />
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primaryFont }}>
      {loading
        ? <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 30 }} />
        : <NavigationContainer independent={true}>
          <Tab.Navigator
            initialRouteName="OrderDetails"
            screenOptions={{
              tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' },
              tabBarStyle: { backgroundColor: 'white' },
              tabBarActiveTintColor: COLORS.primary,
              tabBarInactiveTintColor: COLORS.darkgray,
              tabBarAllowFontScaling: false,
              tabBarIndicatorStyle: {
                height: 4,
                backgroundColor: COLORS.primary,
              }
            }}
          >
            <Tab.Screen name="OrderDetails" component={renderOrderDetails} options={{
              title: 'Order Details'
            }} />
            <Tab.Screen
              name="OrderItems"
              component={renderOrderItems}
              options={{
                title: 'Order Items',
                tabBarBadge: () => <Badge
                  value={orderItemsCount}
                  containerStyle={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                  }}
                  badgeStyle={{
                    height: 30,
                    width: 30,
                    borderRadius: 10,
                    elevation: 6,
                    backgroundColor:
                      orderItemsCount > 0 ? COLORS.red : COLORS.primary,
                  }}
                />
              }}


            />
          </Tab.Navigator>
        </NavigationContainer>}
    </SafeAreaView>
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
