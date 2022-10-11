import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

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
    width: 100,
  },
  dashboardText: {
    color: "black",
    fontSize: 21,
    textAlign: "right",
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
    marginTop: 24,
    marginLeft: 7,
  },
  logoutButton: {
    borderRadius: 14,
    backgroundColor: "#03396c",
    padding: 4,
    width: 42,
  },
  logoutText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    alignSelf: "center",
    textDecorationLine: "underline",
  },
});
