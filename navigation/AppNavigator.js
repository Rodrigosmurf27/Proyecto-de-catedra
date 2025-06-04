import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabs from './BottomTabs';
import AgregarClienteScreen from "../screens/AgregarClienteScreen";
import AgregarProveedorScreen from '../screens/AgregarProveedorScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="AgregarCliente" component={AgregarClienteScreen} />
      <Stack.Screen name="AgregarProveedor" component={AgregarProveedorScreen} />

    </Stack.Navigator>
  );
}


