import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from "react-native";
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabs from './BottomTabs';
import { colors, font } from "../theme";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary, elevation: 0 },
        headerTitleStyle: { color: "#fff", fontFamily: font.bold, fontSize: 22, letterSpacing: 1 },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitle: () => (
          <Image
            source={require("../assets/logo.jpg")}
            style={{ width: 36, height: 36, resizeMode: "contain" }}
          />
        )
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Registro", headerTitleAlign: "center" }}
      />
      <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
      {/* Ya NO agregues los screens de agregar cliente/proveedor */}
    </Stack.Navigator>
  );
}



