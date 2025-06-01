import React, { useEffect, useState } from "react";
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { API_URL } from "../api/api";

export default function InventarioScreen({ navigation }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/productos`)
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#6200ee" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ProductoDetalle", { producto: item })}
          >
            <Image source={{ uri: item.imagen }} style={styles.imagen} />
            <Text style={styles.nombre}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  card: { flex: 1, margin: 8, backgroundColor: "#f8f8f8", borderRadius: 14, alignItems: "center", padding: 10 },
  imagen: { width: 120, height: 120, borderRadius: 14, marginBottom: 8 },
  nombre: { fontWeight: "bold", fontSize: 15 },
});
