import React from "react";
import { Alert, View, StyleSheet } from "react-native";
import RegisterForm from "../components/RegisterForm";
import { register } from "../api/api";
import { colors } from "../theme";

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
    <View style={styles.container}>
      <RegisterForm onSubmit={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    justifyContent: "center"
  }
});
