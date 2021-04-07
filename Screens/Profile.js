import React from "react";
import Header from "../Components/Header";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  t,
  Modal,
} from "react-native";
import GetData from "../db/GetData";
import { useEffect, useState } from "react/cjs/react.development";
import ActionButton from "react-native-action-button";
import { MaterialIcons } from "@expo/vector-icons";
import User from "../Components/Forms/User";

export default function Profile({ navigation }) {
  const [load, setload] = useState(true);
  const [user, setuser] = useState("");
  const [show, setshow] = useState(false);
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
  }, [show]);

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
          onRequestClose={() => {setshow(false)}}
        >
          <View style={styles.modal}>
            <User setshow={setshow} />
          </View>
        </Modal>
        <View style={styles.seccotain}>
          <View style={styles.inview}>
            <Text style={styles.label}>Name:</Text>
            <Text
              style={{
                marginHorizontal: 10,
                borderBottomWidth: 1,
                borderBottomColor: "black",
                fontSize: 20,
                textTransform: "capitalize",
                minWidth: "40%",
              }}
            >
              {user.name}
            </Text>
          </View>
          <View style={styles.inview}>
            <Text style={styles.label}>Department:</Text>
            <Text style={styles.ans}>{user.dept}</Text>
          </View>
          <View style={styles.inview}>
            <Text style={styles.label}>Designation:</Text>
            <Text style={styles.ans}>{user.desig}</Text>
          </View>
          <View style={styles.inview}>
            <Text style={styles.label}>Emp. Code</Text>
            <Text style={styles.ans}>{user.ecode}</Text>
          </View>
          <View style={styles.inview}>
            <Text style={styles.label}>Basic Pay:</Text>
            <Text style={styles.ans}>{user.pay}</Text>
          </View>
          <View style={styles.inview}>
            <Text style={styles.label}>Account Number:</Text>
            <Text style={styles.ans}>{user.account}</Text>
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
    marginTop: 45,
    flex: 1,
  },
  label: {
    marginHorizontal: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  ans: {
    minWidth: "35%",
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    fontSize: 20,
  },
  inview: {
    marginVertical: 15,
    height: 50,
    flexDirection: "row",
    marginHorizontal: "10%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  modal: {
    flex: 1,
  },
});
