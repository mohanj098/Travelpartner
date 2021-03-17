import React, { useState } from "react";
import Card from "./Card";
import { Text, FlatList, StyleSheet, View } from "react-native";
import Getdata from "../db/GetData";
import { useEffect } from "react";

export default function Display({ navigation }) {
  const [Data, setData] = useState([]);
  useEffect(() => {
    Getdata("trip")
      .then((values) => {
        setData(JSON.parse(values).reverse());
      })
      .catch((e) => console.log(e));
  }, [Data]);

  return (
    <View style={styles.displaycontainer}>
      <Text style={styles.Displayheading}>PAST Trips</Text>
      <FlatList
        style={styles.flat}
        showsVerticalScrollIndicator={false}
        data={Data}
        renderItem={({ item }) => (
          <Card
            key={item.key}
            index={item.key}
            From={item.title.From}
            To={item.title.To}
            month={item.title.month}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => {
          item.key;
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
