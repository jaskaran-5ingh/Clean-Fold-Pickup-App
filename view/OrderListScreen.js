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

const OrderListScreen = ({navigation}) => {
	const [ loader , setLoader] = useState(false);
	const [ modalVisible , setModalVisible] = useState(false);
	const [ email , setEmail] = useState('');
	const [ password , setPassword] = useState('');

	useEffect(() => {

	})
	return (
		<SafeAreaView style={{flex:1}}>
            <HeaderComponent LeftIcon="false"  HeaderTitle="List Orders" RightIcon="false" showUserDetails="false" />
            <View style={{position: 'absolute',bottom: 10,zIndex: 99999,right: 10}}>
                <Pressable style={{backgroundColor: 'green',padding: 14,width: 70,height: 70,borderRadius: 100}} onPress={() => {navigation.push('OrderCreate')}}>
                    <Icon name="add" color="white" size={40}/>
                </Pressable>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Text style={style.modalText}>Are you want to change the status to Done ...?</Text>
                        <View style={{ flexDirection: 'row',justifyContent: 'space-evenly' ,width: '80%'}}>
                            <Pressable
                            style={[style.button, style.buttonOpen]}
                            onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={style.textStyle}>No</Text>
                            </Pressable>
                            <Pressable
                            style={[style.button, style.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={style.textStyle}>Yes</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <ScrollView >
                <View style={GlobalStyle.screenStyle}>
                    <View style={GlobalStyle.mainContainer}>
                        <View style={GlobalStyle.rowContainer}>
                            <View style={GlobalStyle.cardWithoutPadding}>
                                <View style={GlobalStyle.widgetContainerCornerText}>
                                    <Text style={GlobalStyle.DateTimeOrder}>02/07/2021 - 09:22</Text>
                                    <Text style={GlobalStyle.orderId}>Order123</Text>
                                </View>
                                <View style={{justifyContent: 'space-between',flexDirection: 'row',paddingHorizontal: 20,paddingTop: 10}}>
                                    <View style={{width: '80%'}}>
                                        <Text style={GlobalStyle.cardCustomenrName}>Sandeep Singh</Text>
                                        <Text style={GlobalStyle.cardCustomenrAddress}>This is my address</Text>
                                    </View>
                                    <View>
                                        <Text>Remarks</Text>
                                    </View>
                                </View>
                                <View style={GlobalStyle.buttonGroup}>
                                    <Pressable style={GlobalStyle.doneButton} onPress={() => setModalVisible(true)} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Done</Text>
                                    </Pressable>
                                    <Pressable style={{padding: 7,backgroundColor: 'orange',width: '33%',justifyContent: 'center'}} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Edit</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { navigation.push('createBill')}} style={{padding: 7,backgroundColor: 'skyblue',width: '33%',justifyContent: 'center'}} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Create Bill</Text>
                                    </Pressable>

                                </View>
                            </View>
                         </View>
                        <View style={GlobalStyle.rowContainer}>
                            <View style={GlobalStyle.cardWithoutPadding}>
                                <View style={GlobalStyle.widgetContainerCornerText}>
                                    <Text style={GlobalStyle.DateTimeOrder}>02/07/2021 - 09:22</Text>
                                    <Text style={GlobalStyle.orderId}>Order123</Text>
                                </View>
                                <View style={{justifyContent: 'space-between',flexDirection: 'row',paddingHorizontal: 20,paddingTop: 10}}>
                                    <View style={{width: '80%'}}>
                                        <Text style={GlobalStyle.cardCustomenrName}>Sandeep Singh</Text>
                                        <Text style={GlobalStyle.cardCustomenrAddress}>This is my address</Text>
                                    </View>
                                    <View>
                                        <Text>Remarks</Text>
                                    </View>
                                </View>
                                <View style={GlobalStyle.buttonGroup}>
                                    <Pressable style={GlobalStyle.doneButton} onPress={() => setModalVisible(true)} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Done</Text>
                                    </Pressable>
                                    <Pressable style={{padding: 7,backgroundColor: 'orange',width: '33%',justifyContent: 'center'}} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Edit</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { navigation.push('createBill')}} style={{padding: 7,backgroundColor: 'skyblue',width: '33%',justifyContent: 'center'}} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Create Bill</Text>
                                    </Pressable>

                                </View>
                            </View>
                         </View>
                        <View style={GlobalStyle.rowContainer}>
                            <View style={GlobalStyle.cardWithoutPadding}>
                                <View style={GlobalStyle.widgetContainerCornerText}>
                                    <Text style={GlobalStyle.DateTimeOrder}>02/07/2021 - 09:22</Text>
                                    <Text style={GlobalStyle.orderId}>Order123</Text>
                                </View>
                                <View style={{justifyContent: 'space-between',flexDirection: 'row',paddingHorizontal: 20,paddingTop: 10}}>
                                    <View style={{width: '80%'}}>
                                        <Text style={GlobalStyle.cardCustomenrName}>Sandeep Singh</Text>
                                        <Text style={GlobalStyle.cardCustomenrAddress}>This is my address</Text>
                                    </View>
                                    <View>
                                        <Text>Remarks</Text>
                                    </View>
                                </View>
                                <View style={GlobalStyle.buttonGroup}>
                                    <Pressable style={GlobalStyle.doneButton} onPress={() => setModalVisible(true)} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Done</Text>
                                    </Pressable>
                                    <Pressable style={{padding: 7,backgroundColor: 'orange',width: '33%',justifyContent: 'center'}} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Edit</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { navigation.push('createBill')}} style={{padding: 7,backgroundColor: 'skyblue',width: '33%',justifyContent: 'center'}} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Create Bill</Text>
                                    </Pressable>

                                </View>
                            </View>
                         </View>
                        <View style={GlobalStyle.rowContainer}>
                            <View style={GlobalStyle.cardWithoutPadding}>
                                <View style={GlobalStyle.widgetContainerCornerText}>
                                    <Text style={GlobalStyle.DateTimeOrder}>02/07/2021 - 09:22</Text>
                                    <Text style={GlobalStyle.orderId}>Order123</Text>
                                </View>
                                <View style={{justifyContent: 'space-between',flexDirection: 'row',paddingHorizontal: 20,paddingTop: 10}}>
                                    <View style={{width: '80%'}}>
                                        <Text style={GlobalStyle.cardCustomenrName}>Sandeep Singh</Text>
                                        <Text style={GlobalStyle.cardCustomenrAddress}>This is my address</Text>
                                    </View>
                                    <View>
                                        <Text>Remarks</Text>
                                    </View>
                                </View>
                                <View style={GlobalStyle.buttonGroup}>
                                    <Pressable style={GlobalStyle.doneButton} onPress={() => setModalVisible(true)} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Done</Text>
                                    </Pressable>
                                    <Pressable style={{padding: 7,backgroundColor: 'orange',width: '33%',justifyContent: 'center'}} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Edit</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { navigation.push('createBill')}} style={{padding: 7,backgroundColor: 'skyblue',width: '33%',justifyContent: 'center'}} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Create Bill</Text>
                                    </Pressable>

                                </View>
                            </View>
                         </View>
                        <View style={GlobalStyle.rowContainer}>
                            <View style={GlobalStyle.cardWithoutPadding}>
                                <View style={GlobalStyle.widgetContainerCornerText}>
                                    <Text style={GlobalStyle.DateTimeOrder}>02/07/2021 - 09:22</Text>
                                    <Text style={GlobalStyle.orderId}>Order123</Text>
                                </View>
                                <View style={{justifyContent: 'space-between',flexDirection: 'row',paddingHorizontal: 20,paddingTop: 10}}>
                                    <View style={{width: '80%'}}>
                                        <Text style={GlobalStyle.cardCustomenrName}>Sandeep Singh</Text>
                                        <Text style={GlobalStyle.cardCustomenrAddress}>This is my address</Text>
                                    </View>
                                    <View>
                                        <Text>Remarks</Text>
                                    </View>
                                </View>
                                <View style={GlobalStyle.buttonGroup}>
                                    <Pressable style={GlobalStyle.doneButton} onPress={() => setModalVisible(true)} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Done</Text>
                                    </Pressable>
                                    <Pressable style={{padding: 7,backgroundColor: 'orange',width: '33%',justifyContent: 'center'}} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Edit</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { navigation.push('createBill')}} style={{padding: 7,backgroundColor: 'skyblue',width: '33%',justifyContent: 'center'}} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Create Bill</Text>
                                    </Pressable>

                                </View>
                            </View>
                         </View>
                        <View style={GlobalStyle.rowContainer}>
                            <View style={GlobalStyle.cardWithoutPadding}>
                                <View style={GlobalStyle.widgetContainerCornerText}>
                                    <Text style={GlobalStyle.DateTimeOrder}>02/07/2021 - 09:22</Text>
                                    <Text style={GlobalStyle.orderId}>Order123</Text>
                                </View>
                                <View style={{justifyContent: 'space-between',flexDirection: 'row',paddingHorizontal: 20,paddingTop: 10}}>
                                    <View style={{width: '80%'}}>
                                        <Text style={GlobalStyle.cardCustomenrName}>Sandeep Singh</Text>
                                        <Text style={GlobalStyle.cardCustomenrAddress}>This is my address</Text>
                                    </View>
                                    <View>
                                        <Text>Remarks</Text>
                                    </View>
                                </View>
                                <View style={GlobalStyle.buttonGroup}>
                                    <Pressable style={GlobalStyle.doneButton} onPress={() => setModalVisible(true)} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Done</Text>
                                    </Pressable>
                                    <Pressable style={{padding: 7,backgroundColor: 'orange',width: '33%',justifyContent: 'center'}} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Edit</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { navigation.push('createBill')}} style={{padding: 7,backgroundColor: 'skyblue',width: '33%',justifyContent: 'center'}} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Create Bill</Text>
                                    </Pressable>

                                </View>
                            </View>
                         </View>
                        <View style={GlobalStyle.rowContainer}>
                            <View style={GlobalStyle.cardWithoutPadding}>
                                <View style={GlobalStyle.widgetContainerCornerText}>
                                    <Text style={GlobalStyle.DateTimeOrder}>02/07/2021 - 09:22</Text>
                                    <Text style={GlobalStyle.orderId}>Order123</Text>
                                </View>
                                <View style={{justifyContent: 'space-between',flexDirection: 'row',paddingHorizontal: 20,paddingTop: 10}}>
                                    <View style={{width: '80%'}}>
                                        <Text style={GlobalStyle.cardCustomenrName}>Sandeep Singh</Text>
                                        <Text style={GlobalStyle.cardCustomenrAddress}>This is my address</Text>
                                    </View>
                                    <View>
                                        <Text>Remarks</Text>
                                    </View>
                                </View>
                                <View style={GlobalStyle.buttonGroup}>
                                    <Pressable style={GlobalStyle.doneButton} onPress={() => setModalVisible(true)} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Done</Text>
                                    </Pressable>
                                    <Pressable style={{padding: 7,backgroundColor: 'orange',width: '33%',justifyContent: 'center'}} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Edit</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { navigation.push('createBill')}} style={{padding: 7,backgroundColor: 'skyblue',width: '33%',justifyContent: 'center'}} >
                                        <Text style={{textAlign: 'center',color: 'white'}}>Create Bill</Text>
                                    </Pressable>

                                </View>
                            </View>
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

export default OrderListScreen;