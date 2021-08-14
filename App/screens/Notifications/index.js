import React, {useState, useEffect} from 'react';
import {create} from 'apisauce';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Share,
  SectionList,
} from 'react-native';
import {
  COLORS,
  FONTS,
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
  SIZES,
  icons,
} from '../../constants';
import Alerts from '../../api/alerts';
import {ErrorScreen, LoadingScreen} from '../../screens';
import {BottomSheet, ListItem, Button} from 'react-native-elements';

export default function App({navigation}) {
  //Component States Declarations
  const [data, setData] = useState([]);
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(true);
  const [notification, setNotifications] = useState([]);

  //Api Function Calls
  const getNotifications = async () => {
    try {
      const apiClient = create({
        baseURL: 'https://onesignal.com/api/v1/',
        headers: {
          Authorization:
            'Bearer YzUyMDYyMDMtYWU5MS00ZDc2LThmNzEtYzBlNjgyMTA0Mzgy',
        },
      });

      apiClient
        .get(
          'notifications?app_id=2271be44-6498-47a7-be0b-a42c7a6eb467&limit=20&offset=0',
        )
        .then(function (response) {
          if (response.ok !== true) setError(true);
          setError(false);

          if (response.data != null) {
            setNotifications(response.data);
          }
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      //Check logs for error
      console.error(error);
    }
  };

  //Use Effect Hooks

  //Call Api Only Once when components loads
  useEffect(() => {
    setLoading(true);
    getNotifications();
    return () => {
      setError(false);
      setData([]);
      setLoading(true);
    };
  }, []);

  // Call Api After 3 Seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getNotifications();
    }, 5000);
    return () => {
      {
        clearInterval(interval);
        setError(false);
        setData([]);
        setLoading(true);
      }
    };
  }, []);

  //Render Component For FlatList
  function renderAlerts({item}) {
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <View style={[styles.cardBody]}>
            <View
              style={{
                position: 'relative',
                top: -15,
                left: -10,
                width: 30,
                height: 30,
              }}>
              <Image
                source={icons.bell}
                style={{width: 25, height: 25, tintColor: COLORS.secondary}}
              />
            </View>
            <View style={{flex: 1}}>
              <View style={{flex: 1}}>
                <Text
                  style={{color: COLORS.darkTransparent, paddingVertical: 10}}>
                  {item.headings.en}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{color: COLORS.primary}}>{item.contents.en}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  //Render Components
  return (
    <View style={styles.container}>
      {/* Model Start */}
      {loading == true ? (
        <LoadingScreen />
      ) : (
        <>
          {error == true ? (
            <ErrorScreen getAlerts={getNotifications} />
          ) : (
            <>
              {/* List Section  */}
              <View style={styles.listSection}>
                <FlatList
                  data={notification.notifications}
                  keyExtractor={item => `${item.id}`}
                  renderItem={renderAlerts}
                  refreshing={loading}
                  onRefresh={() => {
                    setLoading(true);
                    getNotifications();
                  }}
                />
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    width: '100%',
    height: responsiveHeight(8),
    backgroundColor: COLORS.primary,
    borderBottomWidth: 0.5,
    borderColor: COLORS.lightGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  welcome: {
    ...FONTS.h3,
    color: COLORS.green,
    opacity: 0.85,
  },
  heading: {
    fontSize: responsiveFontSize(1.7),
    color: COLORS.darkgray,
    marginBottom: responsiveHeight(2),
  },
  heading2: {
    fontSize: responsiveFontSize(1.9),
    color: COLORS.primary,
    fontWeight: 'bold',
    ...FONTS.h4,
  },
  subHeading: {
    fontSize: responsiveFontSize(1.6),
    color: COLORS.primary,
    fontWeight: 'bold',
    ...FONTS.h5,
  },
  card: {
    padding: SIZES.padding * 1.8,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.darkTransparent,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.primary,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 5,
    borderStyle: 'solid',
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
  listSection: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  cardBody: {
    backgroundColor: COLORS.white,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  bottomSheetInnerContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    padding: SIZES.padding * 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  shareButtonStyle: {
    backgroundColor: COLORS.darkGreen,
    borderRadius: 20,
    paddingHorizontal: SIZES.padding * 6,
    paddingVertical: SIZES.padding,
  },
});
