import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import DataContext from "../../DataContext";
import { useContext, useEffect } from "react";

export const HomeScreen = ({ navigation }) => {
  const { userName, setUserName, authUser } = useContext(DataContext);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Simple ToDo</Text>
      </View>
      <View style={styles.loginTextContainer}>
        <TextInput
          style={styles.loginInput}
          placeholder="Your Name (max length 7)"
          onChangeText={setUserName}
          value={userName}
        />
      </View>
      <View style={styles.loginButton}>
        <Button
          color={"purple"}
          title="Next"
          onPress={() => {
            if (authUser()) {
              navigation.navigate("DashBoard");
            }
          }}
        />
      </View>
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
});
