/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import {
  Divider,
  FAB,
  Icon, ListItem,
  Tab
} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { showMessage } from 'react-native-flash-message';
import api from '../../api/services';
import { COLORS } from '../../constants';
import { CartItemsContext } from '../../utils/CartContext';
import { LoadingScreen } from '../index';
import ProductComponent from './ProductComponent';

function TabItems({ data, renderItems }) {
  return (
    <FlatList
      data={data}
      renderItem={renderItems}
      keyExtractor={item => `${item.id}`}
      ListFooterComponent={() => (
        <View
          style={{
            marginBottom: 100,
          }}
        />
      )}
    />
  );
}

const index = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [linearLoading, setLinearLoading] = useState(true);
  const [rateList, setSetList] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const cartContext = useContext(CartItemsContext);

  const PRODUCT_IMAGES_URL =
    'https://cleanfold.in/backend/clean_fold/public/product_images/';
  const [categoryList, setCategoryList] = useState([]);

  var ICON_URL = 'https://cleanfold.in/backend/clean_fold/public/product_icon/';

  //Api Function Declaration

  useEffect(() => {
    let unAmounted = false;
    if (!unAmounted) {
      getRateList(parseInt(route.params.categoryId));
    }
    return () => {
      unAmounted = true;
    };
  }, [route.params.categoryId]);


  async function getRateList(id) {
    try {
      setLoading(true);
      const response = await api.getRateList(id);
      console.log(response.data.data)
      if (response.ok !== true) {
        showMessage({
          message: response?.problem + ' !',
          description: 'Please try again latter',
          backgroundColor: COLORS.red,
          type: 'danger',
          icon: 'danger',
        });
      } else {
        setSetList(response?.data?.data);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }
  const activeStyle = {
    minWidth: 110,
    backgroundColor: COLORS.lightGray,
    color: COLORS.white,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 3,
  };

  function renderTabHeaders({ index, item }) {
    const isTabActive = tabIndex === index;
    return (
      <Tab.Item
        title={item.product_type_name}
        buttonStyle={[styles.tabButtonStyle, isTabActive ? activeStyle : null]}
        titleStyle={[styles.tabTitleStyle]}
        icon={
          <FastImage
            source={{ uri: item.icon, priority: FastImage.priority.high }}
            resizeMethod="scale"
            style={styles.imageStyle}
          />
        }
        onPress={() => {
          setTabIndex(index);
        }}
      />
    );
  }

  function renderProducts({ item }) {
    return (
      <ListItem key={item.id} bottomDivider>
        <FastImage
          source={{
            uri: PRODUCT_IMAGES_URL + item.image,
            priority: FastImage.priority.high,
          }}
          style={{ width: 60, height: 90, marginRight: 20 }}
        />
        <ProductComponent item={item} />
      </ListItem>
    );
  }
  return (
    <View style={styles.container}>
      {loading ? (
        <View />
      ) : (
        <View style={{
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          backgroundColor: COLORS.darkTransparent,
          elevation: 4
        }}>
          <Text style={{
            fontWeight: 'bold',
            color: COLORS.white
          }}>Category</Text>
          <Text style={{
            fontWeight: 'bold',
            color: COLORS.lightGray
          }}> | </Text>
          <Text style={{
            fontWeight: 'bold',
            color: COLORS.white
          }}>{route.params.categoryName}</Text>
        </View>
      )}
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Tab value={tabIndex} indicatorStyle={styles.tabIndicator}>
            <FlatList
              data={rateList}
              keyExtractor={item => `${item.product_type_id}`}
              renderItem={renderTabHeaders}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          </Tab>
          <Divider />
          <TabItems
            data={rateList[tabIndex]?.products}
            renderItems={renderProducts}
          />
          <FAB
            title="Checkout"
            buttonStyle={{
              paddingHorizontal: 120,
            }}
            containerStyle={{
              shadowColor: COLORS.black,
              elevation: 4,
            }}
            placement="left"
            color={COLORS.primary}
            icon={<Icon name="shopping-cart" size={28} color="white" />}
            onPress={() => navigation.navigate('CheckOut')}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  tabTitleStyle: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: 'bold',
    padding: 8,
  },
  tabButtonStyle: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.primary,
    minWidth: 110,
  },
  tabIndicator: {
    backgroundColor: COLORS.transparent,
    height: 5,
  },
  priceSubTitle: {
    color: COLORS.darkTransparent,
    marginTop: 5,
  },
  totalTitle: {
    color: COLORS.darkgray,
    fontWeight: 'bold',
    fontSize: 10,
  },
  imageStyle: {
    width: 25,
    height: 35,
    marginVertical: 2,
  },
  iconStyle: { width: 60, height: 60, marginRight: 20 },
});

export default index;
