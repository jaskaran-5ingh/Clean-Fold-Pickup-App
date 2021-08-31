/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Divider, LinearProgress, ListItem, Tab} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {showMessage} from 'react-native-flash-message';
import api from '../../api/services';
import {COLORS, FONTS} from '../../constants';
import {LoadingScreen} from '../index';
import ProductComponent from './ProductComponent';
function TabItems({data, renderItems}) {
  return (
    <FlatList
      data={data}
      renderItem={renderItems}
      keyExtractor={item => `${item.id}`}
    />
  );
}

const index = ({route}) => {
  const [loading, setLoading] = useState(true);
  const [linearLoading, setLinearLoading] = useState(true);
  const [rateList, setSetList] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(2);

  const PRODUCT_IMAGES_URL =
    'https://cleanfold.in/backend/clean_fold/public/product_images/';
  const [categoryList, setCategoryList] = useState([]);

  var ICON_URL = 'https://cleanfold.in/backend/clean_fold/public/product_icon/';

  //Api Function Declaration
  async function getOrderCategory() {
    try {
      setLoading(true);
      const response = await api.getOrderCategory();
      if (response.ok !== true) {
        showMessage({
          message: response?.problem + ' !',
          description: 'Please try again latter',
          backgroundColor: COLORS.red,
          type: 'danger',
          icon: 'danger',
        });
      } else {
        setCategoryList(response?.data?.categories);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  function renderCategory({item}) {
    let isSelected =
      item.id === selectedCategory ? {backgroundColor: COLORS.primary} : null;

    return (
      <TouchableOpacity
        onPress={() => setSelectedCategory(item.id)}
        style={[
          {
            padding: 10,
            height: 60,
            shadowColor: COLORS.primary,
            minWidth: 110,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          },
          isSelected,
        ]}>
        <Text
          style={{
            ...FONTS.h5,
            paddingBottom: 13,
            color: isSelected ? COLORS.white : COLORS.darkTransparent,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    let unAmounted = false;
    try {
      if (!unAmounted) {
        getRateList(selectedCategory);
      }
    } catch (err) {
      console.error(err);
    }
    return () => {
      unAmounted = true;
    };
  }, [selectedCategory]);

  useEffect(() => {
    let unAmounted = false;
    try {
      if (!unAmounted) {
        getOrderCategory();
      }
    } catch (err) {
      console.error(err);
    }
    return () => {
      unAmounted = true;
    };
  }, []);

  async function getRateList(id) {
    try {
      setLinearLoading(true);
      const response = await api.getRateList(id);
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
      setLinearLoading(false);
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
  // eslint-disable-next-line no-shadow
  function renderTabHeaders({index, item}) {
    const isTabActive = tabIndex === index;
    return (
      <Tab.Item
        title={item.product_type_name}
        buttonStyle={[styles.tabButtonStyle, isTabActive ? activeStyle : null]}
        titleStyle={[styles.tabTitleStyle]}
        icon={
          <FastImage
            source={{uri: item.icon, priority: FastImage.priority.high}}
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

  function renderProducts({item}) {
    return (
      <ListItem key={item.id} bottomDivider>
        <FastImage
          source={{
            uri: PRODUCT_IMAGES_URL + item.image,
            priority: FastImage.priority.high,
          }}
          style={{width: 60, height: 90, marginRight: 20}}
        />
        <ProductComponent item={item} />
      </ListItem>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{
            borderBottomWidth: 4,
            borderBottomColor: COLORS.transparent,
          }}
        />
      ) : (
        <FlatList
          data={categoryList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderCategory}
          refreshing={loading}
          onRefresh={() => getOrderCategory()}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
      {linearLoading ? (
        <LinearProgress color={COLORS.primary} />
      ) : (
        <View
          style={{
            borderBottomWidth: 4,
            borderBottomColor: COLORS.gray,
          }}
        />
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
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </Tab>
          <Divider />
          <TabItems
            data={rateList[tabIndex]?.products}
            renderItems={renderProducts}
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
  iconStyle: {width: 60, height: 60, marginRight: 20},
});

export default index;
