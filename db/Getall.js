import AsyncStorage from '@react-native-async-storage/async-storage';


const Getall = async () =>{
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    return result;
  } catch (error) {
    console.error(error)
  }
}

export default Getall;