import React from "react";
import Header from "../Components/Header";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import Action from "./Action";
import Othertable from "./Othertable.js";
import { ScrollView } from "react-native-gesture-handler";
import Maintable from "./Maintable";
import Print from "./Print";
import { useEffect } from "react/cjs/react.development";

export default function Mediate({
  showmain,
  showother,
  data,
  index,
  extra,
  setextra,
}) {
  useEffect(()=>{

  }, [])
  const { width, height } = Dimensions.get("window");
  return (
    <View style={styles.mediatorcontainer}>
      <Header title={data.title} button={false} />
      <ScrollView
        style={{ flex: 1 }}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ width, height }}>
          <Maintable
            data={data}
            index={index}
            extra={extra}
            setextra={setextra}
          />
        </View>
        <View style={{ width, height }}>
          <Othertable
            data={data}
            index={index}
            extra={extra}
            setextra={setextra}
          />
        </View>
      </ScrollView>
      <Print data={data}/>
      <Action showmain={showmain} showother={showother} />
    </View>
  );
}

const styles = StyleSheet.create({
  mediatorcontainer: {
    height: "100%",
    alignItems: "center",
    backgroundColor: "#d5def5",
  },
});
