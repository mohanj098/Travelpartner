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

export default function Maintable({ data }) {
  const tablehead = [
    "Departure\n{Date}\n{Time}\n{Place}",
    "Arrival\n{Date}\n{Time}\n{Place}",
    "Mode of travel",
    "distance in KM.",
    "Fare",
    "Ticket no.",
    "remarks",
  ];
  //const [rowdata, setrowdata] = useState(["1", "2", "3", "4", "5", "6", "7"]);
  const [rowdata, setrowdata] = useState([]);
  useEffect(() => {
    let rowdata0 = [];
    const main = data.main;
    const maxi = main.length;
    for (let i = 0; i < maxi; i += 1) {
      let rowdata1 = [];
      rowdata1.push(
        "{" +
          main[i].arrival.date +
          "}\n" +
          "{" +
          main[i].arrival.time +
          "}\n" +
          "{" +
          main[i].arrival.place +
          "}"
      );
      rowdata1.push(
        "{" +
          main[i].departure.date +
          "}\n" +
          "{" +
          main[i].departure.time +
          "}\n" +
          "{" +
          main[i].departure.place +
          "}"
      );
      rowdata1.push(main[i].mode);
      rowdata1.push(main[i].distance);
      rowdata1.push(main[i].fare);
      rowdata1.push(main[i].pnr);
      rowdata1.push(main[i].remarks);
      rowdata0.push(rowdata1);
    }
    setrowdata(rowdata0);
  }, []);

  return (
    <View style={styles.othertablecontainer}>
      <Text style={styles.othertabletop}>Travel Expenses</Text>
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
            widthArr={[62, 60, 52, 52, 35, 55, 53]}
            height={55}
            textStyle={styles.otherheadtext}
          />
          <Rows
            data={rowdata}
            widthArr={[62, 60, 52, 52, 35, 55, 53]}
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
  otherrowhead: {
    borderBottomWidth: 1,
  },
  otherheadtext: {
    textTransform: "uppercase",
    fontSize: 10,
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
