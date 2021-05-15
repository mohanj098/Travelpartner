import React, { useState } from "react";
import Header from "../Components/Header";
import { View, StyleSheet, Dimensions, Modal } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Maintable from "./Maintable";
import Print from "./Print";
import Confirmation from "./Confirmation";
import Mainform from "./Forms/Mainform";
import ActionButton from "react-native-action-button";
import { MaterialIcons } from "@expo/vector-icons";

export default function TravelTab({
  data,
  index,
  extra,
  setextra,
  navigation,
}) {
  const { width, height } = Dimensions.get("window");
  const [showdelete, setshowdelete] = useState(false);
  const [showmain, setshowmain] = useState(false);
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
      <Modal
        visible={showmain}
        onRequestClose={() => {
          setshowmain(false);
        }}
      >
        <View style={{ height: "100%", backgroundColor: "#d5def5" }}>
          <Mainform
            showmain={setshowmain}
            index={index}
            extra={extra}
            setextra={setextra}
          />
        </View>
      </Modal>
      <ScrollView
        style={{ flex: 1, marginTop: 5 }}
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
      </ScrollView>
      <Print data={data} setshowdelete={setshowdelete} />
      <ActionButton
        size={60}
        buttonColor="#5f38ab"
        renderIcon={() => {
          return <MaterialIcons name="add" size={30} color="white" />;
        }}
        onPress={() => {
          setshowmain(true);
        }}
      />
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
