import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import GetData from "../db/GetData";
import StoreData from "../db/StoreData";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  APP_ID,
  MEASUREMENT_ID,
} from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const download = async (setlastrestore, setauth) => {
  try {
    const useremail = await GetData("useremail");
    if (useremail) {
      const email = JSON.parse(useremail);
      const result = await firebase
        .firestore()
        .collection("backup")
        .doc(email)
        .get();
      if (result.data()) {
        const trip1 = await GetData("trip");
        let trip;
        if (!trip1) {
          trip = [];
        } else {
          trip = JSON.parse(trip1);
        }
        var len = trip.length;
        var i = 0;
        const array = result.data().data;
        for (; i < array.length; i++) {
          var object = {
            key: len,
            main: array[i].main,
            other: array[i].other,
            title: array[i].title,
            total: array[i].total,
            maintotal: array[i].maintotal,
            othertotal: array[i].othertotal,
          };
          len++;
          trip.push(object);
        }
        await StoreData("trip", trip);
        const dateobject = new Date();
        const date =
          dateobject.getDate() +
          "/" +
          (dateobject.getMonth() + 1) +
          "/" +
          dateobject.getFullYear() +
          " " +
          dateobject.getHours() +
          ":" +
          dateobject.getMinutes();
        setlastrestore(date);
        const lastrestore = JSON.stringify(date);
        await StoreData("lastrestore", lastrestore);
        alert("data restored successfully");
      } else {
        alert("Sorry, You have no backup! Backup now to avoid data loss");
      }
    }
    else{
      alert("Login error, Please Login");
      setauth(false)
    }
  } catch (e) {
    console.log(e);
    alert("something went wrong");
  }
};

export default function RestoreButton({ setdoing, setlastrestore , setauth}) {
  return (
    <TouchableOpacity
      style={styles.backupcontainer}
      activeOpacity={0.5}
      onPress={() => {
        setdoing(true);
        download(setlastrestore, setauth)
          .then(() => {
            setdoing(false);
          })
          .catch(setdoing(false));
      }}
    >
      <Text style={{ fontWeight: "bold" }}>RESTORE</Text>
    </TouchableOpacity>
  );
  x;
}

const styles = StyleSheet.create({
  backupcontainer: {
    borderWidth: 1,
    borderColor: "black",
    width: 150,
    justifyContent: "center",
    backgroundColor: "#5cb85c",
    borderRadius: 5,
    alignItems: "center",
    height: 40,
  },
});
