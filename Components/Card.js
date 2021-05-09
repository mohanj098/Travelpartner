import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function Card(props) {
  const onpress = () => {
    props.navigation.navigate("Mediator", { index: props.index });
  };
  return (
    <TouchableOpacity
      style={styles.cardcontainer}
      onPress={onpress}
      activeOpacity={0.8}
    >
      <View style={styles.total}>
        <View style={styles.iconview}>
          {/* <Entypo name="aircraft-take-off" size={50} color="#5f38ab" /> */}
          <Image source={require("../assets/icon.png")} style={{width: 60, height: 100}} />
        </View>
        <View style={styles.titleview}>
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
          <View style={styles.price}>
            <Text style={{ fontSize: 20 }}>{props.total} ₹</Text>
          </View>
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
    fontSize: 30,
    color: "black",
    textTransform: "capitalize",
  },
  iconview: {
    alignSelf: "center",
    marginLeft: 10,
  },
  total: {
    marginTop: 0,
    height: 100,
    borderRadius: 10,
    flexDirection: "row",
    //borderWidth: 1,
  },
  titleview: {
    alignSelf: "center",
    width: 250,
    marginHorizontal: 15,
    marginTop: 25,
  },
  price: {
    overflow: "hidden",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 10,
    width: 250,
    minWidth: 50,
  },
});
