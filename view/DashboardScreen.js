import React from 'react';
import {
    Pressable,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import GlobalStyle from '../Styles/GlobalCSS';

const DashboardScreen = ({navigation}) => {
	return (
        <View style={GlobalStyle.screenStyle}>
            <HeaderComponent LeftIcon="false" headerName="Sandeep Singh" headerAddress="false" showRightIcon="true" HeaderTitle="Dashboard" RightIcon="false" showUserDetails="true" />
            <View style={GlobalStyle.mainContainer}>
                <Text style={ GlobalStyle.normalHeaders }>My Pendings</Text>

                <View style={GlobalStyle.widgetContainer}>
                    <Pressable onPress={() => { navigation.push('ListOrders')}}>
                        <View style={GlobalStyle.card}>
                            <Text style={GlobalStyle.cardHeader}>Pickups</Text>
                            <Text style={GlobalStyle.cardCount}>20</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => { navigation.push('ListOrders')}}>
                        <View style={GlobalStyle.card}>
                            <Text style={GlobalStyle.cardHeader}>Deliveries</Text>
                            <Text style={GlobalStyle.cardCount}>10</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
	);
}

export default DashboardScreen;