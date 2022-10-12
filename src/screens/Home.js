import HooksContext from "../context/HooksContext";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ButtonUI } from "../components/ButtonUI";

export const Home = ({ navigation }) => {
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

  const isValidUserName = () => {
    const isLengthNull = userName.length === 0;

    if (!isLengthNull && !isMaxLength) {
      setSessionName(userName);
      return true;
    }

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
        <ButtonUI
          navigation={navigation}
          title="Next"
          onPress={isValidUserName}
        />
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
  errorMessage: {
    color: "red",
    fontWeight: "bold",
    padding: 14,
    marginLeft: 14,
  },
});
