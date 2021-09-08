import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import {COLORS, FONTS} from '../../constants';

const index = ({orderItems, orderCategory, orderId}) => {
  const [grandTotal, setGrandTotal] = useState(0);

  let total = 0;
  let Grand = 0;
  let discountAmount = 0;
  let itemPrice = 0;

  function renderOrderItems({item, index}) {
    itemPrice = Math.round(item?.price) || 0;
    discountAmount =
      Math.round((item?.product?.discount_product * itemPrice) / 100) || 0;

    total = (itemPrice - discountAmount) * (item?.qty || 1);
    Grand += total;
    setGrandTotal(Grand);
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 6,
            width: '100%',
            marginTop: 6,
          }}>
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
  }

  const renderListEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: COLORS.darkTransparent, paddingVertical: 30}}>
          Items Not Available !
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'relative',
          width: '100%',
          height: 'auto',
          paddingVertical: 3,
          paddingHorizontal: 4,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingVertical: 8,
            backgroundColor: COLORS.lightGray,
            marginBottom: 10,
          }}>
          <View>
            <Text style={{color: COLORS.darkTransparent}}>Order Id</Text>
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
            <Text style={{color: COLORS.darkTransparent}}>Order Category</Text>
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

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            backgroundColor: COLORS.primary,
            paddingVertical: 10,
            color: COLORS.white,
          }}>
          <Text style={styles.cardTitle}>Item</Text>
          <Text style={styles.cardTitle}>Price</Text>
          <Text style={styles.cardTitle}>Discount</Text>
          <Text style={styles.cardTitle}>After Discount</Text>
          <Text style={styles.cardTitle}>Qty</Text>
          <Text style={styles.cardTitle}>Total</Text>
        </View>

        <FlatList
          data={orderItems}
          keyExtractor={item => `${item.id}`}
          renderItem={renderOrderItems}
          ListEmptyComponent={renderListEmptyComponent}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            marginTop: 10,
          }}>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text
            style={{
              color: COLORS.darkTransparent,
              fontWeight: 'bold',
              color: COLORS.primary,
            }}>
            Grand Total :{' '}
          </Text>
          <Text style={{color: COLORS.darkTransparent, fontWeight: 'bold'}}>
            {grandTotal} ₹
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 3,
    flex: 1,
  },
  cardTitle: {
    ...FONTS.h5,
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
});

export default index;
