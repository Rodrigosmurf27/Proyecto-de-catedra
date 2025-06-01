import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Venmol Inventario</Text>
      <Text style={styles.subtitle}>Navega con los botones inferiores para gestionar el inventario, productos, proveedores, clientes, ventas y sucursales.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  subtitle: { fontSize: 16, color: "#444" }
});
