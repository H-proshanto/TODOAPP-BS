import HooksContext from "../context/HooksContext";
import { StyleSheet, Text, View } from "react-native";
import { ButtonUI } from "./Button";
import { useContext } from "react";

export const HeaderUI = ({ navigation }) => {
  const { sessionName, clearAllData } = useContext(HooksContext);

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Simple ToDo</Text>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{`Mr.${sessionName}`}</Text>
        <ButtonUI
          navigation={navigation}
          title={"logout"}
          onPress={clearAllData}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 23,
    marginLeft: 21,
  },
  userInfo: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginRight: 7,
  },
});
