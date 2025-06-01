import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProveedorCard = ({ proveedor }) => (
  <View style={styles.card}>
    <Text style={styles.nombre}>{proveedor.nombre}</Text>
    <Text>Teléfono: {proveedor.telefono}</Text>
    <Text>Dirección: {proveedor.direccion}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { margin: 12, backgroundColor: "#e3f2fd", borderRadius: 10, padding: 8, elevation: 2 },
  nombre: { fontWeight: "bold", fontSize: 16 }
});

export default ProveedorCard;
