import React from "react";
import { Alert, Dimensions, Text, TouchableOpacity, View } from "react-native";
import DeleteCard from "../db/DeleteCard";


const handledelete = async (index) => {
  try {
    DeleteCard(index).then(()=>{console.log("deleted")});
  } catch (e) {
    console.log(e);
  }
};

export default function Confirmation(props) {
  const set = props.setshowdelete;
  const { width, height } = Dimensions.get("window");
  const index = props.index;
  const navigation = props.navigation;
  return (
    <View
      style={{
        width: "60%",
        height: 80,
        marginHorizontal: "20%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderWidth: 1,
        marginTop: height / 2 - height / 10,
      }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ height: "50%" }}>{props.title}</Text>
      </View>

      <View style={{ width: "100%", flex: 1, flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            width: "50%",
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            borderTopWidth: 1,
          }}
          TouchableOpacity={0.8}
          onPress={() => {
            handledelete(index).then(() => {
              navigation.navigate("Home")
            });
          }}
        >
          <Text>Okay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "50%",
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
            borderTopWidth: 1,
          }}
          onPress={() => {
            set(false);
          }}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
