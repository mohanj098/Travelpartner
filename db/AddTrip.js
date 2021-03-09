import AsyncStorage from '@react-native-async-storage/async-storage';
const Addtrip = async (value) => {
    try {
        const data={title: value, main: '', other: '' }
        const trip = await AsyncStorage.getItem('trip')
        let newtrip=JSON.parse(trip);
        if(!newtrip) {
          newtrip=[]
        }
        newtrip.push(data);
        await AsyncStorage.setItem('trip', JSON.stringify(newtrip));
        return true;
      } catch(e) {
          return false;
      }
}

export default Addtrip;