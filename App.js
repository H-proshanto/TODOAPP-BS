import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './src/screens/Home';
import { DashBoard } from './src/screens/DashBoard';
import { TodoForm } from './src/screens/TodoForm';
import { HeaderUI } from './src/components/HeaderUI';
import store from './src/app/store';
import { Provider } from 'react-redux'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'orange' },
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="DashBoard"
            component={DashBoard}
            options={({ navigation }) => ({
              headerLeft: () => null,
              headerRight: () => <HeaderUI navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="TodoForm"
            component={TodoForm}
            options={({ navigation }) => ({
              headerRight: () => <HeaderUI navigation={navigation} />,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
