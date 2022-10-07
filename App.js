import { HomeScreen } from "./src/components/HomeScreen";
import { DashBoard } from "./src/components/DashBoard";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DataProvider } from "./DataContext";
import { TodoForm } from "./src/components/TodoForm";

const Stack = createStackNavigator();

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTintColor: "white",
            headerStyle: { backgroundColor: "orange" },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="DashBoard"
            component={DashBoard}
            options={{ headerLeft: () => null }}
          />
          <Stack.Screen name="TodoForm" component={TodoForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
