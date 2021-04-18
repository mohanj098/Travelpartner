import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'

export default async function Deleterow(table, index, subindex){
  const trip= await AsyncStorage.getItem('trip');
  var data = JSON.parse(trip);
  if(table===1){
    const exact=data[index].other;
    exact.splice(subindex, 1);
    data[index].other=exact;
    const final=JSON.stringify(data);
    const ok= await AsyncStorage.setItem('trip', final)
    return ok;
  }
  if(table===0){
    const exact=data[index].main;
    exact.splice(subindex, 1);
    data[index].main=exact;
    const final=JSON.stringify(data);
    const ok=await AsyncStorage.setItem('trip', final)
    return ok;
  }
}