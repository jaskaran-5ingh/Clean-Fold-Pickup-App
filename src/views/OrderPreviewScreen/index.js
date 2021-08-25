import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Badge, Tab, TabView} from 'react-native-elements';
import api from '../../api/services';
import {COLORS} from '../../constants';
import OrderDetails from './OrderDetails';
import OrderItems from './OrderItems';

const index = ({route, navigation}) => {
    const [loading, setLoading] = useState(true);
    const [orderDetails, setOrderDetails] = useState();
    const [orderItemsCount, setOrderItemsCount] = useState(0);
    const [orderItems, setOrderItems] = useState([]);
    const [orderCategory, setOrderCategory] = useState('');
    const [index, setIndex] = useState(1);

    useEffect(() => {
        try {
            getOrderDetails();
        } catch (err) {
            console.error(err);
        }
    }, []);

    async function getOrderDetails() {
        try {
            setLoading(true);
            const response = await api.getOrderDetailsByOrderId(
                route?.params?.orderId,
            );
            console.log(response?.data);
            setOrderDetails(response?.data?.data);
            setOrderItemsCount(response?.data?.data?.order_item.length);
            setOrderItems(response?.data?.data?.order_item);
            setOrderCategory(response?.data?.order_categories[0]);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <View style={styles.container}>
            <View
                style={{
                    margin: 15,
                    marginBottom: 0,
                }}>
                <Tab
                    value={index}
                    onChange={index => setIndex(index)}
                    indicatorStyle={styles.tabIndicator}
                    variant="primary">
                    <Tab.Item
                        title="order details"
                        buttonStyle={[
                            styles.tabButtonStyle,
                            index == 0
                                ? {
                                    backgroundColor: COLORS.primary,
                                    color: COLORS.white,
                                }
                                : null,
                        ]}
                        titleStyle={[
                            styles.tabTitleStyle,
                            index == 0
                                ? {
                                    color: 'white',
                                }
                                : null,
                        ]}
                    />
                    <Tab.Item
                        title="order items"
                        buttonStyle={[
                            styles.tabButtonStyle,
                            index == 1
                                ? {
                                    backgroundColor: COLORS.primary,
                                    color: COLORS.white,
                                }
                                : null,
                        ]}
                        titleStyle={[
                            styles.tabTitleStyle,
                            index == 1
                                ? {
                                    color: 'white',
                                }
                                : null,
                        ]}
                    />
                    <Badge
                        status="error"
                        value={orderItemsCount}
                        containerStyle={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                        }}
                        badgeStyle={{
                            height: 30,
                            width: 30,
                            borderRadius: 10,
                            elevation: 6,
                        }}
                    />
                </Tab>
            </View>

            <TabView value={index} onChange={setIndex}>
                <TabView.Item style={{width: '100%', flex: 1}}>
                    <>
                        {loading ? (
                            <View
                                style={{
                                    flex: 0.8,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <ActivityIndicator color={COLORS.primary} size={50}/>
                            </View>
                        ) : (
                            <OrderDetails
                                orderData={orderDetails}
                                orderCategory={orderCategory}
                            />
                        )}
                    </>
                </TabView.Item>
                <TabView.Item style={{width: '100%', flex: 1}}>
                    <>
                        {loading ? (
                            <View
                                style={{
                                    flex: 0.8,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <ActivityIndicator color={COLORS.primary} size={50}/>
                            </View>
                        ) : (
                            <OrderItems
                                orderItems={orderItems}
                                orderCategory={orderCategory}
                                orderId={orderDetails?.id}
                            />
                        )}
                    </>
                </TabView.Item>
            </TabView>
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
        fontSize: 14,
        fontWeight: 'bold',
        padding: 10,
    },
    tabButtonStyle: {
        backgroundColor: COLORS.white,
        borderWidth: 0.6,
        borderColor: COLORS.primary,
        shadowColor: COLORS.primary,
    },
    tabIndicator: {
        backgroundColor: COLORS.transparent,
        height: 3,
    },
});

export default index;
