import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Card, Badge} from 'react-native-elements';
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
          <View>
            <Text style={styles.cardTitle}>Order Date</Text>
            <Text
              style={[
                styles.cardTitleSmall,
                {
                  fontWeight: 'bold',
                  color: COLORS.black,
                },
              ]}>
              10-05-2021
            </Text>
          </View>
          <View>
            <Text style={styles.cardTitle}>Order Id</Text>
            <Text style={styles.cardTitleSmall}>598431256</Text>
          </View>
        </View>
        <Card.Divider />
        <ScrollView>
          <View>
            <View style={styles.cardDivider}>
              <Text style={styles.cardTitleDark}>Pickup Date</Text>
              <Text style={styles.cardTitleSmall}>10-05-2021</Text>
            </View>

            <View style={styles.cardDivider}>
              <Text style={styles.cardTitleDark}>Delivery Date</Text>
              <Text style={styles.cardTitleSmall}>14-05-2021</Text>
            </View>
            <Card.Divider />

            <View style={styles.cardDivider}>
              <Text style={styles.cardTitleDark}>Mobile</Text>
              <Text style={[styles.cardTitleDark, {color: COLORS.primary}]}>
                9530654704
              </Text>
            </View>
            <View style={styles.cardDivider}>
              <Text style={styles.cardTitleDark}>Order Type</Text>
              <Text style={styles.cardTitleSmall}>Normal</Text>
            </View>
            <View style={styles.cardDivider}>
              <Text style={styles.cardTitleDark}>Name </Text>
              <Text style={styles.cardTitleSmall}>Jaskaran Singh</Text>
            </View>

            <View style={styles.cardDivider}>
              <Text style={styles.cardTitleDark}>Order From </Text>
              <Text style={styles.cardTitleSmall}>Administration</Text>
            </View>

            <View style={styles.cardDivider}>
              <Text style={styles.cardTitleDark}>Address </Text>
              <Text style={[styles.cardTitleDark, {color: COLORS.primary}]}>
                143606,ChetanPura, Amrtisar
              </Text>
            </View>

            <View style={styles.cardDivider}>
              <Text style={styles.cardTitleDark}>Locality </Text>
              <Text style={[styles.cardTitleDark, {color: COLORS.primary}]}>
                Amrtisar
              </Text>
            </View>
          </View>
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
