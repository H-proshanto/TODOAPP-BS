import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HooksProvider } from "./src/context/HooksContext";
import { Home } from "./src/screens/Home";
import { DashBoard } from "./src/screens/DashBoard";
import { TodoForm } from "./src/screens/TodoForm";

const Stack = createStackNavigator();

export default function App() {
  return (
    <HooksProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTintColor: "white",
            headerStyle: { backgroundColor: "orange" },
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="DashBoard"
            component={DashBoard}
            options={{ headerLeft: () => null }}
          />
          <Stack.Screen name="TodoForm" component={TodoForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </HooksProvider>
  );
}
