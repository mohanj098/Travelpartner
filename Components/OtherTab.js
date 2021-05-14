import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { View, StyleSheet, Dimensions, Modal } from "react-native";
import Othertable from "./Othertable.js";
import { ScrollView } from "react-native-gesture-handler";
import Print from "./Print";
import Confirmation from "./Confirmation";
import { MaterialIcons } from "@expo/vector-icons";
import ActionButton from "react-native-action-button";
import Otherform from "../Components/Forms/Others"

export default function OtherTab({
  data,
  index,
  extra,
  setextra,
  navigation,
}) {
  useEffect(() => {}, []);
  const [showother, setshowother] = useState(false);
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
      <Modal
        visible={showother}
        onRequestClose={() => {
          setshowother(false);
        }}
      >
        <Otherform
          showother={setshowother}
          index={index}
          extra={extra}
          setextra={setextra}
        />
      </Modal>
      <ScrollView
        style={{ flex: 1, marginTop: 15 }}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
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
      <ActionButton
        size={60}
        buttonColor="#5f38ab"
        renderIcon={() => {
          return <MaterialIcons name="add" size={30} color="white" />;
        }}
        onPress={() => {
          setshowother(true);
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
