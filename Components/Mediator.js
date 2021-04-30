import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { View, StyleSheet, Dimensions, Modal } from "react-native";
import Action from "./Action";
import Othertable from "./Othertable.js";
import { ScrollView } from "react-native-gesture-handler";
import Maintable from "./Maintable";
import Print from "./Print";
import Confirmation from "./Confirmation";

export default function Mediate({
  showmain,
  showother,
  data,
  index,
  extra,
  setextra,
  navigation,
}) {
  useEffect(() => {}, []);
  const { width, height } = Dimensions.get("window");
  const [showdelete, setshowdelete] = useState(false);
  return (
    <View style={styles.mediatorcontainer}>
      <Header title={data.title} button={false} />
      <Modal
        visible={showdelete}
        transparent={true}
        style={{ alignItems: "center", justifyContent: "center" }}
        onRequestClose={() => {
          setshowdelete(false);
        }}
      >
        <Confirmation
          title="This will delete entire trip!"
          setshowdelete={setshowdelete}
          index={index}
          navigation={navigation}
        />
      </Modal>
      <ScrollView
        style={{ flex: 1, marginTop: 15}}
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
      <Print data={data} setshowdelete={setshowdelete} />
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
