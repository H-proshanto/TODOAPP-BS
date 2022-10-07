import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useContext } from "react";
import DataContext from "../../DataContext";

export const CreateTodoButton = ({ navigation }) => {
  const { updateTaskList } = useContext(DataContext);

  return (
    <View style={styles.body}>
      <TouchableOpacity
        onPress={() => {
          if (updateTaskList()) navigation.pop();
        }}
      >
        <View style={styles.createButton}>
          <Text style={styles.text}>Create New</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    marginTop: 21,
  },
  createButton: {
    backgroundColor: "black",
    borderRadius: 14,
    width: 100,
  },
  text: {
    color: "white",
    fontSize: 14,
    padding: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
