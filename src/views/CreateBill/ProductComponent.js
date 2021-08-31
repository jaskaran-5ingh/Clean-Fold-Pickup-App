import React, {useReducer, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {COLORS, FONTS} from '../../constants';

function reducer(state, action) {
  switch (action.type) {
    case 'increment': {
      return (state += 1);
    }
    case 'decrement': {
      return state === 0 ? 0 : (state -= 1);
    }
    default: {
      return state;
    }
  }
}

const ProductComponent = ({item}) => {
  const [productQty, setProductQty] = useState(0);
  const [qty, dispatch] = useReducer(reducer, 0);
  return (
    <>
      <ListItem.Content>
        <ListItem.Title style={styles.itemName}>{item.title}</ListItem.Title>
        <ListItem.Subtitle style={[styles.totalTitle, {marginTop: 20}]}>
          Price
        </ListItem.Subtitle>
        <ListItem.Subtitle style={styles.priceSubTitle}>
          ₹{' '}
          {Math.round(item.price) -
            Math.round((item.price * item?.discount_product) / 100)}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content style={styles.contentContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.decrementIcon}
            onPress={() =>
              dispatch({
                type: 'decrement',
              })
            }>
            <Text style={styles.lightColor}>-</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.qtyLabel}>QTY</Text>
            <Text> {qty} </Text>
          </View>
          <TouchableOpacity
            style={styles.incrementIcon}
            onPress={() =>
              dispatch({
                type: 'increment',
              })
            }>
            <Text style={styles.lightColor}>+</Text>
          </TouchableOpacity>
        </View>
      </ListItem.Content>
    </>
  );
};

const styles = StyleSheet.create({
  priceSubTitle: {
    color: COLORS.darkTransparent,
    marginTop: 5,
  },
  totalTitle: {
    color: COLORS.darkgray,
    fontWeight: 'bold',
    fontSize: 10,
  },
  incrementIcon: {
    backgroundColor: COLORS.darkGreen,
    width: 30,
    height: 30,
    elevation: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decrementIcon: {
    backgroundColor: COLORS.red,
    width: 30,
    height: 30,
    elevation: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  qtyLabel: {
    position: 'absolute',
    fontSize: 10,
    top: -20,
    width: 100,
  },
  lightColor: {
    color: COLORS.white,
  },
  contentContainer: {
    marginRight: 10,
    marginTop: 45,
  },
  itemName: {
    position: 'absolute',
    color: COLORS.primary,
    ...FONTS.h5,
    fontWeight: 'bold',
    width: 180,
    top: -10,
  },
});

export default ProductComponent;
