import React, { useState } from "react";
import Card from "./Card";
import { Text, FlatList, StyleSheet, View, TextInput } from "react-native";
import Getdata from "../db/GetData";
import { useEffect } from "react";
import { filter } from "lodash";
import { useIsFocused } from "@react-navigation/native";

export default function Display({ navigation }) {
  const [Data, setData] = useState([]);
  const [query, setquery] = useState("");
  const [fulldata, setfulldata] = useState([]);
  const isFocused = useIsFocused()

  const contains = (indiv, query) => {
    if (indiv.title.includes(query)) {
      return true;
    }
    return false;
  };

  function handleSearch(text) {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fulldata, (indiv) => {
      return contains(indiv, formattedQuery);
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
          height: 50,
          minWidth: 350,
        }}
      >
        <TextInput
          style={{
            backgroundColor: "white",
            margin: 5,
            height: 35,
            textAlign: "center",
            fontSize: 15,
            padding: 0,
          }}
          autoCapitalize="none"
          autoCorrect={false}
          value={query}
          onChangeText={(querytext) => handleSearch(querytext)}
          placeholder="SEARCH"
        />
      </View>
    );
  }

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
      <Searchbar/>
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
