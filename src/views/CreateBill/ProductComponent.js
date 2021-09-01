import React, {useContext, useEffect, useReducer, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {COLORS, FONTS} from '../../constants';
import cache from '../../utils/cache';
import {CartItemsContext} from '../../utils/CartContext';

function incrementQty(state, action) {
  let productID = action.payload.productID;
  let productCategory = action.payload.categoryID;
  let productType = action.payload.productType;
  let productQty = action.payload.qty;

  let newState = {
    ...state,
    productID: productID,
    productCategory: productCategory,
    productType: productType,
    qty: productQty + 1,
  };
  try {
    cache.get('productList').then(products => {
      if (products !== null) {
        let newArray = products.filter(
          product => newState.productID !== product.productID,
        );
        cache.store('productList', [...newArray, newState]);
      } else {
        cache.store('productList', [newState]);
      }
    });
  } catch (error) {
    console.error(error);
  }

  return newState;
}

function decrementQty(state, action) {
  let productID = action.payload.productID;
  let productCategory = action.payload.categoryID;
  let productType = action.payload.productType;
  let productQty = action.payload.qty;

  let newState = {
    ...state,
    productID: productID,
    productType: productType,
    productCategory: productCategory,
    qty: productQty !== 0 ? productQty - 1 : 0,
  };

  try {
    cache.get('productList').then(products => {
      if (products !== null) {
        let newArray = products.filter(
          product => newState.productID !== product.productID,
        );
        cache.store('productList', [...newArray, newState]);
      } else {
        cache.store('productList', [newState]);
      }
    });
  } catch (error) {
    console.error(error);
  }
  return newState;
}

function onTextChange(state, action) {
  let productID = action.payload.productID;
  let productCategory = action.payload.categoryID;
  let productType = action.payload.productType;
  let productQty = action.payload.qty;

  let newState = {
    ...state,
    productID: productID,
    productType: productType,
    productCategory: productCategory,
    qty: productQty,
  };

  try {
    cache.get('productList').then(products => {
      if (products !== null) {
        let newArray = products.filter(
          product => newState.productID !== product.productID,
        );
        cache.store('productList', [...newArray, newState]);
      } else {
        cache.store('productList', [newState]);
      }
    });
  } catch (error) {
    console.error(error);
  }
  return newState;
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment': {
      return incrementQty(state, action);
    }
    case 'decrement': {
      return decrementQty(state, action);
    }
    case 'onTextChange': {
      return onTextChange(state, action);
    }
    default: {
      return state;
    }
  }
}

const ProductComponent = ({item}) => {
  const initialState = {
    productID: 0,
    productCategory: 0,
    qty: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [oldItemDetails, setOldItemDetails] = useState([]);
  const cartContext = useContext(CartItemsContext);

  useEffect(() => {
    let unAmounted = false;
    if (!unAmounted) {
      cache.get('productList').then(products => setOldItemDetails(products));
    }
    return () => {
      unAmounted = true;
    };
  }, []);

  useEffect(() => {
    console.log(cartContext?.state);
  }, [state]);

  const productQuantity = oldItemDetails?.filter(product => {
    if (
      product.productID === item.id &&
      product.productType === item.product_type &&
      product.productCategory === item.categories_id
    ) {
      return product.qty;
    }
  });

  const qtyValue = state?.qty
    ? state?.qty
    : productQuantity?.length > 0
    ? productQuantity[0].qty
    : 0;

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
                payload: {
                  categoryID: item.categories_id,
                  productID: item.id,
                  productType: item.product_type,
                  qty: qtyValue,
                },
              })
            }>
            <Text style={styles.lightColor}>-</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.qtyLabel}>QTY</Text>
            <TextInput
              onChangeText={event => {
                console.table(event);
                dispatch({
                  type: 'onTextChange',
                  payload: {
                    categoryID: item.categories_id,
                    productID: item.id,
                    productType: item.product_type,
                    qty: event,
                  },
                });
              }}
              value={qtyValue.toString()}
              placeholder=""
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity
            style={styles.incrementIcon}
            onPress={() =>
              dispatch({
                type: 'increment',
                payload: {
                  categoryID: item.categories_id,
                  productID: item.id,
                  productType: item.product_type,
                  qty: qtyValue,
                },
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

export default React.memo(ProductComponent);
