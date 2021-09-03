import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, responsiveHeight, responsiveWidth, SIZES } from '../constants';

const Button = ({
                    height = responsiveHeight(6),
                    width = '100%',
                    title = 'Button',
                    titleColor = 'white',
                    backgroundColor = COLORS.primary,
                    onPress,
                }) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    width,
                    height,
                    backgroundColor,
                },
            ]}
            onPress={onPress}>
            <Text
                style={{
                    color: titleColor,
                }}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 4,
        borderRadius: SIZES.radius / 2,
        shadowColor: COLORS.darkgray,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: responsiveHeight(2),
        marginVertical: responsiveWidth(2),
    },
});

export default Button;
