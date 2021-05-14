import React from "react";
import { useEffect, useState } from "react";
import Getdata from "../db/GetData";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TravelTab from "../Components/TravelTab";
import OtherTab from "../Components/OtherTab";

const Tab = createBottomTabNavigator();

export default function Mediator({ navigation, route }) {
  const { index } = route.params;
  const [load, setload] = useState(true);
  const [renderdata, setrender] = useState(null);
  const [extra, setextra] = useState(false);

  useEffect(() => {
    setload(true);
    Getdata("trip")
      .then((value) => JSON.parse(value))
      .then((result) => {
        setrender(result[index]);
        setload(false);
      })
      .catch((e) => console.log(e))
      .catch((e) => {
        console.log(e);
      });
  }, [extra]);

  if (!load) {
    return (
      <Tab.Navigator
        backBehavior="none"
        tabBarOptions={{
          width: "100%",
          activeTintColor: "#5f38ab",
          inactiveTintColor: "black",
          activeBackgroundColor: "#fad9f3",
          inactiveBackgroundColor: "white",
          style: {
            backgroundColor: "#d5def5",
          },
          labelStyle: {
            fontWeight: "bold",
            fontSize: 20,
            width: "100%",
            height: "100%",
          },
        }}
      >
        <Tab.Screen name="Travel Expense">
          {() => {
            return (
              <TravelTab
                data={renderdata}
                index={index}
                setextra={setextra}
                extra={extra}
                navigation={navigation}
              />
            );
          }}
        </Tab.Screen>
        <Tab.Screen name="Other Expense">
          {() => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <OtherTab
                  data={renderdata}
                  index={index}
                  setextra={setextra}
                  extra={extra}
                  navigation={navigation}
                />
              </View>
            );
          }}
        </Tab.Screen>
      </Tab.Navigator>
    );
  } else {
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
  }
}

const styles = StyleSheet.create({
  modal: {},
});
