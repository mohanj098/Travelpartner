import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import ActionButton from "react-native-action-button";
import * as print from "expo-print";
import Html from "./Html";
import * as MediaLibrary from "expo-media-library";
import Othertablehtml from "./Othertablehtml";
import Maintablehtml from "./Maintablehtml";
import Getdata from "../db/GetData";

const createpdf = async (html) => {
  try {
    const { uri } = await print.printToFileAsync({ html });
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      const asset=await MediaLibrary.createAssetAsync(uri);
      alert(`stored at ${asset.uri}`)
      return "done";
    } else {
      return("no");
    }
  } catch (err) {
    console.error(err);
  }
};

const Print = ({ data }) => {
  return (
    // <TouchableOpacity onPress={nowprint} style={styles.container}>
    //   <Feather name="download" size={30} color="white"/>
    // </TouchableOpacity>
    <ActionButton
      position="left"
      onPress={() => {
        //console.log(data)
        const user = Getdata("user").then((results) => JSON.parse(results)).then((result) => {
          createpdf(
            Html(Maintablehtml(data), Othertablehtml(data), result)
          ).then((response) => {
            console.log(response);
          });
        });
      }}
      size={60}
      renderIcon={() => {
        return <Feather name="download" size={40} color="white" />;
      }}
    />
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
