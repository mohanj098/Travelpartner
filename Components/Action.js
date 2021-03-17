import React from "react";
import { Ionicons } from "@expo/vector-icons";
import ActionButton from "react-native-action-button";

export default function Action({showmain, showother}) {
  return (
    <ActionButton>
      <ActionButton.Item
        buttonColor="white"
        title="Travelling Expense"
        onPress={() => {showmain(true)}}
      >
        <Ionicons name="ios-add-circle" size={60} color="#9b59b6" />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="white"
        title="Other Expense"
        onPress={() => {showother(true)}}
      >
        <Ionicons name="ios-add-circle" size={60} color="#9b59b6" />
      </ActionButton.Item>
      
    </ActionButton>
  );
}
