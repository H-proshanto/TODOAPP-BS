import BouncyCheckbox from "react-native-bouncy-checkbox";
import DataContext from "../context/DataContext";
import { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export const TodoView = ({ title, status, id, timeStamp, navigation }) => {
  const { toggleCompletion } = useContext(DataContext);

  return (
    <View style={styles.todoConatainer}>
      <TouchableOpacity
        style={styles.titleContainer}
        onPress={() => {
          navigation.navigate("TodoForm", { taskId: id, view: "read" });
        }}
      >
        <Text
          style={
            status === "done"
              ? {
                  textDecorationLine: "line-through",
                  textDecorationStyle: "solid",
                  textAlign: "left",
                }
              : { textAlign: "left" }
          }
        >
          {title}
        </Text>
      </TouchableOpacity>
      <Text style={styles.timeStamp}>{timeStamp}</Text>

      <TouchableOpacity
        style={styles.updateBtn}
        onPress={() => {
          navigation.navigate("TodoForm", { taskId: id, view: "update" });
        }}
      >
        <Image style={styles.icon} source={require("../icons/edit.png")} />
      </TouchableOpacity>
      <BouncyCheckbox
        style={styles.checkbox}
        onPress={(isChecked) => {
          isChecked = !isChecked;
          toggleCompletion(id);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 0.8,
    borderRadius: 8,
    padding: 10,
  },
  todoConatainer: {
    margin: 21,
    borderRadius: 15,
    backgroundColor: "#eeeeee",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  checkbox: {
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  updateBtn: {
    height: 35,
    width: 35,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  timeStamp: {
    alignSelf: "center",
    fontSize: 10,
    color: "grey",
    fontStyle: "italic",
    marginRight: 7,
  },
});
