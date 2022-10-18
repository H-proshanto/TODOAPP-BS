import HooksContext from '../contexts/HooksContext';
import HelperMethodsContext from '../contexts/HelperMethodsContext';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonUI } from './ButtonUI';

export const HeaderUI = ({ navigation }) => {
  const { user, setIsLoading } = useContext(HooksContext);
  const { clearAllData } = useContext(HelperMethodsContext);

  return (
    <View style={styles.userInfo}>
      <Text style={styles.username}>{`Mr.${user.username}`}</Text>
      <ButtonUI
        navigation={navigation}
        title={'logout'}
        body={styles.logoutBody}
        button={styles.logoutButton}
        text={styles.logoutText}
        onPress={() => {
          setIsLoading(false);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
          clearAllData();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  username: {
    fontWeight: 'bold',
    fontSize: 21,
    alignSelf: 'center',
  },
  userInfo: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
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
});
