import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {Image, ListItem, Tab, Divider} from 'react-native-elements';
import api from '../../api/services';
import {COLORS, FONTS} from '../../constants';
import {LoadingScreen} from '../index';
import {showMessage} from 'react-native-flash-message';
function TabItems({data, renderItems}) {
  return (
    <FlatList
      data={data}
      renderItem={renderItems}
      keyExtractor={item => `${item.id}`}
    />
  );
}

function renderPriceDetails(itemName, itemPrice, itemDiscount) {}

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

  function renderTabHeaders({index, item}) {
    return (
      <Tab.Item
        title={item.product_type_name}
        buttonStyle={[
          styles.tabButtonStyle,
          tabIndex == index
            ? {
                minWidth: 110,
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
            style={{
              width: 40,
              height: 50,
              marginVertical: 4,
            }}
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
              position: 'absolute',
              color: COLORS.primary,
              ...FONTS.h5,
              fontWeight: 'bold',
              width: 200,
              top: -10,
            }}>
            {item.title}
          </ListItem.Title>
          <ListItem.Subtitle style={[styles.totalTitle, {marginTop: 30}]}>
            Price
          </ListItem.Subtitle>
          <ListItem.Subtitle style={styles.priceSubTitle}>
            ₹ {item.price}
          </ListItem.Subtitle>
        </ListItem.Content>

        {/* Discount Percentage */}

        <ListItem.Content>
          <ListItem.Title
            style={{
              marginBottom: 10,
            }}>
            {' '}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.totalTitle}>
            Discount%
          </ListItem.Subtitle>
          <ListItem.Subtitle style={styles.priceSubTitle}>
            {item?.discount_product || 0}
          </ListItem.Subtitle>
        </ListItem.Content>

        {/* Discount Percentage */}

        <ListItem.Content>
          <ListItem.Title
            style={{
              marginBottom: 10,
            }}>
            {' '}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.totalTitle}>
            Discount ₹
          </ListItem.Subtitle>
          <ListItem.Subtitle style={styles.priceSubTitle}>
            ₹ {(item.price * item?.discount_product) / 100}
          </ListItem.Subtitle>
        </ListItem.Content>

        {/* Discount Percentage */}

        <ListItem.Content>
          <ListItem.Title
            style={{
              marginBottom: 10,
            }}>
            {' '}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.totalTitle}>
            Total ₹
          </ListItem.Subtitle>
          <ListItem.Subtitle style={styles.priceSubTitle}>
            ₹ {item.price - (item.price * item?.discount_product) / 100}
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
    minWidth: 110,
  },
  tabIndicator: {
    backgroundColor: COLORS.transparent,
    height: 5,
  },
  priceSubTitle: {
    color: COLORS.darkTransparent,
  },
  totalTitle: {
    color: COLORS.darkgray,
    fontWeight: 'bold',
    fontSize: 10,
  },
});

export default index;
