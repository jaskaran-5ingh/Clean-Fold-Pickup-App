import AsyncStorage from '@react-native-async-storage/async-storage';

const prefix = 'cache_';

const store = async (key, value) => {
  try {
    await AsyncStorage.setItem(prefix + key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

const get = async key => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    return value != null ? JSON.parse(value) : null;
  } catch (err) {
    console.error(err);
  }
};

const deleteItem = async key => {
  try {
    console.log(await AsyncStorage.removeItem(key));
  } catch (exception) {
    console.error(exception);
  }
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Done');
  } catch (error) {
    console.log(error);
  }
};

const getDeviceToken = async () => {
  return await get('user').then(user => {
    return user.api_token;
  });
};

export default {
  clearAll,
  deleteItem,
  store,
  get,
  getDeviceToken,
};
