import HooksContext from "../context/HooksContext";
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
  const [isPressed, setIsPressed] = useState(false);
  const [isMaxLength, setIsMaxLength] = useState(false);
  const {
    userName,
    errorMessage,
    setUserName,
    setErrorMessage,
    setSessionName,
  } = useContext(HooksContext);

  useEffect(() => {
    if (userName.length > 5) {
      setIsMaxLength(true);
      setErrorMessage("Maximum characters allowed : 5");
    } else {
      setIsMaxLength(false);
      setErrorMessage("");
    }
  }, [userName]);

  useEffect(() => {
    setTimeout(() => {
      setIsPressed(false);
    }, 100);
  });

  const isValidUserName = () => {
    const isLengthNull = userName.length === 0;

    if (!isLengthNull && !isMaxLength) return true;

    if (isLengthNull) setErrorMessage("The User name can not be empty");
    return false;
  };

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
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
        <View style={styles.loginButton}>
          <Button
            color={"purple"}
            disabled={isPressed}
            title="Next"
            onPress={() => {
              setIsPressed(true);
              if (isValidUserName()) {
                setSessionName(userName);
                navigation.dispatch(StackActions.replace("DashBoard"));
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
  loginButton: {
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
