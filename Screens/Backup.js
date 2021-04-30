import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Header from "../Components/Header";
import Backupbutton from "../Components/Backupbutton";
import Uploadbutton from "../Components/Downloadbutton";

export default function Backup({ navigation }) {
  return (
    <View style={styles.backupcontainer}>
      <Header
        title="BACKUP AND RESTORE"
        button={true}
        onPress={() => navigation.toggleDrawer()}
      />
      <View style={styles.buttoncontainer}>
        <Backupbutton />
        <Uploadbutton/>
      </View>
      <StatusBar style={{backgroundColor: "#7242cf"}} />
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
    marginVertical: 100
  },
});
