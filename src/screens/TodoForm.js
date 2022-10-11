import HooksContext from "../context/HooksContext";
import HelperMethodsContext from "../context/HelperMethodsContext";
import { StyleSheet, View, TextInput, ScrollView, Text } from "react-native";
import { useContext, useEffect } from "react";
import { HeaderUI } from "../components/Header";
import { ReadOnlyViewBtns } from "../components/ReadOnlyViewBtns";

export const TodoForm = ({ navigation, route }) => {
  const taskId = route.params?.taskId;
  const view = route.params?.view;
  const status = route.params?.status;
  const { getTitle, getDescription } = useContext(HelperMethodsContext);
  const {
    title,
    description,
    errorMessage,
    setDescription,
    setTitle,
    setErrorMessage,
  } = useContext(HooksContext);

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
          <Text style={styles.inputTitle}>Title</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Enter Title Here"
            onChangeText={setTitle}
            editable={view === "read" ? false : true}
            value={title}
          />
        </View>

        <Text style={styles.errorMessage}>{errorMessage}</Text>

        <View>
          <Text style={styles.inputTitle}>Description</Text>
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
      <ScrollView>
        <ReadOnlyViewBtns
          view={view}
          status={status}
          navigation={navigation}
          taskId={taskId}
        />
      </ScrollView>
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
    marginTop: 14,
    marginLeft: 28,
    marginRight: 28,
    borderWidth: 2,
    padding: 7,
  },
  descriptionText: {
    marginTop: 14,
    marginLeft: 28,
    marginRight: 28,
    borderWidth: 2,
    padding: 7,
  },
  errorMessage: {
    color: "red",
    fontWeight: "bold",
    marginLeft: 28,
    marginTop: 14,
  },
  inputTitle: {
    marginTop: 28,
    marginLeft: 28,
    fontSize: 18,
    fontWeight: "bold",
  },
});
