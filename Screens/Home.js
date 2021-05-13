import React from "react";
import Header from "../Components/Header";
import Display from "../Components/Display";
import Add from "../Components/Add";
import { View, StatusBar, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "./Profile";
import Backup from "./Backup"
const Drawer = createDrawerNavigator();

function Main({ navigation }) {
  return (
    <View style={styles.homecontainer}>
      <Header
        title="Home"
        button={true}
        onPress={() => navigation.toggleDrawer()}
      />
      <Add
        add="trip"
        onPress={() => {
          navigation.navigate("Trip");
        }}
      />
      <Display navigation={navigation} />
      <StatusBar style={{backgroundColor: "#7242cf"}} />
    </View>
  );
}

export default function Home() {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: "#5f38ab",
        activeBackgroundColor: "#fad9f3",
        itemStyle: { marginVertical: 0 },
        labelStyle:{fontWeight: "bold", fontSize: 20,}
      }}
      drawerStyle={{
        backgroundColor: "white",
      }}
    >
      <Drawer.Screen name="Home" component={Main} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Backup & Restore" component={Backup} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  homecontainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#d5def5",
    width: "100%",
    overflow: "scroll",
  },
  cardcontainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
});
