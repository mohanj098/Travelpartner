import React, { useState } from "react";
import Card from "./Card";
import { Text, FlatList, StyleSheet, View, TextInput } from "react-native";
import Getdata from "../db/GetData";
import { useEffect } from "react";

export default function Display({ navigation}) {
  const [Data, setData] = useState([]);
  const [query, setquery] = useState("");

  const contains = (query) => {};

  function handlequery(text) {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(Data, (que) => {
      return contains(formattedQuery);
    });
    setData(filteredData);
    setquery(text);
  }

  function Searchbar() {
    return (
      <View
        style={{
          margin: 10,
          backgroundColor: "white",
          borderRadius: 10,
          minWidth: "80%",
          maxWidth: "80%",
          height: 45,
        }}
      >
        <TextInput
          style={{
            backgroundColor: "white",
            margin: 5,
            height: 35,
            textAlign: "center",
            fontSize: 15,
          }}
          value={query}
          onChangeText={(querytext) => handlequery(querytext)}
          placeholder="SEARCH"
        />
      </View>
    );
  }

  useEffect(() => {
    Getdata("trip")
      .then((values) => JSON.parse(values))
      .then((result) => {
        if (result !== null) {
          result.reverse();
          setData(result);
        } else {
          setData([]);
        }
      })
      .catch((e) => console.log(e));
  });

  return (
    <View style={styles.displaycontainer}>
      {/* <Text style={styles.Displayheading}>PAST Trips</Text> */}
      <Searchbar />
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
