import HelperMethodsContext from '../contexts/HelperMethodsContext';
import React, { useContext } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { ButtonUI } from '../components/ButtonUI';
import HooksContext from '../contexts/HooksContext';

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
  const { setIsLoading } = useContext(HooksContext);

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
              setIsLoading(true);
              confimationWindow(taskId, navigation);
            }}
          />
        </View>
      ) : view === 'update' ? (
        <View style={styles.buttonContainer}>
          <ButtonUI
            title={'Update'}
            onPress={async () => {
              setIsLoading(true);
              if (await updateSpecificTask(taskId, title, description)) {
                navigation.pop();
              }
            }}
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <ButtonUI
            title={'Create'}
            onPress={async () => {
              setIsLoading(true);
              if (await updateTaskList(title, description)) {
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
