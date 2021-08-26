import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {Image, ListItem, Tab} from 'react-native-elements';
import api from '../../api/services';
import {COLORS, FONTS, icons} from '../../constants';
import {LoadingScreen} from '../index';

function TabItems({data, renderItems}) {
  return (
    <FlatList
      data={data}
      renderItem={renderItems}
      keyExtractor={item => `${item.id}`}
    />
  );
}

const index = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [rateList, setSetList] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const IMAGES_URL =
    'https://cleanfold.in/backend/clean_fold/public/product_images/';

  useEffect(() => {
    try {
      getRateList();
    } catch (err) {
      console.error(err);
    }
  }, []);

  async function getRateList() {
    try {
      setLoading(true);
      const response = await api.getRateList(route?.params?.categoryId);
      setSetList(response?.data?.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  function renderTabHeaders({index, item}) {
    return (
      <Tab.Item
        title={item.product_type_name}
        buttonStyle={[
          styles.tabButtonStyle,
          tabIndex == index
            ? {
                width: 100,
                backgroundColor: COLORS.lightGray,
                color: COLORS.white,
                borderBottomColor: COLORS.primary,
                borderBottomWidth: 3,
              }
            : null,
        ]}
        titleStyle={[styles.tabTitleStyle]}
        icon={
          <Image
            source={{uri: item.icon}}
            resizeMethod="scale"
            style={{width: 40, height: 50, marginVertical: 4}}
            PlaceholderContent={
              <View
                style={[
                  {height: '100%', width: '100%', justifyContent: 'center'},
                  tabIndex == index
                    ? {
                        backgroundColor: COLORS.lightGray,
                      }
                    : {
                        backgroundColor: COLORS.white,
                      },
                ]}>
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
        }
        onPress={() => {
          setTabIndex(index);
        }}
      />
    );
  }

  function renderProducts({index, item}) {
    return (
      <ListItem key={item.id} bottomDivider>
        <Image
          source={{uri: IMAGES_URL + item.image}}
          style={{width: 60, height: 90, marginRight: 20}}
          PlaceholderContent={
            <View
              style={{
                backgroundColor: 'white',
                height: '100%',
                width: '100%',
                justifyContent: 'center',
              }}>
              <ActivityIndicator
                color={COLORS.primary}
                size={40}
                style={{
                  opacity: 0.6,
                }}
              />
            </View>
          }
        />
        <ListItem.Content>
          <ListItem.Title
            style={{
              color: COLORS.primary,
              ...FONTS.h4,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            {item.title}
          </ListItem.Title>
          <ListItem.Subtitle
            style={{
              color: COLORS.darkTransparent,
              fontWeight: 'bold',
              ...FONTS.h3,
            }}>
            ₹ {item.price}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <Tab
            value={tabIndex}
            indicatorStyle={styles.tabIndicator}
            variant="primary">
            <FlatList
              data={rateList}
              keyExtractor={item => `${item.product_type_id}`}
              renderItem={renderTabHeaders}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </Tab>

          <TabItems
            data={rateList[tabIndex]?.products}
            renderItems={renderProducts}
          />
        </SafeAreaView>
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
  },
  tabIndicator: {
    backgroundColor: COLORS.transparent,
    height: 5,
  },
});

export default index;
