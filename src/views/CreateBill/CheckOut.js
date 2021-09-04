import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {FAB, Icon} from 'react-native-elements';
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

  function deleteButtonPressHandler(productID){
    let newArray = orderItems.filter(product => product.productID !== productID);
    setOrderItems(newArray);
    cache.store('productList',newArray);
  }

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
        <Text style={styles.rowText}>{item?.productPrice * item.qty} ₹ </Text>
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
            onPress={() => console.log('Add cart')}
          />
        </>
      ) : (
        <Text>Loading...</Text>
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
});

export default CheckOut;
