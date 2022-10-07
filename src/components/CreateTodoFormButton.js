import React from "react";
import {
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export const CreateTodoFormButton = ({ navigation }) => {
  return (
    <View style={styles.body}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("TodoForm");
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
    backgroundColor: "white",
    width: 60,
  },
  text: {
    color: "black",
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
