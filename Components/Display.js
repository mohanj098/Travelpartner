import React, { useState } from "react";
import Card from "./Card";
import {FlatList, StyleSheet, View} from "react-native";
import Getdata from "../db/GetData";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import Searchbar from  "./SearchBar"

export default function Display({ navigation }) {
  const [Data, setData] = useState([]);
  const [fulldata, setfulldata] = useState([]);
  const isFocused = useIsFocused();

  function helper() {
    Getdata("trip")
      .then((values) => JSON.parse(values))
      .then((result) => {
        if (result !== null) {
          result.reverse();
          setData(result);
          setfulldata(result);
        } else {
          setData([]);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    helper();
  }, [isFocused]);

  return (
    <View style={styles.displaycontainer}>
      <Searchbar
            setData={setData}
            fulldata={fulldata}
          />
      <FlatList
        style={styles.flat}
        showsVerticalScrollIndicator={false}
        data={Data}
        renderItem={({ item }) => (
          <Card
            key={item.key}
            index={item.key}
            title={item.title}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => {
          return item.key.toString();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Displayheading: {
    fontSize: 30,
    textTransform: "uppercase",
    fontStyle: "normal",
  },
  displaycontainer: {
    alignItems: "center",
    flex: 1,
  },
  flat: {
    flex: 1,
  },
});
