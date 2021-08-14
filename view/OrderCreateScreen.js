import React, { useEffect, useState } from 'react';
import {
	Image,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
    Modal
} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import ButtonLoaderContainer from '../components/ButtonLoaderContainer';
import HeaderComponent from '../components/HeaderComponent';
import InputComponent from '../components/InputComponent';
import GlobalStyle from '../Styles/GlobalCSS';
import { Icon } from 'react-native-elements';

const OrderCreateScreen = ({navigation}) => {
	const [ loader , setLoader] = useState(false);

	useEffect(() => {

	})
	return (
		<SafeAreaView style={{flex:1}}>
            <HeaderComponent LeftIcon="false"  HeaderTitle="Order Create" RightIcon="false" showUserDetails="false" />

            <ScrollView >
                <View style={GlobalStyle.screenStyle}>
                    <View style={GlobalStyle.mainContainer}>
                            
                        <View>
                            <InputComponent placeholder="Mobile" inputType="text" onChangeText={() => {}} defaultValue="null" iconType="mobile" />
                            <InputComponent placeholder="Name" inputType="text" onChangeText={() => {}} defaultValue="null" iconType="user" />

                            <InputComponent placeholder="Category" inputType="text" onChangeText={() => {}} defaultValue="null" iconType="list" />

                            <InputComponent placeholder="Pickup DateTime" inputType="text" onChangeText={() => {}} defaultValue="null" iconType="calendar-check-o" />
                            <InputComponent placeholder="Delivery DateTime" inputType="text" onChangeText={() => {}} defaultValue="null" iconType="calendar-check-o" />

                            <InputComponent placeholder="Remarks" inputType="text" onChangeText={() => {}} defaultValue="null" iconType="comment" />

                            {(!loader)?
                                <ButtonComponent press={() => { setLoader(true) , setTimeout(() => { navigation.push('Dashboard')  } , 2000) }} buttonText="Create Order"></ButtonComponent>
                            :
                                <ButtonLoaderContainer></ButtonLoaderContainer>
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
		</SafeAreaView>
	);
}
const style = StyleSheet.create({
	logoContainer:{
		justifyContent:'center',
		flex: 3,
		alignItems: 'center',
	},
	tinyLogo:{
	},
    listOrdersCard:{

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    buttonOpen: {
        backgroundColor: "red",
        paddingHorizontal: 40,
        borderRadius: 20,
        marginTop: 20
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        paddingHorizontal: 40,
        borderRadius: 20,
        marginTop: 20
    },
    button: {
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
})

export default OrderCreateScreen;