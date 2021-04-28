import { Feather } from "@expo/vector-icons";
import React from "react";
import { Alert, StyleSheet } from "react-native";
import ActionButton from "react-native-action-button";
import * as print from "expo-print";
import Html from "./Html";
import * as MediaLibrary from "expo-media-library";
import Othertablehtml from "./Othertablehtml";
import Maintablehtml from "./Maintablehtml";
import Getdata from "../db/GetData";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";


const createpdf = async (html) => {
  try {
    const { uri } = await print.printToFileAsync({ html });
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      const asset = await MediaLibrary.createAssetAsync(uri);
      alert(`stored at ${asset.uri}`);
      return "done";
    } else {
      return "no";
    }
  } catch (err) {
    console.error(err);
  }
};


const Print = ({ data, index, navigation, setshowdelete }) => {
  return (
    <ActionButton
      position="left"
      size={60}
      buttonColor="#5f38ab"
      renderIcon={() => {
        return <Entypo name="dots-three-vertical" size={25} color="white" />;
      }}
    >
      <ActionButton.Item
        buttonColor="white"
        title="Print Trip details"
        onPress={() => {
          const user = Getdata("user")
            .then((results) => JSON.parse(results))
            .then((result) => {
              createpdf(
                Html(Maintablehtml(data), Othertablehtml(data), result)
              ).then((response) => {
                console.log(response);
              });
            });
        }}
      >
        <Feather name="download" size={30} color="#5f38ab" />
      </ActionButton.Item>
      <ActionButton.Item
        style={styles.insidebutton}
        buttonColor="white"
        title="Delete this trip"
        onPress={() => {
          setshowdelete(true);
        }}
      >
        <MaterialIcons name="delete" size={30} color="#5f38ab" />
      </ActionButton.Item>
    </ActionButton>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "black",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Print;
