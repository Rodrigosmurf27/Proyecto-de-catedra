import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Image, StyleSheet } from "react-native";
import axios from "axios";
import { API_URL } from "../api/api";

const ProductosScreen = () => {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/productos`).then(res => setProductos(res.data));
  }, []);
  return (
    <FlatList
      data={productos}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.imagen }} style={styles.imagen} />
          <View>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text>Cantidad: {item.cantidad}</Text>
            <Text>Precio: ${item.precio}</Text>
          </View>
        </View>
      )}
    />
  );
};
const styles = StyleSheet.create({
  card: { flexDirection: "row", padding: 10, margin: 10, borderRadius: 10, backgroundColor: "#f9f9f9", alignItems: "center" },
  imagen: { width: 60, height: 60, marginRight: 10 },
  nombre: { fontWeight: "bold", fontSize: 16 }
});
export default ProductosScreen;
