import HelperMethodsContext from '../contexts/HelperMethodsContext';
import React, { useContext } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { ButtonUI } from '../components/ButtonUI';

export const ReadOnlyViewBtns = ({
  navigation,
  view,
  status,
  taskId,
  title,
  description,
}) => {
  const { deleteTask, updateTaskList, updateSpecificTask } =
    useContext(HelperMethodsContext);

  return (
    <>
      {view === 'read' ? (
        <View style={styles.buttonContainer}>
          {status === 'pending' ? (
            <ButtonUI
              title={'Edit'}
              onPress={() =>
                navigation.navigate('TodoForm', { taskId, view: 'update' })
              }
            />
          ) : (
            <></>
          )}
          <ButtonUI
            title={'Delete'}
            onPress={() => {
              deleteTask(taskId, navigation);
            }}
          />
        </View>
      ) : view === 'update' ? (
        <View style={styles.buttonContainer}>
          <ButtonUI
            title={'Update'}
            onPress={() => {
              if (updateSpecificTask(taskId, title, description)) {
                navigation.pop();
              }
            }}
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <ButtonUI
            title={'Create'}
            onPress={() => {
              if (updateTaskList(title, description)) {
                navigation.pop();
              }
            }}
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
