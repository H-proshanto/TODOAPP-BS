import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const ButtonUI = ({ navigation, title, onPress, taskId }) => {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsPressed(false);
    }, 100);
  });

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
        disabled={isPressed}
        onPress={() => {
          setIsPressed(true);
          if (title === 'Create' && onPress()) navigation.pop();
          else if (title === 'Update' && onPress(taskId)) navigation.pop();
          else if (title === 'Create New') navigation.navigate('TodoForm');
          else if (title === 'logout') {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
            onPress();
          } else if (title === 'Edit') {
            navigation.navigate('TodoForm', { taskId, view: 'update' });
          } else if (title === 'Delete') {
            onPress(taskId, navigation);
          } else if (title === 'Next' && onPress()) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'DashBoard' }],
            });
          }
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
          <Text
            style={
              title === 'Create New'
                ? styles.dashboardText
                : title == 'logout'
                ? styles.logoutText
                : title == 'Next'
                ? styles.loginText
                : styles.text
            }
          >
            {title}
          </Text>
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
    marginTop: 14,
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
