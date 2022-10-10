import { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import DataContext from "../context/DataContext";
import { TodoView } from "./TodoView";

export const TodoList = ({ navigation }) => {
  const { taskList } = useContext(DataContext);

  const renderItem = ({ item }) => (
    <TodoView
      title={item.title}
      status={item.status}
      id={item.id}
      navigation={navigation}
    />
  );

  return (
    <View style={styles.listContainer}>
      <FlatList data={taskList} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 0.9,
  },
});
