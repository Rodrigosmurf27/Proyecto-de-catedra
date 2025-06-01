import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ClienteCard = ({ cliente }) => (
  <View style={styles.card}>
    <Text style={styles.nombre}>{cliente.nombre}</Text>
    <Text>Teléfono: {cliente.telefono}</Text>
    <Text>Email: {cliente.correo}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { margin: 12, backgroundColor: "#fce4ec", borderRadius: 10, padding: 8, elevation: 2 },
  nombre: { fontWeight: "bold", fontSize: 16 }
});

export default ClienteCard;
