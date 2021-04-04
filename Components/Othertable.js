import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import { useEffect, useState } from "react/cjs/react.development";

export default function Othertable({ data }) {
  const tablehead = ["Details", "Amount Paid", "Receipt Details"];
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
      rowdata0.push(rowdata1);
    }
    setrowdata(rowdata0);
  }, []);

  return (
    <View style={styles.othertablecontainer}>
      <Text style={styles.othertabletop}>Other Expenses</Text>
      <ScrollView>
        <Table
          style={{
            backgroundColor: "white",
            width: "90%",
            marginHorizontal: "5%",
          }}
          height={200}
          borderStyle={{ borderWidth: 2, borderColor: "grey" }}
        >
          <Row
            data={tablehead}
            widthArr={[120, 120, 130]}
            height={35}
            textStyle={styles.otherheadtext}
          />
          <Rows
            widthArr={[120, 120, 130]}
            data={rowdata}
            textStyle={styles.othertext}
          />
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
  },
  othertext: {
    textAlign: "center",
    fontWeight: "300",
  },
  othertabletop: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
});
