import HooksContext from '../contexts/HooksContext';
import HelperMethodsContext from '../contexts/HelperMethodsContext';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonUI } from './ButtonUI';

export const HeaderUI = ({ navigation }) => {
  const { user } = useContext(HooksContext);
  const { clearAllData } = useContext(HelperMethodsContext);

  return (
    <View style={styles.userInfo}>
      <Text style={styles.username}>{`Mr.${user.username}`}</Text>
      <ButtonUI
        navigation={navigation}
        title={'logout'}
        onPress={() => {
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
});
