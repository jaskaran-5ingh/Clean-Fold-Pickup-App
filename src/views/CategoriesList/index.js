/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Divider, ListItem} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {showMessage} from 'react-native-flash-message';
import {EmptyAnimation, LoadingScreen} from '..';
import api from '../../api/services';
import {COLORS} from '../../constants';

const index = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  var IMAGES_URL =
    'https://cleanfold.in/backend/clean_fold/public/product_icon/';

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

  useEffect(() => {
    //Api function Calling
    let unAmounted = false;

    if (!unAmounted) {
      getOrderCategory();
    }

    //Hook Clean Up
    return () => {
      unAmounted = true;
    };
  }, []);

  function renderCategory({item}) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('RateListScreen', {categoryId: item.id})
        }>
        <View>
          <ListItem>
            <FastImage
              source={{uri: IMAGES_URL + item.images}}
              style={styles.iconStyle}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
              <ListItem.Subtitle style={styles.subTitle}>
                Hours ({item.hours})
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </View>
        <Divider />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          data={categoryList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderCategory}
          refreshing={loading}
          onRefresh={() => getOrderCategory()}
          ListEmptyComponent={() => {
            return (
              <View style={styles.emptyScreenContainer}>
                <EmptyAnimation message="Empty !" />
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  activityContainer: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.primary,
    // ...FONTS.h4,
    marginBottom: 10,
  },
  subTitle: {
    color: COLORS.darkgray,
    // ...FONTS.h5,
  },
  iconStyle: {width: 60, height: 60, marginRight: 20},
  emptyScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default index;
