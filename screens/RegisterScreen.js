import React from "react";
import { Alert, View } from "react-native";
import RegisterForm from "../components/RegisterForm";
import { register } from "../api/api";

export default function RegisterScreen({ navigation }) {
  const handleRegister = async (values) => {
    if (values.password !== values.confirm) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }
    const res = await register(values.username, values.password);
    if (res.success) {
      Alert.alert("Éxito", "Usuario registrado correctamente");
      navigation.goBack();
    } else {
      Alert.alert("Error", "No se pudo registrar el usuario: " + (res.error || "Error desconocido"));
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <RegisterForm onSubmit={handleRegister} />
    </View>
  );
}

