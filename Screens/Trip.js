import React from 'react';
import Header from '../Components/Header';
import { Text, View, StyleSheet } from 'react-native'
import Tripover from '../Components/Forms/Tripoverview';

export default function Trip({navigation}) {
    return (
        <View style={styles.tripcontainer}>
            <Header title="ADd A trip"/>
            <Tripover navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    tripcontainer:{
        flex:1,
        width: '100%',
        backgroundColor: '#d5def5',
        alignItems: 'center',
    }
})