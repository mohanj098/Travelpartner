import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../Components/Header";
import Backupbutton from "../Components/Backupbutton";
import Uploadbutton from "../Components/Downloadbutton";
import GetData from "../db/GetData";
import Login from "../Components/Login";
import firebase from "firebase/app";
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

if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function Backup({ navigation }) {
  const [auth, setauth] = useState(true);
  const [user, setuser] = useState("");
  const [load, setload] = useState(true);

  const getuser = () => {
    setload(true);
    GetData("username")
      .then((u) => {
        if (u !== null) {
          const username = JSON.parse(u);
          setuser(username);
          setload(false);
        } else {
          setauth(false);
          setload(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setload(false);
      });
  };
  useEffect(() => {
    getuser();
    console.log(auth)
  }, []);

  if (load) {
    return (
      <View
        style={{
          backgroundColor: "#d5def5",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  } else {
    return (
      <View style={styles.backupcontainer}>
        <Header
          title="BACKUP AND RESTORE"
          button={true}
          onPress={() => navigation.toggleDrawer()}
        />
        {auth ? (
          <View>
            <Text style={styles.greet}>Hi {user}</Text>
            <View style={styles.buttoncontainer}>
              <Backupbutton setauth={setauth} />
              <Uploadbutton />
            </View>
          </View>
        ) : (
          <Login setshow={setauth}/>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backupcontainer: {
    backgroundColor: "#d5def5",
    flex: 1,
  },
  buttoncontainer: {
    margin: 50,
    height: 400,
    alignItems: "center",
    justifyContent: "center",
  },
  greet: {
    textAlign: "center",
    marginTop: 100,
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
