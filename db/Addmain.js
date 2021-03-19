import AsyncStorage from '@react-native-async-storage/async-storage';
import GetData from './GetData';

export default function Addmain(values, showmain, index) {
    console.log(values, index)
    GetData('trip')
      .then((value) => {
        const data=value;
        let newdata=JSON.parse(data);
        if(!newdata[index].main){
          newdata[index].main=[];
        }
        newdata[index].main.push(values);
        AsyncStorage.setItem('trip', JSON.stringify(newdata)).then(()=>{
          alert("done");
          showmain(false)
        }).catch(e=>{console.log(e)});

  
        
      })
      .catch((e) => console.log(e));
  }