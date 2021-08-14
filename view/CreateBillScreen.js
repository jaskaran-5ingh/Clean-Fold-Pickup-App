import React, { useState } from 'react';
import {
    Dimensions,
    Image,
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
import { Icon } from 'react-native-elements';

const CreateBillScreen = () => {
    const [ subCat, setSubcategory] = useState(1);
    const [ userImg, setUserImage] = useState(1);
    const windowWidth = Dimensions.get('window').width;
    const subcategory = [
        {
            'name' : 'men',
            'id' : 1
        },
        {
            'name' : 'Women',
            'id' : 2
        },
        {
            'name' : 'Kids',
            'id' : 3
        },
        {
            'name' : 'Kids',
            'id' : 4
        },
    ];
    const userImage = [
        {
            id: 1,
            image: '../assets/images/deliveryBoy.png',
            type: 'active',
            name: 'dry clean'
        },
        {
            id: 2,
            image: '../assets/images/deliveryBoy.png',
            type: 'deactive',
            name: 'Express dry clean'
        },
        {
            id: 3,
            image: '../assets/images/deliveryBoy.png',
            type: 'deactive',
            name: 'wash and fold'
        },
        {
            id: 4,
            image: '../assets/images/deliveryBoy.png',
            type: 'deactive',
            name: 'wash and iron'
        },
        {
            id: 5,
            image: '../assets/images/deliveryBoy.png',
            type: 'deactive',
            name: 'stream icon'
        },
        {
            id: 6,
            image: '../assets/images/deliveryBoy.png',
            type: 'deactive',
            name: 'sofa spa'
        },
        {
            id: 7,
            image: '../assets/images/deliveryBoy.png',
            type: 'deactive',
            name: 'car spa'
        },
        {
            id: 8,
            image: '../assets/images/deliveryBoy.png',
            type: 'deactive',
            name: 'carpet spa'
        },
    ]
	return (
        <View style={GlobalStyle.screenStyle}>
            <HeaderComponent LeftIcon="true" showRightIcon="false" headerName="Sandeep Singh" headerAddress="This is my header address" HeaderTitle="Create Bill" RightIcon="false" showUserDetails="true"  />
            <View style={{}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection: 'row',paddingHorizontal: 10,marginVertical: 10}}>
                        {Object.values(userImage).map((value) => {
                            return(
                                <View key={value.id} style={[ {marginRight: 10} ,(value.id == subCat)? style.activeSubCategory : null] }>
                                    <View style={[style.categoryContainer]}>
                                        <Pressable onPress={() => { setSubcategory(value.id) }} style={{margin: 29}}>
                                            <Image
                                                style={style.category}
                                                source={require('../assets/images/deliveryBoy.png')}
                                            />
                                            <Text style={{textAlign: 'center',paddingHorizontal:5,textTransform: 'uppercase',color: 'white'}}>{value.name}</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
                <View style={{flexDirection: 'row',justifyContent: 'center',flexWrap: 'wrap',backgroundColor:'skyblue'}}>
                    {Object.values(subcategory).map((value) => {
                        return(
                            <Pressable key={value.id} onPress={() => { setUserImage(value.id) }} style={( value.id == userImg ) ? {backgroundColor: 'white',paddingHorizontal: 20} : {backgroundColor: 'skyblue',paddingHorizontal: 20}}>
                                <Text style={( value.id == userImg ) ? {textAlign: 'center',fontSize: 17,paddingVertical: 10,textTransform: 'uppercase',color: 'skyblue'} : {textAlign: 'center',fontSize: 17,paddingVertical: 10,textTransform: 'uppercase',color: 'white'}}>{value.name}</Text>
                            </Pressable>
                        )
                    })}
                </View>
                <View>
                    <ScrollView vertical={true} style={{padding: 10,flexWrap: 'wrap' }}>
                        <View style={{flexDirection: 'row',flexWrap: 'wrap',justifyContent:'space-around'}}>
                            <View style={{ borderWidth: 2, borderColor: 'lightgrey',width: 110,paddingBottom: 5,borderRadius: 10,overflow: 'hidden',marginBottom: 10 }}>
                                <Image source={ require('../assets/images/coat.jpeg') } style={{width: '100%' , height: 100}} />
                                <Text style={{textAlign: 'center',color: 'grey'}}>Blazer</Text>
                                <View style={{flexDirection: 'row' ,justifyContent:'space-around'}}>
                                    <View>
                                        <Pressable style={{backgroundColor: 'skyblue',borderRadius: 100,padding: 6}} >
                                            <Icon size={12} name="minus" type="font-awesome" color="white" />
                                        </Pressable>
                                    </View>
                                    <View><Text>10</Text></View>
                                    <View>
                                        <Pressable style={{backgroundColor: 'skyblue',borderRadius: 100,padding: 6}} >
                                            <Icon size={12} name="plus" type="font-awesome" color="white" />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>    
                            <View style={{ borderWidth: 2, borderColor: 'lightgrey',width: 110,paddingBottom: 5,borderRadius: 10,overflow: 'hidden',marginBottom: 10 }}>
                                <Image source={ require('../assets/images/coat.jpeg') } style={{width: '100%' , height: 100}} />
                                <Text style={{textAlign: 'center',color: 'grey'}}>Blazer</Text>
                                <View style={{flexDirection: 'row' ,justifyContent:'space-around'}}>
                                    <View>
                                        <Pressable style={{backgroundColor: 'skyblue',borderRadius: 100,padding: 6}} >
                                            <Icon size={12} name="minus" type="font-awesome" color="white" />
                                        </Pressable>
                                    </View>
                                    <View><Text>10</Text></View>
                                    <View>
                                        <Pressable style={{backgroundColor: 'skyblue',borderRadius: 100,padding: 6}} >
                                            <Icon size={12} name="plus" type="font-awesome" color="white" />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>    
                            <View style={{ borderWidth: 2, borderColor: 'lightgrey',width: 110,paddingBottom: 5,borderRadius: 10,overflow: 'hidden',marginBottom: 10 }}>
                                <Image source={ require('../assets/images/coat.jpeg') } style={{width: '100%' , height: 100}} />
                                <Text style={{textAlign: 'center',color: 'grey'}}>Blazer</Text>
                                <View style={{flexDirection: 'row' ,justifyContent:'space-around'}}>
                                    <View>
                                        <Pressable style={{backgroundColor: 'skyblue',borderRadius: 100,padding: 6}} >
                                            <Icon size={12} name="minus" type="font-awesome" color="white" />
                                        </Pressable>
                                    </View>
                                    <View><Text>10</Text></View>
                                    <View>
                                        <Pressable style={{backgroundColor: 'skyblue',borderRadius: 100,padding: 6}} >
                                            <Icon size={12} name="plus" type="font-awesome" color="white" />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>    
                            <View style={{ borderWidth: 2, borderColor: 'lightgrey',width: 110,paddingBottom: 5,borderRadius: 10,overflow: 'hidden',marginBottom: 10 }}>
                                <Image source={ require('../assets/images/coat.jpeg') } style={{width: '100%' , height: 100}} />
                                <Text style={{textAlign: 'center',color: 'grey'}}>Blazer</Text>
                                <View style={{flexDirection: 'row' ,justifyContent:'space-around'}}>
                                    <View>
                                        <Pressable style={{backgroundColor: 'skyblue',borderRadius: 100,padding: 6}} >
                                            <Icon size={12} name="minus" type="font-awesome" color="white" />
                                        </Pressable>
                                    </View>
                                    <View><Text>10</Text></View>
                                    <View>
                                        <Pressable style={{backgroundColor: 'skyblue',borderRadius: 100,padding: 6}} >
                                            <Icon size={12} name="plus" type="font-awesome" color="white" />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>    
                            <View style={{ borderWidth: 2, borderColor: 'lightgrey',width: 110,paddingBottom: 5,borderRadius: 10,overflow: 'hidden',marginBottom: 10 }}>
                                <Image source={ require('../assets/images/coat.jpeg') } style={{width: '100%' , height: 100}} />
                                <Text style={{textAlign: 'center',color: 'grey'}}>Blazer</Text>
                                <View style={{flexDirection: 'row' ,justifyContent:'space-around'}}>
                                    <View>
                                        <Pressable style={{backgroundColor: 'skyblue',borderRadius: 100,padding: 6}} >
                                            <Icon size={12} name="minus" type="font-awesome" color="white" />
                                        </Pressable>
                                    </View>
                                    <View><Text>10</Text></View>
                                    <View>
                                        <Pressable style={{backgroundColor: 'skyblue',borderRadius: 100,padding: 6}} >
                                            <Icon size={12} name="plus" type="font-awesome" color="white" />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>    
                            <View style={{ borderWidth: 2, borderColor: 'lightgrey',width: 110,paddingBottom: 5,borderRadius: 10,overflow: 'hidden',marginBottom: 10 }}>
                                <Image source={ require('../assets/images/coat.jpeg') } style={{width: '100%' , height: 100}} />
                                <Text style={{textAlign: 'center',color: 'grey'}}>Blazer</Text>
                                <View style={{flexDirection: 'row' ,justifyContent:'space-around'}}>
                                    <View>
                                        <Pressable style={{backgroundColor: 'skyblue',borderRadius: 100,padding: 6}} >
                                            <Icon size={12} name="minus" type="font-awesome" color="white" />
                                        </Pressable>
                                    </View>
                                    <View><Text>10</Text></View>
                                    <View>
                                        <Pressable style={{backgroundColor: 'skyblue',borderRadius: 100,padding: 6}} >
                                            <Icon size={12} name="plus" type="font-awesome" color="white" />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>    
                        </View>
                    </ScrollView>
                </View>
                
            </View>
           
        </View>
	);
}
const style = StyleSheet.create({
    categoryContainer: {
        width: 70,
        height: 125,
        overflow: 'hidden',
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth:4,
        borderColor: 'transparent'
    },
    category:{
        width: 70,
        height: 70,padding: 10
    },
    activeSubCategory:{
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'skyblue'
    }
})

export default CreateBillScreen;