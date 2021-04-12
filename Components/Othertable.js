import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Cell,
} from "react-native-table-component";
import { useEffect, useState } from "react/cjs/react.development";

export default function Othertable({ data }) {
  const tablehead = [
    "Details",
    "Amount Paid",
    "Receipt Details (to be shared)",
    "Payment details",
    "Recipt's Location",
    "edit",
  ];
  const widtharr = [50, 50, 80, 60, 70, 38];
  const [rowdata, setrowdata] = useState([]);
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

  const editbutton = (data, index) => {
    return (
      <TouchableOpacity style={styles.editbutton}>
        <MaterialIcons name="edit" size={20} color="#5f38ab" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.othertablecontainer}>
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
          {rowdata.map((item, index) => (
            <TableWrapper key={index} style={styles.row}>
              {item.map((celldata, cellindex) => (
                <Cell
                  height={30}
                  width={widtharr[cellindex]}
                  key={cellindex}
                  data={cellindex == 5 ? editbutton(celldata, index) : celldata}
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
  editbutton:{
    justifyContent: "center",
    alignItems: "center",

  }
});
