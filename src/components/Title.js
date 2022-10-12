import { useContext, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import HelperMethodsContext from "../context/HelperMethodsContext";
import HooksContext from "../context/HooksContext";

export const Title = ({ view, taskId }) => {
  const { title, setTitle, errorMessage, setErrorMessage } =
    useContext(HooksContext);
  const { getTitle } = useContext(HelperMethodsContext);

  useEffect(() => {
    if (view === "read" || view === "update") {
      setTitle(getTitle(taskId));
    } else {
      setTitle("");
    }
  }, []);

  useEffect(() => {
    if (!title.length !== 0) setErrorMessage("");
  }, [title]);

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
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
  inputTitle: {
    marginTop: 28,
    marginLeft: 28,
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    fontWeight: "bold",
    marginLeft: 28,
    marginTop: 14,
  },
});
