import DataContext from "../context/DataContext";
import { StyleSheet, View, TextInput, ScrollView, Text } from "react-native";
import { useContext, useEffect } from "react";
import { ButtonUI } from "../components/Button";
import { HeaderUI } from "../components/Header";

export const TodoForm = ({ navigation, route }) => {
  const {
    title,
    description,
    setTitle,
    setDescription,
    getTitle,
    getDescription,
    updateTaskList,
    updateSpecificTask,
    errorMessage,
    setErrorMessage,
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

  useEffect(() => {
    if (!title.length !== 0) setErrorMessage("");
  }, [title]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderUI navigation={navigation} />
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
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </ScrollView>
      {view === "read" ? (
        ""
      ) : view === "update" ? (
        <View style={styles.buttonContainer}>
          <ButtonUI
            navigation={navigation}
            taskId={taskId}
            onPress={updateSpecificTask}
            title={"Update"}
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <ButtonUI
            navigation={navigation}
            onPress={updateTaskList}
            title={"Create"}
          />
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
  errorMessage: {
    color: "red",
    fontWeight: "bold",
    padding: 14,
    marginLeft: 14,
  },
});
