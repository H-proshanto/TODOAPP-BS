import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DataContext from "../../DataContext";

export const Logout = ({ navigation }) => {
  const { clearAllData } = useContext(DataContext);
  return (
    <View style={styles.body}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
          clearAllData();
        }}
      >
        <View style={styles.clearButton}>
          <Text style={styles.text}>logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    marginTop: 21,
    marginLeft: 7,
  },
  clearButton: {
    backgroundColor: "#03396c",
    padding: 7,
    width: 60,
  },
  text: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
