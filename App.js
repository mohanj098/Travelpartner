import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Modal} from 'react-native';
import GetData from './db/GetData';
import User from './Forms/User';

export default function App() {
  const [show, setshow] = useState(false);
  GetData('user').then((value) => {
    if (value === null) {
      setshow(true);
    }
  })
  return (
      <View style={styles.container}>
          <Modal
            visible={show}
            animationType="slide"
            transparent={true}>
            <View style={styles.modal}>
              <User setshow={setshow} />
            </View>
          </Modal>
        <Text>hello</Text>
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    padding: 10,
    margin: 10,
    marginVertical: '15%',
    backgroundColor: 'pink',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,

  }
});
