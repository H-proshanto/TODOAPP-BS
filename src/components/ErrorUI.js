import React, { useContext, } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import HelperMethodsContext from '../contexts/HelperMethodsContext.js';
import HooksContext from '../contexts/HooksContext.js';

export const ErrorUI = () => {
    const { fetchAllTodo } = useContext(HelperMethodsContext);
    const { errorMessage, setErrorMessage, setIsLoading } = useContext(HooksContext);

    return (
        <View style={styles.errorContainer}>
            <Text style={styles.errorText}> {errorMessage} </Text>
            <Button title='Retry' onPress={async () => {
                setErrorMessage('');
                setIsLoading(true);
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
