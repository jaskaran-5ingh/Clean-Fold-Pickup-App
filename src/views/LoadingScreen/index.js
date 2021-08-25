import React from 'react';
import {StyleSheet, View} from 'react-native';
import {animations, responsiveWidth} from '../../constants';
import LottieView from 'lottie-react-native';

const index = () => {
    return (
        <View style={styles.container}>
            <LottieView
                source={animations.loading}
                autoPlay
                loop
                style={{width: responsiveWidth(100)}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

export default index;
