import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Modal,
  StatusBar,
  Image,
} from "react-native";
import GetData from "../db/GetData";
import ActionButton from "react-native-action-button";
import { MaterialIcons } from "@expo/vector-icons";
import User from "../Components/Forms/User";
import Tab from "../Components/profiletab";

export default function Profile({ navigation }) {
  const [load, setload] = useState(true);
  const [user, setuser] = useState("");
  const [show, setshow] = useState(false);
  const [update, setupdate]=useState(false);
  function getprofile() {
    GetData("user")
      .then((value) => JSON.parse(value))
      .then((result) => {
        setuser(result);
        setload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    setload(true);
    getprofile();
    setload(false);
  }, [update]);

  if (load) {
    return (
      <View
        style={{
          backgroundColor: "#d5def5",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  } else {
    return (
      <View style={styles.profilecontainer}>
        <Header
          title="profile"
          button={true}
          onPress={() => navigation.toggleDrawer()}
        />
        <Modal
          visible={show}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setshow(false);
          }}
        >
          <View style={styles.modal}>
            <User setshow={setshow} setupdate={setupdate} update={update}/>
          </View>
        </Modal>
        <View style={styles.seccotain}>
          <View style={styles.image}>
            <Image
              source={require("../assets/image.jpg")}
              style={styles.stretch}
            />
          </View>
          <View style={{ height: "12%" }}>
            <Tab title="Name" value={user.name} />
          </View>
          <View style={{ height: "12%" }}>
            <Tab title="Employee Code" value={user.ecode} />
          </View>
          <View style={{ height: "12%" }}>
            <Tab title="Designation" value={user.desig} />
          </View>
          <View style={{ height: "12%" }}>
            <Tab title="Department" value={user.dept} />
          </View>
          <View style={{ height: "12%" }}>
            <Tab title="Basic Pay" value={user.pay} />
          </View>
          <View style={{ height: "12%" }}>
            <Tab title="Account number" value={user.account} />
          </View>
        </View>
        <ActionButton
          position="center"
          buttonColor="#9b59b6"
          size={60}
          renderIcon={() => {
            return <MaterialIcons name="edit" size={35} color="white" />;
          }}
          onPress={() => {
            setshow(true);
          }}
        />
        <StatusBar style={{ backgroundColor: "#7242cf" }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profilecontainer: {
    backgroundColor: "#d5def5",
    flex: 1,
  },
  seccotain: {
    marginTop: 60,
    flex: 1,
  },
  modal: {
    flex: 1,
  },
  image: {
    height: "28%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  stretch: {
    aspectRatio: 1,
    height: "100%",
    resizeMode: "center",
  },
});
