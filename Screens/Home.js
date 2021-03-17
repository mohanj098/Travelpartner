import React from 'react';
import Header from '../Components/Header';
import Display from '../Components/Display';
import Add from '../Components/Add';
import { View, StatusBar, StyleSheet, Text } from 'react-native';

export default function Home({ navigation }) {
    return (
        <View style={styles.homecontainer}>
            <Header title="Home" />
            <Add add="trip" onPress={()=>{navigation.navigate("Trip")}}/>
            <Display navigation={navigation}/>
            <StatusBar style="auto" />
        </View>
    )

}

const styles = StyleSheet.create({
    homecontainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#d5def5',
        width: '100%',
        overflow: 'scroll'

    },
    cardcontainer: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
    },
    

})
