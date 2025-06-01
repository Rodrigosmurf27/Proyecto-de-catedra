import React from "react";
import { View, Text, StyleSheet } from "react-native";

const VentaResumen = ({ venta }) => (
  <View style={styles.card}>
    <Text style={styles.titulo}>Venta #{venta.id}</Text>
    <Text>Empleado: {venta.empleado}</Text>
    <Text>Fecha: {venta.fecha}</Text>
    <Text>Total: ${venta.total}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { margin: 12, backgroundColor: "#e8f5e9", borderRadius: 10, padding: 8, elevation: 2 },
  titulo: { fontWeight: "bold", fontSize: 16 }
});

export default VentaResumen;
