import * as React from 'react';
import Main from './components/main';
import Ticket from './components/ticket';
import InitialScreen from './components/initialScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InitialScreen">
        <Stack.Screen name="Tela inicial" component={InitialScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Sua conta" component={Main} />
        <Stack.Screen name="Ticket" component={Ticket} options={{ title: 'Ticket' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
