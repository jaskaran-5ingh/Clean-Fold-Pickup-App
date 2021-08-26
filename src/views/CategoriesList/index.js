import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {ListItem, Image, Divider} from 'react-native-elements';
import api from '../../api/services';
import {COLORS, FONTS, icons} from '../../constants';
import {showMessage} from 'react-native-flash-message';
import {EmptyAnimation, LoadingScreen} from '..';

const index = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  var IMAGES_URL =
    'https://cleanfold.in/backend/clean_fold/public/product_icon/';

  useEffect(() => {
    try {
      getOrderCategory();
    } catch (err) {
      console.error(err);
    }
  }, []);

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
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('RateListScreen', {categoryId: item.id})
        }>
        <View>
          <ListItem>
            <Image
              source={{uri: IMAGES_URL + item.images}}
              style={styles.iconStyle}
              PlaceholderContent={
                <View style={styles.activityContainer}>
                  <ActivityIndicator
                    color={COLORS.primary}
                    size={20}
                    style={{
                      opacity: 0.6,
                    }}
                  />
                </View>
              }
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
