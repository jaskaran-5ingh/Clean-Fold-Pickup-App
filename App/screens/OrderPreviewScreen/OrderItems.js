import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Card} from 'react-native-elements';
import {COLORS, FONTS} from '../../constants';

const index = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <Card style={{position: 'relative', width: '100%', height: 'auto'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingVertical: 8,
            backgroundColor: COLORS.lightGray,
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.cardTitle}>Order Items List</Text>
          </View>
        </View>
        <Card.Divider />
        <ScrollView>
          <Text>Items</Text>
        </ScrollView>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 3,
    flex: 1,
  },
  cardTitle: {...FONTS.h5, color: COLORS.primary, fontWeight: 'bold'},
  cardTitleSmall: {
    ...FONTS.body4,
    color: COLORS.darkTransparent,
    paddingBottom: 4,
    opacity: 0.8,
  },
  cardTitleDark: {
    ...FONTS.h5,
    color: COLORS.black,
    fontWeight: 'bold',
    maxWidth: '50%',
  },
  cardDivider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    width: '100%',
  },
  tabTitleStyle: {},
});

export default index;
