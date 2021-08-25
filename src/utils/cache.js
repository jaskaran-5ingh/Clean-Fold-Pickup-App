import AsyncStorage from '@react-native-async-storage/async-storage';

const prefix = 'cache';

const store = async (key, value) => {
    try {
        await AsyncStorage.setItem(prefix + key, JSON.stringify(value));
    } catch (e) {
        console.error(e);
    }
};

const get = async key => {
    try {
        const value = await AsyncStorage.getItem(prefix + key);
        return value != null ? JSON.parse(value) : null;
    } catch (e) {
        console.log(e);
    }
};

const getDeviceToken = async () => {
    return await get('user').then(user => {
        return user.api_token;
    });
};

export default {
    store,
    get,
    getDeviceToken,
};
