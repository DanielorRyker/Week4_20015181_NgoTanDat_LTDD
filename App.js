import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';
import Payments from './Payments';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator 
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home}  options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp}  options={{headerShown: false}}/>
       <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/> 
        <Stack.Screen name="Payments" component={Payments} options={{headerShown  : false}}/> 
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
