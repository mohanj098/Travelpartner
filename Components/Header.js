import React from 'react';
import {StyleSheet, View, Text} from  'react-native';

export default function Header(props){
    return(
        <View style={styles.header}>
            <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    header:{
        height: 45,
        marginTop:0,
        backgroundColor: '#5f38ab',
        width: '100%',
        alignItems:'center',
        position:'absolute'
    },
    title:{
        fontSize:25,
        marginHorizontal: 15,
        margin:'auto',
        textTransform:'capitalize',
        color:'white'

    }
})