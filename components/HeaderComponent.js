import React from 'react';
import {
	Image,
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
import { Icon } from 'react-native-elements';

const HeaderComponent = ({LeftIcon , showRightIcon, headerName , headerAddress ,HeaderTitle , RightIcon ,showUserDetails  }) => {
	return (
        <View >
			{( showUserDetails != "true" ) ? 
				<View style={styles.HeaderContainer}>
					<View>
						{(LeftIcon != 'false') ? <Icon name="chevron-left" type="font-awesome" color="white" style={{marginTop: 7}} size={20} /> : <Text></Text>}
					</View>
					<View >
						<Text style={GlobalStyle.headerStyle}>{HeaderTitle}</Text>
					</View>
					<View>
						{(RightIcon != 'false') ? <Text>Right Icon</Text> : <Text></Text>}
					</View>
				</View>
			:
			
				<View style={{backgroundColor: 'skyblue',padding: 20,paddingTop: 0,borderBottomRightRadius: 30,borderBottomLeftRadius: 30,elevation: 10}}>
					<View style={styles.HeaderContainer}>
						<View>
							{(LeftIcon != 'false') ? <Icon name="chevron-left" type="font-awesome" color="white" style={{marginTop: 7}} size={20} /> : <Text></Text>}
						</View>
						<View >
							<Text style={GlobalStyle.headerStyleWhite}>{HeaderTitle}</Text>
						</View>
						<View>
							{(RightIcon != 'false') ? <Text>Right Icon</Text> : <Text></Text>}
						</View>
					</View>
					<View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
						<View>
							<Text style={GlobalCSS.userName}>{headerName}</Text>
							{( headerAddress != 'false' ) ? 
								<Text style={GlobalCSS.userAddress}>{headerAddress}</Text>
							:
								null
							}
						</View>
						{(showRightIcon != 'false') ? 
							<View style={{width: 200}}>
								<Image
									style={styles.tinyLogo}
									source={require('../assets/images/deliveryBoy.png')}
									/>
							</View>
						:
							null
						}
						
					</View>
					
				</View>
			}
			
			
        </View>
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

export default HeaderComponent;