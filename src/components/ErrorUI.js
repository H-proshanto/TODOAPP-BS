import React, { useContext, } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import HelperMethodsContext from '../contexts/HelperMethodsContext.js';
import HooksContext from '../contexts/HooksContext.js';
import { setLoader } from '../features/loader.js';

export const ErrorUI = () => {
    const { fetchAllTodo } = useContext(HelperMethodsContext);
    const { errorMessage, setErrorMessage } = useContext(HooksContext);
    const dispatch = useDispatch();

    return (
        <View style={styles.errorContainer}>
            <Text style={styles.errorText}> {errorMessage} </Text>
            <Button title='Retry' onPress={async () => {
                setErrorMessage('');
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
