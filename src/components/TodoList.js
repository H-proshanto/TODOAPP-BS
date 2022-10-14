import HooksContext from '../contexts/HooksContext';
import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TodoView } from './TodoView';

export const TodoList = ({ navigation }) => {
  const { taskList } = useContext(HooksContext);

  const renderItem = ({ item }) => (
    <TodoView
      title={item.title}
      status={item.status}
      id={item.id}
      timeStamp={item.timeStamp}
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
