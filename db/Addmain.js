import AsyncStorage from '@react-native-async-storage/async-storage';
import GetData from './GetData';

export default function Addmain(values, showmain, index, extra, setextra) {
    GetData('trip')
      .then((value) => {
        const data=value;
        let newdata=JSON.parse(data);
        if(!newdata[index].main){
          newdata[index].main=[];
        }
        newdata[index].main.push(values);
        newdata[index].maintotal=newdata[index].maintotal+parseInt(values.fare);
        newdata[index].total=newdata[index].total+parseInt(values.fare)
        AsyncStorage.setItem('trip', JSON.stringify(newdata)).then(()=>{
          setextra(!extra);
          showmain(false);
        }).catch(e=>{console.log(e)}); 
      })
      .catch((e) => console.log(e));
  }