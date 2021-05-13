import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileTab(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text
        style={props.title === "Name" ? styles.name : styles.value}
        numberOfLines={1}
      >
        {props.value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#d5def5",
    justifyContent: "space-between",
    height: "100%",
    alignItems: "center",
    borderTopWidth: 1,
  },
  title: {
    marginLeft: 30,
    fontWeight: "bold",
    fontSize: 15,
  },
  name: {
    marginRight: 30,
    fontWeight: "100",
    textTransform: "capitalize",
    maxWidth: 200,
    maxHeight: 20,
    overflow: "hidden"
  },
  value: {
    marginRight: 30,
    fontWeight: "100",
    maxWidth: 200,
    maxHeight: 20,
    overflow: "hidden",
  },
});
