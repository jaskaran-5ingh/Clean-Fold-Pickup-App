import React, {createContext, useReducer} from 'react';
import {StyleSheet} from 'react-native';

function cartReducer(state, action) {
  switch (action.type) {
    case 'cart': {
      return state;
    }
    default: {
      return state;
    }
  }
}

export const CartItemsContext = createContext();

const CartContext = ({children}) => {
  const initialState = {
    order_details: {
      user_id: '2493',
      pickupTime: '2021-7-29',
      pick_timeslot: 'slot4',
      deliveryTime: '2021-7-2',
      delv_timeslot: 'slot4',
      city: 'amritsar',
      address: '4',
      mobile: '9914340883',
      name: 'mobile entry',
      cart: '[{"id":"515","qty":6,"price":"79","category_id":"1","cat_hours":"96"},{"id":"519","qty":4,"price":"129","category_id":"1","cat_hours":"96"}]',
      coupon: null,
      id_location: '53',
      order_type: 'normal',
      order_by: 'employee',
    },
  };
  const [cartItems, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartItemsContext.Provider value={{cartItems, dispatch}}>
      {children}
    </CartItemsContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default CartContext;
