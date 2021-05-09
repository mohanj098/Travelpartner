import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "firebase";
import "firebase/firestore";
import GetData from "../db/GetData";
import StoreData from "../db/StoreData";

const download = async () => {
  GetData("useremail")
    .then((useremail) => JSON.parse(useremail))
    .then((email) => {
      firebase
        .firestore()
        .collection("backup")
        .doc(email)
        .get()
        .then((ref) => {
          GetData("trip")
            .then((res) => JSON.parse(res))
            .then((trip) => {
              let result = trip;
              var len = result.length;
              var i = 0;
              const array = ref.data().data;
              for (; i < array.length; i++) {
                var object = {
                  key: len,
                  main: array[i].main,
                  other: array[i].other,
                  title: array[i].title,
                };
                len++;
                result.push(object);
              }
              StoreData("trip", result).then(console.log("done"));
            });
        });
    });
};

export default function RestoreButton() {
  return (
    <TouchableOpacity
      style={styles.backupcontainer}
      activeOpacity={0.5}
      onPress={() => {
        download()
          .then(console.log("ok"))
          .catch((e) => console.log(e));
      }}
    >
      <FontAwesome name="cloud-download" size={40} color="black" />
      <Text>RESTORE</Text>
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
    backgroundColor: "#8df293",
    alignItems: "center",
    marginVertical: 15,
  },
});
