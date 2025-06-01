import React from "react";
import { Alert } from "react-native";
import LoginForm from "../components/LoginForm";
import { login } from "../api/api";

export default function LoginScreen({ navigation }) {
  const handleLogin = async (values) => {
    const res = await login(values.username, values.password);
    if (res.success) {
      navigation.replace("Main");
    } else {
      Alert.alert("Error", "Usuario o contraseña incorrectos");
    }
  };
  return <LoginForm onSubmit={handleLogin} />;
}
