import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { colors, font } from "../theme";
import { Ionicons } from "@expo/vector-icons";
// Si tu logout requiere limpiar storage, llama tu función aquí
// import { logout } from "../api/api";

export default function HomeScreen({ navigation }) {
  const handleLogout = () => {
    // Si usas AsyncStorage para guardar el token, bórralo aquí
    // await AsyncStorage.removeItem('token');
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro que deseas cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: () => navigation.replace("Login")
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Botón logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={28} color={colors.primary} />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Image source={require("../assets/logo.jpg")} style={styles.logoImg} />
        </View>
      </View>
      <Text style={styles.title}>¡Bienvenido a Venmol Inventario!</Text>
      <Text style={styles.subtitle}>
        Usa la barra inferior para gestionar tus{" "}
        <Text style={styles.bold}>productos</Text>,{" "}
        <Text style={styles.bold}>inventario</Text>,{" "}
        <Text style={styles.bold}>proveedores</Text>,{" "}
        <Text style={styles.bold}>clientes</Text> y más.
      </Text>

      <View style={styles.iconRow}>
        <View style={styles.iconCol}>
          <Ionicons name="albums" size={32} color={colors.primary} />
          <Text style={styles.iconLabel}>Inventario</Text>
        </View>
        <View style={styles.iconCol}>
          <Ionicons name="pricetags" size={32} color={colors.primary} />
          <Text style={styles.iconLabel}>Productos</Text>
        </View>
        <View style={styles.iconCol}>
          <Ionicons name="people" size={32} color={colors.primary} />
          <Text style={styles.iconLabel}>Clientes</Text>
        </View>
        <View style={styles.iconCol}>
          <Ionicons name="business" size={32} color={colors.primary} />
          <Text style={styles.iconLabel}>Sucursales</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 28
  },
  logoutBtn: {
    position: "absolute",
    top: 28,
    right: 22,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 6,
    elevation: 3,
    shadowColor: "#c21098",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 16
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#c21098",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 5
  },
  logoImg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    resizeMode: "contain",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 26,
    color: colors.primary,
    fontFamily: font.bold,
    textAlign: "center",
    marginBottom: 12,
    marginTop: 8
  },
  subtitle: {
    fontSize: 17,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 28,
    fontFamily: font.regular,
    lineHeight: 22
  },
  bold: {
    color: colors.primary,
    fontFamily: font.bold
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 12
  },
  iconCol: {
    alignItems: "center",
    marginHorizontal: 7
  },
  iconLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontFamily: font.regular,
    marginTop: 5
  }
});
