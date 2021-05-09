import AsyncStorage from '@react-native-async-storage/async-storage';
import GetData from './GetData';

export default function Addother(values, showother, index, extra, setextra) {
    GetData('trip')
      .then((value) => {
        const data=value;
        let newdata=JSON.parse(data);
        if(!newdata[index].other){
          newdata[index].other=[];
        }
        newdata[index].other.push(values);
        newdata[index].othertotal=newdata[index].othertotal+parseInt(values.amountpaid);
        newdata[index].total=newdata[index].total+parseInt(values.amountpaid)
        AsyncStorage.setItem('trip', JSON.stringify(newdata)).then((value)=>{
          setextra(!extra);
          showother(false)
        }).catch(e=>{console.log(e)});
      })
      .catch((e) => console.log(e));
  }