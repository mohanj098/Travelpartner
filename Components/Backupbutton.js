import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

export default function BackupButton() {
  return (
    <TouchableOpacity style={styles.backupcontainer} activeOpacity={0.5}>
      <FontAwesome name="cloud-upload" size={40} color="black" />
      <Text> BACKUP</Text>
    </TouchableOpacity>
  );x
}

const styles = StyleSheet.create({
  backupcontainer: {
    borderWidth: 1,
    borderColor: "black",
    width: "50%",
    justifyContent: "center",
    borderRadius: 10,
    height: "10%",
    flexDirection: "row",
    backgroundColor: "#48cef7",
    alignItems: "center",
    marginVertical: 15,
  },
});
