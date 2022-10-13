import HooksContext from '../contexts/HooksContext';
import HelperMethodsContext from '../contexts/HelperMethodsContext';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonUI } from './ButtonUI';
import { useContext } from 'react';

export const HeaderUI = ({ navigation }) => {
  const { sessionName } = useContext(HooksContext);
  const { clearAllData } = useContext(HelperMethodsContext);

  return (
    <View style={styles.userInfo}>
      <Text style={styles.username}>{`Mr.${sessionName}`}</Text>
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
