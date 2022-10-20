import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorMessage } from '../features/error.js';
import { setLoader } from '../features/loader.js';
import { fetchAllTodo } from '../features/todo.js';

export const ErrorUI = () => {
    const errorMessage = useSelector(state => state.error.value);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.user.id);

    return (
        <View style={styles.errorContainer}>
            <Text style={styles.errorText}> {errorMessage} </Text>
            <Button title='Retry' onPress={async () => {
                dispatch(setErrorMessage(''));
                dispatch(setLoader(true));
                dispatch(fetchAllTodo(userId));
            }} />
        </View>
    );
};

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: 20,
        marginBottom: 35,

    },
});
