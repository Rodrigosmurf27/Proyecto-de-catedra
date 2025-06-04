import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, ActivityIndicator, Text, Button, StyleSheet } from "react-native";
import ClienteCard from "../components/ClienteCard";
import { listarClientes } from "../api/api";
import { useFocusEffect } from "@react-navigation/native";

export default function ClientesScreen({ navigation }) {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Usa useFocusEffect para recargar la lista cuando vuelvas del formulario
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      listarClientes().then(res => {
        if (res.success) setClientes(res.clientes);
        else alert("Error al cargar clientes");
        setLoading(false);
      });
    }, [])
  );

  if (loading) return <ActivityIndicator size="large" color="#6200ee" style={{ flex: 1 }} />;

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Agregar Cliente"
        onPress={() => navigation.navigate("AgregarCliente")}
      />
      <Text style={styles.titulo}>Lista de Clientes</Text>
      {clientes.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 32 }}>No hay clientes registrados.</Text>
      ) : (
        <FlatList
          data={clientes}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <ClienteCard cliente={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 8,
    textAlign: "center"
  }
});
