
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import {
    COLORS, responsiveFontSize,
    responsiveHeight, SIZES
} from '../constants';
const Tab = createMaterialTopTabNavigator();


function OrderDetails() {
    return (
        <View>
            <Text>This is</Text>
        </View>
    );
}

export default function AppTabNavigator() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primaryFont }}>
            <NavigationContainer independent={true}>
                <Tab.Navigator
                    initialRouteName="Hot Deals"
                    screenOptions={{
                        activeTintColor: COLORS.primary,
                        inactiveTintColor: '#babab9',
                        labelStyle: {
                            fontSize: responsiveFontSize(1.8),
                            fontWeight: 'bold',
                        },
                        style: {
                            backgroundColor: COLORS.primaryFont,
                            elevation: 3,
                            height: responsiveHeight(7),
                            justifyContent: 'center',
                        },
                        indicatorStyle: {
                            borderBottomWidth: 4,
                            borderColor: COLORS.primary,
                            borderRadius: SIZES.radius / 3,
                        },
                    }}>
                    <Tab.Screen
                        name="Order Details"
                        component={OrderDetails}
                    />
                    <Tab.Screen name="Order Items" component={OrderDetails} />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}
