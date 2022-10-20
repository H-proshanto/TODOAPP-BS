import React from 'react';
import { Alert, Keyboard, StyleSheet, View } from 'react-native';
import { ButtonUI } from '../components/ButtonUI';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../features/loader';
import { setErrorMessage } from '../features/error';
import { uploadUpdatedTask } from '../features/todo';
import { uploadTask } from '../features/todo';
import { deleteTask } from '../features/todo';

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

  const isValidTitle = () => {
    if (title === '') {
      dispatch(setLoader(false));
      dispatch(setErrorMessage('The title field can not be empty'));
      return false;
    }

    return true;
  }

  const confimationWindow = (userId, taskId, navigation) => {
    Alert.alert('Are you sure you want to delete this task', '', [
      {
        text: 'Confirm',
        style: "destructive",
        onPress: async () => {
          dispatch(deleteTask({ taskId, userId }))
          setTimeout(() => dispatch(setLoader(true)), 0)
          setTimeout(() => navigation.pop(), 100)
          setTimeout(() => dispatch(setLoader(false)), 500);
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
          {status
            ? (<></>)
            : (
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
            onPress={async () => {
              if (!isValidTitle()) return;

              dispatch(uploadUpdatedTask({ userId, taskId, title, description }))
              setTimeout(() => dispatch(setLoader(true)), 0);
              Keyboard.dismiss();
              setTimeout(() => navigation.pop(), 100);
              setTimeout(() => dispatch(setLoader(false)), 500);
            }}
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <ButtonUI
            title={'Create'}
            onPress={async () => {
              if (!isValidTitle()) return;

              Keyboard.dismiss();
              dispatch(uploadTask({ userId, title, description }));
              setTimeout(() => dispatch(setLoader(true)), 0);
              setTimeout(() => navigation.pop(), 100);
              setTimeout(() => dispatch(setLoader(false)), 500);
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
