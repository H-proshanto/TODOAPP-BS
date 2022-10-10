import DataContext from "../context/DataContext";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { StackActions } from "@react-navigation/native";

export const Home = ({ navigation }) => {
  const { userName, setUserName, authUser } = useContext(DataContext);
  const [isMaxLength, setIsMaxLength] = useState(false);

  useEffect(() => {
    if (userName.length > 7) setIsMaxLength(true);
    else setIsMaxLength(false);
  }, [userName]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Simple ToDo</Text>
        </View>
        <View style={styles.loginTextContainer}>
          <TextInput
            style={styles.loginInput}
            placeholder="Your Name"
            onChangeText={setUserName}
            value={userName}
          />
          {isMaxLength ? (
            <Text style={styles.errorMessage}>
              Maximum characters allowed : 7
            </Text>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.loginButton}>
          <Button
            color={"purple"}
            title="Next"
            onPress={() => {
              if (authUser()) {
                navigation.dispatch(StackActions.replace("DashBoard", {}));
              }
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flex: 0.2,
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 28,
    marginTop: 28,
  },
  loginTextContainer: {
    flex: 0.2,
  },
  loginInput: {
    marginTop: 35,
    marginLeft: 28,
    marginRight: 28,
    borderWidth: 2,
    padding: 7,
  },
  loginButton: {
    marginTop: 14,
    paddingLeft: 49,
    paddingRight: 49,
  },
  errorMessage: {
    color: "red",
    fontWeight: "bold",
    padding: 14,
    marginLeft: 14,
  },
});
