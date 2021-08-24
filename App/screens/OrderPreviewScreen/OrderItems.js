import React from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {Card} from 'react-native-elements';
import {COLORS, FONTS} from '../../constants';

const index = ({orderItems, orderCategory, orderId}) => {
  console.log(orderItems);
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
            <Text>Order Id</Text>
            <Text style={{fontWeight: 'bold', marginTop: 5}}>{orderId}</Text>
          </View>

          <View>
            <Text>Order Category</Text>
            <Text style={{fontWeight: 'bold', marginTop: 5}}>
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
          <Text style={styles.cardTitle}>Dis.%</Text>
          <Text style={styles.cardTitle}>Qty</Text>
          <Text style={styles.cardTitle}>Total</Text>
        </View>
        <FlatList
          data={orderItems}
          keyExtractor={item => `${item.id}`}
          renderItem={({item, index}) => {
            console.log(item);
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
                  <Text style={styles.cardTitleSmall}>
                    {item?.product?.title}
                  </Text>
                  <Text style={styles.cardTitleSmall}>{item?.price}</Text>
                  <Text style={styles.cardTitleSmall}>
                    {item?.product?.discount_product}%
                  </Text>
                  <Text style={styles.cardTitleSmall}>1X{item?.qty}</Text>
                  <Text style={styles.cardTitleSmall}>{item?.qty}</Text>
                </View>
                <Card.Divider />
              </>
            );
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <Text>Total</Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
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
    width: '22%',
  },
  cardTitleSmall: {
    ...FONTS.body4,
    color: COLORS.darkTransparent,
    paddingBottom: 4,
    width: '22%',
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
