import React from "react";
import { View, Alert, Button } from "react-native";
import LoginForm from "../components/LoginForm";
import { login } from "../api/api";

export default function LoginScreen({ navigation }) {
  const handleLogin = async (values) => {
    const res = await login(values.username, values.password);
    if (res.success) {
      navigation.replace("Main");  // ← Esto está bien
    } else {
      Alert.alert("Error", "Usuario o contraseña incorrectos");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <LoginForm onSubmit={handleLogin} />
      <Button
        title="Registrarse"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}
