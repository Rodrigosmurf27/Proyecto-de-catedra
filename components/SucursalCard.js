import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SucursalCard = ({ sucursal }) => (
  <View style={styles.card}>
    <Text style={styles.nombre}>{sucursal.nombre}</Text>
    <Text>Dirección: {sucursal.direccion}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { margin: 12, backgroundColor: "#fffde7", borderRadius: 10, padding: 8, elevation: 2 },
  nombre: { fontWeight: "bold", fontSize: 16 }
});

export default SucursalCard;
