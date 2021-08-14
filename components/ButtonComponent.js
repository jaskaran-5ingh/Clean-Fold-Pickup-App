import React from 'react';
import {
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
import GlobalCSS from '../Styles/GlobalCSS';
import GlobalStyle from '../Styles/GlobalCSS';

const ButtonComponent = ({ buttonText , press }) => {
	return (
        <Pressable style={GlobalStyle.buttonPrimary} onPress={press}>
            <Text style={{padding: 8,textAlign: 'center',fontSize: 20,color: 'white'}}>{buttonText}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
	HeaderContainer : {
		flexDirection : 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
		marginTop: 10
	},
	tinyLogo:{
		width: 100,
		height: 150,
		
	}

});

export default ButtonComponent;