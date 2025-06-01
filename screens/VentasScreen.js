import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import VentaResumen from "../components/VentaResumen";
import axios from "axios";
import { API_URL } from "../api/api";

export default function VentasScreen() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/ventas`).then(res => {
      setVentas(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#6200ee" style={{ flex: 1 }} />;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={ventas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <VentaResumen venta={item} />}
      />
    </View>
  );
}
