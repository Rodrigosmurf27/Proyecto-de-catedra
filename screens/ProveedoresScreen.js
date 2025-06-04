import React, { useState } from "react";
import { View, FlatList, ActivityIndicator, Text, Button } from "react-native";
import ProveedorCard from "../components/ProveedorCard";
import { listarProveedores } from "../api/api";
import { useFocusEffect } from "@react-navigation/native";

export default function ProveedoresScreen({ navigation }) {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      listarProveedores().then(res => {
        if (res.success) {
          setProveedores(res.proveedores);
        } else {
          alert("Error al cargar proveedores: " + (res.error || "Error desconocido"));
        }
        setLoading(false);
      });
    }, [])
  );

  if (loading) return <ActivityIndicator size="large" color="#6200ee" style={{ flex: 1 }} />;

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Agregar proveedor"
        onPress={() => navigation.navigate("AgregarProveedor")}
      />
      {proveedores.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 32 }}>No hay proveedores registrados.</Text>
      ) : (
        <FlatList
          data={proveedores}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <ProveedorCard proveedor={item} />}
        />
      )}
    </View>
  );
}
