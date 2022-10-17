import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import HooksContext from '../contexts/HooksContext';

export const ButtonUI = ({ title, onPress }) => {
  const { isLoading, setIsLoading } = useContext(HooksContext);

  return (
    <View
      style={
        title === 'logout'
          ? styles.logoutBody
          : title === 'Next'
          ? styles.loginContainer
          : styles.body
      }
    >
      <TouchableOpacity
        disabled={isLoading}
        onPress={async () => {
          await onPress();
          setTimeout(() => setIsLoading(false), 500);
        }}
      >
        <View
          style={
            title === 'Create New'
              ? styles.dashboardButton
              : title === 'logout'
              ? styles.logoutButton
              : title === 'Next'
              ? styles.loginButton
              : styles.createButton
          }
        >
          {isLoading &&
          title !== 'Create New' &&
          title !== 'logout' &&
          title !== 'Edit' ? (
            <ActivityIndicator
              style={title === 'Next' ? styles.loginText : styles.text}
              color="#ffffff"
            />
          ) : (
            <Text
              style={
                title === 'Create New'
                  ? styles.dashboardText
                  : title === 'logout'
                  ? styles.logoutText
                  : title === 'Next'
                  ? styles.loginText
                  : styles.text
              }
            >
              {title}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    marginTop: 21,
  },
  createButton: {
    backgroundColor: 'black',
    borderRadius: 14,
    width: 100,
  },
  dashboardButton: {
    backgroundColor: 'white',
    width: 100,
  },
  dashboardText: {
    color: 'black',
    fontSize: 21,
    textAlign: 'right',
    textDecorationLine: 'underline',
    marginRight: 7,
  },
  text: {
    color: 'white',
    fontSize: 14,
    padding: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutBody: {
    alignSelf: 'center',
    marginLeft: 7,
    marginRight: 7,
    marginTop: 3,
  },
  logoutButton: {
    borderRadius: 14,
    backgroundColor: '#03396c',
    padding: 5,
    width: 45,
  },
  logoutText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    alignSelf: 'center',
    textDecorationLine: 'underline',
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
