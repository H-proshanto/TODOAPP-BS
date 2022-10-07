import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DataContext from "../../DataContext";

export const TodoView = ({ title, status, id }) => {
  const { toggleCompletion } = useContext(DataContext);
  return (
    <View style={styles.todoConatainer}>
      <View style={styles.titleContainer}>
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
      </View>
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
});
