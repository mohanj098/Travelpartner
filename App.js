import React, { useState } from 'react';
import { StyleSheet, View, Modal, StatusBar } from 'react-native';
import GetData from './db/GetData';
import User from './Components/Forms/User';
import Home from './Screens/Home';
import Trip from './Screens/Trip';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {
  const [show, setshow] = useState(false);
  GetData('user').then((value) => {
    if (value === null) {
      setshow(true);
    }
  })
  return (
    <NavigationContainer style={styles.container}>
      <Modal
        visible={false}
        animationType="slide"
        transparent={show}>
        <View style={styles.modal}>
          <User setshow={setshow} />
        </View>
      </Modal>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Trip" component={Trip} options={{headerShown:false}}/>
      </Stack.Navigator>
      <StatusBar backgroundColor="#714db8" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#d5def5',
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
  },
});
