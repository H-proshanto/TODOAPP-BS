import HelperMethodsContext from '../contexts/HelperMethodsContext';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { InputField } from '../components/InputField';
import { ReadOnlyViewBtns } from '../components/ReadOnlyViewBtns';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorMessage } from '../features/error';

export const TodoForm = ({ navigation, route }) => {
  const taskId = route.params?.taskId;
  const view = route.params?.view;
  const status = route.params?.status;
  const errorMessage = useSelector(state => state.error.value);
  const dispatch = useDispatch();
  const { getTodo } = useContext(HelperMethodsContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (view === 'read' || view === 'update') {
      const { title, description } = getTodo(taskId);
      setTitle(title);
      setDescription(description);
    }
  }, []);

  useEffect(() => {
    if (!title.length !== 0) {
      dispatch(setErrorMessage(''));
    }
  }, [title]);

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
