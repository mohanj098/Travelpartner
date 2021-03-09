import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Card(props){
    return(
        <TouchableOpacity style={styles.cardcontainer}>
            <View style={styles.cardtopview}>
               <Text numberOfLines={1} style={styles.cardtext}>{props.From}</Text> 
               <MaterialIcons style={styles.icon} name="compare-arrows" size={35} color="blue" />
               <Text numberOfLines={1} style={styles.cardtext}>{props.To}</Text>
            </View>
            <View style={styles.cardbottomview}>
                <Text style={styles.bottomtext} numberOfLines={1}>{props.month}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    cardcontainer: {
        overflow:'hidden',
        marginTop: 20,
        width: 350,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#fad9f3',
        elevation: 10,
    },
    cardtopview:{
        borderColor:'black',
        padding:15,
        alignItems:'center',
        flex:1,
        flexDirection: 'row',
    },
    cardtext:{
        textTransform: 'uppercase',
        marginRight: 1,
        width: '25%',
        fontSize: 23,
        color: 'green',
        overflow:'scroll',
        textAlign: 'center',
    },
    cardbottomview:{
        alignItems: 'center',
        padding: 5,
        textDecorationColor: 'blue',

    },
    icon:{
        marginHorizontal: '20%',
    },
    bottomtext:{
        marginLeft: '3%',
        width: 100,
        textAlign: 'center',
        color: 'red'
    }
})
