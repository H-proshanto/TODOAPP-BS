import HelperMethodsContext from '../contexts/HelperMethodsContext';
import React, { useContext } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { ButtonUI } from '../components/ButtonUI';
import HooksContext from '../contexts/HooksContext';
import { useDispatch } from 'react-redux';
import { setLoader } from '../features/loader';

export const ReadOnlyViewBtns = ({
  navigation,
  view,
  status,
  taskId,
  title,
  description,
}) => {
  const { confimationWindow, updateTaskList, updateSpecificTask } =
    useContext(HelperMethodsContext);
  const dispatch = useDispatch();

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
            button={styles.deleteButton}
            onPress={() => {
              confimationWindow(taskId, navigation);
            }}
          />
        </View>
      ) : view === 'update' ? (
        <View style={styles.buttonContainer}>
          <ButtonUI
            title={'Update'}
            onPress={async () => {
              dispatch(setLoader(true));
              if (await updateSpecificTask(taskId, title, description)) {
                setTimeout(() => navigation.pop(), 100);
              }
              setTimeout(() => dispatch(setLoader(false)), 500);
            }}
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <ButtonUI
            title={'Create'}
            onPress={async () => {
              Keyboard.dismiss();
              dispatch(setLoader(true));
              if (await updateTaskList(title, description)) {
                setTimeout(() => navigation.pop(), 100);
              }
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
