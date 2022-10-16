import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ButtonUI } from '../components/ButtonUI.js';
import { TodoList } from '../components/TodoList';
import HelperMethodsContext from '../contexts/HelperMethodsContext.js';
import HooksContext from '../contexts/HooksContext.js';

export const DashBoard = ({ navigation }) => {
  const { fetchAllTodo } = useContext(HelperMethodsContext);
  const { isLoading, setIsLoading } = useContext(HooksContext);

  useEffect(() => {
    fetchAllTodo();
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.dashboard}>
        <Text style={styles.dashboardText}>My ToDos</Text>
        <View style={styles.CreateTodoFormButton}>
          <ButtonUI
            navigation={navigation}
            title={'Create New'}
            onPress={() => navigation.navigate('TodoForm')}
          />
        </View>
      </View>

      {isLoading
        ?
        <ActivityIndicator size={49} style={styles.loader} color="#89CFF0" />
        : <>
          <TodoList navigation={navigation} />
        </>
      }


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dashboard: {
    flex: 0.1,
    flexDirection: 'row',
  },
  CreateTodoFormButton: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginRight: 7,
  },
  dashboardText: {
    marginLeft: 7,
    fontWeight: 'bold',
    fontSize: 21,
    marginTop: 21,
  },
  loader: {
    marginTop: 91,
    alignSelf: 'center',
  }
});
