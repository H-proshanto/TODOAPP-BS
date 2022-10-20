import React, { useContext, } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HelperMethodsContext from '../contexts/HelperMethodsContext.js';
import { setErrorMessage } from '../features/error.js';
import { setLoader } from '../features/loader.js';

export const ErrorUI = () => {
    const { fetchAllTodo } = useContext(HelperMethodsContext);
    const errorMessage = useSelector(state => state.error.value);
    const dispatch = useDispatch();

    return (
        <View style={styles.errorContainer}>
            <Text style={styles.errorText}> {errorMessage} </Text>
            <Button title='Retry' onPress={async () => {
                dispatch(setErrorMessage(''));
                dispatch(setLoader(true));
                await fetchAllTodo();
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
