import React, { useEffect } from 'react';
import { setErrorMessage } from '../features/error';
import { ButtonUI } from '../components/ButtonUI';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Keyboard, StyleSheet, View } from 'react-native';
import {
  resetErrorMessage,
  resetStatus,
  uploadUpdatedTask,
  uploadTask,
  deleteTask
} from '../features/todo';

export const ReadOnlyViewBtns = ({
  navigation,
  view,
  status,
  taskId,
  title,
  description,
}) => {
  const userId = useSelector(state => state.user.user.id);
  const dispatch = useDispatch();
  const requestStatus = useSelector(state => state.todo.status);
  const error = useSelector(state => state.todo.error);

  useEffect(() => {
    if (requestStatus === 'error') {
      Alert.alert('An issue occured', error, [
        {
          text: 'Okay',
        },
      ]);
      dispatch(resetStatus());
      dispatch(resetErrorMessage());
    }

    if (requestStatus === 'resolved') {
      navigation.pop();
      setTimeout(() => dispatch(resetStatus()), 200);
    }
  }, [requestStatus]);

  const isValidTitle = () => {
    if (title === '') {
      dispatch(setErrorMessage('The title field can not be empty'));
      return false;
    }

    return true;
  };

  const confimationWindow = (userId, taskId) => {
    Alert.alert('Are you sure you want to delete this task', '', [
      {
        text: 'Confirm',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteTask({ taskId, userId }));
        },
      },
      {
        text: 'Cancel',
      },
    ]);
  };

  return (
    <>
      {view === 'read' ? (
        <View style={styles.buttonContainer}>
          {status ? (
            <></>
          ) : (
            <ButtonUI
              title={'Edit'}
              onPress={() =>
                navigation.navigate('TodoForm', { taskId, view: 'update' })
              }
            />
          )}
          <ButtonUI
            title={'Delete'}
            button={styles.deleteButton}
            onPress={() => {
              confimationWindow(userId, taskId, navigation);
            }}
          />
        </View>
      ) : view === 'update' ? (
        <View style={styles.buttonContainer}>
          <ButtonUI
            title={'Update'}
            onPress={() => {
              if (!isValidTitle()) return;

              dispatch(
                uploadUpdatedTask({ userId, taskId, title, description })
              );
              Keyboard.dismiss();
            }}
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <ButtonUI
            title={'Create'}
            onPress={() => {
              if (!isValidTitle()) return;

              Keyboard.dismiss();
              dispatch(uploadTask({ userId, title, description }));
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
  deleteButton: {
    backgroundColor: 'crimson',
    borderRadius: 14,
    width: 100,
  },
});
