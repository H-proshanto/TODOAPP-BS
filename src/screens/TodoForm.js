import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, Text, Alert } from 'react-native';
import { InputField } from '../components/InputField';
import { ReadOnlyViewBtns } from '../components/ReadOnlyViewBtns';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorMessage } from '../features/error';

export const TodoForm = ({ navigation, route }) => {
  const todo = route.params?.todo;
  const taskId = todo?.id;
  const view = route.params?.view;
  const status = todo?.is_completed;
  const errorMessage = useSelector(state => state.error.value);
  const requestError = useSelector(state => state.todo.error);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (view === 'read' || view === 'update') {
      setTitle(todo?.title);
      setDescription(todo?.description);
    }
  }, []);

  useEffect(() => {
    if (!title.length !== 0) {
      dispatch(setErrorMessage(''));
    }
  }, [title]);

  useEffect(() => {
    if (requestError.length) {
      Alert.alert('An issue occured', requestError, [
        {
          text: 'Okay',
        },
      ]);
    }
  }, [requestError]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <InputField
          view={view}
          text={title}
          setter={setTitle}
          placeholder="Title"
        />
        {errorMessage !== '' ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : (
          <></>
        )}
        <InputField
          view={view}
          text={description}
          setter={setDescription}
          placeholder="Description"
        />
      </ScrollView>
      <ScrollView keyboardShouldPersistTaps="always">
        <ReadOnlyViewBtns
          view={view}
          status={status}
          navigation={navigation}
          taskId={taskId}
          title={title}
          description={description}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: 28,
    marginTop: 14,
  },
});
