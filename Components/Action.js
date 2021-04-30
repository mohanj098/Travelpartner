import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import ActionButton from "react-native-action-button";
import { StyleSheet } from "react-native";

export default function Action({ showmain, showother }) {
  return (
    <ActionButton
      size={60}
      buttonColor="#5f38ab"
      renderIcon={() => {
        return <MaterialIcons name="add" size={30} color="white" />;
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
        <MaterialIcons name="add" size={40} color="#5f38ab" />
      </ActionButton.Item>
      <ActionButton.Item
        style={styles.insidebutton}
        buttonColor="white"
        title="Other Expense"
        onPress={() => {
          showother(true);
        }}
      >
        <MaterialIcons name="add" size={40} color="#5f38ab" />
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
