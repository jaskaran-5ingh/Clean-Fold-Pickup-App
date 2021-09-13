import React from 'react';
import {
    ActivityIndicator, StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { COLORS, FONTS } from '../../constants';

const card = (props) => {

    let {
        backgroundColor = 'white',
        icon = 'user',
        color = 'red',
        title = 'title',
        qty = 0,
        fullWidth = false,
        onPress = () => { },
        qtyAvailable = true,
        loading = false,
    } = props;

    return (
        <>
            <TouchableOpacity
                onPress={onPress}
                style={[
                    {
                        height: fullWidth ? 200 : 160,
                        width: fullWidth ? '100%' : '48%',
                        backgroundColor,
                    },
                    styles.cardComponentContainer
                ]}>
                <View
                    style={{
                        height: fullWidth ? 80 : 50,
                        width: fullWidth ? 80 : 50,
                        borderRadius: 0.4 * (fullWidth ? 80 : 50),
                        justifyContent: 'center',
                        backgroundColor: color,
                    }}>
                    <Icon type="font-awesome" color={COLORS.white} name={icon} size={30} />
                </View>
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={[styles.heading5, { color: color }]}>{title}</Text>
                </View>
                {qtyAvailable == true ? (
                    <View
                        style={[{ backgroundColor: color }, styles.countBoxContainer]}>
                        <Text style={[styles.heading5, { color: COLORS.white }]}>
                            {loading ? <ActivityIndicator color="white" /> : <>{qty}</>}
                        </Text>
                    </View>
                ) : null}
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    heading5: {
        ...FONTS.h4,
        fontWeight: 'bold',
    },
    cardComponentContainer: {
        padding: 5,
        marginTop: 15,
        borderRadius: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    countBoxContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    }
})

export default React.memo(card);
