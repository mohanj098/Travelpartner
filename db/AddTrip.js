import AsyncStorage from '@react-native-async-storage/async-storage';
const Addtrip = async (value) => {
    try {
        const trip = await AsyncStorage.getItem('trip')
        let newtrip=JSON.parse(trip);
        if(!newtrip) {
          newtrip=[]
        }
        const data={key:newtrip.length , title: value.title, main: '', other: '', total:0, maintotal:0, othertotal:0}
        newtrip.push(data);
        await AsyncStorage.setItem('trip', JSON.stringify(newtrip));
        return true;
      } catch(e) {
          return false;
      }
}

export default Addtrip;