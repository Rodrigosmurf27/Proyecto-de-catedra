import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProductoCard = ({ producto }) => (
  <View style={styles.card}>
    <Image source={{ uri: producto.imagen }} style={styles.imagen} />
    <View style={{ flex: 1 }}>
      <Text style={styles.nombre}>{producto.nombre}</Text>
      <Text>{producto.descripcion}</Text>
      <Text style={styles.info}>Precio: ${producto.precio}</Text>
      <Text style={styles.info}>Stock: {producto.cantidad}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: { flexDirection: "row", margin: 12, backgroundColor: "#f5f5f5", borderRadius: 10, padding: 8, elevation: 2 },
  imagen: { width: 80, height: 80, marginRight: 12, borderRadius: 8 },
  nombre: { fontWeight: "bold", fontSize: 18 },
  info: { color: "#222" }
});

export default ProductoCard;
