import React from "react";
import { useEffect, useState } from "react";
import Getdata from "../db/GetData";
import Mainform from "../Components/Forms/Mainform";
import Otherform from "../Components/Forms/Others";
import Middle from "../Components/Mediator";
import { Modal, StyleSheet, View } from "react-native";

export default function Mediator({ navigation, route }) {
  /* const { index } = route.params;
  const [load, setload] = useState(false);
  const [Data, setData] = useState(null);
  const [renderdata, setrender] = useState(null);
  useEffect(() => {
    Getdata("trip")
      .then((value) => {
        setData(JSON.parse(value));
        console.log(Data);
        setrender(Data[index]);
        setload(true);
      })
      .catch((e) => console.log(e));
  });
  if (load === true) {
    
  } else {
    return <Text>Loading...</Text>;
  } */

  const [showmain, setshowmain] = useState(false);
  const [showother, setshowother] = useState(false);
  return (
    <View>
      <Modal
        visible={showmain}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setshowmain(false)}
      >
        <View style={styles.modal}>
          <Mainform showmain={setshowmain}/>
        </View>
      </Modal>
      <Modal
        visible={showother}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setshowother(false)}
      >
        <View style={styles.modal}>
          <Otherform showother={setshowother}/>
        </View>
      </Modal>
      <Middle showmain={setshowmain} showother={setshowother}/>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {},
});
