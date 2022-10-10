import { StyleSheet, Text, View } from "react-native";
import { HeaderUI } from "../components/header.js";
import { ButtonUI } from "../components/Button.js";
import { TodoList } from "../components/TodoList";

export const DashBoard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <HeaderUI navigation={navigation} />
      <View style={styles.dashboard}>
        <Text style={styles.dashboardText}>My ToDos</Text>
        <View style={styles.CreateTodoFormButton}>
          <ButtonUI navigation={navigation} title={"Create New"} />
        </View>
      </View>
      <>
        <TodoList navigation={navigation} />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  dashboard: {
    flex: 0.1,
    flexDirection: "row",
  },
  CreateTodoFormButton: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginRight: 7,
  },
  dashboardText: {
    marginLeft: 7,
    fontWeight: "bold",
    fontSize: 21,
    marginTop: 21,
  },
});
