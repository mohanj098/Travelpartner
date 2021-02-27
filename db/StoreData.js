import AsyncStorage from '@react-native-async-storage/async-storage';
const StoreData = async (value) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(value))
    } catch (e) {
        console.log(e+"\nin storing data: "+ {value})
    }
}

export default StoreData;