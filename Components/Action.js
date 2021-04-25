import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ActionButton from "react-native-action-button";
import { StyleSheet } from "react-native";

export default function Action({ showmain, showother }) {
  return (
    <ActionButton
      size={60}
      renderIcon={() => {
        return <MaterialIcons name="add" size={40} color="white" />;
      }}
    >
      <ActionButton.Item
        style={styles.insidebutton}
        buttonColor="white"
        title="Travelling Expense"
        onPress={() => {
          showmain(true);
        }}
      >
        <Ionicons name="ios-add-circle" size={40} color="#9b59b6" />
      </ActionButton.Item>
      <ActionButton.Item
        style={styles.insidebutton}
        buttonColor="white"
        title="Other Expense"
        onPress={() => {
          showother(true);
        }}
      >
        <Ionicons name="ios-add-circle" size={40} color="#9b59b6" />
      </ActionButton.Item>
    </ActionButton>
  );
}

const styles = StyleSheet.create({
  insidebutton: {
    alignItems: "center",
    justifyContent: "center",
  },
});
