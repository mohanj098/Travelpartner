import React, { useState, useEffect } from "react";
import Card from "./Card";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import Getdata from "../db/GetData";
import { useIsFocused } from "@react-navigation/native";
import Searchbar from "./SearchBar";

export default function Display({ navigation }) {
  const [Data, setData] = useState([]);
  const [fulldata, setfulldata] = useState([]);
  const isFocused = useIsFocused();
  const [load, setload] = useState(false);
  const [refreshing, setrefresh] = useState(false);

  async function helper() {
    try {
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
          setrefresh(false);
        });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setload(true);
    helper()
      .then(() => {
        setload(false);
      })
      .catch((e) => {
        console.log(e);
        alert("something went wrong")
      });
  }, [isFocused]);

  if (load) {
    return (
      <View
        style={{
          backgroundColor: "#d5def5",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  } else {
    return (
      <View style={styles.displaycontainer}>
        <Searchbar setData={setData} fulldata={fulldata} />
        <FlatList
          extraData={Data}
          style={styles.flat}
          showsVerticalScrollIndicator={false}
          data={Data}
          refreshing={refreshing}
          onRefresh={helper}
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
