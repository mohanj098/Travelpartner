import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Getall from "../db/Getall";
import GetData from "../db/GetData";
import { cos } from "react-native-reanimated";

function alldata() {
  Getall()
    .then((result) => console.log(result))
    .catch((e) => console.log(e));
}

async function backup(setauth) {
  GetData("authtoken").then((res) => {
    if (res !== null) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${res}`);
      myHeaders.append("Content-Type", "application/json");
      // var raw = JSON.stringify({
      //   name: "TravelPartner_Backup",
      // });
      GetData("trip").then((trip) => {
        const url = `https://www.googleapis.com/drive/v3/files`;
        var raw = JSON.stringify({
          "name": "hello1"
        });
        fetch(url, {
          method: "POST",
          headers: myHeaders,
          data: raw,
          redirect :"follow"
        })
        .then(comes=>comes.json())
        .then(what=>console.log(what))
        .catch(e=>{console.log(e); alert("Something Went Wrong try again")})
      // fetch("https://www.googleapis.com/drive/v3/files", {
      //   method: "POST",
      //   headers: myHeaders,
      //   redirect: "follow",
      //   body: raw,
      // })
      //   .then((result) => result.json())
      //   .then((Response) => {
      //     console.log(Response);
      //     if (Response.error) {
      //       alert("It seems your login has expired please login");
      //       setauth(false);
      //     } else {
      //       GetData("trip").then((res) => {
      //         const url = `https://www.googleapis.com/upload/drive/v3/files/${Response.id}`;
      //         //console.log(res);
      //         var shaw = JSON.stringify(res)
      //         fetch(url, {
      //           method: "PATCH",
      //           headers: myHeaders,
      //           data: {shaw},
      //           redirect :"follow"
      //         }).then(comes=>comes.json())
      //         .then(what=>console.log(what))
      //         .catch(e=>{console.log(e); alert("Something Went Wrong try again")})
      //       });
      //       console.log("done");
      //     }
        })
        .catch((e) => console.log(e));
    } else {
      setauth(false);
    }
  });
}

export default function BackupButton(props) {
  return (
    <TouchableOpacity
      style={styles.backupcontainer}
      activeOpacity={0.5}
      onPress={() => {
        backup(props.setauth);
      }}
    >
      <FontAwesome name="cloud-upload" size={40} color="black" />
      <Text> BACKUP</Text>
    </TouchableOpacity>
  );
  x;
}

const styles = StyleSheet.create({
  backupcontainer: {
    borderWidth: 1,
    borderColor: "black",
    width: "50%",
    justifyContent: "space-around",
    borderRadius: 10,
    height: "10%",
    flexDirection: "row",
    backgroundColor: "#48cef7",
    alignItems: "center",
    marginVertical: 15,
  },
});
