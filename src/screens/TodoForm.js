import { StyleSheet, View, ScrollView } from "react-native";
import { HeaderUI } from "../components/Header";
import { ReadOnlyViewBtns } from "../components/ReadOnlyViewBtns";
import { Title } from "../components/Title";
import { Description } from "../components/Description";

export const TodoForm = ({ navigation, route }) => {
  const taskId = route.params?.taskId;
  const view = route.params?.view;
  const status = route.params?.status;

  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderUI navigation={navigation} />
        <Title view={view} taskId={taskId} />
        <Description view={view} taskId={taskId} />
      </ScrollView>
      <ScrollView>
        <ReadOnlyViewBtns
          view={view}
          status={status}
          navigation={navigation}
          taskId={taskId}
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
});
