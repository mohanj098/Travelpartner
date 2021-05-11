import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import GetData from "../db/GetData";
import firebase from "firebase";
import "firebase/firestore";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  APP_ID,
  MEASUREMENT_ID,
} from "@env";
import StoreData from "../db/StoreData";

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

async function backup(setlastbackup) {
  try {
    const trip = await GetData("trip");
    const res = JSON.parse(trip);
    const useremail = await GetData("useremail");
    const email = JSON.parse(useremail);
    await firebase
      .firestore()
      .collection("backup")
      .doc(email)
      .set({ data: res });
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
    setlastbackup(date);
    const lastbackup = JSON.stringify(date);
    await StoreData("lastbackup", lastbackup);
    alert("Backup done");
  } catch (e){
    console.log(e);
    alert("something went wrong");
  }
}

export default function BackupButton({ setdoing, setlastbackup }) {
  return (
    <TouchableOpacity
      style={styles.backupcontainer}
      activeOpacity={0.5}
      onPress={() => {
        setdoing(true);
        backup(setlastbackup)
          .then(() => {
            setdoing(false);
          })
          .catch(setdoing(false));
      }}
    >
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>BACKUP</Text>
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
