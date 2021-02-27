import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Modal } from 'react-native';
import GetData from './db/GetData';
import User from './Forms/User';

export default function App() {
  const [show, setshow] =  useState(false);
  GetData().then((value)=>{
    if(value===null){
      setshow(true);
    }
  })
  return (
    <View style={styles.container}>
      <Modal visible={show}>
        <User setshow={setshow}/>
      </Modal>
      <Text>hello</Text>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
