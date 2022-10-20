import React, { useState } from 'react';
import { toggleCompletion } from '../features/todo';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export const TodoView = ({ title, status, id, timeStamp, navigation }) => {
  const [isMarking, setisMarking] = useState(false);
  const userId = useSelector(state => state.user.user.id);
  const dispatch = useDispatch();

  return (
    <View style={styles.todoConatainer}>
      <TouchableOpacity
        style={styles.titleContainer}
        onPress={() => {
          navigation.navigate('TodoForm', { taskId: id, view: 'read', status });
        }}
      >
        <Text
          style={
            status
              ? styles.completedTaskText
              : styles.pendingTaskText
          }
        >
          {title}
        </Text>
      </TouchableOpacity>
      <Text style={styles.timeStamp}>{timeStamp}</Text>

      {status
        ? (<View style={styles.updateBtn}></View>)
        : (
          <TouchableOpacity
            style={styles.updateBtn}
            onPress={() => {
              navigation.navigate('TodoForm', { taskId: id, view: 'update' });
            }}
          >
            <Image style={styles.icon} source={require('../icons/edit.png')} />
          </TouchableOpacity>
        )}

      {isMarking ? (
        <ActivityIndicator size={24} color="black" />
      ) : (
        <TouchableOpacity
          style={styles.checkbox}
          onPress={async () => {
            setisMarking(true);
            dispatch(toggleCompletion({ taskId: id, status, userId }));
            setTimeout(() => setisMarking(false), 200);
          }}
        >
          {status ? (
            <Image source={require('../icons/checkmark.png')} />
          ) : (
            <></>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 0.8,
    borderRadius: 8,
    padding: 10,
  },
  todoConatainer: {
    margin: 21,
    borderRadius: 15,
    backgroundColor: '#eeeeee',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  checkbox: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#FFC651',
    borderRadius: 12,
  },
  updateBtn: {
    height: 35,
    width: 35,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  timeStamp: {
    alignSelf: 'center',
    fontSize: 10,
    color: 'grey',
    fontStyle: 'italic',
    marginRight: 7,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textAlign: 'left',
  },
  pendingTaskText: {
    textAlign: 'left',
  },
  pending: {},
});
