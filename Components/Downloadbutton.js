import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';




export default function RestoreButton() {
  return (
    <TouchableOpacity style={styles.backupcontainer} activeOpacity={0.5}>
      <FontAwesome name="cloud-download" size={40} color="black" />
      <Text>RESTORE</Text>
    </TouchableOpacity>
  );x
}

const styles = StyleSheet.create({
  backupcontainer: {
    borderWidth: 1,
    borderColor: "black",
    width: "50%",
    justifyContent: "space-around",
    borderRadius: 10,
    height: "10%",
    flexDirection: "row",
    backgroundColor: "#8df293",
    alignItems:"center",
    marginVertical: 15,
  },

});
