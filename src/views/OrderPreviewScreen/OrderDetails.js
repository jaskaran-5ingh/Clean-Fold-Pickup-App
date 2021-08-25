import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import {COLORS, FONTS} from '../../constants';

const index = ({orderData, orderCategory}) => {
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
                            {orderData?.formated_date}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.cardTitle}>Order Id</Text>
                        <Text style={styles.cardTitleSmall}>{orderData?.id}</Text>
                    </View>
                </View>
                <Card.Divider/>
                <ScrollView>
                    <View>
                        <View style={styles.cardDivider}>
                            <Text style={styles.cardTitleDark}>Pickup Date</Text>
                            <Text style={styles.cardTitleSmall}>
                                {orderData?.pickup_time}
                            </Text>
                        </View>

                        <View style={styles.cardDivider}>
                            <Text style={styles.cardTitleDark}>Delivery Date</Text>
                            <Text style={styles.cardTitleSmall}>{orderData?.delv_time}</Text>
                        </View>

                        <Card.Divider/>

                        <View style={styles.cardDivider}>
                            <Text style={styles.cardTitleDark}>Mobile</Text>
                            <Text style={[styles.cardTitleDark, {color: COLORS.primary}]}>
                                {orderData?.mobile}
                            </Text>
                        </View>
                        <View style={styles.cardDivider}>
                            <Text style={styles.cardTitleDark}>Order Type</Text>
                            <Text style={styles.cardTitleSmall}>{orderData?.order_type}</Text>
                        </View>
                        <View style={styles.cardDivider}>
                            <Text style={styles.cardTitleDark}>Name </Text>
                            <Text style={styles.cardTitleSmall}> {orderData?.mobile}</Text>
                        </View>

                        <View style={styles.cardDivider}>
                            <Text style={styles.cardTitleDark}>Order From </Text>
                            <Text style={styles.cardTitleSmall}>
                                {orderData?.order_through == 'mobile_app'
                                    ? 'Mobile App'
                                    : 'Adminstration'}
                            </Text>
                        </View>

                        <View style={styles.cardDivider}>
                            <Text style={styles.cardTitleDark}>Address </Text>
                            <Text style={[styles.cardTitleDark, {color: COLORS.primary}]}>
                                {orderData?.address}
                            </Text>
                        </View>

                        <View style={styles.cardDivider}>
                            <Text style={styles.cardTitleDark}>Locality </Text>
                            <Text style={[styles.cardTitleDark, {color: COLORS.primary}]}>
                                {orderData?.location?.area_name}
                            </Text>
                        </View>
                        <Card.Divider/>
                        <View style={styles.cardDivider}>
                            <Text style={styles.cardTitleDark}>Category </Text>
                            <Text style={[styles.cardTitleDark, {color: COLORS.primary}]}>
                                {orderCategory}
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
