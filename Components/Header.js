import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header(props) {
  if (props.button) {
    return (
      <View style={styles.button}>
        <View style={{ marginHorizontal: 10, width: '10%'}}>
          <Ionicons
            name="menu"
            size={35}
            color="white"
            onPress={props.onPress}
          />
        </View>
        {/* <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            color: "white",
            marginLeft: 20,
            fontWeight: 'bold',

          }}
        >
          HOME
        </Text> */}
      </View>
    );
  } else {
    return (
      <View style={styles.header}>
        <Text numberOfLines={1} style={styles.title}>
          {props.title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 45,
    marginTop: 0,
    backgroundColor: "#5f38ab",
    width: "100%",
    alignItems: "center",
    position: "absolute",
  },
  title: {
    fontSize: 25,
    marginHorizontal: 15,
    margin: "auto",
    textTransform: "capitalize",
    color: "white",
  },
  button: {
    flexDirection: "row",
    height: 45,
    marginTop: 0,
    backgroundColor: "#5f38ab",
    width: "100%",
    alignItems: "center",
    position: "absolute",
    textAlign: "center",
  },
});
