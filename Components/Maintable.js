import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import {
  Table,
  Row,
  TableWrapper,
  Cell,
} from "react-native-table-component";
import Deleterow from "../db/Deleterow";
import Updateform from "./Forms/Updatemain";

export default function Maintable({ data, index, extra, setextra }) {
  const { width, height } = Dimensions.get("window");
  const tablehead = [
    "Departure\n{Date}\n{Time}\n{Place}",
    "Arrival\n{Date}\n{Time}\n{Place}",
    "Mode of travel",
    "distance in KM.",
    "Fare",
    "Ticket no.",
    "remarks",
    "Other details\n(for your reference)",
    "",
  ];
  const [update, setupdate] = useState([false, null, null]);
  const editbutton = (data, subindex) => {
    return (
      <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
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
            Deleterow(0, index, subindex)
              .then(() => {
                setextra(!extra);
                setextra(!extra);
              })
              .catch((e) => {
                console.log(e);
              });
          }}
        >
          <MaterialIcons name="delete" size={20} color="#5f38ab" />
        </TouchableOpacity>
      </View>
    );
  };
  const [rowdata, setrowdata] = useState([]);
  const widtharr = [55, 46, 40, 50, 24, 35, 48, 45, 28];
  useEffect(() => {
    let rowdata0 = [];
    const main = data.main;
    const maxi = main.length;

    for (let i = 0; i < maxi; i += 1) {
      let rowdata1 = [];
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
      rowdata1.push(main[i].mode);
      rowdata1.push(main[i].distance);
      rowdata1.push(main[i].fare);
      rowdata1.push(main[i].pnr);
      rowdata1.push(main[i].remarks);
      rowdata1.push(main[i].stored);
      rowdata1.push("main");
      rowdata0.push(rowdata1);
    }
    setrowdata(rowdata0);
  }, []);

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
      <Text style={styles.othertabletop}>Travel Expenses</Text>
      <ScrollView>
        <Table
          style={{
            backgroundColor: "white",
            width: 371,
            marginHorizontal: (width - 371) / 2,
          }}
          height={200}
          borderStyle={{ borderWidth: 2, borderColor: "grey" }}
        >
          <Row
            data={tablehead}
            widthArr={widtharr}
            height={55}
            textStyle={styles.otherheadtext}
          />
          {rowdata.map((item, index1) => (
            <TableWrapper key={index1} style={styles.row}>
              {item.map((celldata, cellindex) => (
                <Cell
                  width={widtharr[cellindex]}
                  key={cellindex}
                  data={
                    cellindex == 8 ? editbutton(celldata, index1) : celldata
                  }
                  textStyle={cellindex==0 || cellindex==1 ? styles.deparr:styles.othertext}
                />
              ))}
            </TableWrapper>
          ))}
        </Table>
      </ScrollView>
      <View style={styles.maintotal}>
        <Text style={{fontSize: 15, color: "red"}}>Total Travelling Expense:</Text>
        <Text style={{fontSize: 15, color: "green", marginLeft: 5}}>{data.maintotal} ₹</Text>
      </View>
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
    fontSize: 9,
    textAlign: "center",
    fontWeight: "700",
  },
  othertext: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "300",
  },
  othertabletop: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  editbutton: {
    margin: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  maintotal:{
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: "center"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
  },
  deparr:{
    fontSize: 8,
    textAlign: "center",
    fontWeight: "bold",
  },
  modal:{
    height: "100%",
    backgroundColor: "#d5def5"
  }
});
