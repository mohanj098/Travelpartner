import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Entypo } from '@expo/vector-icons'; 

export default function Card(props) {
  const onpress = () => {
    props.navigation.navigate("Mediator", { index: props.index });
  };
  return (
    <TouchableOpacity style={styles.cardcontainer} onPress={onpress} activeOpacity={0.8}>
      <View style={styles.total}>
        <View style={styles.iconview}>
        <Entypo name="aircraft-take-off" size={50} color='#5f38ab' />
        </View>
        <View style={styles.titleview}>
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardcontainer: {
    overflow: "hidden",
    margin: 10,
    width: 350,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#fad9f3",
    elevation: 10,
    textAlign: "center",
  },
  title: {
    maxHeight: 100,
    fontSize: 25,
    color: "black",
    textTransform: "lowercase",
  },
  iconview: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  total: {
    margin: 3,
    height: 90,
    flexDirection: "row",
  },
  titleview:{
    alignSelf: 'center',
    width: 250,
    marginHorizontal: 15,
  }
});
