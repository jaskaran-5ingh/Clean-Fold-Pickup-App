import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Share,
  SectionList,
  BackHandler,
  Pressable,
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
  const [isModelVisible, setModelVisible] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState({});
  //Api Function Calls
  const getAlerts = async () => {
    try {
      const response = await Alerts.getAlerts();
      if (response.ok !== true) setError(true);
      setError(false);

      if (response.data != null) {
        setData(response.data?.alerts[0]);
      }

      setLoading(false);
    } catch (error) {
      //Check logs for error
      console.error(error);
    }
  };

  const handleShareAlert = async () => {
    try {
      const result = await Share.share({
        title: 'Daily Profits Alert',
        message: ` Daily Profits Alert \n\nSYMBOL : ${selectedAlert.symbol} \nBUY AT : ${selectedAlert.trigger_value} \nTARGET : ${selectedAlert.target_value} \nSTOP LOSS : ${selectedAlert.stop_loss} \nREC : ${selectedAlert.alert_time} \n\n Visit : https://deliveryonsite.in/`,
        url: 'http://deliveryonsite.in',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  //Use Effect Hooks

  //Call Api Only Once when components loads
  useEffect(() => {
    setLoading(true);
    getAlerts();

    return () => {
      setError(false);
      setData([]);
      setLoading(true);
    };
  }, []);

  // Call Api After 3 Seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getAlerts();
    }, 3000);
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
    function handelAlertOnPress() {
      setSelectedAlert(item);
      setModelVisible(true);
    }
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[
            styles.card,
            {
              borderLeftColor:
                item.notification_type == 'long-term'
                  ? COLORS.limegreen
                  : COLORS.secondary,
            },
          ]}
          onPress={() => {
            handelAlertOnPress();
          }}>
          <View style={[styles.cardBody]}>
            <View
              style={{
                width: responsiveWidth(28),
              }}>
              <Text style={styles.heading}>SYMBOL</Text>
              <Text style={styles.subHeading}>{item.symbol}</Text>
            </View>
            <View
              style={{
                width: responsiveWidth(15),
              }}>
              <Text style={styles.heading}>BUY AT</Text>
              <Text style={styles.subHeading}>{item.trigger_value}</Text>
            </View>
            <View>
              <Text style={styles.heading}>REC</Text>
              <Text
                style={[
                  styles.subHeading,
                  {
                    width: responsiveHeight(10),
                  },
                ]}>
                {item.alert_time}
              </Text>
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
            <ErrorScreen getAlerts={getAlerts} />
          ) : (
            <>
              {/* List Section  */}
              <View style={styles.listSection}>
                <SectionList
                  sections={data}
                  keyExtractor={item => `${item.id}`}
                  renderItem={renderAlerts}
                  renderSectionHeader={({section: {title}}) => (
                    <Text
                      style={[
                        styles.cardContainer,
                        {
                          backgroundColor: COLORS.lightGray,
                          color: COLORS.primary,
                          fontWeight: '700',
                        },
                      ]}>
                      REC : {title}
                    </Text>
                  )}
                  refreshing={loading}
                  onRefresh={() => {
                    setLoading(true);
                    getAlerts();
                  }}
                />
              </View>

              {/* Bottom Sheet   */}

              <BottomSheet
                isVisible={isModelVisible}
                modalProps={{
                  animationType: 'slide',
                  hardwareAccelerated: true,
                  onRequestClose: () => {
                    setModelVisible(false);
                  },
                }}
                containerStyle={{
                  backgroundColor: COLORS.darkTransparent,
                }}>
                <Pressable
                  style={styles.bottomSheetInnerContainer}
                  onPress={() => setModelVisible(false)}>
                  <TouchableOpacity onPress={() => setModelVisible(false)}>
                    <Image
                      source={icons.back}
                      resizeMode="contain"
                      tintColor={COLORS.primary}
                      style={{
                        height: responsiveHeight(7),
                        width: responsiveWidth(6),
                      }}
                    />
                  </TouchableOpacity>
                  <View>
                    <ListItem bottomDivider>
                      <ListItem.Content>
                        <ListItem.Title style={styles.heading2}>
                          SYMBOL
                        </ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Content>
                        <ListItem.Subtitle>
                          {selectedAlert.symbol}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>

                    <ListItem bottomDivider>
                      <ListItem.Content>
                        <ListItem.Title style={styles.heading2}>
                          BUY AT
                        </ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Content>
                        <ListItem.Subtitle>
                          {selectedAlert.trigger_value}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>

                    <ListItem bottomDivider>
                      <ListItem.Content>
                        <ListItem.Title style={styles.heading2}>
                          TARGET
                        </ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Content>
                        <ListItem.Subtitle>
                          {selectedAlert.target_value}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>

                    <ListItem>
                      <ListItem.Content>
                        <ListItem.Title style={styles.heading2}>
                          STOP LOSS
                        </ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Content>
                        <ListItem.Subtitle>
                          {selectedAlert.stop_loss}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>

                    <ListItem>
                      <ListItem.Content>
                        <ListItem.Title style={styles.heading2}>
                          REC
                        </ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Content>
                        <ListItem.Subtitle>
                          {selectedAlert.alert_time}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  </View>

                  <ListItem>
                    <ListItem.Content
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <Button
                        title="Share"
                        buttonStyle={styles.shareButtonStyle}
                        onPress={() => handleShareAlert()}
                      />
                    </ListItem.Content>
                  </ListItem>
                </Pressable>
              </BottomSheet>
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
    borderRadius: SIZES.radius / 1.4,
    backgroundColor: COLORS.white,
    borderLeftWidth: responsiveWidth(1.2),
    shadowColor: COLORS.darkTransparent,
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
    paddingHorizontal: SIZES.padding * 2,
  },
  listSection: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  cardBody: {
    backgroundColor: COLORS.white,
    marginTop: responsiveHeight(1),
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
