import React, { useEffect, useState } from 'react';
import { ButtonUI } from '../components/ButtonUI';
import { setErrorMessage } from '../features/error';
import { login, resetStatus } from '../features/user';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';

export const Home = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const errorMessage = useSelector(state => state.error.value);
  const error = useSelector(state => state.user.error);
  const userStatus = useSelector(state => state.user.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userName.length > 5) {
      dispatch(setErrorMessage('Maximum characters allowed : 5'));
    } else {
      dispatch(setErrorMessage(''));
    }
  }, [userName]);

  useEffect(() => {
    if (userStatus === 'error') {
      Alert.alert('An issue occured', error, [
        {
          text: 'Okay',
        },
      ]);
    }

    if (userStatus === 'resolved') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'DashBoard' }],
      });
      dispatch(resetStatus());
    }
  }, [userStatus]);

  const isValidUserName = () => {
    const isLengthNull = userName.length === 0;

    if (userName.length > 5) return false;

    if (isLengthNull) {
      dispatch(setErrorMessage('The User name can not be empty'));
      return false;
    }

    return true;
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Simple ToDo</Text>
        </View>
        <View style={styles.loginTextContainer}>
          <TextInput
            style={styles.loginInput}
            placeholder="Your Name"
            onChangeText={setUserName}
            value={userName}
            editable={userStatus === 'running' ? false : true}
          />
          {errorMessage !== '' ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : (
            <></>
          )}
        </View>
        <ButtonUI
          navigation={navigation}
          title="Next"
          body={styles.loginContainer}
          button={styles.loginButton}
          text={styles.loginText}
          onPress={() => {
            if (isValidUserName()) dispatch(login(userName));
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 0.2,
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: 42,
  },
  loginTextContainer: {
    flex: 0.2,
    marginTop: 21,
    marginBottom: 7,
  },
  loginInput: {
    marginTop: 35,
    marginLeft: 28,
    marginRight: 28,
    borderWidth: 2,
    padding: 7,
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
    padding: 7,
    marginLeft: 21,
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: 7,
  },
  loginButton: {
    backgroundColor: 'purple',
    paddingLeft: 100,
    paddingRight: 100,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    padding: 5,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
