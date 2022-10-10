import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StackActions } from "@react-navigation/native";

export const ButtonUI = ({ navigation, title, onPress, taskId }) => {
  return (
    <View style={title === "logout" ? styles.logoutBody : styles.body}>
      <TouchableOpacity
        onPress={() => {
          if (title === "Create" && onPress()) navigation.pop();
          else if (title === "Update" && onPress(taskId)) navigation.pop();
          else if (title === "Create New") navigation.navigate("TodoForm");
          else if (title === "logout") {
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
            onPress();
          }
        }}
      >
        <View
          style={
            title === "Create New"
              ? styles.dashboardButton
              : title === "logout"
              ? styles.logoutButton
              : styles.createButton
          }
        >
          <Text
            style={
              title === "Create New"
                ? styles.dashboardText
                : title == "logout"
                ? styles.logoutText
                : styles.text
            }
          >
            {title}
          </Text>
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
  dashboardButton: {
    backgroundColor: "white",
    width: 60,
  },
  dashboardText: {
    color: "black",
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  text: {
    color: "white",
    fontSize: 14,
    padding: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  logoutBody: {
    alignItems: "center",
    marginTop: 21,
    marginLeft: 7,
  },
  logoutButton: {
    backgroundColor: "#03396c",
    padding: 7,
    width: 60,
  },
  logoutText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
