import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import DataContext from "../../DataContext";
import { useContext } from "react";
import { Logout } from "./LogoutButton";
import { CreateTodoFormButton } from "./CreateTodoFormButton";
import { TodoList } from "./TodoList";

export const DashBoard = ({ navigation }) => {
  const { userName, taskList } = useContext(DataContext);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Simple ToDo</Text>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{`Mr.${userName}`}</Text>
          <Logout navigation={navigation} />
        </View>
      </View>
      <View style={styles.dashboard}>
        <Text style={styles.headerText}>My ToDos</Text>
        <View style={styles.CreateTodoFormButton}>
          <CreateTodoFormButton navigation={navigation} />
        </View>
      </View>
      <>
        <TodoList />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flex: 0.15,
    flexDirection: "row",
  },
  headerText: {
    marginLeft: 7,
    fontWeight: "bold",
    fontSize: 21,
    marginTop: 21,
  },
  username: {
    fontWeight: "bold",
    fontSize: 21,
    marginTop: 21,
    marginLeft: 21,
  },
  userInfo: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginRight: 7,
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
});
