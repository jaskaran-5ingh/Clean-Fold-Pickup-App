import React, {createContext, useReducer} from 'react';
import {StyleSheet} from 'react-native';

function cartReducer(state, action) {
  switch (action.type) {
    case 'storeCustomerDetails': {
      return {...state, customerDetails: action.payload.customerDetails};
    }
    case 'storeSelectedItems': {
      return {...state, selectedItems: action.payload.selectedItems};
    }
    default: {
      return state;
    }
  }
}

export const CartItemsContext = createContext();

const CartContext = ({children}) => {
  const initialState = {
    customerDetails: {},
    selectedItems: [],
  };
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartItemsContext.Provider value={{state, dispatch}}>
      {children}
    </CartItemsContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default CartContext;
