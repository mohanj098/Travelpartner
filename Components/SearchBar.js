import React from "react";
import { View, TextInput } from "react-native";
import { filter } from "lodash";
import { useEffect, useState } from "react/cjs/react.development";
import { useIsFocused } from "@react-navigation/native";

export default function Searchbar(props) {

const isfocused=useIsFocused()
  const [query, setquery] = useState("");
  const setData=props.setData;
  const fulldata=props.fulldata;

  useEffect(()=>{
    setquery("")
  },[isfocused])

  const contains = (indiv, query1) => {
    if (indiv.title.includes(query1)) {
      return true;
    }
    return false;
  };

  function handleSearch(text) {
    setquery(text);
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fulldata, (indiv) => {
      return contains(indiv, formattedQuery);
    });
    setData(filteredData);
  }
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
        onChangeText={text=>handleSearch(text)}
        placeholder="SEARCH"
      />
    </View>
  );
}

