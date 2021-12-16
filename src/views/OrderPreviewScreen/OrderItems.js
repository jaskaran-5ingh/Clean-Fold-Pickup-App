import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { COLORS, FONTS } from '../../constants';

const renderListHeaderComponent = () => {
  return (
    <View
      style={styles.headerStyleContainer}>
      <Text style={styles.cardTitle}>Item</Text>
      <Text style={styles.cardTitle}>Price</Text>
      <Text style={styles.cardTitle}>Discount</Text>
      <Text style={styles.cardTitle}>After Discount</Text>
      <Text style={styles.cardTitle}>Qty</Text>
      <Text style={styles.cardTitle}>Total</Text>
    </View>
  );
};


const renderListEmptyComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ color: COLORS.darkTransparent, paddingVertical: 30 }}>
        Items Not Available !
      </Text>
    </View>
  );
}

const index = ({ orderCategory, orderId, orderDetails }) => {

  const orderItems = orderDetails['order_item'];
  
  const [grandTotal, setGrandTotal] = useState(0);

  let payableAmount = 0;
  let total  = 0;
  let Grand = 0;
  let discountAmount = 0;
  let itemPrice = 0;
  let discountType = orderDetails.discount_type;
  let discount = orderDetails.discount_percentage;
  let discountTypeIcon = discountType === 'Rs' ? '₹' : '%';
  
  if (discountType == "Rs") {
    payableAmount = parseInt(grandTotal) - parseInt(discount);
  } else if (discountType == "Percent") {
    payableAmount = Math.round(parseInt(grandTotal) - (parseInt(discount) * parseInt(grandTotal)) / 100);
  }

  function renderOrderItems({ item, index }) {
    itemPrice = Math.round(item?.price) || 0;
    discountAmount =
      Math.round((item?.product?.discount_product * itemPrice) / 100) || 0;

    total = (itemPrice - discountAmount) * (item?.qty || 1);
    Grand += total;
    setGrandTotal(Grand);
    return (
      <>
        <View
          style={styles.listItemsContainer}>
          <Text style={styles.cardTitleSmall}>{item?.product?.title}</Text>
          <Text style={styles.cardTitleSmall}>{itemPrice} ₹</Text>
          <Text style={styles.cardTitleSmall}>{discountAmount} ₹</Text>
          <Text style={styles.cardTitleSmall}>
            {itemPrice - discountAmount}
          </Text>
          <Text style={styles.cardTitleSmall}>{item?.qty}</Text>
          <Text style={styles.cardTitleSmall}>{total} ₹</Text>
        </View>
        <Card.Divider />
      </>
    );
  };

  const renderListFooterComponent = () => {
    return (
      <View style={{
        marginBottom:150,
        borderBottomHeight:'1px',
        borderBottomColor : COLORS.gray,
        backgroundColor:COLORS.lightGray,
        paddingTop:15
      }}>
        <View
          style={[styles.listFooterContainer,{
            borderBottomHeight: 1,
            borderBottomColor: COLORS.gray
          }]}>
          <Text
            style={styles.listFooterText}>
            Total :{' '}
          </Text>
          <Text style={styles.listFooterAmountText}>
            {grandTotal} ₹
          </Text>
        </View>
        <View
          style={styles.listFooterContainer}>
          <Text
            style={styles.listFooterText}>
            Discount :{' '}
          </Text>
          <Text style={styles.listFooterAmountText}>
            {discount} {discountTypeIcon}
          </Text>
        </View>
        <View
          style={styles.listFooterContainer}>
          <Text
            style={styles.listFooterText}>
            Payable Amount :{' '}
          </Text>
          <Text style={styles.listFooterAmountText}>
            {payableAmount} ₹
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.innerContainer}>
        <View
          style={styles.headerContainer}>
          <View>
            <Text style={{ color: COLORS.darkTransparent }}>Order Id</Text>
            <Text
              style={{
                fontWeight: 'bold',
                marginTop: 5,
                color: COLORS.darkTransparent,
              }}>
              {orderId}
            </Text>
          </View>

          <View>
            <Text style={{ color: COLORS.darkTransparent }}>Order Category</Text>
            <Text
              style={{
                fontWeight: 'bold',
                marginTop: 5,
                color: COLORS.darkTransparent,
              }}>
              {orderCategory}
            </Text>
          </View>
        </View>

        {/* Render List of Items */}
        <FlatList
          data={orderItems}
          keyExtractor={item => `${item.id}`}
          renderItem={renderOrderItems}
          stickyHeaderIndices={[0]}
          ListEmptyComponent={renderListEmptyComponent}
          ListHeaderComponent={renderListHeaderComponent}
          ListFooterComponent={renderListFooterComponent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 3,
    flex: 1,
    backgroundColor: COLORS.white
  },
  cardTitle: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: 'bold',
    width: '17%',
  },
  cardTitleSmall: {
    ...FONTS.body4,
    color: COLORS.darkTransparent,
    paddingBottom: 4,
    width: '17%',
    maxWidth: '17%',
  },
  cardTitleDark: {
    ...FONTS.h5,
    color: COLORS.black,
    fontWeight: 'bold',
    maxWidth: '50%',
  },
  cardDivider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    width: '100%',
  },
  tabTitleStyle: {},
  listFooterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  listFooterText: {
    color: COLORS.darkTransparent,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  listFooterAmountText: { color: COLORS.darkTransparent, fontWeight: 'bold' },
  innerContainer: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    paddingVertical: 3,
    paddingHorizontal: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: COLORS.lightGray,
    marginBottom: 10,
  },
  listItemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    width: '100%',
    marginTop: 6,
  },
  headerStyleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    color: COLORS.white,
  }
});

export default React.memo(index);
