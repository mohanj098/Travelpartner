import AsyncStorage from '@react-native-async-storage/async-storage';
const StoreData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
        console.log(e+"\nin storing data: "+{key}+":"+ {value})
    }
}

export default StoreData;