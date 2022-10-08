import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useContext } from "react";
import DataContext from "../../DataContext";

export const UpdateTodoButton = ({ navigation, taskId }) => {
  const { updateSpecificTask } = useContext(DataContext);

  return (
    <View style={styles.body}>
      <TouchableOpacity
        onPress={() => {
          if (updateSpecificTask(taskId)) navigation.pop();
        }}
      >
        <View style={styles.createButton}>
          <Text style={styles.text}>Update</Text>
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
