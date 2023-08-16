import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {FAB, Icon} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import {LoadingScreen} from '..';
import api from '../../api/services';
import {COLORS, FONTS} from '../../constants';
import cache from '../../utils/cache';
import {CartItemsContext} from '../../utils/CartContext';

const renderHeader = () => {
  return (
    <>
      <View style={styles.thead}>
        <View style={styles.td}>
          <Text style={styles.heading}>Item Name</Text>
        </View>
        <View style={styles.td}>
          <Text style={styles.heading}>Service</Text>
        </View>
        <View style={[styles.td, {width: '11%', maxwidth: '11%'}]}>
          <Text style={styles.heading}>Qty</Text>
        </View>
        <View style={[styles.td, {width: '14%', maxwidth: '14%'}]}>
          <Text style={styles.heading}>Rate</Text>
        </View>
        <View style={[styles.td, {width: '14%', maxwidth: '14%'}]}>
          <Text style={styles.heading}>Total</Text>
        </View>
        <View style={[styles.td, {width: '14%', maxwidth: '14%'}]}>
          <Text style={styles.heading}>Action</Text>
        </View>
      </View>
    </>
  );
};

const CheckOut = ({navigation}) => {
  const cartItems = useContext(CartItemsContext);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grandTotal, setGrandTotal] = useState(0);

  let total = 0;
  let Grand = 0;

  useEffect(() => {
    setLoading(true);
    try {
      cache.get('productList').then(productsList => {
        setOrderItems(productsList);
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const renderTableRow = ({item}) => {
    function deleteButtonPressHandler(productID) {
      let newArray = orderItems.filter(
        product => product.productID != productID,
      );
      if (orderItems?.length == 1) {
        setGrandTotal(0);
      }
      setOrderItems(newArray);
      cache.store('productList', newArray);
    }
    total = item?.productPrice * item.qty;
    Grand += total;
    setGrandTotal(Grand);
    return (
      <View style={styles.tbody}>
        <View style={styles.td}>
          <Text style={styles.rowText}>{item?.productName}</Text>
        </View>
        <View style={styles.td}>
          <Text style={styles.rowText}>{item?.categoryName}</Text>
        </View>
        <View style={[styles.td, {width: '12%', maxWidth: '12%'}]}>
          <Text style={styles.rowText}>{item?.qty}</Text>
        </View>
        <View style={[styles.td, {width: '15%', maxWidth: '15%'}]}>
          <Text style={styles.rowText}>{item?.productPrice} ₹</Text>
        </View>
        <View style={[styles.td, {width: '15%', maxWidth: '15%'}]}>
          <Text style={styles.rowText}>{total} ₹ </Text>
        </View>
        <View style={[styles.td, {width: '15%', maxWidth: '15%'}]}>
          <Text style={styles.rowText}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor={COLORS.white}
              onPress={() => deleteButtonPressHandler(item.productID)}>
              <Icon
                type="font-awesome"
                name="trash"
                size={20}
                color={COLORS.red}
              />
            </TouchableHighlight>
          </Text>
        </View>
      </View>
    );
  };

  const createBill = async createBillObject => {
    try {
      setLoading(true);
      let response = await api.createBill(createBillObject);
      if (response.ok != true) {
        showMessage({
          message: 'Failed !',
          description: 'Bill create failed !',
          type: 'error',
          icon: 'error',
          position: 'top',
        });
      } else {
        showMessage({
          message: 'Success !',
          description: 'Bill create Success !',
          type: 'success',
          icon: 'success',
          position: 'top',
        });
        navigation.replace('Dashboard');
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = () => {
    const {customerDetails} = cartItems.state;
    let cartArray = [];
    orderItems.forEach(element => {
      let cartItemObject = {
        id: element.productID,
        qty: element.qty,
        price: element.productPrice,
        category_id: element.productCategory,
        cat_hours: element.hours,
      };
      cartArray.push(cartItemObject);
    });

    let orderItemObject = {
      order_details: {
        id: customerDetails.id,
        user_id: customerDetails.user_id,
        pickupTime: customerDetails.pickup_time,
        pick_timeslot: customerDetails.pickup_slot,
        deliveryTime: customerDetails.delv_time,
        delv_timeslot: customerDetails.delv_slot,
        city: customerDetails.city,
        address: customerDetails.address,
        mobile: customerDetails.user.mobile,
        name: customerDetails.user.name,
        cart: JSON.stringify(cartArray),
        coupon: null,
        id_location: customerDetails.id_location,
        order_type: customerDetails.order_type,
        order_by: customerDetails.order_from,
      },
    };
    createBill(orderItemObject);
  };

  return (
    <View style={styles.container}>
      {!loading ? (
        <>
          {/* Table */}
          <FlatList
            ListHeaderComponent={renderHeader}
            data={orderItems}
            keyExtractor={item => `${item.productID}`}
            renderItem={renderTableRow}
            stickyHeaderIndices={[0]}
            ListFooterComponent={() => {
              return (
                <View style={[styles.tbody, styles.footerContainer]}>
                  <Text style={styles.heading}>
                    Bill Amount(incl all taxes)
                  </Text>
                  <Text>{grandTotal} ₹</Text>
                </View>
              );
            }}
          />
          <FAB
            title="Add More"
            containerStyle={{
              shadowColor: COLORS.black,
              elevation: 4,
            }}
            size="small"
            placement="left"
            color={COLORS.darkGreen}
            icon={<Icon name="add" size={25} color="white" />}
            onPress={() => navigation.goBack()}
          />

          <FAB
            title="Proceed"
            containerStyle={{
              shadowColor: COLORS.black,
              elevation: 4,
            }}
            size="small"
            placement="right"
            color={COLORS.primary}
            icon={<Icon name="arrow-right" size={25} color="white" />}
            onPress={() => handleFormSubmit()}
          />
        </>
      ) : (
        <LoadingScreen />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: COLORS.white,
  },
  thead: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    padding: 5,
    width: '100%',
  },
  tbody: {
    flexDirection: 'row',
    padding: 4,
    width: '100%',
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.lightGray,
    alignItems: 'center',
  },
  td: {
    maxWidth: '22.5%',
    width: '22.5%',
    paddingHorizontal: 4,
  },
  heading: {
    ...FONTS.body4,
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  rowText: {
    ...FONTS.body4,
    fontSize: 11.5,
    color: COLORS.darkTransparent,
  },
  footerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingRight: 75,
    backgroundColor: COLORS.lightGray,
    borderTopWidth: 2,
    borderColor: COLORS.gray,
    paddingVertical: 10,
    marginBottom: 100,
  },
});

export default CheckOut;
