import React from "react";
import { ScrollView, Alert, TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import LoginForm from "../components/LoginForm";
import { login } from "../api/api";
import { colors, font } from "../theme";

export default function LoginScreen({ navigation }) {
  const handleLogin = async (values) => {
    const res = await login(values.username, values.password);
    if (res.success) {
      navigation.replace("Main");
    } else {
      Alert.alert("Error", "Usuario o contraseña incorrectos");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Image source={require("../assets/logo.jpg")} style={styles.logoImg} />
        </View>
      </View>
      <LoginForm onSubmit={handleLogin} />
      <TouchableOpacity style={styles.registrarBtn} onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registrarBtnText}>¿No tienes cuenta? <Text style={{ color: colors.primary }}>Regístrate</Text></Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingVertical: 200
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 12
  },
  logoCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#c21098",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 6
  },
  logoImg: {
    width: 54,
    height: 54,
    borderRadius: 27,
    resizeMode: "contain",
    backgroundColor: "#fff"
  },
  registrarBtn: {
    marginTop: 30,
    alignSelf: "center"
  },
  registrarBtnText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontFamily: font.regular
  }
});
