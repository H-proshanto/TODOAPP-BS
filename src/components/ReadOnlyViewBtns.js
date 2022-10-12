import HelperMethodsContext from "../context/HelperMethodsContext";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { ButtonUI } from "../components/ButtonUI";

export const ReadOnlyViewBtns = ({ navigation, view, status, taskId }) => {
  const { deleteTask, updateTaskList, updateSpecificTask } =
    useContext(HelperMethodsContext);

  return (
    <>
      {view === "read" ? (
        <View style={styles.buttonContainer}>
          {status === "pending" ? (
            <ButtonUI navigation={navigation} taskId={taskId} title={"Edit"} />
          ) : (
            <></>
          )}
          <ButtonUI
            navigation={navigation}
            taskId={taskId}
            title={"Delete"}
            onPress={deleteTask}
          />
        </View>
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
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0.7,
    marginTop: 35,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
