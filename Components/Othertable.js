import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { set } from "react-native-reanimated";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import { useEffect, useState } from "react/cjs/react.development";
import Deleterow from "../db/Deleterow";
import Updateform from "./Forms/Updateothers";

export default function Othertable({ data, index, extra, setextra }) {
  const tablehead = [
    "Details",
    "Amount Paid",
    "Receipt Details (to be shared)",
    "Payment details",
    "Recipt's Location",
    "",
  ];
  const widtharr = [50, 50, 80, 60, 70, 38];
  const [rowdata, setrowdata] = useState([]);
  const [update, setupdate] = useState([false, null, null]);
  //show, index, data
  useEffect(() => {
    let rowdata0 = [];
    const other = data.other;
    const maxi = other.length;
    for (let i = 0; i < maxi; i += 1) {
      let rowdata1 = [];
      rowdata1.push(other[i].detail);
      rowdata1.push(other[i].amountpaid);
      rowdata1.push(other[i].receipt);
      rowdata1.push(other[i].payment);
      rowdata1.push(other[i].stored);
      rowdata1.push("");
      rowdata0.push(rowdata1);
    }
    setrowdata(rowdata0);
  }, []);

  const editbutton = (data, subindex) => {
    return (
      <View style={{flex:1, flexDirection: 'column'}}>
        <TouchableOpacity
          style={styles.editbutton}
          onPress={() => {
            setupdate([true, subindex, rowdata[subindex]]);
          }}
        >
          <MaterialIcons name="edit" size={20} color="#5f38ab" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editbutton}
          onPress={() => {
            setextra(!extra)
            Deleterow(1, index, subindex).then(
              setextra(!extra)
            )
            .catch(e=>{console.log(e)})
          }}
        >
          <MaterialIcons name="delete" size={20} color="#5f38ab" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.othertablecontainer}>
      <Modal
        visible={update[0]}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setupdate([false, null, null])}
      >
        <View style={styles.modal}>
          <Updateform
            index={index}
            subindex={update[1]}
            data={update[2]}
            setupdate={setupdate}
            extra={extra}
            setextra={setextra}
          />
        </View>
      </Modal>
      <Text style={styles.othertabletop}>Other Expenses</Text>
      <ScrollView>
        <Table
          style={{
            backgroundColor: "white",
            width: "85%",
            marginHorizontal: "7%",
          }}
          height={200}
          borderStyle={{ borderWidth: 2, borderColor: "grey" }}
        >
          <Row
            data={tablehead}
            widthArr={widtharr}
            height={40}
            textStyle={styles.otherheadtext}
          />
          {rowdata.map((item, index1) => (
            <TableWrapper key={index1} style={styles.row}>
              {item.map((celldata, cellindex) => (
                <Cell
                  width={widtharr[cellindex]}
                  key={cellindex}
                  data={
                    cellindex == 5 ? editbutton(celldata, index1) : celldata
                  }
                  textStyle={styles.othertext}
                />
              ))}
            </TableWrapper>
          ))}
        </Table>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  othertablecontainer: {
    marginTop: 55,
    borderColor: "grey",
    height: "70%",
  },
  otherheadtext: {
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 10,
  },
  othertext: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 13,
  },
  othertabletop: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
  },
  editbutton: {
    margin: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
