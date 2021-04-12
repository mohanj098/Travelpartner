import React from "react";
import { useEffect, useState } from "react";
import Getdata from "../db/GetData";
import Mainform from "../Components/Forms/Mainform";
import Otherform from "../Components/Forms/Others";
import Middle from "../Components/Mediator";
import { Modal, StyleSheet, View, Text, ActivityIndicator, Keyboard } from "react-native";

export default function Mediator({ navigation, route }) {
  const { index } = route.params;
  const [load, setload] = useState(true);
  const [renderdata, setrender] = useState(null);
  const [showmain, setshowmain] = useState(false);
  const [showother, setshowother] = useState(false);
  const [updateother, setupdateother] = useState(false);
  const [updatemain, setupdatemain] = useState(false);
 
  useEffect(()=>{
    setload(true);
    Getdata('trip')
    .then(value=>JSON.parse(value))
    .then(result=>{
      setrender(result[index]);
      setload(false);
    }).catch(e=>console.log(e))
    .catch(e=>{console.log(e)})
  }, [showmain, showother])


  if (!load) {
    return (
      <View>
        <Modal
          visible={showmain}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setshowmain(false)}
        >
          <View style={styles.modal}>
            <Mainform showmain={setshowmain} index={index} />
          </View>
        </Modal>
        <Modal
          visible={showother}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setshowother(false)}
        >
          <View style={styles.modal}>
            <Otherform showother={setshowother} index={index} />
          </View>
        </Modal>
        <Middle data={renderdata} showmain={setshowmain} showother={setshowother} />
      </View>
    );
  } else {
    return (
      <View style={{ backgroundColor:"#d5def5", flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {},
});
