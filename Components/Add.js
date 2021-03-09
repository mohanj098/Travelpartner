import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, StyleSheet, Text } from 'react-native';


export default function Add(props) {
    return (
        <View style={styles.addcontainer} >
            <MaterialIcons style={styles.addbutton} name="add" size={48} color="#5f38ab" onPress={props.onPress}/>
            <Text>Add a {props.add}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    addcontainer: {
        width: '100%',
        paddingBottom: 20,
        borderStyle:'dashed',
        borderBottomWidth:1,
        marginTop: 50,
        alignItems: 'center',
    },
})




