import HelperMethodsContext from '../contexts/HelperMethodsContext';
import HooksContext from '../contexts/HooksContext';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { InputField } from '../components/InputField';
import { ReadOnlyViewBtns } from '../components/ReadOnlyViewBtns';

export const TodoForm = ({ navigation, route }) => {
  const taskId = route.params?.taskId;
  const view = route.params?.view;
  const status = route.params?.status;
  const { errorMessage, setErrorMessage } = useContext(HooksContext);
  const { getTodo } = useContext(HelperMethodsContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (view === 'read' || view === 'update') {
      const { currentTitle, currentDescription } = getTodo(taskId);
      setTitle(currentTitle);
      setDescription(currentDescription);
    }
  }, []);

  useEffect(() => {
    if (!title.length !== 0) {
      setErrorMessage('');
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
      <ScrollView>
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
