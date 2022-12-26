import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNetInfo} from '@react-native-community/netinfo';

import {Button} from '../../components';
import {LoadingScreen} from '..';
import {
  animations,
  COLORS,
  FONTS,
  responsiveHeight,
  responsiveWidth,
} from '../../constants';

const index = ({getAlerts}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] = useState(false);
    const netInfo = useNetInfo();
    return (
        <View style={styles.container}>
            {loading == true ? (
        <LoadingScreen />
            ) : (
                <>
                    <Text style={{...FONTS.h3, color: COLORS.secondary, padding: 10}}>
                        Sorry, Something went wrong !
                    </Text>
                    {netInfo.isConnected != true ? (
                        <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
                            Please check your internet connection!
                        </Text>
                    ) : null}
                    <LottieView
                        source={animations.noInternet}
                        autoPlay
                        loop
                        style={{width: responsiveWidth(60)}}
                    />
                    <Button
                        height={responsiveHeight(6)}
                        width="60%"
                        title="Retry"
                        titleColor="white"
                        backgroundColor={COLORS.secondary}
                        onPress={() => {
                            setLoading(!loading);
                            getAlerts();
                        }}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
});

export default index;
