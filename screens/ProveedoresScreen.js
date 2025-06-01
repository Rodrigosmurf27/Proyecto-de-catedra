import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import ProveedorCard from "../components/ProveedorCard";
import axios from "axios";
import { API_URL } from "../api/api";

export default function ProveedoresScreen() {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/proveedores`).then(res => {
      setProveedores(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#6200ee" style={{ flex: 1 }} />;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={proveedores}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProveedorCard proveedor={item} />}
      />
    </View>
  );
}
