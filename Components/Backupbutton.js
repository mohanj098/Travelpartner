import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import GetData from "../db/GetData";
import firebase from "firebase";
import "firebase/firestore";

async function backup(setauth) {
  GetData("useremail")
    .then((useremail) => JSON.parse(useremail))
    .then((email) => {
      GetData("trip")
        .then((trip) => JSON.parse(trip))
        .then((res) => {
          firebase
            .firestore()
            .collection("backup")
            .doc(email)
            .set({ data: res })
            .then(console.log("done"))
            .catch((e) => console.log(e));
        });
    });
}

export default function BackupButton(props) {
  return (
    <TouchableOpacity
      style={styles.backupcontainer}
      activeOpacity={0.5}
      onPress={() => {
        backup(props.setauth);
      }}
    >
      <FontAwesome name="cloud-upload" size={40} color="black" />
      <Text> BACKUP</Text>
    </TouchableOpacity>
  );
  x;
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
    backgroundColor: "#48cef7",
    alignItems: "center",
    marginVertical: 15,
  },
});
