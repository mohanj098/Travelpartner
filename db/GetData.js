import AsyncStorage from '@react-native-async-storage/async-storage';

const GetData = async () => {
    try {
      const value = await AsyncStorage.getItem('user')
      if(value !== null) {
        return value;
      }
      else{
        return null;
      }
    } catch(e) {
        console.log(e + "in getting data");
        return null;
    }
}

export default GetData;