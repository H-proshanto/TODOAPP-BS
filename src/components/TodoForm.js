import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import DataContext from "../../DataContext";
import { useContext, useEffect } from "react";
import { Logout } from "./LogoutButton";
import { CreateTodoButton } from "./CreateTodoButton";
import { UpdateTodoButton } from "./UpdateTodoButton";

export const TodoForm = ({ navigation, route }) => {
  const {
    userName,
    title,
    description,
    setTitle,
    setDescription,
    getTitle,
    getDescription,
  } = useContext(DataContext);
  const taskId = route.params?.taskId;
  const view = route.params?.view;

  useEffect(() => {
    if (view === "read" || view === "update") {
      setTitle(getTitle(taskId));
      setDescription(getDescription(taskId));
    } else {
      setTitle("");
      setDescription("");
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Simple ToDo</Text>
          <View style={styles.userInfo}>
            <Text style={styles.username}>{`Mr.${userName}`}</Text>
            <Logout navigation={navigation} />
          </View>
        </View>
        <View style={styles.titleContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder="Enter Title Here"
            onChangeText={setTitle}
            editable={view === "read" ? false : true}
            value={title}
          />
        </View>
        <View>
          <TextInput
            style={styles.descriptionText}
            placeholder={view === "read" ? "" : "Enter Description Here"}
            onChangeText={setDescription}
            multiline={true}
            editable={view === "read" ? false : true}
            value={description}
          />
        </View>
      </ScrollView>
      {view === "read" ? (
        ""
      ) : view === "update" ? (
        <View style={styles.buttonContainer}>
          <UpdateTodoButton navigation={navigation} taskId={taskId} />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <CreateTodoButton navigation={navigation} />
        </View>
      )}
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
  titleContainer: {
    flex: 0.2,
  },
  titleInput: {
    marginTop: 35,
    marginLeft: 28,
    marginRight: 28,
    borderWidth: 2,
    padding: 7,
  },
  descriptionText: {
    marginTop: 35,
    marginLeft: 28,
    marginRight: 28,
    borderWidth: 2,
    padding: 7,
  },
  buttonContainer: {
    flex: 0.7,
    alignItems: "center",
  },
});
