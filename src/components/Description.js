import { useContext, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import HelperMethodsContext from "../context/HelperMethodsContext";
import HooksContext from "../context/HooksContext";

export const Description = ({ view, taskId }) => {
  const { description, setDescription } = useContext(HooksContext);
  const { getDescription } = useContext(HelperMethodsContext);

  useEffect(() => {
    if (view === "read" || view === "update") {
      setDescription(getDescription(taskId));
    } else {
      setDescription("");
    }
  }, []);

  return (
    <View>
      <Text style={styles.inputDescription}>Description</Text>
      <TextInput
        style={styles.descriptionText}
        placeholder={view === "read" ? "" : "Enter Description Here"}
        onChangeText={setDescription}
        multiline={true}
        editable={view === "read" ? false : true}
        value={description}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputDescription: {
    marginTop: 28,
    marginLeft: 28,
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptionText: {
    marginTop: 14,
    marginLeft: 28,
    marginRight: 28,
    borderWidth: 2,
    padding: 7,
  },
});
