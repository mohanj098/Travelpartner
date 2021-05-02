import React, { useState, useEffect } from "react";
import { Modal, StatusBar, StyleSheet, Text, View } from "react-native";
import Header from "../Components/Header";
import Backupbutton from "../Components/Backupbutton";
import Uploadbutton from "../Components/Downloadbutton";
import GetData from "../db/GetData";
import Login from "../Components/Login";

export default function Backup({ navigation }) {
  const [auth, setauth] = useState(true);
  const [user, setuser] = useState("");
  useEffect(() => {
    GetData("authtoken").then((res) => {
      if (res !== null) {
        setauth(true);
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          `Bearer ${res}`
        );
        fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
          method: "GET",
          headers: myHeaders,
          redirect:'follow'
        })
          .then((result) => result.json())
          .then(Response=>{setuser((Response.given_name))})
          .catch((e) => console.log(e));
      } else {
        setauth(false);
      }
    });
  }, []);

  return (
    <View style={styles.backupcontainer}>
      <Header
        title="BACKUP AND RESTORE"
        button={true}
        onPress={() => navigation.toggleDrawer()}
      />
      <Modal visible={!auth}>
        <Login setshow={setauth} />
      </Modal>
      <Text style={styles.greet}>Hi {user}</Text>
      <View style={styles.buttoncontainer}>
        <Backupbutton/>
        <Uploadbutton />
      </View>
      <StatusBar style={{ backgroundColor: "#7242cf" }} />
    </View>
  );
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
  greet:{
    textAlign: "center",
    marginTop:  100,
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "capitalize"
  }
});
