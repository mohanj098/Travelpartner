import React from "react";
import Header from "../Components/Header";
import { Text, View, StyleSheet } from "react-native";
import Action from "./Action";
import Othertable from "./Othertable.js"

export default function Mediate({showmain, showother, data}) {
  return (
    <View style={styles.mediatorcontainer}>
      <Header title="Your trip" />
      <Othertable data={data}/>
      <Action showmain={showmain} showother={showother}/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  mediatorcontainer:{
      height: '100%',
      alignItems:'center',
    backgroundColor: "#d5def5",
  },
});
