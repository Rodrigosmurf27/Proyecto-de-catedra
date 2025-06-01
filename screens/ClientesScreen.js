import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import ClienteCard from "../components/ClienteCard";
import axios from "axios";
import { API_URL } from "../api/api";

export default function ClientesScreen() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/clientes`).then(res => {
      setClientes(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#6200ee" style={{ flex: 1 }} />;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={clientes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ClienteCard cliente={item} />}
      />
    </View>
  );
}
