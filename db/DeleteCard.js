import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { linear } from "react-native/Libraries/Animated/src/Easing";

export default async function DeleteCard(index) {
  AsyncStorage.getItem("trip").then(Data=>JSON.parse(Data))
  .then((data) => {
    const length = data.length;
    var newdata = [];
    var i = 0;
    for (; i < index; i++) {
      newdata.push(data[i]);
    }
    var j = index + 1;
    for (; j < length; j++) {
      const object = { ...data[j], key: i++ };
      newdata.push(object);
    }
    // console.log(newdata);
    AsyncStorage.setItem('trip', JSON.stringify(newdata)).then(()=>{
      return true
    })
  })
  .catch(e=>{console.log(e); return false})
}
