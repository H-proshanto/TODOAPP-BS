import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import DataContext from "../../DataContext";
import { useContext } from "react";
import { Logout } from "./LogoutButton";
import { CreateTodoButton } from "./CreateTodoButton";

export const TodoForm = ({ navigation }) => {
  const { userName, setTitle, setDescription } = useContext(DataContext);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Simple ToDo</Text>
          <View style={styles.userInfo}>
            <Text style={styles.username}>{`Mr.${userName}`}</Text>
            <Logout navigation={navigation} />
          </View>
        </View>
        <View style={styles.titleContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder="Enter Title Here"
            onChangeText={setTitle}
          />
        </View>
        <View>
          <TextInput
            style={styles.descriptionText}
            placeholder="Enter Description Here"
            onChangeText={setDescription}
            multiline={true}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CreateTodoButton navigation={navigation} />
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
    flex: 0.15,
    flexDirection: "row",
  },
  headerText: {
    marginLeft: 7,
    fontWeight: "bold",
    fontSize: 21,
    marginTop: 21,
  },
  username: {
    fontWeight: "bold",
    fontSize: 21,
    marginTop: 21,
    marginLeft: 21,
  },
  userInfo: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginRight: 7,
  },
  titleContainer: {
    flex: 0.2,
  },
  titleInput: {
    marginTop: 35,
    marginLeft: 28,
    marginRight: 28,
    borderWidth: 2,
    padding: 7,
  },
  descriptionText: {
    marginTop: 35,
    marginLeft: 28,
    marginRight: 28,
    borderWidth: 2,
    padding: 7,
  },
  buttonContainer: {
    flex: 0.7,
    alignItems: "center",
  },
});
