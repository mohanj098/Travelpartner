import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../Components/Header";
import Backupbutton from "../Components/Backupbutton";
import Uploadbutton from "../Components/Downloadbutton";
import { FontAwesome } from "@expo/vector-icons";
import GetData from "../db/GetData";
import firebase from "firebase";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  APP_ID,
  MEASUREMENT_ID,
} from "@env";
import Login from "../Components/Login";

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

const { width, height } = Dimensions.get("window");

export default function Backup({ navigation }) {
  const [auth, setauth] = useState(true);
  const [user, setuser] = useState("");
  const [load, setload] = useState(true);
  const [doing, setdoing] = useState(false);
  const [lastbackup, setlastbackup] = useState("never");
  const [lastrestore, setlastrestore] = useState("never");
  const getuser = async () => {
    try {
      setload(true);
      const username = await GetData("username");
      const last = await GetData("lastbackup");
      const lastre = await GetData("lastrestore");
      if (!username) {
        setauth(false);
      } else {
        const name = JSON.parse(username);
        setuser(name);
      }
      if (last) {
        const lastback = JSON.parse(last);
        setlastbackup(lastback);
      }
      if (lastre) {
        const lastres = JSON.parse(lastre);
        setlastrestore(lastres);
      }
      setload(false);
    } catch (e) {
      console.log(e);
      setload(false);
      alert("something went wrong");
    }
  };
  useEffect(() => {
    getuser();
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
        <Modal
          visible={doing}
          transparent={true}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#5500dc" />
          </View>
        </Modal>
        {auth ? (
          <View style={styles.afterheader}>
            <View style={styles.uppercontainer}>
              <Text style={styles.greet}>Hi {user}</Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginLeft: 20 }}>
                  <FontAwesome name="cloud-upload" size={30} color="black" />
                </View>
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontWeight: "bold" }}>Last backup</Text>
                  <View style={styles.backupdesc}>
                    <Text style={{ fontSize: 12 }}>
                      Backup data related to your trips. You can restore them by
                      signing in with the same email.
                    </Text>
                  </View>
                  <Text style={{ marginVertical: 10 }}>
                    Last backup: {lastbackup}
                  </Text>
                  <Backupbutton
                    setdoing={setdoing}
                    setlastbackup={setlastbackup}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                borderTopWidth: 2,
                height: (height - 60) / 2,
                flexDirection: "row",
              }}
            >
              <View style={{ marginTop: 20, marginLeft: 20 }}>
                <FontAwesome name="cloud-download" size={30} color="black" />
              </View>
              <View style={{ marginTop: 20, marginLeft: 20 }}>
                <Text style={{ fontWeight: "bold" }}>Last restore</Text>
                <View style={styles.backupdesc}>
                  <Text style={{ fontSize: 12 }}>
                    Restore backed up data. Restored data will be added without
                    losing the existing one.
                  </Text>
                </View>
                <Text style={{ marginVertical: 10 }}>
                  Last restore: {lastrestore}
                </Text>
                <Uploadbutton
                  setdoing={setdoing}
                  setlastrestore={setlastrestore}
                  setauth={setauth}
                />
              </View>
            </View>
          </View>
        ) : (
          <Login setuser={setuser} setauth={setauth}/>
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
  greet: {
    textAlign: "right",
    marginRight: 20,
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginVertical: 10,
  },
  uppercontainer: {
    height: (height - 60) / 2,
  },
  afterheader: {
    height: "100%",
    marginTop: 60,
  },
  backupdesc: {
    width: 180,
    marginVertical: 10,
  },
});
