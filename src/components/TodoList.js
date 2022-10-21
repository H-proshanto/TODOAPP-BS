import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TodoView } from './TodoView';
import { useSelector } from 'react-redux';

export const TodoList = ({ navigation }) => {
  const { taskList } = useSelector(state => state.todo);

  const renderItem = ({ item }) => (
    <TodoView todo={item} navigation={navigation} />
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
